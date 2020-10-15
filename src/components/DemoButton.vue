<template>
  <div class="demo-button" @click="startRegister"><slot></slot></div>
</template>

<script>
export default {
  methods: {
    startRegister() {
      this.$emit('click')
    },
  },
}
</script>

<style scoped>
.demo-button {
  height: 50px;
  background-color: red;
  margin: 20px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
  border-radius: 25px;
}
</style>
