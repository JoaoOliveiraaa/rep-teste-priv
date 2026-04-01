import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

// Mock do useFetch
const mockUseFetch = vi.fn()

mockNuxtImport('useFetch', () => mockUseFetch)

describe('usePosts composable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('fetchPosts', () => {
    it('deve retornar a estrutura correta de dados', async () => {
      const mockPosts = [
        { id: 1, userId: 1, title: 'Post 1', body: 'Body 1' },
        { id: 2, userId: 1, title: 'Post 2', body: 'Body 2' },
      ]

      mockUseFetch.mockReturnValue({
        data: { value: { posts: mockPosts, fetchedAt: new Date().toISOString() } },
        status: { value: 'success' },
        error: { value: null },
        refresh: vi.fn(),
      })

      const { usePosts } = await import('~/composables/usePosts')
      const { fetchPosts } = usePosts()
      const result = await fetchPosts()

      expect(result.data.value).toBeDefined()
      expect(result.data.value?.posts).toEqual(mockPosts)
    })

    it('deve chamar useFetch com a URL correta', async () => {
      mockUseFetch.mockReturnValue({
        data: { value: null },
        status: { value: 'pending' },
        error: { value: null },
        refresh: vi.fn(),
      })

      const { usePosts } = await import('~/composables/usePosts')
      const { fetchPosts } = usePosts()
      await fetchPosts()

      expect(mockUseFetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/posts',
        expect.objectContaining({
          key: 'posts-list',
        })
      )
    })
  })

  describe('fetchPost', () => {
    it('deve buscar um post específico por ID', async () => {
      const mockPost = { id: 1, userId: 1, title: 'Post 1', body: 'Body 1' }

      mockUseFetch.mockReturnValue({
        data: { value: { post: mockPost, fetchedAt: new Date().toISOString() } },
        status: { value: 'success' },
        error: { value: null },
        refresh: vi.fn(),
      })

      const { usePosts } = await import('~/composables/usePosts')
      const { fetchPost } = usePosts()
      const result = await fetchPost(1)

      expect(result.data.value?.post).toEqual(mockPost)
    })

    it('deve usar a key correta para cache', async () => {
      mockUseFetch.mockReturnValue({
        data: { value: null },
        status: { value: 'pending' },
        error: { value: null },
        refresh: vi.fn(),
      })

      const { usePosts } = await import('~/composables/usePosts')
      const { fetchPost } = usePosts()
      await fetchPost(5)

      expect(mockUseFetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/posts/5',
        expect.objectContaining({
          key: 'post-5',
        })
      )
    })
  })

  describe('fetchComments', () => {
    it('deve buscar comentários de um post', async () => {
      const mockComments = [
        { id: 1, postId: 1, name: 'Comment 1', email: 'test@test.com', body: 'Body 1' },
        { id: 2, postId: 1, name: 'Comment 2', email: 'test2@test.com', body: 'Body 2' },
      ]

      mockUseFetch.mockReturnValue({
        data: { value: { comments: mockComments, fetchedAt: new Date().toISOString() } },
        status: { value: 'success' },
        error: { value: null },
        refresh: vi.fn(),
      })

      const { usePosts } = await import('~/composables/usePosts')
      const { fetchComments } = usePosts()
      const result = await fetchComments(1)

      expect(result.data.value?.comments).toEqual(mockComments)
    })

    it('deve chamar a URL correta para comentários', async () => {
      mockUseFetch.mockReturnValue({
        data: { value: null },
        status: { value: 'pending' },
        error: { value: null },
        refresh: vi.fn(),
      })

      const { usePosts } = await import('~/composables/usePosts')
      const { fetchComments } = usePosts()
      await fetchComments(3)

      expect(mockUseFetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/posts/3/comments',
        expect.objectContaining({
          key: 'post-3-comments',
        })
      )
    })
  })

  describe('fetchUser', () => {
    it('deve buscar informações do usuário', async () => {
      const mockUser = { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@test.com' }

      mockUseFetch.mockReturnValue({
        data: { value: { user: mockUser, fetchedAt: new Date().toISOString() } },
        status: { value: 'success' },
        error: { value: null },
        refresh: vi.fn(),
      })

      const { usePosts } = await import('~/composables/usePosts')
      const { fetchUser } = usePosts()
      const result = await fetchUser(1)

      expect(result.data.value?.user).toEqual(mockUser)
    })

    it('deve usar a URL e key corretas para usuário', async () => {
      mockUseFetch.mockReturnValue({
        data: { value: null },
        status: { value: 'pending' },
        error: { value: null },
        refresh: vi.fn(),
      })

      const { usePosts } = await import('~/composables/usePosts')
      const { fetchUser } = usePosts()
      await fetchUser(2)

      expect(mockUseFetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/users/2',
        expect.objectContaining({
          key: 'user-2',
        })
      )
    })
  })
})
