<script setup lang="ts">
const route = useRoute()
const postId = computed(() => route.params.id as string)

const { fetchPost, fetchComments, fetchUser } = usePosts()

const {
  data: postData,
  status: postStatus,
  error: postError,
  refresh: refreshPost,
} = await fetchPost(postId.value)

const post = computed(() => postData.value?.post)

const {
  data: commentsData,
  status: commentsStatus,
  error: commentsError,
} = await fetchComments(postId.value)

const comments = computed(() => commentsData.value?.comments ?? [])

const authorId = postData.value?.post?.userId
const {
  data: userData,
  status: userStatus,
} = await fetchUser(authorId ?? 1)

const author = computed(() => userData.value?.user)

useSeoMeta({
  title: () => post.value?.title ?? 'Post não encontrado',
  description: () => post.value?.body?.substring(0, 160) ?? '',
})

const isLoading = computed(() =>
  [postStatus, commentsStatus, userStatus].some((s) => s.value === 'pending')
)
</script>

<template>
  <div class="min-h-screen bg-default">
    <header class="border-b border-default bg-elevated">
      <div class="container mx-auto px-4 py-4">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-muted hover:text-default transition-colors"
        >
          <UIcon name="i-lucide-arrow-left" class="size-4" />
          <span>Voltar para posts</span>
        </NuxtLink>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8 max-w-3xl">
      <div v-if="isLoading" class="space-y-6">
        <USkeleton class="h-8 w-3/4" />
        <div class="flex items-center gap-3">
          <USkeleton class="h-10 w-10 rounded-full" />
          <div class="space-y-2">
            <USkeleton class="h-4 w-32" />
            <USkeleton class="h-3 w-24" />
          </div>
        </div>
        <USkeleton class="h-40 w-full" />
        <USkeleton class="h-6 w-32" />
        <div class="space-y-4">
          <USkeleton v-for="i in 3" :key="i" class="h-24 w-full" />
        </div>
      </div>

      <UAlert
        v-else-if="postError"
        color="error"
        icon="i-lucide-alert-circle"
        title="Erro ao carregar o post"
        :description="postError.message"
      >
        <template #actions>
          <UButton
            color="error"
            variant="outline"
            icon="i-lucide-refresh-cw"
            label="Tentar novamente"
            @click="refreshPost()"
          />
        </template>
      </UAlert>

      <UAlert
        v-else-if="!post"
        color="warning"
        icon="i-lucide-file-question"
        title="Post não encontrado"
        description="O post solicitado não existe ou foi removido."
      >
        <template #actions>
          <UButton
            color="neutral"
            variant="outline"
            icon="i-lucide-home"
            label="Voltar para home"
            to="/"
          />
        </template>
      </UAlert>

      <article v-else class="space-y-8">
        <header class="space-y-4">
          <UBadge color="primary" variant="subtle">
            Post #{{ post.id }}
          </UBadge>
          <h1 class="text-3xl font-bold text-default capitalize">
            {{ post.title }}
          </h1>

          <div v-if="author" class="flex items-center gap-3">
            <UAvatar
              :alt="author.name"
              size="md"
              icon="i-lucide-user"
            />
            <div>
              <p class="font-medium text-default">
                {{ author.name }}
              </p>
              <p class="text-sm text-muted">
                @{{ author.username }}
              </p>
            </div>
          </div>
        </header>

        <div class="prose prose-neutral max-w-none">
          <p class="text-default leading-relaxed whitespace-pre-line">
            {{ post.body }}
          </p>
        </div>

        <USeparator />

        <section class="space-y-6">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-message-circle" class="size-5 text-muted" />
            <h2 class="text-xl font-semibold text-default">
              Comentários ({{ comments.length }})
            </h2>
          </div>

          <UAlert
            v-if="commentsError"
            color="warning"
            icon="i-lucide-alert-triangle"
            title="Erro ao carregar comentários"
            :description="commentsError.message"
          />

          <div v-else-if="comments.length > 0" class="space-y-4">
            <UCard
              v-for="comment in comments"
              :key="comment.id"
              class="bg-muted/30"
            >
              <div class="space-y-3">
                <div class="flex items-start justify-between gap-4">
                  <div class="flex items-center gap-3">
                    <UAvatar
                      :alt="comment.name"
                      size="sm"
                      icon="i-lucide-user"
                    />
                    <div class="min-w-0">
                      <p class="font-medium text-default text-sm line-clamp-1">
                        {{ comment.name }}
                      </p>
                      <p class="text-xs text-muted">
                        {{ comment.email }}
                      </p>
                    </div>
                  </div>
                </div>
                <p class="text-muted text-sm leading-relaxed">
                  {{ comment.body }}
                </p>
              </div>
            </UCard>
          </div>

          <UAlert
            v-else
            color="neutral"
            icon="i-lucide-message-square-off"
            title="Sem comentários"
            description="Este post ainda não possui comentários."
          />
        </section>
      </article>
    </main>
  </div>
</template>
