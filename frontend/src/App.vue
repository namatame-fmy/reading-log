<script setup lang="ts">
import BookForm from './components/BookForm.vue'
import BookList from './components/BookList.vue'
import { useBooks } from './composables/useBooks'

const { books, addBook, removeBook } = useBooks()
</script>

<template>
  <header>
    <h1>読書記録</h1>
  </header>

  <main class="main">
    <BookForm @submit="addBook" />
    <BookList :books="books" @delete="removeBook" />
  </main>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
