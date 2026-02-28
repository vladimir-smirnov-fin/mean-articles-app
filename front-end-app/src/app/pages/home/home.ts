import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  
  posts: any;
  loading: boolean = true;
  error: string = '';

  constructor(
    private router: Router,
    private postService: PostService,
    private cdr: ChangeDetectorRef  // Добавляем ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.loading = true;
    
    this.postService.getAllPosts().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.posts = response.posts;
          console.log('Articles loaded:', this.posts);
        } else {
          this.error = response.msg || 'Error loading articles';
        }
        this.loading = false;
        this.cdr.detectChanges(); // Принудительно обновляем представление
      },
      error: (error) => {
        console.error('Loading error:', error);
        this.error = 'Server connection error';
        this.loading = false;
        this.cdr.detectChanges(); // Принудительно обновляем представление
      }
    });
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}