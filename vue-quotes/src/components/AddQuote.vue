<template>
    <div class="row">
        <div class="col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3">
            <div class="form-group">
                <label for="comment">Quote</label>
                <textarea class="form-control" rows="5" id="comment" v-model.trim="newQuote"></textarea>
                <button @click="addNewQuote(newQuote)" type="button" class="btn btn-primary center-block">Add Quote</button>
            </div>

        </div>
    </div>
</template>

<script>
    import { quoteBus } from '../main';
    export default {
        props: ['quotesLength', 'maxQuotes'],
        data() {
            return {
                newQuote: '',
            }
        },
        methods: {
            addNewQuote(quote) {
                if (this.quotesLength < this.maxQuotes) {
                    if (quote.replace(/^\s+|\s+$/g,"")) {
                        this.newQuote = '';
                        quoteBus.$emit('quoteAdded', quote);
                    }
                }
                else {
                    alert("You've reached quotes maximum!")
                }

            }
        }
    }
</script>

<style scoped>
    .btn {
        margin-top: 20px;
    }
</style>