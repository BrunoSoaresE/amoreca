import { Component, EventEmitter, Injector, Input, Output, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EditBaseComponent } from '../../../../shared/components/edit-base.component';
import { SharedModule } from '../../../../shared/shared.module';
import { EventoStore } from '../../../../services/evento/evento.store';
import { BusEvent, TipoBusEvent } from '../../../../services/bus.store';

@Component({
  standalone: true,
  selector: 'app-evento-album-fotos',
  imports: [CommonModule, SharedModule, MatInputModule],
  templateUrl: './evento-album-fotos.component.html',
  styleUrls: ['./evento-album-fotos.component.scss'],

})
export class EventoAlbumFotosComponent extends EditBaseComponent {

  listaImgCarrossel: string[] = [];
  imagemModal?: string;


  constructor(protected injector: Injector,
    protected formBuilder: FormBuilder,
    protected eventoStore: EventoStore,

  ) {
    super(injector);

  }

  abrirModal(srcImg: string) {
    this.imagemModal = srcImg;

  }


  ngOnInit(): void {
    this.eventoStore.evento$.subscribe(_evento => {
      this.listaImgCarrossel = _evento?.eventoArquivo?.filter(x => x.base64)?.map(x => x.base64 as string) ?? [];
      this.cdRef.detectChanges();
    });
  }


  fecharModal() {
    this.imagemModal = undefined;

  }



}
