<template>
  <div class="books-app">
    <div class="search-container">
      <input placeholder="Search for your favourite book" class="books-app-search" type="text" v-model="searchText">
    </div>
    
    <transition appear name="fade" mode="out-in">
      <div v-if="searchState === 0" class="image-holder">
        <img src="~../assets/bg.jpg" width="400">
        <span>A book is a gift you can open again and again.</span>
      </div>
      <Booklist v-else-if="searchState === 1" v-bind:books="books" v-bind:showPage="showPage" v-bind:lastPage="lastPage"></Booklist>      
      <div v-else class="no-results">
        <span>No results to be displayed. Try some suggestions:</span>
        <a href="#" v-on:click="searchText = 'The Lord of the rings'">The Lord of the rings</a>
        <a href="#" v-on:click="searchText = 'Harry potter'">Harry potter</a>
        <a href="#" v-on:click="searchText = 'Narnia'">Narnia</a>
      </div>
    </transition>
  </div>
</template>

<script>
import Booklist from '@/components/Booklist.vue'

export default {
  name: 'Bookapp',
  components: {
    Booklist
  },
  data () {
    return {
      searchText: "",
      books: null,
      pageLimit: 10,
      lastPage: null,
      showPage: null
    }
  },
  computed: {
    searchState: function() {
      var _this = this;
      if((_this.searchText.trim() == "") || (!_this.books)) {
        return 0;
      } else if(_this.books.length != 0) {
        return 1
      } else {
        return 2;
      }
    }
  },
  created: function () {
    var _this = this;
    _this.$on('pageChange', _this.getBooks);
  },
  mounted: function() {
    var _this = this;

    _this.$el.querySelector('input').focus();
  },
  methods: {
    getBooks: function (page) {
      var _this = this;

      var startIndex = 0;
      if(page != 1) {
        startIndex = (page * _this.pageLimit) - 11;
      }

      var data = {
        q: _this.searchText,
        key: 'AIzaSyD9k3AYOy1wm26IBQ2KxRk6OchttI1fDoY',
        startIndex: startIndex
      };
      var url = new URL('https://www.googleapis.com/books/v1/volumes');
      Object.keys(data).forEach(key => url.searchParams.append(key, data[key]));
      _this.serverCall('GET', url, _this.loadBooks);
    },
    loadBooks: function(result) {
      var _this = this;
      var totalResults = result.totalItems;
      // _this.lastPage = (totalResults % _this.pageLimit)? (Math.floor(totalResults / _this.pageLimit) + 1) : (Math.floor(totalResults / _this.pageLimit));
      _this.books = [];   
      if((result.items && (result.items.length != 0))) {
        result.items.forEach(function(book) {
          _this.books.push(book);
        });
      }
    },
    serverCall: function (method, url, callback) {
      var _this = this;
      var x = fetch(url, {
        method: method,
      }).then(function(response) {
        return response.json();
      }).then(function(json) { 
        callback(json);
      })
    }
  },
  watch: {
    searchText: function(newValue) {
      var _this = this;

      _this.showPage = "refresh";
      _this.$nextTick(function() {
        _this.showPage = 1;
      })

      if(_this.timeout) {
        clearTimeout(_this.timeout);
      }
      _this.timeout = setTimeout(function() {
        if(newValue.trim() != "") {
          _this.getBooks(1);
        } else {
          _this.books = null;
        }                   
      }, 300);                          
        
    }
  }
}
</script>

<style scoped>
.books-app {
  position: relative;
  margin: 0 auto;
  margin-top: 25px;
  width: 800px;
}

.books-app-search {
  display: inline-block;
  width: calc(100% - 30px);
  margin: 0px 15px;
  line-height: 36px;
  font-size: 18px;
  margin-bottom: 50px;
}

.image-holder {
  display: inline-block;
  width: 100%;
  text-align: center;
}

.image-holder img {
  display:block;
  margin:auto;
  margin-bottom: 60px;
}

.image-holder span {
  margin-bottom: 40px;
  padding: 10px 40px;
  background: #DDD;
}

.search-intro, .no-results {
  padding: 15px;
}

.no-results > * {
  display: block;
}

.no-results > span {
  line-height: 24px;
  margin-bottom: 20px;
} 
</style>
