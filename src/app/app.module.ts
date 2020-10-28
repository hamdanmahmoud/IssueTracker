import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./shared/components/components.module";

import { AppComponent } from "./app.component";

import { CoreLayoutComponent } from "./layouts/core-layout/core-layout.component";
import { API } from "./API.conf";
import { AlreadyLoggedInResolver } from "./shared/services/already-logged-in-resolver";
import { LoggedInGuard } from "./shared/services/logged-in-guard";
import { AuthService } from "./shared/services/auth.service";
import { MainPipeModule } from "./shared/pipes/main-pipe.module";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MainPipeModule,
  ],
  declarations: [AppComponent, CoreLayoutComponent],
  exports: [],
  providers: [API, AuthService, LoggedInGuard, AlreadyLoggedInResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
