<script setup>
import axios from 'axios';
import { useEvents } from '@composables/useEvents';
import { useImageStore } from '@composables/useImageStore';
import { animateMapAppearance, animateFormOverlay, hideElement } from '@utils/animations';

const apikey = import.meta.env.VITE_API_KEY;

const placemarkData = ref([]);
const showForm = ref(false);
const formData = ref({
  id: null,
  coords: [],
  text: '',
  placemarkMessage: '',
  img: ''
});

const generateId = () => {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
};

let map = null;
let clusterer = null;

const { getUserPlacemarks, saveUserPlacemarks } = useEvents();
const { saveImage, deleteImage } = useImageStore();

const initializeMap = () => {
  map = new ymaps.Map('map', {
    center: [60.128955, 64.803225],
    zoom: 17,
  });

  clusterer = new ymaps.Clusterer({
    preset: 'islands#invertedVioletClusterIcons',
    groupByCoordinates: false,
    clusterDisableClickZoom: false,
    clusterHideIconOnBalloonOpen: false,
    geoObjectHideIconOnBalloonOpen: false,
  });

  map.geoObjects.add(clusterer);

  const savedPlacemarks = getUserPlacemarks();
  placemarkData.value = savedPlacemarks.map(p => ({
    ...p,
    id: p.id || generateId()
  }));
  placemarkData.value.forEach(addPlacemark);

  map.events.add('click', (e) => {
    formData.value = {
      id: null,
      coords: e.get('coords'),
      text: '',
      placemarkMessage: '',
      img: ''
    };
    showForm.value = true;
  });

  const ButtonLayout = ymaps.templateLayoutFactory.createClass(
      "<div class='map__delete-btn btn'>" +
      "{{ data.content }}" +
      "</div>"
  );

  const customButton = new ymaps.control.Button({
      data: {
          content: " X "
      },
      options: {
          layout: ButtonLayout,
          float: 'none', 
            position: {
                top: 60, 
                left: 10 
            }
      }
  });

  customButton.events.add('click', async() => {
    const confirmed = await confirmDelete('Вы точно хотите удалить все метки?');
    if (!confirmed) return;
    
    placemarkData.value = [];
    saveUserPlacemarks(placemarkData.value);
    clusterer.removeAll();
  });
  map.controls.add(customButton);

  const searchControl = map.controls.get('searchControl');
  searchControl.options.set('noSuggestPanel', true);

  searchControl.events.add('submit', async () => {
    const searchText = searchControl.getRequestString();
    await axios.get(`https://geocode-maps.yandex.ru/1.x/`, {
      params: {
        apikey: apikey,
        geocode: searchText,
        format: 'json'
      },
    });
  });
};

const addPlacemark = (placemark) => {
  const customPlacemark = ymaps.templateLayoutFactory.createClass(`
    <div class="placemark">
      <p class="placemark__message">${placemark.placemarkMessage}</p>
      <img class="placemark__img" src="${placemark.img}" alt="icon">
    </div>
  `);

  const ymPlacemark = new ymaps.Placemark(
    placemark.coords,
    { text: placemark.text },
    {
      iconLayout: customPlacemark,
      iconImageSize: [80, 80],
      iconImageOffset: [-40, -40],
      iconShape: { 
        type: 'Rectangle',
        coordinates: [[-45, -45], [35, 35]],
      },
    }
  );

  ymPlacemark.events.add('click', () => {
    const selected = placemarkData.value.find(p => p.id === placemark.id);
    if (selected) {
      formData.value = { ...selected };
      showForm.value = true;
    }
  });

  ymPlacemark.events.add('mouseenter', () => {
    const overlay = ymPlacemark.getOverlaySync();
    const messageElement = overlay?.getLayoutSync()?.getElement()?.querySelector('.placemark__message');
    if (messageElement) {
      messageElement.style.opacity = '1';
      messageElement.style.transform = 'translateY(-60px)';
    }
  });

  ymPlacemark.events.add('mouseleave', () => {
    const overlay = ymPlacemark.getOverlaySync();
    const messageElement = overlay?.getLayoutSync()?.getElement()?.querySelector('.placemark__message');
    if (messageElement) {
      messageElement.style.opacity = '0';
      messageElement.style.transform = 'translateY(10px)';
    }
  });

  clusterer.add(ymPlacemark);
};

const confirmDelete = async (message) => {
  return new Promise((resolve) => {
    if (confirm(message)) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
};

const deletePlacemark = async () => {
  const confirmed = await confirmDelete('Вы точно хотите удалить эту метку?');
  if (!confirmed) return;

  const id = formData.value.id;
  placemarkData.value = placemarkData.value.filter(p => p.id !== id);
  deleteImage(id);
  saveUserPlacemarks(placemarkData.value);
  clusterer.removeAll();
  placemarkData.value.forEach(addPlacemark);
  hideElement('.form-container');
  setTimeout(() => {
    showForm.value = false;
  }, 500);
};

const savePlacemark = async () => {
  if (formData.value.id) {
    const index = placemarkData.value.findIndex(p => p.id === formData.value.id);
    placemarkData.value[index] = { ...formData.value };
  } else {
    const newPlacemark = { ...formData.value, id: generateId() };
    placemarkData.value.push(newPlacemark);
  }

  if (formData.value.img) {
    saveImage(formData.value.id, formData.value.img);
  }
  
  await saveUserPlacemarks(placemarkData.value);
  clusterer.removeAll();
  placemarkData.value.forEach(addPlacemark);
  hideElement('.form-container');
  setTimeout(() => {
    showForm.value = false;
  }, 500);
};

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const reader = new FileReader();
    reader.onload = async (e) => {
      formData.value.img = e.target.result;
    };
    reader.readAsDataURL(file);
  } catch (error) {
    console.error('Ошибка загрузки:', error);
    formData.value.img = '';
  }
};

