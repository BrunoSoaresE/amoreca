import { Component, EventEmitter, Injector, Input, Output, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { EditBaseComponent } from '../../../../shared/components/edit-base.component';
import { SharedModule } from '../../../../shared/shared.module';
import { EventoStore } from '../../../../services/evento/evento.store';
import { EventoArquivo } from '../../../../models/evento/evento-arquivo';

@Component({
  standalone: true,
  selector: 'app-evento-capa',
  imports: [CommonModule, SharedModule, MatInputModule],
  templateUrl: './evento-capa.component.html',
  styleUrls: ['./evento-capa.component.scss'],
})
export class EventoCapaComponent extends EditBaseComponent {
  @Output() abrirModal = new EventEmitter();
  @Input() click_abrirModal: boolean = true;
  eventoCapa?: EventoArquivo;


  constructor(protected injector: Injector,
    protected eventoStore: EventoStore,

  ) {
    super(injector);

  }

  ngOnInit(): void {


    this.eventoStore.evento$.subscribe(_evento => {
      this.eventoCapa = _evento?.eventoArquivo?.find(x => x.capa)
    });
  }

  _abrirModal(event: MouseEvent | null) {
    if (event)
      event.stopPropagation();

    if (this.click_abrirModal) {
      this.abrirModal.emit();
    }
  }


}
