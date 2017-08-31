<template>
    <div class="container">
        <progress-bar :quotesLength="quotes.length" :maxQuotes="maxQuotes"></progress-bar>
        <add-quote :quotesLength="quotes.length" :maxQuotes="maxQuotes"></add-quote>
        <quote-list :quotes="quotes"></quote-list>
        <div class="row">
            <div class="col-sm-12 text-center">
                <div class="alert alert-info">Info: Click on a Quote to delete it</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Progress from './components/Progress.vue'
    import AddQuote from './components/AddQuote.vue'
    import QuoteList from './components/QuoteList.vue'
    import { quoteBus } from './main'
    export default {
        components: {
            progressBar: Progress,
            addQuote: AddQuote,
            quoteList: QuoteList
        },
        data() {
            return {
                quotes: [
                    {text: 'Feel free to add your quotes!'},
                ],
                maxQuotes: 10
            }
        },
        created() {
            quoteBus.$on('quoteAdded', (quote) => {
                this.quotes.push({text: quote});
            });
            quoteBus.$on('quoteDeleted', (index) => {
                this.quotes.splice(index, 1);
            });
        }
    }
</script>

<style>
</style>
