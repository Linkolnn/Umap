# Nuxt Minimal Starter

# Umap

Проект Umap сделан на основе Yandex API. Umap даёт возможность создвать кастомные метки на Яндекс карте   

## Описание компонента `app.vue`

Компонент `app.vue` является основным компонентом приложения. Он включает в себя заголовок (`Header`), основную часть (`NuxtPage`) и подвал (`Footer`). Основная часть (`main`) содержит страницу, которая будет отображаться в зависимости от маршрута. Стили компонента определены с использованием препроцессора SASS.

### Объяснение кода в `app.vue`

- `<Header/>` - компонент заголовка.
- `<main class="main">` - основная часть страницы, содержащая компонент `NuxtPage`, который отвечает за отображение текущей страницы.
- `<Footer/>` - компонент подвала.
- Стили определены с использованием SASS, включая импорт глобальных стилей и миксинов.

```vue
<template>
  <Header/>
  <main class="main">
    <NuxtPage/>
  </main>
  <Footer/>
</template>
<style lang="sass">
@import @color
@import @global
@import @mixin

.main
  display: flex
  flex-direction: column
  gap: 20px
  padding: 0px 20px

.section 
  border-radius: $radius
  padding: 10px
  background: $white
  min-height: 90vh

@include mobile
  .section
    min-height: 80vh

</style>
```

## Описание компонента `index.vue`

Компонент `index.vue` находится в папке `pages` и отвечает за отображение главной страницы приложения. Он включает в себя секции приветствия (`welcome`) и информации о проекте (`about`). В компоненте используется анимация для элементов страницы и проверка авторизации пользователя.

### Объяснение кода в `index.vue`

- Импортируются необходимые данные и функции: `data`, `animateBlocks`, `useAuth`.
- Проверяется текущий пользователь и его авторизация.
- При монтировании компонента вызывается функция `animateBlocks` для анимации элементов.
- В шаблоне компонента определены две секции: `welcome` и `about`.
- Стили компонента определены с использованием SASS, включая импорт глобальных стилей и миксинов.

```vue
<script setup>
import data from '@services/data';
import { animateBlocks } from '@utils/animations';
import { useAuth } from '@composables/useAuth';

const { currentUser } = useAuth();
const isAuth = !!currentUser.value;
const welcomeListBtn = data.welcomeListBtn(isAuth);

onMounted(() => {
    animateBlocks('.welcome__content > *, .about > *, .about__content > *', 0.2);
});
</script>
<template>
    <section class="welcome section">
        <div class="welcome__map"></div>
        <MapComponent />
        <div class="welcome__content">
            <h1 class="welcome__title font-h1">
              <IconLogo class="welcome__title-icon" filled /> map
            </h1>
            <p class="welcome__text font-text_extra-large">
              Проект Umap представляет собой веб-приложение, использующее API Яндекс.
              <span>
                Карт для отображения интерактивной карты с возможностью создания пользовательских меток (placeMark). 
              </span>
            </p>
            <div class="welcome__btn-block">
              <NuxtLink v-for="btn in welcomeListBtn" :to="btn.url">
                <button class="welcome__btn btn font-button">
                  {{ btn.text }}
                </button>
              </NuxtLink>
            </div>
        </div>
    </section>
    <section class="about section" id="more">
        <img class="about__img" src="../assets/img/welcomeImg.png" alt="">
        <div class="about__content">
            <h1 class="about__title font-h1">
                <IconLogo class="about__title-icon" filled /> map
            </h1>
            <p class="about__text font-text_extra-large" lang="ru">
                Umap сочетает в себе возможности интерактивных карт Яндекса с расширенным функционалом пользовательских меток и безопасной системой управления пользователями.
            </p>
            <h4 class="font-h4">Создание пользовательских меток (placeMark):</h4>
            <п class="about__text font-medium" lang="ru">
                1. Пользователи могут добавлять на карту собственные метки с кастомным дизайном и содержимым.
            </п>
            <п class="about__text font-medium" lang="ru">
                2. Для создания кастомных меток используется параметр iconLayout, позволяющий задать HTML-шаблон для отображения метки.
            </п>
            <h4 class="font-h4">Регистрация и авторизация пользователей:</h4>
            <п class="about__text font-medium" lang="ru">
                1. Система предоставляет функционал регистрации новых пользователей и авторизации существующих.
            </п>
            <п class="about__text font-medium" lang="ru">
                2. Данные пользователей, такие как токены аутентификации, сохраняются в куки-файлах для обеспечения сессий.
            </п>
        </div>
    </section>
</template>
<style lang="sass">
@import @color
@import @fonts
@import @global
@import @mixin

.welcome  
    position: relative
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 10px
    overflow: hidden
    
    #map
        border: 10px solid $white
        position: absolute
        height: 100%
        width: 100%

.welcome__map
    z-index: 1
    position: absolute
    height: 100%
    width: 100%
    background: #ffffff80

.welcome__title-icon
    width: 100px
    height: auto
    transform: translateX(10%)

.welcome__content
    border-radius: $radius
    background: $white
    padding: 20px
    width: 70%
    z-index: 2
    display: flex
    flex-direction: column
    align-items: center
    justify-content: flex-end
    gap: 10px

.welcome__title 
    text-align: center

.welcome__text
    color: $grey
    text-align: center

.welcome__btn-block
    display: flex
    align-items: center
    gap: 10px
    
    .font-button
        font-size: 24px !important

.welcome__btn
    background: $yellow !important

.about 
  display: flex
  flex-direction: row
  align-items: center
  justify-content: space-evenly
  gap: 20px

.about__content 
    padding: 10px
    display: flex
    flex-direction: column
    gap: 10px
    word-wrap: break-word
    hyphens: auto

    .font-h4
        margin-top: 10px
    
.about__title 
    align-self: center

.about__img
    width: 50%
    object-fit: cover

.about__title-icon
    width: 100px
    height: auto
    transform: translateX(10%)

.about__text
    word-wrap: break-word
    hyphens: auto

@include hover
    .welcome__btn:hover
        background: $light-grey !important


@include mobile
    .welcome__title-icon
        width: 60px

    .welcome__content
        width: 90%

    .welcome__text
        span
            display: none

    .font-text_extra-large
        font-size: 16px  !important

    .welcome__btn-block
        .font-button
            font-size: 16px !important

    .welcome__btn:active
        background: $light-grey !important

    .about 
        flex-direction: column
        gap: 10px

    .about__img
        width: 100%

    .about__title-icon
        width: 60px

    .about__text
        word-wrap: break-word
        hyphens: auto

</style>
```

