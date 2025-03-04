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