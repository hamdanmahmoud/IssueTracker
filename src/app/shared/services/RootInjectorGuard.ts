import { inject, InjectFlags, Type } from "@angular/core";

export class RootInjectorGuard {
  constructor(type: Type<any>) {
    const parent = inject(type, InjectFlags.Optional | InjectFlags.SkipSelf);

    if (parent) {
      throw Error(`Trying to create multiple instances,
      but this service should be a singleton: [${type}]:`);
    }
  }
}
