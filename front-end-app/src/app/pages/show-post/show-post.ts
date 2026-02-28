import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-show-post',
  imports: [CommonModule, RouterLink],
  templateUrl: './show-post.html',
  styleUrl: './show-post.css',
})
export class ShowPost implements OnInit {
  
  post: any;
  loading: boolean = true;
  error: string = '';
  id: string = '';
  
  // Для сообщений об удалении
  deleteMessage: string = '';
  deleteMessageType: string = '';
  isDeleting: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    console.log('Loading article with ID:', this.id);
    this.loadPost();
  }

  loadPost() {
    this.loading = true;
    
    this.postService.getPostById(this.id).subscribe({
      next: (response: any) => {
        console.log('Server response:', response);
        
        if (response.success) {
          this.post = response.post;
          console.log('Article loaded:', this.post);
        } else {
          this.error = response.msg || 'Article not found';
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading article:', error);
        this.error = 'Server connection error';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Метод для удаления статьи
  deletePost() {
    // Спрашиваем подтверждение
    if (!confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      return;
    }

    this.isDeleting = true;
    this.deleteMessage = '';
    
    console.log('Deleting article with ID:', this.id);
    
    this.postService.deletePost(this.id).subscribe({
      next: (response: any) => {
        console.log('Delete response:', response);
        
        if (response.success) {
          // Показываем сообщение об успешном удалении
          this.deleteMessage = 'Article successfully deleted!';
          this.deleteMessageType = 'success';
          this.cdr.detectChanges();
          
          // Перенаправляем на главную через 2 секунды
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        } else {
          // Ошибка при удалении
          this.deleteMessage = response.msg || 'Error deleting article';
          this.deleteMessageType = 'danger';
          this.isDeleting = false;
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.error('Delete error:', error);
        this.deleteMessage = 'Server connection error';
        this.deleteMessageType = 'danger';
        this.isDeleting = false;
        this.cdr.detectChanges();
      }
    });
  }

  formatDate(date: string) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}