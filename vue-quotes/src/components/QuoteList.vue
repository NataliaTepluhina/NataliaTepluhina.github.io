<template>
    <div class="row">
        <quote v-for="(quote, index) in quotes" @click.native="deleteQuote(index)">
            {{ quote.text }}
        </quote>
    </div>
</template>

<script>
    import Quote from './Quote.vue'
    import { quoteBus } from '../main';
    export default {
        props: ['quotes'],
        components: {
            quote: Quote,
        },
        methods: {
            deleteQuote(index) {
                quoteBus.$emit('quoteDeleted', index)
            }
        },
    }
</script>

<style scoped>

</style>