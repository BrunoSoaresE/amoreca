import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { LoginModule } from "../../components/login/login.module";
import { RouterOutlet } from "@angular/router";
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";


@NgModule({
    imports: [
    CommonModule
    , HomeRoutingModule
    , LoginModule
    , RouterOutlet
    , MatSidenavModule
    , MatListModule
    , MatInputModule
    , MatIconModule
    ],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule {
}

