<template> 
    <div class="container"> 
        <slot></slot>  <!-- slot serve para colocar outras views dentro do nosso componente -->
    </div>
</template>

<style scoped>
.container {
    width: 1000px;
    margin: 0 auto;
}
</style>