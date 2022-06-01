<template>
  <div class="col-3 gallery col-9 col-12">
    <div class="gallery__card" v-for="(card, id) in photos" :key="id">
      <div class="gallery__card header">
        <div class="header__image">
          <img class="header__image-pic" :src="card.user.profile_image.medium">
        </div>
        <div class="header__info">
          <a :href="card.user.links.html" target="_blank" class="header__info-name">{{card.user.name}}</a>
          <a :href="card.user.links.html" target="_blank" class="header__info-link">{{ '@' + card.user.name}}</a>
        </div>
      </div>
      <div class="gallery__card content">
        <img class="content__image" :src="card.urls.regular">
      </div>
      <card class="gallery__card price"
            @addToCart="addToCart"
            @removeFromCart="removeFromCart"
      />
    </div>
  </div>
  <footer class="footer col-3 col-9 col-12">
    <pagination
        :total-pages="20"
        @change="changePage"
    />
    <div class="footer__basket">
      <img src="assets/image/basket.svg" alt="">
      <span class="footer__basket-count">{{NumberWithSpaces(totalValue)}}</span>
    </div>
  </footer>
</template>

<script setup lang="ts">

import {useFetch} from "nuxt/app";
import {computed, ref} from 'vue'


const ACCESS_KEY = 'hV1Kc-rM8pzxJwRGrl19Ev9cdu6O3R1_AxS4vR4i0ck'
let currentPage = ref(6)
const url = `https://api.unsplash.com/photos/`
let count = 0
let total = ref([])
const {data: photos, refresh, error} = await useFetch(() => `?client_id=${ACCESS_KEY}&page=${currentPage.value}`, {baseURL: url})

function changePage(page) {
  currentPage.value = page;
  refresh();
}

function NumberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function addToCart(value: any){
  count = value
  console.log(value)
  total.value.push(count)
}
function removeFromCart(value: any){
  count = value
  total.value.pop()
}
let totalValue = computed(() => {
  totalValue = total.value.reduce(function (prev, curr) {
    return prev + curr
  },0)
  return totalValue
})

</script>




<style lang="scss" scoped>
.gallery {
  flex: 1 1 auto;
  padding-top: 10px;
  &__card {
    padding-bottom: 8px;
    @media (min-width: 768px) {
      flex-basis: 40%;
      margin: 10px;
    }
  }
}

.header {
  display: flex;
  align-items: center;
  padding: 8px;
  &__image {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    &-pic {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  &__info{
    display: flex;
    flex-direction: column;
    &-name {
      font-weight: 700;
      font-size: 12px;
      color: rgba(51, 51, 51, 1);
      text-decoration: none;
      margin-bottom: 3px;
    }
    &-link {
      font-weight: 400;
      font-size: 12px;
      color: rgba(141, 141, 141, 1);
      text-decoration: none;
    }
  }
}

.content {
  margin: 0 0 20px 0;
  padding: 0 0 58% 0;
  overflow: hidden;
  position: relative;
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }
}
.price {
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__count {
    display: flex;
    &-plus,
    &-minus{
      border: none;
      background-color: inherit;
    }
  }
}
.footer {
  background-color: rgba(0, 0, 0, .9);
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  &__basket {
    display: flex;
    align-items: center;
    &-count {
      font-weight: 400;
      font-size: 14px;
      color: rgba(141, 141, 141, 1);
      margin-left: 5px;
    }
  }
}
</style>