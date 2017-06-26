<template>
    <div class="not-found">
        <div class="not-found__text">{{text}}</div>
        <div>
            <button @click="goToIndex">Туда</button>
        </div>
    </div>
</template>

<script>
  import router from '@/router';
  export default {
    name: 'not-found',
    data () {
      return {
        text: 'Не там, где надо? Не беда! Кликай по кнопке)'
      }
    },
    methods: {
      goToIndex(){
        router.push({name: 'index'});
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .not-found {
        width: 100%;
        text-align: center;
    }

    .not-found__text {
        font-size: 20px;
    }

</style>
