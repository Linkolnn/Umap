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
  