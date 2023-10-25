<template>
    <section class="sale">
        <div class="container">
            <div class="sale-wrapper">
                <div class="sale-left">
                    <h3 class="sale-title">SALE <span>от 20%</span></h3>
                    <p class="sale-txt">Магазин CARDINAR предлагает скидки для своих клиентов, на различные модели
                        авточехлов, поликом и накидок на торпеду</p>
                    <a class="sale-btn" href="#!">
                        <div class="sale-btn__text">
                            <p>смотреть</p>
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