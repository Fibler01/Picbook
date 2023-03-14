<template> 
    <div class="container"> 
        <slot></slot>  <!-- slot serve para colocar outras views dentro do nosso componente -->
    </div>
</template>

<style scoped>
.container {
    width: 80%;
    min-width: 740px;
    margin: 0 auto;
    align-content: center;
}
</style>