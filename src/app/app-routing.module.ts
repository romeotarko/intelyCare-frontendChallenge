import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' }, 
  {path: 'login',component: LoginComponent},
  {path: 'calendar',component: CalendarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[CalendarComponent]
