<template>
    <section class="sale">
        <div class="container">
            <div class="sale-wrapper">
                <div class="sale-left">
                    <h3 class="sale-title">SALE <span>от 20%</span></h3>
                    <p class="sale-txt">{{$t('saleText')}}</p>
                    <a class="sale-btn" href="#!">
                        <div class="sale-btn__text">
                            <p>{{$t('look')}}</p>
                            <div class="sale-icon">
                                <i class="far fa-long-arrow-right arrow-right"></i>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="sale-right">
                    <img :src="hero" alt="">
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
data: () => ({
    hero: require('@/assets/img/sale/hero.svg')
})
}
</script>

<style></style>