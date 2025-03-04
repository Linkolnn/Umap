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
    min-height: 70vh

</style>