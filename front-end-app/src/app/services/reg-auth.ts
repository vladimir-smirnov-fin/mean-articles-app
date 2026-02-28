import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegAuth {
  // ДЛЯ РАЗРАБОТКИ (раскомментируйте для локальной работы)
  // private apiUrl = 'http://localhost:3000/account';

  // Перед деплоем на Render - раскомментируйте эту строку и закомментируйте верхнюю
  private apiUrl = 'https://mean-articles-app-vladimir-smirnov.onrender.com/account';

  constructor(private http: HttpClient) { }

  // Регистрация
  registerUser(user: any) {
    return this.http.post(`${this.apiUrl}/reg`, user);
  }
  
  // Авторизация (вход)
  loginUser(credentials: any) {
    return this.http.post(`${this.apiUrl}/auth`, credentials);
  }
  
  // Сохранение данных пользователя в localStorage
  storeUser(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  // Получение токена
  getToken() {
    return localStorage.getItem('token');
  }
  
  // Получение данных пользователя
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  
  // Проверка, авторизован ли пользователь
  isLoggedIn() {
    return !!this.getToken(); // Возвращает true если токен есть
  }
  
  // Выход из системы
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}