import { Component, Injector, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EditBaseComponent } from '../../../../shared/components/edit-base.component';
import { SharedModule } from '../../../../shared/shared.module';
import { EventoStore } from '../../../../services/evento/evento.store';
import { Evento } from '../../../../models/evento';

@Component({
  standalone: true,
  selector: 'app-evento-endereco',
  imports: [CommonModule, SharedModule, MatInputModule],
  templateUrl: './evento-endereco.component.html',
  styleUrls: ['./evento-endereco.component.scss'],
})
export class EventoEnderecoComponent extends EditBaseComponent implements OnInit {
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

  getEndereco() {
    return `${this.evento?.bairro ? this.evento.bairro : ''}
   ${this.evento?.rua ? ', ' + this.evento.rua : ''}
   ${this.evento?.numero ? ', ' + this.evento.numero : ''}
   ${this.evento?.complemento ? ' - ' + this.evento.complemento : ''}`
  }





}