## Описание компонента `login.vue`

Компонент `login.vue` находится в папке `pages` и отвечает за отображение страницы входа в систему. Он включает в себя форму входа (`Form`), которая позволяет пользователям вводить свои учетные данные для авторизации.

### Объяснение кода в `login.vue`

- В шаблоне компонента определена секция с классом `form__section-login`, содержащая компонент `Form` с типом `login`.
- Стили компонента определены с использованием SASS, включая импорт глобальных стилей и миксинов.

```vue
<template>
    <section class="form__section-login section">
        <Form type="login" />
    </section>
</template>
<style lang="sass">
@import @color
@import @global
@import @mixin

.form__section-login
    background: transparent !important
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 20px
    
</style>
```

## Описание компонента `profile.vue`

Компонент `profile.vue` находится в папке `pages` и отвечает за отображение страницы профиля пользователя. Он включает в себя компонент карты (`MapComponent`), который отображается только для авторизованных пользователей.

### Объяснение кода в `profile.vue`

- Импортируется функция `useAuth` для проверки текущего пользователя.
- Если пользователь не авторизован, происходит перенаправление на страницу входа.
- В шаблоне компонента определена секция с классом `ymap__section`, содержащая компонент `MapComponent`, который отображается только если пользователь авторизован.

```vue
<script setup>
const { currentUser } = useAuth();

if (!currentUser.value) {
    navigateTo('/login');
}
</script>
<template>
    <section class="ymap__section section">
        <MapComponent v-if="currentUser"/>
    </section>
</template>
```

## Описание компонента `register.vue`

Компонент `register.vue` находится в папке `pages` и отвечает за отображение страницы регистрации нового пользователя. Он включает в себя форму регистрации (`Form`), которая позволяет пользователям вводить свои данные для создания новой учетной записи.

### Объяснение кода в `register.vue`

- В шаблоне компонента определена секция с классом `form__section-register`, содержащая компонент `Form` с типом `register`.
- Стили компонента определены с использованием SASS, включая импорт глобальных стилей и миксинов.

```vue
<template>
    <section class="form__section-register section">
        <Form type="register" />
    </section>
</template>
<style lang="sass">
@import @color
@import @global
@import @mixin

.form__section-register
    background: transparent !important
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 20px
    
</style>
```

