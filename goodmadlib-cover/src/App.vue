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
    background-color: #c3ccd3;
    color: #47646f;
    font-family: 'Roboto', sans-serif;
  }

  h2 {
    text-align: center;
    font-size: 2.5em;
  }

  a {
    color: #47646f;
  }

  button:hover {
    box-shadow: 0 2px 4px 0
    #1e383c,0 2px 4px 0 #1e383c;
  }

</style>
