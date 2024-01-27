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
   *     position: 'bottom-left',
   *     enter: 'going-right-enter 0.3s ease-out',
   *     leave: 'going-right-leave 0.3s ease-out',
   *   },
   *   data: {
   *     type: 'Angular snackbar library',
   *   },
   * })
   * .subscribe((dataFromsnackbarContentComponent) => {
   *    ...
   * });
   * ```
   */
  open<C>(componentToCreate: Type<C>, options?: Options) {
    return this.internalSnackbarService.open(componentToCreate, options);
  }

  /**
   * Close the current snackbar.
   * @param instance Pass 'this' to identify the current snackbar instance.
   * @param data The optional data to emit on closing the snackbar (communication from snackbar to caller).
   * RxJs observable will automatically completes on close.
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
