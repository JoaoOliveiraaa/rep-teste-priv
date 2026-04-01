import { describe, it, expect } from 'vitest'
import type { Post, Comment, User } from '~/types/post'

describe('Post Types', () => {
  describe('Post interface', () => {
    it('deve aceitar um objeto Post válido', () => {
      const post: Post = {
        id: 1,
        userId: 1,
        title: 'Título do Post',
        body: 'Conteúdo do post aqui',
      }

      expect(post.id).toBe(1)
      expect(post.userId).toBe(1)
      expect(post.title).toBe('Título do Post')
      expect(post.body).toBe('Conteúdo do post aqui')
    })

    it('deve ter todas as propriedades obrigatórias', () => {
      const post: Post = {
        id: 100,
        userId: 5,
        title: 'Outro título',
        body: 'Outro conteúdo',
      }

      expect(Object.keys(post)).toHaveLength(4)
      expect(post).toHaveProperty('id')
      expect(post).toHaveProperty('userId')
      expect(post).toHaveProperty('title')
      expect(post).toHaveProperty('body')
    })
  })

  describe('Comment interface', () => {
    it('deve aceitar um objeto Comment válido', () => {
      const comment: Comment = {
        id: 1,
        postId: 1,
        name: 'Nome do Comentário',
        email: 'email@exemplo.com',
        body: 'Texto do comentário',
      }

      expect(comment.id).toBe(1)
      expect(comment.postId).toBe(1)
      expect(comment.name).toBe('Nome do Comentário')
      expect(comment.email).toBe('email@exemplo.com')
      expect(comment.body).toBe('Texto do comentário')
    })

    it('deve ter todas as propriedades obrigatórias', () => {
      const comment: Comment = {
        id: 50,
        postId: 10,
        name: 'Comentador',
        email: 'test@test.com',
        body: 'Comentário de teste',
      }

      expect(Object.keys(comment)).toHaveLength(5)
      expect(comment).toHaveProperty('id')
      expect(comment).toHaveProperty('postId')
      expect(comment).toHaveProperty('name')
      expect(comment).toHaveProperty('email')
      expect(comment).toHaveProperty('body')
    })
  })

  describe('User interface', () => {
    it('deve aceitar um objeto User válido', () => {
      const user: User = {
        id: 1,
        name: 'João Silva',
        username: 'joaosilva',
        email: 'joao@exemplo.com',
      }

      expect(user.id).toBe(1)
      expect(user.name).toBe('João Silva')
      expect(user.username).toBe('joaosilva')
      expect(user.email).toBe('joao@exemplo.com')
    })

    it('deve ter todas as propriedades obrigatórias', () => {
      const user: User = {
        id: 10,
        name: 'Usuário Teste',
        username: 'userteste',
        email: 'user@teste.com',
      }

      expect(Object.keys(user)).toHaveLength(4)
      expect(user).toHaveProperty('id')
      expect(user).toHaveProperty('name')
      expect(user).toHaveProperty('username')
      expect(user).toHaveProperty('email')
    })
  })
})
