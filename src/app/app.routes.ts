import { Routes } from '@angular/router';
import { ExtraComponent } from './extra/extra.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'ngx-snackbar-ease' },
  { path: 'ngx-snackbar-ease', component: MainComponent },
  { path: 'extra', component: ExtraComponent },
];
