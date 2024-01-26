import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SnackbarService } from '../../../projects/ngx-modal-ease/src/lib/snackbar/snackbar.service';

@Component({
  selector: 'app-snackbar2',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './snackbar2.component.html',
  styleUrl: './snackbar2.component.css',
})
export class Snackbar2Component {
  text = '';
  response = 'Yes, sure!';

  constructor(private snackbarService: SnackbarService) {}

  onConfirm() {
    this.snackbarService.close(this, this.response);
  }

  onClose() {
    this.snackbarService.close(this);
  }
}
