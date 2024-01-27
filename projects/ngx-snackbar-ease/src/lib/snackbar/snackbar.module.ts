// snackbar.module.ts
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Config } from './config';

@NgModule()
export class SnackbarModule {
  static forRoot(
    configuration: Config = {}
  ): ModuleWithProviders<SnackbarModule> {
    return {
      ngModule: SnackbarModule,
      providers: [{ provide: 'config', useValue: configuration }],
    };
  }
}
