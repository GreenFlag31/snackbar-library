import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'ngx-snackbar-ease' },
  { path: 'ngx-snackbar-ease', component: MainComponent },
];
