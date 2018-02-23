<template>
  <div class="book-paginated-search">
    <Pagination @pageChange="pageChange" v-bind:showPage="showPage" v-bind:lastPageNumber="lastPage">   
      <table class="book-list-table">
        <thead>
          <tr>
            <th style="width: 65%" class="text-wrap">Name of the book</th><th style="width: 35%" class="text-wrap">Author(s)</th>
          </tr>                
        </thead>
        <tbody>                                     
          <tr v-for="book in books" v-bind:key="book.title">
            <td style="width: 65%" class="title text-wrap"><a v-bind:href="book.volumeInfo.infoLink" target="_blank" v-text="book.volumeInfo.title"></a></td><td style="width: 35%" class="authore text-wrap" v-text="showAllAuthors(book.volumeInfo.authors)"></td>
          </tr>                   
        </tbody> 
      </table>
    </Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'Booklist',
  components: {
    Pagination
  },
  props: ['books', 'lastPage', 'showPage'],
  methods: {
    showAllAuthors: function(authors) {
      if(authors) {
        return authors.toString();
      } else {
        return 'Not Specified';
      }                    
    },
    pageChange: function(pageNo) {
      this.$parent.$emit('pageChange', pageNo);
    }
  }
}
</script>


<style scoped>

.book-paginated-search {
  display: inline-block;
  padding: 0px 10px;
  width: 100%;
}

.book-list-table {
  display: inline-block;
  width: 100%;
  text-align: left;
  margin-bottom: 25px;
}

.book-list-table thead, .book-list-table tbody {
  display: inline-block;
  width: 100%;
}

.book-list-table tr {
  display: inline-block;
  width: 100%;
}

.book-list-table th {
  display: inline-block;
  text-align: left;
  line-height: 45px;
}

.book-list-table tr {
  padding-bottom: 4px;
}

.book-list-table td {
  display: inline-block;
  font-size: 15px;
  line-height: 21px;
  padding-right: 20px;
}

.book-list-table td a {
  text-decoration: none;
}
</style>
