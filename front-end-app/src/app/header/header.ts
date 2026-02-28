import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Нужен для *ngIf
import { RegAuth } from '../services/reg-auth'; // Импортируем сервис

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule], // Добавляем CommonModule
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  
  constructor(public regAuth: RegAuth) {} // Делаем сервис public, чтобы использовать в шаблоне
}