# ngx-snackbar-ease

# Description

ngx-snackbar-ease is a versatile Angular library providing a simple, performant, and responsive snackbar. This library supports data communication between components, opening of multiple snackbars, custom animations, and a range of options.

Support Angular version starts at v17.

# Demo

Live demonstration of the ngx-snackbar-ease library [here](https://greenflag31.github.io/snackbar-library/ngx-snackbar-ease).

# Installation

You can install the library using the following command:

```
npm i ngx-snackbar-ease
```

Register the `SnackbarModule` in your `app.config.ts` and optionally provide general options:

```
export const appConfig: ApplicationConfig = {
  providers: [
    ...
    importProvidersFrom(
      SnackbarModule.forRoot({
        maximum: 3,
        closeOnNavigation: true,
      })
    ),
    ...
  ],
};
```

General options respect the `Config` interface:

```
Config {
  <!-- maximum number of snackbars on a page -->
  maximum?: number;

  <!-- close active snackbars on navigation (animations are disabled) -->
  closeOnNavigation?: boolean;
}
```

Simply pass `SnackbarModule.forRoot()` to leave it default.

# Options

The snackbar supports a range of options:

```
Options {
  snackbar?: {
    enter?: string;
    leave?: string;
    top?: string;
    left?: string;
    position?: Position;
    duration?: number;
  };
  size?: {
    height?: string;
    maxHeight?: string;
    width?: string;
    maxWidth?: string;
    padding?: string;
  };
  data?: {
    [key: string]: unknown;
  };
}

Position =
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right'
  | 'top-left'
  | 'top'
  | 'top-right';
```

| Name                                                     | Default                                              | Description                                                                                                                                                                                                                                            |
| -------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <span style="background-color:#f2f2f2;">enter</span>     | <span style="background-color:#f2f2f2;"></span>      | <span style="background-color:#f2f2f2;">Define the enter animation for the snackbar respecting the [shorthand animation property](https://developer.mozilla.org/en-US/docs/Web/CSS/animation). See predefined animations [here](#ready-to-use).</span> |
| leave                                                    |                                                      | Define the leave animation for the snackbar respecting the [shorthand animation property](https://developer.mozilla.org/en-US/docs/Web/CSS/animation). See predefined animations [here](#ready-to-use).                                                |
| <span style="background-color:#f2f2f2;">top</span>       | <span style="background-color:#f2f2f2;"></span>      | <span style="background-color:#f2f2f2;">Top position of the snackbar in percent. Can be defined in any measure unit.</span>                                                                                                                            |
| left                                                     |                                                      | Left position of the snackbar in percent. Can be defined in any measure unit.                                                                                                                                                                          |
| <span style="background-color:#f2f2f2;">position</span>  | <span style="background-color:#f2f2f2;"></span>      | <span style="background-color:#f2f2f2;">Generic positioning of the snackbar respecting the `Position` type (see above).</span>                                                                                                                         |
| <span style="background-color:#f2f2f2;">duration</span>  | <span style="background-color:#f2f2f2;"></span>      | <span style="background-color:#f2f2f2;">Duration of the snackbar in ms.</span>                                                                                                                                                                         |
| <span style="background-color:#f2f2f2;">minHeight</span> | <span style="background-color:#f2f2f2;"></span>      | <span style="background-color:#f2f2f2;">Minimum height of the snackbar. Can be defined in any measure unit.</span>                                                                                                                                     |
| <span style="background-color:#f2f2f2;">height</span>    | <span style="background-color:#f2f2f2;"></span>      | <span style="background-color:#f2f2f2;">Height of the snackbar. Can be defined in any measure unit.</span>                                                                                                                                             |
| <span style="background-color:#f2f2f2;">width</span>     | <span style="background-color:#f2f2f2;"></span>      | <span style="background-color:#f2f2f2;">Width of the snackbar. Can be defined in any measure unit.</span>                                                                                                                                              |
| <span style="background-color:#f2f2f2;">maxWidth</span>  | <span style="background-color:#f2f2f2;">100</span>   | <span style="background-color:#f2f2f2;">Max width of the snackbar in percent. Can be defined in any measure unit.</span>                                                                                                                               |
| <span style="background-color:#f2f2f2;">padding</span>   | <span style="background-color:#f2f2f2;">0 0.5</span> | <span style="background-color:#f2f2f2;">Padding to be applied on the snackbar in rem. Can be defined in any measure unit.</span>                                                                                                                       |
| <span style="background-color:#f2f2f2;">data</span>      | <span style="background-color:#f2f2f2;"></span>      | <span style="background-color:#f2f2f2;">Data communication between components under the form of key-value pairs. Any type of data is supported.</span>                                                                                                 |

You have the choice for the snackbar positioning between a generic positioning or fine grained control with `top` and `left` values.

# Complete Example

Inject the snackbarService through regular dependency injection in your component.

In the following example, `snackbarContentComponent` is the content of the snackbar and should be provided as first parameter. As second parameter, provide an object respecting the `Options` interface (see above).

```
  this.snackbarService
    .open(SnackbarContentComponent, {
      snackbar: {
        <!-- Generic positioning -->
        position: 'bottom-left',
        <!-- animations -->
        enter: 'going-right-enter 0.3s ease-out',
        leave: 'going-right-leave 0.3s ease-out',
        <!-- Auto close in 4 seconds -->
        duration: 4000,
      },
      data: {
        <!-- Data to send to SnackbarContentComponent -->
        color: 'blueviolet',
      },
    })
    .subscribe((dataFromSnackbarContentComponent) => {
      ...
  });
```

Any type of data can be provided between components. Create the corresponding property (here, `color`) in your component (here, `SnackbarContentComponent`) and the property will be assigned with the provided value.

In your `SnackbarContentComponent`:
To pass information from the `SnackbarContentComponent` to your current component, inject the `SnackbarService` through regular dependency injection and call the `close(this, data)` method from the service with any data you wish to send back to your component. This method returns an RxJs subject, so subscribe to it as shown in the above example. It is not necessary to unsubscribe from the subscription since it will automatically `complete()` in the service.

Passing `this` as first argument is necessary to identify the current snackbar instance to close (there can be multiple snackbars).

```
  <!-- Inside SnackbarContentComponent -->
  onClose() {
    this.snackbarService.close(this, this.dataToSendBack);
  }
```

Publicly available methods have been exhaustively documented and typed, so you should get autocomplete and help from your code editor. Press on `CTRL + space` to get help on the available properties in the `Options` object.

# SnackbarService

This library exposes a `SnackbarService` that contains the following API:

```
<!-- Opens a component inside the snackbar -->
open<C>(componentToCreate: Type<C>, options?: Options);

<!-- Close a snackbar with optional data to send back -->
close(instance: any, data?: unknown);

<!-- Close all opened snackbars -->
closeAll();
```

<a id="ready-to-use"></a>

# Ready-to-use animations keyframes

This library comes with predefined and ready-to-use animations keyframes. Just fill in the `name`, `duration` and `easing function` (more info on the `animation CSS shorthand` [here](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)). Those animations are _position agnostic_, ie. they are adaptable to any positioning. Of course, you can create your own keyframes too.

```
/* Recommended: 0.3s ease-out */
@keyframes going-right-enter {
  from {
    transform: translateX(-150%);
  }
  to {
    transform: translateX(0);
  }
}

/* Recommended: 0.3s ease-in */
@keyframes going-right-leave {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-150%);
  }
}

/* Recommended: 0.3s ease-out */
@keyframes going-left-enter {
  from {
    transform: translateX(150%);
  }
  to {
    transform: translateX(0%);
  }
}

/* Recommended: 0.3s ease-in */
@keyframes going-left-leave {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(150%);
  }
}

/* Recommended: 0.3s ease-out */
@keyframes going-down-enter {
  from {
    transform: translateY(-150%);
  }
  to {
    transform: translateY(0%);
  }
}

/* Recommended: 0.3s ease-in */
@keyframes going-down-leave {
  from {
    transform: translateY(0%);
  }
  to {
    transform: translateY(-150%);
  }
}

/* Recommended: 0.3s ease-out */
@keyframes going-up-enter {
  from {
    transform: translateY(150%);
  }
  to {
    transform: translateY(0);
  }
}

/* Recommended: 0.3s ease-in */
@keyframes going-up-leave {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(150%);
  }
}

/* Recommended: 0.2s ease-out */
@keyframes scale-enter {
  from {
    transform: scale(0.9);
  }
  to {
    transform: scale(1);
  }
}

/* Recommended: 0.7s linear */
@keyframes bounce-in {
  0% {
    transform: translateY(-35%);
  }
  18% {
    transform: translateY(0);
  }
  60% {
    transform: translateY(-15%);
  }
  80% {
    transform: translateY(0);
  }
  90% {
    transform: translateY(-3%);
  }
  100% {
    transform: translateY(0);
  }
}

/* Recommended: 0.3s linear */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Recommended: 0.3s linear */
@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
```

If you create your own keyframes, I would recommend to create a new file `snackbar-animations` (.css or preprocessor), and @import it in your `styles.css` (or preprocessor) at the root of the application.

# Responsive

Snackbars are responsive and will correctly render on smaller devices.

# SSR (Server Side Rendering)

This library supports Server Side Rendering (SSR). The snackbar will not instantiate during server-side execution, as it requires access to the DOM API.

# DX Friendly

This library has been documented and should provide autocomplete and help from your code editor. Tested on VS Code.

# Performance

Emphasis has been placed on performance, adopting `ChangeDetectionStrategy.OnPush` strategy. This library respects Angular's mindset and use the Angular API to dynamically create components. Snackbar components will be removed from the DOM after closing and their respective RxJs Subject to emit data will be automatically closed. The resize event that add responsiveness is debounced and will be removed on close. SetTimeout (useful for auto-close if duration is set) will be cleared.

# Change log

# Report a Bug

Please provide a detailed description of the encountered bug, including your options and the steps/actions that led to the issue. An accurate description will help me to reproduce the issue.

# Ngx-ease serie

You like this library? Discover the ngx-ease serie [here](https://www.npmjs.com/~greenflag31).
