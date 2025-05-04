import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EventoComponent } from "./evento.component";
import { MatInputModule } from "@angular/material/input";
import { SharedModule } from "../../shared/shared.module";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatRippleModule } from "@angular/material/core";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { EventoRoutingModule } from "./evento-routing.module";
import { EventoNavComponent } from "../../components/evento/evento-page/evento-nav/evento-nav.component";

@NgModule({
  imports: [
    CommonModule,

    MatSlideToggleModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule

    , SharedModule
    , EventoNavComponent
    , EventoRoutingModule

  ],
  declarations: [
    EventoComponent
  ],
  exports: [
    EventoComponent
  ]
})
export class EventoModule {
}