## Описание компонента `Form.vue`

Компонент `Form.vue` находится в папке `components` и отвечает за отображение формы для входа и регистрации пользователей. Он включает в себя поля ввода для имени пользователя, электронной почты и пароля, а также кнопки для отправки формы.

### Объяснение кода в `Form.vue`

- Импортируются необходимые данные и функции: `useAuth`.
- Определяются свойства компонента и реактивные переменные.
- В шаблоне компонента определена форма с полями ввода для имени пользователя, электронной почты и пароля.
- Стили компонента определены с использованием SASS, включая импорт глобальных стилей и миксинов.

```vue
<script setup>
import { useAuth } from '@composables/useAuth';
import { animateBlocks } from '@utils/animations';

const props = defineProps(['type']);
const name = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');

const { register, login } = useAuth();
const router = useRouter();

const handleSubmit = () => {
  if (props.type === 'register') {
    if (password.value !== confirmPassword.value) {
      errorMessage.value = 'Пароли не совпадают';
      return;
    }
    if (register(name.value, password.value)) {
      router.push('/profile');
    } else {
      errorMessage.value = 'Ошибка регистрации';
    }
  } else {
    if (login(name.value, password.value)) {
      router.push('/profile');
    } else {
      errorMessage.value = 'Неверные имя или пароль';
    }
  }
};

onMounted(() => {
  animateBlocks('.form > *', 0.2);
});
</script>

<template>
    <form @submit.prevent="handleSubmit" :class="['form', type ? 'register__form' : 'login__form']">
        <h3 class="form__title font-h3">
            {{ type === 'register' ? 'Регистрация' : 'Авторизация' }}
        </h3>
        <label class="form__label font-text_medium">Имя</label>
        <input class="inp form__input" v-model="name" type="text" required />
        <label class="form__label font-text_medium">Пароль</label>
        <input class="inp form__input" v-model="password" type="password" required />
        <template v-if="type === 'register'">
            <label class="form__label font-text_medium">Повторите пароль</label>
            <input class="inp form__input" v-model="confirmPassword" type="password" required />
        </template>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            <button class="btn font-button form__btn" type="submit">
                {{ type === 'register' ? 'Зарегистрироваться' : 'Войти' }}
            </button>
    </form>
</template>
<style lang="sass">
@import @color
@import @global
@import @mixin

.form 
  background: $white
  border-radius: $radius
  display: flex
  flex-direction: column
  padding: 20px
  gap: 20px
  width: 700px

.error-message
  border-radius: $radius
  color: $red
  padding: 5px
  @include transition
  
.form__btn
  background: $yellow !important

@include hover
  .form__btn:hover
      background: $light-grey !important

@include mobile
  .form
    max-width: 350px
    width: 100%

  .form__btn:active
    background: $light-grey !important

</style>
```

## Описание компонента `Header.vue`

Компонент `Header.vue` находится в папке `components` и отвечает за отображение заголовка страницы. Он включает в себя логотип и навигационное меню.

### Объяснение кода в `Header.vue`

- В шаблоне компонента определен заголовок с классом `header`, содержащий ссылку на главную страницу с логотипом и компонент `NavMenu`.
- Стили компонента определены с использованием SASS, включая импорт глобальных стилей и миксинов.

```vue
<template>
    <header class="header">
        <NuxtLink class="header__logo-link" to="/">
            <button class="header__logo-btn btn">
                <IconLogo class="header__logo-icon" filled/>
            </button>
        </NuxtLink>
        <NavMenu type="header"/>
    </header>
</template>
<style lang="sass">
@import @color
@import @global
@import @mixin

.header
    display: flex
    flex-direction: row
    justify-content: space-between
    padding: 20px

.header__logo-btn
    border-radius: 50% !important

.header__logo-icon 
    width: 25px
    height: 25px

</style>
```

## Описание компонента `Footer.vue`

Компонент `Footer.vue` находится в папке `components` и отвечает за отображение подвала страницы. Он включает в себя логотип и навигационное меню.

### Объяснение кода в `Footer.vue`

- В шаблоне компонента определен подвал с классом `footer`, содержащий ссылку на главную страницу с логотипом и компонент `NavMenu`.
- Стили компонента определены с использованием SASS, включая импорт глобальных стилей и миксинов.

