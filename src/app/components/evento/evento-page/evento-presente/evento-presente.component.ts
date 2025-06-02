import { Component, Injector, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EditBaseComponent } from '../../../../shared/components/edit-base.component';
import { SharedModule } from '../../../../shared/shared.module';
import { EventoStore } from '../../../../services/evento/evento.store';
import { Evento } from '../../../../models/evento/evento';

@Component({
  standalone: true,
  selector: 'app-evento-presente',
  imports: [CommonModule, SharedModule, MatInputModule],
  templateUrl: './evento-presente.component.html',
  styleUrls: ['./evento-presente.component.scss'],
})
export class EventoPresenteComponent extends EditBaseComponent implements OnInit {
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


}