const clearImage = () => {
  formData.value.img = '';
};

const closeForm = () => {
  hideElement('.form-container');
  setTimeout(() => {
    showForm.value = false;
  }, 500); // Match the duration of the hide animation
};

onMounted(() => {
  if (!window.ymaps) {
    console.error("Ошибка: Yandex Maps API не загружен.");
    return;
  }

  ymaps.ready(() => {
    initializeMap();
    animateMapAppearance('#map');
  });
});

watch(showForm, (newVal) => {
  if (newVal) {
    document.body.classList.add('no-scroll');
    nextTick(() => {
      animateFormOverlay('.form-overlay');
    });
  } else {
    document.body.classList.remove('no-scroll');
    hideElement('.form-overlay');
  }
});
</script>
<template>
  <div id="map"></div>
  <div v-if="showForm" class="form-overlay">
    <form class="form-container">
      <h3 class="form-container__title">
        {{ formData.id ? 'Редактирование метки' : 'Создание метки' }}
      </h3>
      <div class="form-container__image-preview" v-if="formData.img">
        <img :src="formData.img" alt="Превью">
      </div>
      <div class="form-container__upload-section">
        <p class="form-container__or-text">
          {{ formData.img ? 'Изменить изображение' : 'Загрузить изображение' }}
        </p>
        <div class="form-container__file-content">
          <label class="form-container__file-upload btn">
            <input
              class="inp"
              type="file" 
              accept="image/*"
              @change="handleFileUpload"
            >
            <span>Выбрать файл</span>
          </label>
          <button v-if="formData.img" @click="clearImage" class="form-container__clear-image-btn btn">×</button>
        </div>
        <p class="form-container__or-text">Или укажите ссылку изображения</p>
        <input 
          class="inp"
          type="text" 
          v-model="formData.img" 
          placeholder="Введите URL изображения"
        >
      </div>
      <p class="form-container__or-text">Текст при наведении:</p>
      <input v-model="formData.placemarkMessage" type="text" class="inp">
      <p class="form-container__or-text">Описание метки:</p>
      <textarea v-model="formData.text" maxlength="100" type="text" class="inp textarea"></textarea>
      <p>{{ formData.text.length }} / 100</p>
      <button @click="savePlacemark" type="button" class="form-container__btn btn form-container__btn--complete">
        {{ formData.id ? 'Сохранить' : 'Создать' }}
      </button>
      <button @click="closeForm" type="button" class="form-container__btn btn">
        Отмена
      </button>
      <button v-if="formData.id" type="button" @click="deletePlacemark" class="form-container__delete-btn btn">
        Удалить
      </button>
    </form>
  </div>
</template>

<style lang="sass">
@import "@global"
@import "@mixin"
@import "@color"

#map 
  width: 100%
  height: 90vh
  overflow: hidden

  .ymaps-2-1-79-map
    border-radius: $radius

  .ymaps-2-1-79-inner-panes
    border-radius: $radius

.map__delete-btn
  background: $red !important
  color: $white !important
  font-size: 14px !important
  padding: 6px 10px !important

.placemark
  transform: translate(-50%,-50%)
  position: relative
  width: 80px
  height: 80px
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

.placemark__img
  border-radius: 20px
  width: 100%
  object-fit: cover
  height: 100%

.placemark__message
  position: absolute
  transition: all 0.3s
  background: $white
  transform: translateY(10px)
  color: $black
  pointer-events: none
  white-space: nowrap
  padding: 6px 10px
  border-radius: 6px
  text-align: center
  opacity: 0
  z-index: -1

.form-overlay
  position: fixed
  top: 0
  left: 0
  z-index: 99999
  width: 100%
  height: 100%
  background: rgba(0, 0, 0, 0.5)
  display: flex
  justify-content: center
  align-items: center
  overflow: hidden

.form-container
  scrollbar-width: none
  -ms-overflow-style: none 
  max-height: 90vh
  display: flex
  flex-direction: column
  gap: 10px
  background: white
  overflow-y: scroll
  padding: 20px
  border-radius: $radius

  > .form-container__or-text
    margin-top: 10px

.form-container__image-preview
  position: relative
  display: flex
  justify-content: center
  img
    object-fit: cover
    border-radius: $radius
    height: 40vh

.form-container__file-content
  display: flex
  gap: 10px
  justify-content: center

.form-container__btn--complete
  background: $yellow

.form-container__clear-image-btn
  cursor: pointer
  background: $red !important
  color: $white !important
  padding: 10px !important
  width: 35px

.form-container__upload-section
  display: flex
  flex-direction: column
  gap: 10px

.form-container__file-upload
  background: $yellow !important 
  position: relative
  width: 100%
  text-align: center
  cursor: pointer
  input[type="file"] 
    display: none
    opacity: 0
    right: 0
    top: 0
    cursor: pointer

  .form-container__upload-btn 
    display: inline-block
    padding: 8px 16px
    background-color: $black
    color: $black
    border-radius: 4px
    cursor: pointer
    transition: background-color 0.3s

    &:hover 
      background-color: $grey

.form-container__input
  width: 100%
  padding: 8px
  border: 1px solid #ccc
  border-radius: 4px

.form-container__delete-btn
  background: $red !important
  color: $white !important

@include hover 
  .form-container__file-upload:hover
    background: $light-grey !important 

@include mobile
  #map
    height: 80vh

  .form-container
    max-height: 70vh

  .form-container__image-preview
    img
      height: 25vh 

  .form-container__clear-image-btn
    right: 20px

</style>
