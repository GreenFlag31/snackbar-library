import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Inject,
  Injectable,
  PLATFORM_ID,
  Type,
  createComponent,
} from '@angular/core';

import { Options } from './snackbar-options';
import { Subject, filter } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { NgxSnackbar } from './snackbar.component';
import { Config, SubjectID } from './config';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class InternalSnackbarService {
  private newSnackbarComponent!: ComponentRef<NgxSnackbar>;
  private snackbarContentCp!: ComponentRef<any>;
  private snackbarSubject!: Subject<any>;
  options!: Options | undefined;
  snackbarInstances: NgxSnackbar[] = [];
  uniqueSnackbarID = 0;
  private isBrowser = true;
  private subjectsAndItsID: SubjectID[] = [];

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector,
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject('config') private config: Config,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (config.closeOnNavigation) {
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this.disableAnimationsOnNavigation();
          this.closeAll();
        });
    }
  }

  open<C>(componentToCreate: Type<C>, options?: Options) {
    if (this.snackbarInstances.length === this.config.maximum) {
      this.close(this.snackbarInstances[0]);
    }

    this.options = options;
    this.snackbarSubject = new Subject();
    this.openComponent(componentToCreate, options);

    return this.snackbarSubject;
  }

  private openComponent<C>(componentToCreate: Type<C>, options?: Options) {
    if (!this.isBrowser) return;

    this.snackbarContentCp = createComponent(componentToCreate, {
      environmentInjector: this.injector,
    });

    this.newSnackbarComponent = createComponent(NgxSnackbar, {
      environmentInjector: this.injector,
      projectableNodes: [[this.snackbarContentCp.location.nativeElement]],
    });

    this.instantiateProps(options?.data);
    this.subjectsAndItsID.push({ subject: this.snackbarSubject });
    document.body.appendChild(this.newSnackbarComponent.location.nativeElement);

    this.appRef.attachView(this.snackbarContentCp.hostView);
    this.appRef.attachView(this.newSnackbarComponent.hostView);
  }

  private instantiateProps(data: Options['data'] = {}) {
    for (const key of Object.keys(data)) {
      this.snackbarContentCp.instance[key] = data[key];
    }

    this.snackbarContentCp.instance[
      'ngxUniqueID'
    ] = `ngx-id-${this.uniqueSnackbarID}`;
  }

  private findIndexCurrentInstance(
    instance: Type<unknown> & { ngxUniqueID: string }
  ) {
    return this.snackbarInstances.findIndex(
      (current) => current.ngxUniqueID === instance.ngxUniqueID
    );
  }

  close(instance: any, data?: unknown) {
    const indexCurrentInstance = this.findIndexCurrentInstance(instance);
    if (indexCurrentInstance === -1) return;

    this.snackbarInstances[indexCurrentInstance].close();
    this.snackbarInstances.splice(indexCurrentInstance, 1);

    const currentSubject = this.subjectsAndItsID[indexCurrentInstance].subject;
    currentSubject.next(data);
    currentSubject.complete();

    this.subjectsAndItsID.splice(indexCurrentInstance, 1);
  }

  private disableAnimationsOnNavigation() {
    for (const snackbar of this.snackbarInstances) {
      snackbar.snackbarLeaveAnimation = '';
    }
  }

  closeAll() {
    for (const snackbar of this.snackbarInstances) {
      snackbar.close();
    }

    this.snackbarInstances = [];
    this.subjectsAndItsID = [];
  }
}
