<template>
    <div class="seat-view">
        <Navbar></Navbar>
        <Info></Info>
    </div>
</template>

<script>
import Navbar from '@/components/TheNavbar.vue'
import Info from '@/components/InfoComponent.vue'
import Popular from '@/components/Popular.vue'
import Help from '@/components/Help.vue'
import Footer from '@/components/Footer.vue'
import Sale from '@/components/Sale.vue'
export default {
    components: {
        Navbar,
        Popular,
        Help,
        Footer,
        Sale,
        Info
    }
}
</script>
</script>

<style></style>