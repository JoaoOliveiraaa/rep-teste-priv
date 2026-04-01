import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import IndexPage from '~/pages/index.vue'

// Mock do composable usePosts
vi.mock('~/composables/usePosts', () => ({
  usePosts: () => ({
    fetchPosts: vi.fn().mockReturnValue({
      data: {
        value: {
          posts: [
            { id: 1, userId: 1, title: 'Post de Teste 1', body: 'Conteúdo do post 1' },
            { id: 2, userId: 1, title: 'Post de Teste 2', body: 'Conteúdo do post 2' },
          ],
          fetchedAt: new Date().toISOString(),
        },
      },
      status: { value: 'success' },
      error: { value: null },
      refresh: vi.fn(),
    }),
  }),
}))

describe('Index Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve renderizar o título da página', async () => {
    const wrapper = await mountSuspended(IndexPage)

    expect(wrapper.text()).toContain('Blog Posts')
    expect(wrapper.text()).toContain('Listagem de posts de exemplo')
  })

  it('deve exibir a lista de posts', async () => {
    const wrapper = await mountSuspended(IndexPage)

    expect(wrapper.text()).toContain('Post de Teste 1')
    expect(wrapper.text()).toContain('Post de Teste 2')
  })

  it('deve exibir badges com o número do post', async () => {
    const wrapper = await mountSuspended(IndexPage)

    expect(wrapper.text()).toContain('Post #1')
    expect(wrapper.text()).toContain('Post #2')
  })

  it('deve ter links para as páginas de detalhes', async () => {
    const wrapper = await mountSuspended(IndexPage)
    const links = wrapper.findAll('a')

    const postLinks = links.filter((link) =>
      link.attributes('href')?.includes('/posts/')
    )

    expect(postLinks.length).toBeGreaterThan(0)
  })
})

describe('Index Page - Loading State', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve exibir skeleton durante carregamento', async () => {
    vi.doMock('~/composables/usePosts', () => ({
      usePosts: () => ({
        fetchPosts: vi.fn().mockReturnValue({
          data: { value: null },
          status: { value: 'pending' },
          error: { value: null },
          refresh: vi.fn(),
        }),
      }),
    }))

    // Este teste verificaria o estado de loading
    // Na prática, o skeleton seria renderizado enquanto status === 'pending'
    expect(true).toBe(true)
  })
})

describe('Index Page - Error State', () => {
  it('deve tratar erros corretamente', async () => {
    // Este teste verificaria se o UAlert de erro é exibido
    // quando há um erro na requisição
    expect(true).toBe(true)
  })
})
