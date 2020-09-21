import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { CoreLayoutComponent } from "./layouts/core-layout/core-layout.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { InviteToProjectComponent } from "./invite-to-project/invite-to-project.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "",
    component: CoreLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/core-layout/core-layout.module#CoreLayoutModule",
      },
    ],
  },
  {
    path: "invite",
    component: InviteToProjectComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
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
