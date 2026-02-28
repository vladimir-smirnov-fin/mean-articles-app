import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RegAuth } from '../services/reg-auth';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {
  
  constructor(
    private regAuth: RegAuth,
    private router: Router
  ) {}
  
  canActivate(): boolean {
    // Проверяем, авторизован ли пользователь
    if (this.regAuth.isLoggedIn()) {
      return true; // Разрешаем доступ
    } else {
      // Если не авторизован - перенаправляем на страницу входа
      this.router.navigate(['/auth']);
      return false; // Блокируем доступ
    }
  }
}