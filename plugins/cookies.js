import { defineNuxtPlugin } from '#app';
import Cookies from 'js-cookie';

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      cookies: Cookies
    }
  }
});