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
            <button class="btn font-button form__input" type="submit">
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
  transition: 0.5s ease


@include mobile
  .form
    width: 350px

</style>