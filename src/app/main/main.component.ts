import { Component } from '@angular/core';
import { SnackbarContentComponent } from '../snackbar/snackbar.component';
import { RouterModule } from '@angular/router';
import { Snackbar2Component } from '../snackbar2/snackbar2.component';
import { FormsModule } from '@angular/forms';
import { SnackbarService } from '../../../projects/ngx-snackbar-ease/src/public-api';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  S0 = {
    animation: 'going-right-enter',
    duration: '0.3s',
    easing: 'ease-out',
  };
  textToS4 = 'Will you dance until sunrise?';
  responseFromS4 = '';

  constructor(private snackbarService: SnackbarService) {}

  onS0Open() {
    this.snackbarService.open(SnackbarContentComponent, {
      snackbar: {
        // top: 'calc(100% - 40px)',
        // left: '50%',
        position: 'bottom-left',
        enter: `${this.S0.animation} ${this.S0.duration} ${this.S0.easing}`,
      },
    });
  }

  onS1Open() {
    this.snackbarService.open(SnackbarContentComponent, {
      snackbar: {
        position: 'bottom-left',
        enter: 'scale-enter 0.2s ease-out',
        // leave: 'going-down-leave 0.3s ease-out',
        duration: 4000,
      },
      data: {
        color: 'blueviolet',
      },
    });
  }

  onS2Open() {
    this.snackbarService.open(SnackbarContentComponent, {
      snackbar: {
        top: '80%',
        left: 'calc(100% - 185px)',
        enter: 'going-left-enter 0.3s',
        leave: 'going-left-leave 0.3s',
        // duration: 4000,
      },
      data: {
        bgColor: 'blue',
      },
    });
  }

  onS3Open() {
    this.snackbarService.open(SnackbarContentComponent, {
      snackbar: {
        top: '90%',
        left: '185px',
        enter: 'going-right-enter 0.3s',
        leave: 'going-right-leave 0.3s',
        // duration: 3000,
      },
      data: {
        bgColor: 'orange',
      },
    });
  }

  onS4Open() {
    this.snackbarService
      .open(Snackbar2Component, {
        snackbar: {
          top: '90%',
          left: '50%',
          enter: 'bounce-in 0.7s ',
        },
        data: {
          text: this.textToS4,
        },
      })
      .subscribe((response) => {
        this.responseFromS4 = response || '';
      });
  }

  closeAll() {
    this.snackbarService.closeAll();
  }
}
