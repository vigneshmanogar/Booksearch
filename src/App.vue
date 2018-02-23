<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Merriweather:400,400i,700');

* {
  box-sizing: border-box;
}

body {
  padding: 0px;
  margin: 0px;
}

::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  font-family: 'Merriweather', serif;
}

#app {
  font-family: 'Merriweather', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  display: inline-block;
  width: 100%;
  min-height: 100vh;
  color: #333;
}

button {
  font-family: 'Merriweather', serif;
  display: inline-block;
  vertical-align: top;
  background: transparent;
  border: 0px;
  height: 34px;
  width: 60px;
  margin: 0px 5px;
  text-align: center;
  color: #999;
  text-transform: capitalize;
}

button:hover {
  cursor: pointer;
}

input[type="text"] {
  font-family: 'Merriweather', serif;
  display: inline-block;
  line-height: 30px;
  padding: 0px 8px;
}

input[type="text"]:focus {
  outline: none;
}

::-webkit-input-placeholder {
  font-family: 'Merriweather', serif;
}

.text-wrap {
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: nowrap;
  overflow: hidden;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
