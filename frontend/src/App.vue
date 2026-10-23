<script setup lang="ts">
import { useTemplateRef } from 'vue'
import BookForm from './components/BookForm.vue'
import BookList from './components/BookList.vue'
import { useBooks } from './composables/useBooks'
import type { BookInput } from './types/book'

const { books, addBook, removeBook, errorMessage } = useBooks()
const bookForm = useTemplateRef('bookForm')

/** 保存に成功したときだけフォームを空にする（失敗時は入力を残して再送信できるようにする） */
function handleSubmit(input: BookInput): void {
  if (addBook(input)) {
    bookForm.value?.reset()
  }
}
</script>

<template>
  <header>
    <h1>読書記録</h1>
  </header>

  <main class="main">
    <p v-if="errorMessage" class="error" role="alert">{{ errorMessage }}</p>
    <BookForm ref="bookForm" @submit="handleSubmit" />
    <BookList :books="books" @delete="removeBook" />
  </main>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.error {
  padding: 0.75rem 1rem;
  border: 1px solid #d33;
  border-radius: 4px;
  color: #b00;
  background: #fff0f0;
}
</style>
