<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import { Image } from "astro:assets";

import redberry from '@lib/redberry'
import type { Article } from '@typings/article'

const props = defineProps<{
  contentlist: { total: number; items: Article[] }
}>()

const articles = ref<Article[]>(props.contentlist.items)

const page = ref(1)
const isLoading = ref(false)

const loadMore = async () => {
  isLoading.value = true
  page.value++

  const nextPage = await redberry.fetchContentlist(
    [
      {
        fieldName: 'type',
        value: 'Article'
      }
    ],
    page.value
  )
  isLoading.value = false

  articles.value = [...articles.value, ...nextPage.items]
}
</script>

<template>
    <div class="flex flex-col gap-2">
        <div class="grid grid-cols-2 gap-2">
          <div v-for="article in articles" :key="`content-card-${article.id}`">
            <img v-if="article.content.featuredImage" :src="article.content.featuredImage?.url" :alt="article.content.featuredImage.title" />
            {{ article.content.title[0].content }}
          </div>
        </div>
        <Button v-if="!isLoading" label="Load more" @click="loadMore" />
        <div v-if="isLoading">Wird geladen</div>
    </div>


</template>
