<template>
    <div class="test">
        <h1 @click="msg = 'clicked'">{{ msg }}</h1>
    </div>
</template>

<script>
    export default {
        name: 'test',
        data: function () {
            return {
                msg2: 'test'
            };
        },
        computed: {
            msg ()
            {
                return this.$store.state.welcome;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="postcss">
    .test {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    * {
        color: #42b983;
    }
</style>
