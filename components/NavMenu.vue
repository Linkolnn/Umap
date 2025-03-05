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