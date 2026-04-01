import type { FetchError } from 'ofetch'
import type { Post, Comment, User } from '~/types/post'

const API_BASE = 'https://jsonplaceholder.typicode.com'
const CACHE_MAX_AGE = 5 * 60 * 1000

type PostsPayload = { posts: Post[]; fetchedAt: string }
type PostPayload = { post: Post; fetchedAt: string }
type CommentsPayload = { comments: Comment[]; fetchedAt: string }
type UserPayload = { user: User; fetchedAt: string }

function getCachedData(
  key: string,
  nuxtApp: ReturnType<typeof useNuxtApp>
) {
  const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key] as
    | { fetchedAt: string }
    | undefined
  if (!data?.fetchedAt) return null
  if (Date.now() - new Date(data.fetchedAt).getTime() > CACHE_MAX_AGE) {
    return null
  }
  return data
}

export function usePosts() {
  const nuxtApp = useNuxtApp()
  const cache = (key: string) => getCachedData(key, nuxtApp)

  const fetchPosts = () =>
    useFetch<Post[], FetchError, string, 'get', Post[], PostsPayload>(
      `${API_BASE}/posts`,
      {
        key: 'posts-list',
        getCachedData: cache,
        transform(posts) {
          return { posts, fetchedAt: new Date().toISOString() }
        },
      }
    )

  const fetchPost = (id: number | string) =>
    useFetch<Post, FetchError, string, 'get', Post, PostPayload>(
      `${API_BASE}/posts/${id}`,
      {
        key: `post-${id}`,
        getCachedData: cache,
        transform(post) {
          return { post, fetchedAt: new Date().toISOString() }
        },
      }
    )

  const fetchComments = (postId: number | string) =>
    useFetch<
      Comment[],
      FetchError,
      string,
      'get',
      Comment[],
      CommentsPayload
    >(`${API_BASE}/posts/${postId}/comments`, {
      key: `post-${postId}-comments`,
      getCachedData: cache,
      transform(comments) {
        return { comments, fetchedAt: new Date().toISOString() }
      },
    })

  const fetchUser = (userId: number | string) =>
    useFetch<User, FetchError, string, 'get', User, UserPayload>(
      `${API_BASE}/users/${userId}`,
      {
        key: `user-${userId}`,
        getCachedData: cache,
        transform(user) {
          return { user, fetchedAt: new Date().toISOString() }
        },
      }
    )

  return {
    fetchPosts,
    fetchPost,
    fetchComments,
    fetchUser,
  }
}
