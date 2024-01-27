import { Component } from '@angular/core';
import { SnackbarService } from '../../../projects/ngx-snackbar-ease/src/public-api';

@Component({
  selector: 'app-content-snackbar',
  standalone: true,
  imports: [],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css',
})
export class SnackbarContentComponent {
  bgColor = '#3e3e3e';

  constructor(private snackbarService: SnackbarService) {}

  onClose() {
    this.snackbarService.close(this);
  }
}
