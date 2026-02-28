import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from '../../services/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './create-post.html',
  styleUrl: './create-post.css',
})
export class CreatePost {
  title: string = '';
  anons: string = '';
  text: string = '';

  message: string = '';
  messageType: string = '';
  
  submitted = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private postService: PostService,
    private router: Router
  ) { }

  onSubmit(form: any) {
    this.submitted = true;

    // Если форма невалидна - прекращаем выполнение
    if (form.invalid) {
      return;
    }

    // Собираем данные статьи
    const post = {
      title: this.title,
      anons: this.anons,
      text: this.text
    };

    // Отправка данных на сервер
    this.postService.addPost(post).subscribe({
      next: (response: any) => {
        if (!response.success) {
          // Ошибка от сервера
          this.message = response.msg;
          this.messageType = 'danger';
          this.cdr.detectChanges();
        } else {
          // Успешное добавление
          this.message = response.msg;
          this.messageType = 'success';
          
          // Очищаем форму
          this.title = '';
          this.anons = '';
          this.text = '';
            
          // Сбрасываем состояние формы и submitted
          form.resetForm();
          this.submitted = false;

          // Перенаправляем на главную страницу через 2 секунды
          setTimeout(() => {
            this.router.navigate(['/']); // Главная страница
          }, 2000);
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
        
        setTimeout(() => {
          this.message = '';
          this.messageType = '';
          this.cdr.detectChanges();
        }, 4000);
      }
    });
  }
}