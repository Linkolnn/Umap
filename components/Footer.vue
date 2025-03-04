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
    flex-direction: column
    justify-content: space-between
    gap: 10px
    padding: 20px

.footer__logo-link
    width: max-content

.footer__logo-icon 
    width: 25px
    height: 25px
    transform: translateX(10%)

</style>