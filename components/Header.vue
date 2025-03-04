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