```vue
<template>
    <footer class="footer">
        <NuxtLink class="footer__logo-link" to="/">
            <button class="footer__logo-btn btn">
                <IconLogo class="footer__logo-icon" filled/>
                map
            </button>
        </NuxtLink>
        <NavMenu type="footer"/>
    </footer>
</template>
<style lang="sass">
@import @color
@import @global
@import @mixin

.footer
    display: flex
    flex-direction: row
    justify-content: space-between
    gap: 10px
    padding: 20px

.footer__logo-link
    width: max-content

.footer__logo-icon 
    width: 25px
    height: 25px
    transform: translateX(10%)

@include mobile
    .footer
        flex-direction: column

</style>
```

## Описание компонента `NavMenu.vue`

Компонент `NavMenu.vue` находится в папке `components` и отвечает за отображение навигационного меню. Он включает в себя ссылки на различные страницы и выпадающее меню для профиля пользователя.

### Объяснение кода в `NavMenu.vue`

- Импортируются необходимые данные и функции: `data`, `animateDropdownOpen`, `animateDropdownClose`, `useAuth`.
- Определяются свойства компонента и реактивные переменные.
- В шаблоне компонента определено навигационное меню с классами, зависящими от типа меню (`header` или `footer`).
- Если элемент меню является профилем, отображается кнопка профиля с выпадающим меню.
- Стили компонента определены с использованием SASS, включая импорт глобальных стилей и миксинов.

```vue
<script setup>
import data from '@services/data';
import { animateDropdownOpen, animateDropdownClose } from '@utils/animations';

const props = defineProps(['type']);
const { logout, currentUser } = useAuth();
const showDropdown = ref(false);

const menuItems = computed(() => 
  data.navMenuItems(props.type, !!currentUser.value)
);

const handleLogout = () => {
  logout();
  navigateTo('/');
  showDropdown.value = false;
};

const toggleDropdown = () => {
  if (showDropdown.value) {
    animateDropdownClose('.dropdown-menu');
    setTimeout(() => {
      showDropdown.value = false;
    }, 300); 
  } else {
    showDropdown.value = true;
    nextTick(() => {
      animateDropdownOpen('.dropdown-menu');
    });
  }
};
</script>

<template>
    <nav :class="[type === 'header' ? 'header__menu' : 'footer__menu']">
        <ul :class="[type === 'header' ? 'header__list' : 'footer__list']">
            <li 
              v-for="item in menuItems" 
              :class="[type === 'header' ? 'header__list-items' : 'footer__list-items']"
            >
                <template v-if="item.isProfile">
                    <div class="profile-menu">
                        <button 
                          class="profile-btn btn"
                          @click="toggleDropdown"
                        >
                          <IconProfile class="profile-icon" filled/>
                        </button>
                        <div v-show="showDropdown" class="dropdown-menu">
                            <div class="dropdown-header">
                              <IconProfile class="dropdown-icon" filled/>
                              <span class="font-text_medium" v-if="currentUser">{{ currentUser.name }}</span>
                            </div>
                            <div class="dropdown-btnblock">
                              <NuxtLink
                                to="/profile"
                                class="dropdown-item btn"
                                @click="showDropdown = false"
                              >
                                Профиль
                              </NuxtLink>
                              <button
                                class="dropdown-item btn"
                                @click="handleLogout"
                              >
                                Выйти
                              </button>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <NuxtLink
                      v-if="!item.url.startsWith('#')" 
                      :class="[type === 'header' ? 'header__list-link' : 'footer__list-link']" 
                      :to="item.url"
                    >
                        <button class="btn font-button">
                          {{ item.text }}
                        </button>
                    </NuxtLink>
                    <button
                      v-else 
                      @click="item.url === '#logout' ? handleLogout() : null"           
                      class="btn font-button"
                    >
                      {{ item.text }}
                    </button>
                </template>
            </li>
        </ul>
    </nav>
</template>

<style lang="sass">
@import @color
@import @global
@import @mixin

.profile-menu
  position: relative
  margin-left: 15px

.profile-btn
  width: 40px
  height: 40px
  border-radius: 50% !important
  cursor: pointer
  display: flex
  align-items: center
  justify-content: center
  padding: 0
  @include transition

.profile-icon
  width: 25px
  height: 25px

.dropdown-menu
  position: absolute
  top: 50px
  right: 0
  background: $white
  display: flex
  flex-direction: column
  align-items: center
  gap: 10px
  min-width: 200px
  z-index: 10
  padding: 20px 0px

.dropdown-header
  display: flex
  flex-direction: column
  align-items: center
  gap: 10px

.dropdown-icon
  width: 40px
  height: 40px

.dropdown-item
  text-align: center
  width: max-content

.header__menu,
.footer__menu 
  display: flex
  flex-direction: row
  align-items: center

.footer__list
  display: flex
  flex-direction: row
  gap: 10px   

.header__list
    display: flex
    flex-direction: row
    gap: 10px 
    align-items: center

.header__list-link,
.footer__list-link 
    color: $black

@include mobile
  .header__list,
  .footer__list
    gap: 10px

</style>
```

