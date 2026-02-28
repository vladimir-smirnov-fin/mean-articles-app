import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Auth } from './pages/auth/auth';
import { Reg } from './pages/reg/reg';
import { Dashboard } from './pages/dashboard/dashboard';
import { CreatePost } from './pages/create-post/create-post';
import { ShowPost } from './pages/show-post/show-post';
import { IsLoggedGuard } from './guards/is-logged.guard'; // Импортируем Guard


export const routes: Routes = [
    {path: "", component: Home},
    {path: "reg", component: Reg},
    {path: "auth", component: Auth},
    {path: "dashboard", component: Dashboard, canActivate: [IsLoggedGuard]}, // Защищаем маршрут
    {path: "create/post", component: CreatePost},
    {path: 'post/:id', component: ShowPost}
];
