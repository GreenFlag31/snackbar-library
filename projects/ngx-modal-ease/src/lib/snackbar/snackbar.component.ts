import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnInit,
  Type,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Options } from './snackbar-options';
import { Observable, fromEvent } from 'rxjs';
import { InternalSnackbarService } from './internal-snackbar.service';

@Component({
  selector: 'ngx-snackbar-ease',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  imports: [CommonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NgxSnackbar implements OnInit, AfterViewInit {
  @ViewChild('snackbar') snackbar!: ElementRef<HTMLDivElement>;
  options!: Options | undefined;
  timeOutSnackbar!: number;
  snackbarAnimationEnd!: Observable<Event>;
  snackbarLeaveAnimation = '';
  snackbarClosed = false;
  ngxUniqueID = '';

  constructor(
    private internalSnackbarService: InternalSnackbarService,
    private element: ElementRef<HTMLElement>
  ) {}

  /**
   * Initialise variable and escape key on document.
   * Multiple snackbars might register multiple event listener, hence the 'layerLevel' variable and two times the condition check for the escape option.
   */
  ngOnInit() {
    this.options = this.internalSnackbarService.options;
    this.ngxUniqueID = `ngx-id-${this.internalSnackbarService.uniqueSnackbarID}`;
    this.internalSnackbarService.uniqueSnackbarID += 1;
    this.internalSnackbarService.snackbarInstances.push(this);
  }

  ngAfterViewInit() {
    this.addOptionsAndAnimations();
  }

  /**
   * Add options and animations
   * Apply user style and animations, listen to animation ends. Apply z-indexes on overlay and snackbar, with 1000 as incremental value.
   */
  addOptionsAndAnimations() {
    this.snackbar.nativeElement.style.width = this.options?.size?.width || '';
    this.snackbar.nativeElement.style.maxWidth =
      this.options?.size?.maxWidth || '';
    this.snackbar.nativeElement.style.height = this.options?.size?.height || '';
    this.snackbar.nativeElement.style.maxHeight =
      this.options?.size?.maxHeight || '';
    this.snackbar.nativeElement.style.padding =
      this.options?.size?.padding || '0.5rem';

    this.snackbarLeaveAnimation = this.options?.snackbar?.leave || '';
    this.snackbar.nativeElement.style.animation =
      this.options?.snackbar?.enter || '';
    this.snackbar.nativeElement.style.top =
      this.options?.snackbar?.top || '50%';
    this.snackbar.nativeElement.style.left =
      this.options?.snackbar?.left || '50%';

    this.snackbarAnimationEnd = fromEvent(
      this.snackbar.nativeElement,
      'animationend'
    );

    const duration = this.options?.snackbar?.duration;
    if (typeof duration === 'number') {
      this.timeOutSnackbar = window.setTimeout(() => {
        this.internalSnackbarService.close(this);
      }, duration);
    }
  }

  removeElementIfNotAnimated(element: HTMLDivElement, animation: string) {
    if (!animation) {
      element.remove();

      this.snackbarClosed = true;
    }
  }

  /**
   * Clean the DOM
   * Apply the leaving animations and clean the DOM. Three different use cases.
   * The instance of the content of the snackbar.
   */
  close() {
    this.snackbar.nativeElement.style.animation = this.snackbarLeaveAnimation;
    clearTimeout(this.timeOutSnackbar);

    // First: no animation element
    if (!this.snackbarLeaveAnimation) {
      this.element.nativeElement.remove();
      return;
    }

    this.snackbarAnimationEnd.subscribe(() => {
      this.snackbar.nativeElement.remove();
      this.snackbarClosed = true;
      this.element.nativeElement.remove();
    });
  }
}
