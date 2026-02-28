import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  // ДЛЯ РАЗРАБОТКИ (раскомментируйте для локальной работы)
  // private apiUrl = 'http://localhost:3000';

  // Перед деплоем на Render - раскомментируйте эту строку и закомментируйте верхнюю
  private apiUrl = 'https://mean-articles-app-vladimir-smirnov.onrender.com';

  // Добавление новой статьи
  addPost(post: any) {
    return this.http.post(`${this.apiUrl}/posts/add`, post);
  }

  // Получение всех статей (современная версия)
  getAllPosts() {
    // Используем готовый endpoint /posts
    // HttpClient сам парсит JSON, не нужен .map(res => res.json())
    return this.http.get(`${this.apiUrl}/posts`);
  }

  // Получение одной статьи
  getPostById(id: string) {
    return this.http.get(`${this.apiUrl}/posts/${id}`);
  }

  // Удаление статьи
  deletePost(id: string) {
    return this.http.delete(`${this.apiUrl}/posts/${id}`);
  }

  // Обновление статьи
  updatePost(id: string, post: any) {
    return this.http.put(`${this.apiUrl}/posts/${id}`, post);
  }
}