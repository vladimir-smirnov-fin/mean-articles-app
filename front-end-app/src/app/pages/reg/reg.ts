import { Component, ChangeDetectorRef   } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RegAuth } from '../../services/reg-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './reg.html',
  styleUrl: './reg.css',
})
export class Reg {
  name: string = '';
  login: string = '';       
  email: string = '';      
  password: string = '';

  message: string = '';
  messageType: string = '';
  
  submitted = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private regAuth: RegAuth,
    private router: Router) { }

  userRegisterClick(form: any) {
    this.submitted = true;

    // Если форма невалидна - прекращаем выполнение
    if (form.invalid) {
      return;
    }

    // Собираем данные пользователя
    const user = {
      name: this.name,
      login: this.login,
      email: this.email,
      password: this.password
    };

    // Отправка данных на сервер
    this.regAuth.registerUser(user).subscribe({
      next: (response: any) => {
        if (!response.success) {
          // Ошибка от сервера (например, пользователь уже существует)
          this.message = response.msg;
          this.messageType = 'danger';
          this.cdr.detectChanges(); // Принудительно обновляем представление
        } else {
          // Успешная регистрация
          this.message = response.msg;
          this.messageType = 'success';
          
          // Очищаем форму
          this.name = '';
          this.login = '';
          this.email = '';
          this.password = '';
            
          // Сбрасываем состояние формы и submitted
          form.resetForm();
          this.submitted = false;

          // Перенаправляем на страницу входа через 2 секунды
          setTimeout(() => {
            this.router.navigate(['/auth']);
          }, 2000);
        }

        // Автоматически скрываем сообщение через 4 секунды
        setTimeout(() => {
          this.message = '';
          this.messageType = '';
          this.cdr.detectChanges(); // Принудительно обновляем представление
        }, 4000);
      },
          
      error: (error) => {
        // Ошибка соединения с сервером
        this.message = 'Server connection error. Please check your internet connection and make sure the server is running.';
        this.messageType = 'danger';

        // Принудительно обновляем представление
        this.cdr.detectChanges();
                
        console.log('Error details:', error);
        
        // Автоматически скрываем сообщение через 4 секунды
        setTimeout(() => {
          this.message = '';
          this.messageType = '';
          this.cdr.detectChanges(); // Принудительно обновляем представление
        }, 4000);
      }
    });
  }
}