import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";

import { AppComponent } from "./app.component";

import { CoreLayoutComponent } from "./layouts/core-layout/core-layout.component";
import { InviteToProjectComponent } from "./layouts/core-layout/project/invite-to-project/invite-to-project.component";
import { API } from "./API.conf";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
  ],
  declarations: [AppComponent, CoreLayoutComponent, InviteToProjectComponent],
  providers: [API],
  bootstrap: [AppComponent],
})
export class AppModule {}
