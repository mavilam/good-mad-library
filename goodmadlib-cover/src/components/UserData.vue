<template>
  <div class="userdata">
    <fulfilling-square-spinner
      :animation-duration="1000"
      :size="100"
      :color="'#235c4d'"
    />
  </div>
</template>

<script>
import axios from 'axios'
import { FulfillingSquareSpinner } from 'epic-spinners'

export default {
  name: 'Userdata',
  components: {
    FulfillingSquareSpinner
  },
  data() {
    return {
      userData: undefined
    }
  },
  watch: {
    userData: function() {
      console.log(JSON.stringify(this.userData))
      if (this.userData.id) this.$router.push({ path: `/books/${this.userData.id}` })
    }
  },
  mounted() {
    axios.get('/user-data')
      .then(res => {
        this.userData = res.data
      })
      .catch(err => {
        console.log(err)
        this.$router.push({ path: `/error` })
      })
  }
}
</script>

<style scoped>
  .userdata {
    text-align: center;
    max-width: 100px;
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
