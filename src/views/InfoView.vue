<template>
    <div class="InfoComponent">
        <InfoComponent></InfoComponent>
        <Popular></Popular>
        <Help></Help>
    </div>
</template>

<script>

import InfoComponent from '@/components/InfoComponent.vue'
import Popular from '@/components/Popular.vue'
import Help from '@/components/Help.vue'
export default {
    components: {
        InfoComponent,
        Popular,
        Help
    }
}
</script>

<style></style>