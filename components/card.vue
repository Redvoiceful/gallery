<template>
  <div class="price">
    <div class="price__count">
      <button type="button" class="price__count-plus" @click="addToCart(price)"> &#43;</button>
      <button type="button" class="price__count-minus" @click="removeFromCart(price)">&#8722;</button>
    </div>
    <div class="price__price">{{NumberWithSpaces(priceValue) + ' руб.'}}</div>
  </div>
</template>

<script lang="ts">

export default {
  name: "card",
  data(){
    return{
      price: 0,
    }
  },
  methods:{
    NumberWithSpaces(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    getRandomPrice(min, max) {
      let number = min + Math.random() * (max + 1 - min)
      return Math.floor( number);
    },
    addToCart(value){
      this.priceValue = value
      this.$emit('addToCart', this.priceValue)
    },
    removeFromCart(value){
      this.priceValue = value
      this.$emit('removeFromCart', this.priceValue)
    }
  },
  computed: {
    priceValue() {
      return this.price = this.getRandomPrice(1000, 60000)
    },
  }
}
</script>

<style lang="scss" scoped>
.price {
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__count {
    display: flex;
    &-plus,
    &-minus{
      cursor: pointer;
      border: none;
      background-color: inherit;
    }
  }
}

</style>