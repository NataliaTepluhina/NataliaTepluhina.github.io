<template>
    <div>
        <h2>Quotes Added</h2>
        <div class="progress">
            <div class="progress-bar" role="progressbar" aria-valuenow="70"
                 aria-valuemin="0" aria-valuemax="100" :style="{ width: quotesLength / maxQuotes * 100 + '%' }">
                {{ quotesLength }}/{{ maxQuotes }}
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        props: ['quotesLength', 'maxQuotes']
    }

</script>

<style>

</style>