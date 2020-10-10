import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { CoreLayoutComponent } from "./layouts/core-layout/core-layout.component";

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
  },
  {
    path: "",
    component: CoreLayoutComponent,
    loadChildren: () =>
      import("./layouts/core-layout/core-layout.module").then(
        (m) => m.CoreLayoutModule
      ),
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
