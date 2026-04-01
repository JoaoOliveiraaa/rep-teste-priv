<script setup lang="ts">
useSeoMeta({
  title: 'Posts',
  description: 'Listagem de posts de exemplo.',
})

const { fetchPosts } = usePosts()
const { data, status, error, refresh } = await fetchPosts()

const posts = computed(() => data.value?.posts ?? [])
</script>

<template>
  <div class="min-h-screen bg-default">
    <header class="border-b border-default bg-elevated">
      <div class="container mx-auto px-4 py-6">
        <h1 class="text-3xl font-bold text-default">
          Blog Posts
        </h1>
        <p class="mt-2 text-muted">
          Listagem de posts de exemplo
        </p>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <div v-if="status === 'pending'" class="space-y-4">
        <div v-for="i in 5" :key="i">
          <USkeleton class="h-32 w-full rounded-lg" />
        </div>
      </div>

      <UAlert
        v-else-if="error"
        color="error"
        icon="i-lucide-alert-circle"
        title="Erro ao carregar posts"
        :description="error.message"
      >
        <template #actions>
          <UButton
            color="error"
            variant="outline"
            icon="i-lucide-refresh-cw"
            label="Tentar novamente"
            @click="refresh()"
          />
        </template>
      </UAlert>

      <UAlert
        v-else-if="posts.length === 0"
        color="neutral"
        icon="i-lucide-inbox"
        title="Nenhum post encontrado"
        description="Não há posts disponíveis no momento."
      />

      <div v-else class="grid gap-4">
        <NuxtLink
          v-for="post in posts"
          :key="post.id"
          :to="`/posts/${post.id}`"
          class="group"
        >
          <UCard
            class="transition-all duration-200 hover:shadow-lg hover:border-primary"
          >
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1 min-w-0">
                <UBadge color="primary" variant="subtle" size="sm" class="mb-2">
                  Post #{{ post.id }}
                </UBadge>
                <h2
                  class="text-lg font-semibold text-default group-hover:text-primary transition-colors line-clamp-1"
                >
                  {{ post.title }}
                </h2>
                <p class="mt-2 text-muted line-clamp-2">
                  {{ post.body }}
                </p>
              </div>
              <UIcon
                name="i-lucide-chevron-right"
                class="size-5 text-muted group-hover:text-primary transition-colors flex-shrink-0 mt-1"
              />
            </div>
          </UCard>
        </NuxtLink>
      </div>
    </main>
  </div>
</template>
