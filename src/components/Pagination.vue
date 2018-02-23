<template>
  <div class="pagination-container">
    <div class="pagination-content"><slot></slot></div>
    <div class="pagination-options">
      <span v-on:click="pagination('first')">first</span>
      <span v-on:click="pagination('prev')">prev</span>
      <span v-for="item in currentBatch" v-bind:key="item" v-text="item" v-on:click="pagination(item)" v-bind:class="{ 'current-page': (currentPage == item) }"></span>
      <span v-show="checkMove" v-on:click="pagination('move')">...</span>
      <span v-on:click="pagination('next')">next</span>
      <span v-show="checkLast" v-on:click="pagination('last')">last</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    lastPageNumber: {
      default: null
    },
    showPage: {
      default: null
    }
  },
  data: function () {
    var _this = this; 

    return {
      currentPage: _this.showPage,
      toShow: 5,
      onReset: false
    }
  },
  computed: {
    lastPage: function() {
      if(this.lastPageNumber) {
          return parseInt(this.lastPageNumber);
      } else {
          return null;
      }
    },
    currentBatch: function () {
      var  currentBatch = [];
      var show = this.toShow;
      var start = this.currentPage - (Math.floor(show / 2));
      start = (start <= 0)? 1 : start;
      var end = start + (this.toShow - 1);
      if(this.lastPage) {
          end = (this.lastPage < end)? this.lastPage : end; 
      }

      while(end >= start) {
          currentBatch.unshift(end);
          end--;
      }

      return currentBatch;
    },
    checkLast: function() {
      var show = true;

      if(!this.lastPage) {
          show = false;
      }

      return show;
    },
    checkMove: function() {
      var show = true;

      if(this.lastPage) {
          if(this.currentBatch.indexOf(this.lastPage) >= 0) {
              show = false;
          }
      }

      return show;
    }
  },
  methods: {
    pagination: function (key) {
      switch (key) {
        case "first":
          this.loadFirstPage()
          break;
        case "prev":
          this.loadPreviousPage()
          break;
        case "next":
          this.loadNextPage()
          break;
        case "last":
          this. loadLastPage()
          break;
        case "move":
          this.loadNextBunch()
          break;
        default:
          this.loadPage(key)
          break;
      }
    },
    loadPreviousPage: function () {
      if(this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
      }
    },
    loadNextPage: function () {
      if(!this.lastPage || (this.currentPage < this.lastPage)) {
        this.currentPage = this.currentPage + 1;
      }
    },
    loadNextBunch: function () {
      if(!this.lastPage || (this.currentPage < this.lastPage)) {
        this.currentPage = this.currentPage + (Math.floor(this.toShow / 2));
      }
    },
    loadPage: function (key) {
      this.currentPage = key;
    },
    loadFirstPage: function() {
      this.currentPage = 1;
    },
    loadLastPage: function() {
      if(!this.lastPage) {
        this.lastPage = this.currentBatch[this.currentBatch.length - 1];
      } 
      this.currentPage = this.lastPage;
    },
    reset: function() {
      this.onReset = true;
      this.currentPage = 1;
      this.onReset = false;  
    }
  },
  watch: {
    currentPage: function(page) {
      if(!this.onReset) {
        this.$emit('pageChange', page);
      }          
    },
    showPage: function(pageNo) {
      if(pageNo == "refresh") {
        this.reset();
      } else {
        this.currentPage = pageNo;
      }
      
    }
  }
};
</script>

<style scoped>
.pagination-options > span {
  position: relative;
  float: left;

  min-width: 24px;
  text-align: center;
  padding: 5px;
  margin:  0px 2px;
  line-height: 18px;
  border: 1px solid #DDD;
  font-size: 12px;
}

.pagination-options > span.current-page {
  font-weight: 700;
  border: 1px solid #AAA;
}

.pagination-options > span:hover {
  cursor: pointer;
}
</style>