## Описание компонента `MapComponent.vue`

Компонент `MapComponent.vue` находится в папке `components` и отвечает за отображение интерактивной карты. Он использует API Яндекс.Карт для отображения карты и позволяет пользователям добавлять пользовательские метки (placeMark).

### Объяснение кода в `MapComponent.vue`

- Отображает карту с кластеризованными метками.
- Позволяет пользователям добавлять новые метки на карту.
- Поддерживает редактирование меток (изменение описания, текста при наведении, изображения).
- Реализована анимация появления карты и формы редактирования.
- Возможность удаления отдельных меток или всех сразу.
- Поддерживает загрузку изображений через `FileReader` и сохранение их в хранилище.
- Поиск местоположений с помощью Yandex Geocoder API.

```vue
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
      // (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
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
```

## Описание компонента `useAuth.js`

Компонент `useAuth.js` находится в папке `composables` и отвечает за управление аутентификацией пользователей. Он включает в себя функции для регистрации, входа и выхода пользователей, а также хранение данных пользователей в куки-файлах.

### Объяснение кода в `useAuth.js`

- Импортируются необходимые библиотеки и функции: `CryptoJS`, `useCookie`.
- Определяются куки для хранения данных пользователей и текущего пользователя.
- Функция `hashPassword` хэширует пароль с использованием соли.
- Функция `register` регистрирует нового пользователя, проверяя, существует ли пользователь с таким именем, и сохраняет данные в куки.
- Функция `login` проверяет данные пользователя и устанавливает текущего пользователя в куки.
- Функция `logout` удаляет данные текущего пользователя из куки.

```javascript
import CryptoJS from 'crypto-js';
import { useCookie } from '#app';

export function useAuth() {
  const config = useRuntimeConfig();
  const salt = config.public.salt;

  const users = useCookie('auth_users', { 
    default: () => ({}),
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 172800 
  });

  const currentUser = useCookie('current_user', {
    default: () => null,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 172800 
  });

  const hashPassword = (password) => CryptoJS.SHA256(password + salt).toString();

  const register = (name, password) => {
    if (users.value[name]) {
      alert('❌ Пользователь уже существует');
      return false;
    }

    users.value = {
      ...users.value,
      [name]: {
        password: hashPassword(password),
        createdAt: new Date().toISOString()
      }
    };

    currentUser.value = { name, lastLogin: new Date().toISOString() };
    return true;
  };

  const login = (name, password) => {
    const user = users.value[name];
    
    if (!user || user.password !== hashPassword(password)) {
      alert('❌ Неверные данные');
      return false;
    }

    currentUser.value = { name, lastLogin: new Date().toISOString() }; 
    return true;
  };

  const logout = () => {
    try {
      currentUser.value = null;
      useCookie('current_user').value = null; // Явное удаление куки
      return true;
    } catch (error) {
      alert('Ошибка при выходе:', error);
      return false;
    }
  };
  
  return { 
    users: computed(() => users.value),
    currentUser: computed(() => currentUser.value),
    register,
    login,
    logout
  };
}
```

## Описание компонента `useEvents.js`

Компонент `useEvents.js` находится в папке `composables` и отвечает за управление пользовательскими метками на карте. Он включает в себя функции для сохранения и получения меток, а также для работы с изображениями меток.

### Объяснение кода в `useEvents.js`

- Импортируются необходимые библиотеки и функции: `useCookie`, `useAuth`, `useImageStore`.
- Определяются куки для хранения меток пользователей.
- Функция `saveUserPlacemarks` сохраняет метки текущего пользователя, исключая изображения, которые сохраняются отдельно.
- Функция `getUserPlacemarks` получает метки текущего пользователя и добавляет к ним изображения из хранилища.

