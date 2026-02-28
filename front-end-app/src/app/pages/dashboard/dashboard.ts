import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegAuth } from '../../services/reg-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  userName: string = '';
  message: string = '';  // Только сообщение, без типа

  constructor(
    private regAuth: RegAuth,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    const user = this.regAuth.getUser();
    if (user) {
      this.userName = user.name || user.login;
    }
  }

  logoutUser() {
    this.regAuth.logout();
    
    // Просто устанавливаем сообщение
    this.message = 'You have successfully logged out';
    this.cdr.detectChanges();
    
    setTimeout(() => {
      this.router.navigate(['/auth']);
    }, 1500);
    
    setTimeout(() => {
      this.message = '';
      this.cdr.detectChanges();
    }, 1500);
  }
}