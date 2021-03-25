<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
  html {
    margin: 2em;
    background: #46b99a;
    background: linear-gradient(135deg, #42c2b5 0%, #46b99a 100%);
    background-position: center 0;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    -moz-background-size: cover;
    -ms-background-size: cover;
    color: #235c4d;
    font-family: 'Roboto', sans-serif;
  }

  h2 {
    text-align: center;
    font-size: 2.5em;
  }

  a {
    color: #235c4d;
  }

  button:hover {
    background: #235c4d;
    color: #46b99a;
  }

</style>
