import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RegAuth } from '../../services/reg-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  login: string = '';
  password: string = '';

  message: string = '';
  messageType: string = '';
  
  submitted = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private regAuth: RegAuth,
    private router: Router
  ) { }

  userLoginClick(form: any) {
    this.submitted = true;

    // Если форма невалидна - прекращаем выполнение
    if (form.invalid) {
      return;
    }

    // Собираем данные пользователя
    const user = {
      login: this.login,
      password: this.password
    };

    // Отправка данных на сервер
    this.regAuth.loginUser(user).subscribe({
      next: (response: any) => {
        if (!response.success) {
          // Ошибка авторизации
          this.message = response.msg;
          this.messageType = 'danger';
          this.cdr.detectChanges();
        } else {
          // Успешный вход
          this.message = response.msg || 'You have successfully logged in';
          this.messageType = 'success';
          this.cdr.detectChanges();
          
          // Сохраняем токен и данные пользователя
          this.regAuth.storeUser(response.token, response.user);
          
          // Очищаем форму
          this.login = '';
          this.password = '';
          form.resetForm();
          this.submitted = false;

          // Перенаправляем в личный кабинет через 1,5 секунду
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1500);
        }

        // Автоматически скрываем сообщение через 4 секунды
        setTimeout(() => {
          this.message = '';
          this.messageType = '';
          this.cdr.detectChanges();
        }, 4000);
      },
          
      error: (error) => {
        // Ошибка соединения с сервером
        this.message = 'Server connection error. Please check your internet connection and make sure the server is running.';
        this.messageType = 'danger';
        this.cdr.detectChanges();
        
        console.log('Error details:', error);
        
        // Автоматически скрываем сообщение через 4 секунды
        setTimeout(() => {
          this.message = '';
          this.messageType = '';
          this.cdr.detectChanges();
        }, 4000);
      }
    });
  }
}