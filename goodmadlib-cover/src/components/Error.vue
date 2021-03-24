<template>
  <div class="error">
    <h1 class="text-2xl">
      Ups 😥 estoy sufriendo un error
    </h1>
    <h1 class="text-2xl">
      Prueba a volver a empezar.
    </h1>
    <br>
    <button
      class="bg-transparent font-bold py-2 px-4 border-2 rounded"
      @click="goToInit()"
    >
      Volver al inicio
    </button>
  </div>
</template>

<script>
export default {
  name: 'Error',
  methods: {
    goToInit() {
      window.location.href = "/good-mad-library/"
    }
  }
}
</script>

<style scoped>
  .error {
    text-align: center;
    margin: auto;
    max-height: 100px;
    margin: auto;
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
