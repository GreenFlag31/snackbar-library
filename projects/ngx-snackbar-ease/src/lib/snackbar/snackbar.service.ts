import { Injectable, Type } from '@angular/core';
import { InternalSnackbarService } from './internal-snackbar.service';
import { Options } from './snackbar-options';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private internalSnackbarService: InternalSnackbarService) {}

  /**
   * Opens a custom component within a snackbar.
   * @param componentToCreate The custom component to display within the snackbar.
   * @param options Additional options for configuring the snackbar appearance and animations.
   * @returns A RxJs Subject that will emit custom data on closing the snackbar.
   * ```
   * this.snackbarService.open(snackbarContentComponent, {
   *   snackbar: {
   *     enter: 'enter-scale-down 0.1s ease-out',
   *     leave: 'fade-out 0.5s',
   *   },
   *   overlay: {
   *     leave: 'fade-out 0.3s',
   *   },
   *   data: {
   *     type: 'Angular snackbar library',
   *   },
   * })
   * .subscribe((dataFromComponent) => {
   *    ...
   * });
   * ```
   */
  open<C>(componentToCreate: Type<C>, options?: Options) {
    return this.internalSnackbarService.open(componentToCreate, options);
  }

  /**
   * Close the current snackbar.
   * @param data The optional data to emit on closing the snackbar (communication from snackbar to caller).
   * Only completes observable if last closed.
   */
  close(instance: any, data?: unknown) {
    this.internalSnackbarService.close(instance, data);
  }

  /**
   * Close all snackbar instances.
   * Respective animations will be applied.
   */
  closeAll() {
    this.internalSnackbarService.closeAll();
  }
}
