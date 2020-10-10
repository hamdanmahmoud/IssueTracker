import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { CoreLayoutComponent } from "./layouts/core-layout/core-layout.component";
import { LoggedInGuard } from "./shared/services/logged-in-guard";
import { AlreadyLoggedInResolver } from "./shared/services/already-logged-in-resolver";

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./layouts/auth-layout/auth-layout.module").then(
        (m) => m.AuthLayoutModule
      ),
    resolve: [AlreadyLoggedInResolver],
  },
  {
    path: "",
    component: CoreLayoutComponent,
    loadChildren: () =>
      import("./layouts/core-layout/core-layout.module").then(
        (m) => m.CoreLayoutModule
      ),
    canActivateChild: [LoggedInGuard],
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