```javascript
import { useCookie } from '#app';
import { useAuth } from '@composables/useAuth';
import { useImageStore } from '@composables/useImageStore';

export function useEvents() {
  const { currentUser } = useAuth();
  const { saveImage, getImage } = useImageStore();
  
  const placemarks = useCookie('user_placemarks', {
    default: () => ({}),
    sameSite: 'strict',
    path: '/',
    maxAge: 172800
  });

  const saveUserPlacemarks = async (userPlacemarks) => {
    if (!currentUser.value) return;

    const placemarksWithoutImages = userPlacemarks.map(placemark => {
      if (placemark.img) {
        saveImage(placemark.id, placemark.img);
      }
      const { img, ...placemarkWithoutImage } = placemark;
      return placemarkWithoutImage;
    });

    const username = currentUser.value.name;
    placemarks.value = { 
      ...placemarks.value,
      [username]: placemarksWithoutImages
    };
  };

  const getUserPlacemarks = () => {
    if (!currentUser.value) return [];
    
    const username = currentUser.value.name;
    return (placemarks.value[username] || []).map(placemark => ({
      ...placemark,
      img: getImage(placemark.id)
    }));
  };

  return { getUserPlacemarks, saveUserPlacemarks };
}
```

## Описание компонента `useImageStore.js`

Компонент `useImageStore.js` находится в папке `composables` и отвечает за управление изображениями меток. Он включает в себя функции для сохранения, получения и удаления изображений.

### Объяснение кода в `useImageStore.js`

- Функция `saveImage` сохраняет изображение в `localStorage` по идентификатору метки.
- Функция `getImage` получает изображение из `localStorage` по идентификатору метки.
- Функция `deleteImage` удаляет изображение из `localStorage` по идентификатору метки.

```javascript
export function useImageStore() {
  const saveImage = (id, imageData) => {
    localStorage.setItem(`placemark_image_${id}`, imageData);
  };

  const getImage = (id) => {
    return localStorage.getItem(`placemark_image_${id}`) || '';
  };

  const deleteImage = (id) => {
    localStorage.removeItem(`placemark_image_${id}`);
  };

  return {
    saveImage,
    getImage,
    deleteImage
  };
}
```

## Описание компонента `cookie.js`

Компонент `cookie.js` находится в папке `plugins`.

### Код в `cookie.js`

```javascript
import { defineNuxtPlugin } from '#app';
import Cookies from 'js-cookie';

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      cookies: Cookies
    }
  }
});
```

## Описание компонента `router.ts`

Компонент `router.ts` находится в папке `plugins`.

### Код в `router.ts`

```typescript
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:created", () => {
    const router = useRouter();
    router.options.scrollBehavior = (to, from, savedPosition) => {
      if (to.hash) {
        const element = document.querySelector(to.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          return false; // отменяем стандартное поведение
        }
      }
      return { top: 0, behavior: "smooth" };
    };
  });
});
```

## Описание компонента `nuxt.config.ts`

Компонент `nuxt.config.ts` находится в папке проекта.

### Код в `nuxt.config.ts`

```typescript
import { resolve } from 'path'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['nuxt-svgo'],
  alias: {
    '@color' : resolve(__dirname, 'assets/color.sass'),
    '@mixin' : resolve(__dirname, 'assets/mixin.sass'),
    '@global' : resolve(__dirname, 'assets/global.sass'),
    '@fonts' : resolve(__dirname, 'assets/fonts.sass'),
    '@composables' : resolve(__dirname, '/composables'),
    '@services' : resolve(__dirname, '/services'),
    '@utils' : resolve(__dirname, '/utils'),
  },

  app: {
    head: {
      script: [
        {
          src: 'https://api-maps.yandex.ru/2.1/?apikey=8c153f10-4f81-4adc-bf29-7321c5d48ce3&lang=ru_RU',
          async: true,
        }
      ],
      title: 'Umap',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
          sizes: 'any'
        },
      ]
    }
  },
  svgo: {
    autoImportPath: "./assets/icons/",
    componentPrefix: "Icon",
    svgoConfig: {
      plugins: [
        { 
          name: 'preset-default',
          params: {
            overrides: {
              removeViewBox: false,
            }
          }
        }
      ]
    }
  },
})
```

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install

## Development Server

Start the development server on http://localhost:3000:

# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev

## Production

Build the application for production:

# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build

Locally preview production build:

# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.