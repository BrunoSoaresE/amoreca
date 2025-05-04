import { Component, Injector, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EditBaseComponent } from '../../../../shared/components/edit-base.component';
import { SharedModule } from '../../../../shared/shared.module';
import { EventoStore } from '../../../../services/evento/evento.store';
import { Evento } from '../../../../models/evento';
import { EventoCarrosselComponent } from '../evento-carrossel/evento-carrossel.component';
import { EventoCapaComponent } from '../evento-capa/evento-capa.component';
import { EventoEnderecoComponent } from '../evento-endereco/evento-endereco.component';
import { EventoNavComponent } from '../evento-nav/evento-nav.component';

@Component({
  standalone: true,
  selector: 'app-evento-page',
  imports: [CommonModule, SharedModule, MatInputModule, EventoCarrosselComponent, EventoCapaComponent, EventoEnderecoComponent],
  templateUrl: './evento-page.component.html',
  styleUrls: ['./evento-page.component.scss'],
})
export class EventoPageComponent extends EditBaseComponent implements OnInit {
  evento?: Evento;

  constructor(protected injector: Injector,
    protected formBuilder: FormBuilder,
    protected eventoStore: EventoStore,

  ) {
    super(injector);

  }
  ngOnInit(): void {

    this.eventoStore.evento$.subscribe(_evento => {
      this.evento = _evento;
    });
  }



  modalAberto = false;
  modalCapaAberto = false;

  abrirModal() {
    this.modalAberto = true;
    this.cdRef.detectChanges();
  }
  abrirCapaModal() {
    this.modalCapaAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
    this.modalCapaAberto = false;
  }



}
