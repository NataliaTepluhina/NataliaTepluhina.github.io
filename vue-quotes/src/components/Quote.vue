<template>
    <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="panel panel-default">
            <div class="panel-body quote text-center">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>


</script>

<style>
    .panel-body {
        font-family: 'Arizonia';
        font-size: 24px;
        font-weight: bold;
        color: #6e6e6e;
    }

    .quote {
        cursor: pointer;
        overflow: hidden;
    }

    .quote:hover {
        background-color: #e6e6fa
    }
</style>