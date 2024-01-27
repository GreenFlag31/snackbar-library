import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Options } from './snackbar-options';
import { Observable, Subscription, debounceTime, fromEvent } from 'rxjs';
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
  ngxUniqueID = '';
  resizeSubscription!: Subscription;
  originalLeftPosition = '';

  constructor(
    private internalSnackbarService: InternalSnackbarService,
    private element: ElementRef<HTMLElement>
  ) {}

  /**
   * Initialise variables.
   */
  ngOnInit() {
    this.options = this.internalSnackbarService.options;
    this.ngxUniqueID = `ngx-id-${this.internalSnackbarService.uniqueSnackbarID}`;
    this.internalSnackbarService.uniqueSnackbarID += 1;
    this.internalSnackbarService.snackbarInstances.push(this);
  }

  /**
   * Handle resize.
   * Defaulted to large screens.
   */
  handleResize() {
    const { width } = this.snackbar.nativeElement.getBoundingClientRect();
    const { paddingLeft, paddingRight } = window.getComputedStyle(
      this.snackbar.nativeElement
    );
    const horizontalPaddings =
      parseFloat(paddingLeft) + parseFloat(paddingRight);

    this.snackbar.nativeElement.style.left = this.originalLeftPosition;
    if (window.innerWidth < width + horizontalPaddings) {
      this.snackbar.nativeElement.style.left = `${width / 2}px`;
    }
  }

  ngAfterViewInit() {
    this.addOptionsAndAnimations();
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(300))
      .subscribe(() => {
        this.handleResize();
      });

    this.handleResize();
  }

  /**
   * Add options and animations.
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
      this.options?.size?.padding || '0 0.5rem';

    this.snackbarLeaveAnimation = this.options?.snackbar?.leave || '';
    this.snackbar.nativeElement.style.animation =
      this.options?.snackbar?.enter || '';
    const genericPosition = this.options?.snackbar?.position;

    if (this.options?.snackbar?.top && this.options.snackbar.left) {
      this.snackbar.nativeElement.style.top = this.options?.snackbar?.top;
      this.snackbar.nativeElement.style.left = this.options?.snackbar?.left;
    } else if (genericPosition) {
      this.positionSnackbar(genericPosition);
    }

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

    this.originalLeftPosition = this.snackbar.nativeElement.style.left;
  }

  /**
   * Generic positioning the snackbar relative to user's choice.
   */
  positionSnackbar(position: string) {
    const { width, height } =
      this.snackbar.nativeElement.getBoundingClientRect();

    if (position === 'bottom') {
      this.snackbar.nativeElement.style.top = `calc(100% - ${
        height / 2
      }px - 10px)`;
      return;
    } else if (position === 'top') {
      this.snackbar.nativeElement.style.top = `calc(${height / 2}px + 10px)`;
      return;
    }

    if (position.includes('bottom')) {
      this.snackbar.nativeElement.style.top = `calc(100% - ${
        height / 2
      }px - 50px)`;
    } else {
      this.snackbar.nativeElement.style.top = `calc(${height / 2}px + 50px)`;
    }

    if (position.includes('left')) {
      this.snackbar.nativeElement.style.left = `calc(${width / 2}px + 20px)`;
    } else {
      this.snackbar.nativeElement.style.left = `calc(100% - ${
        width / 2
      }px - 20px)`;
    }
  }

  /**
   * Apply the leaving animations and clean the DOM.
   * Either removes directly the element (no animation) or waits until animation has completed.
   */
  close() {
    this.snackbar.nativeElement.style.animation = this.snackbarLeaveAnimation;
    clearTimeout(this.timeOutSnackbar);
    this.resizeSubscription.unsubscribe();

    if (!this.snackbarLeaveAnimation) {
      this.element.nativeElement.remove();
      return;
    }

    this.snackbarAnimationEnd.subscribe(() => {
      this.snackbar.nativeElement.remove();
      this.element.nativeElement.remove();
    });
  }
}
