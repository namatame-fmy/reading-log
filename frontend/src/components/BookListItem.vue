<script setup lang="ts">
import type { Book } from '@/types/book'

defineProps<{
  book: Book
}>()

const emit = defineEmits<{
  delete: [id: string]
}>()
</script>

<template>
  <li class="book-item">
    <div class="book-item__header">
      <h3 class="book-item__title">{{ book.title }}</h3>
      <button type="button" class="book-item__delete" @click="emit('delete', book.id)">削除</button>
    </div>
    <p class="book-item__meta">
      <span class="book-item__author">{{ book.author }}</span>
      <span class="book-item__date">{{ book.finishedDate }}</span>
    </p>
    <p class="book-item__review">{{ book.review }}</p>
  </li>
</template>

<style scoped>
.book-item {
  list-style: none;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

.book-item__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.book-item__title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.book-item__meta {
  display: flex;
  gap: 1rem;
  color: var(--color-text);
  opacity: 0.7;
  font-size: 0.9rem;
}

.book-item__review {
  margin-top: 0.5rem;
  white-space: pre-wrap;
}
</style>
