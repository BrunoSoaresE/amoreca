import { Component, EventEmitter, Injector, Input, Output, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EditBaseComponent } from '../../../../shared/components/edit-base.component';
import { SharedModule } from '../../../../shared/shared.module';
import { EventoStore } from '../../../../services/evento/evento.store';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  standalone: true,
  selector: 'app-evento-carrossel',
  imports: [CommonModule, SharedModule, MatInputModule],
  templateUrl: './evento-carrossel.component.html',
  styleUrls: ['./evento-carrossel.component.scss'],
  animations: [
    trigger('fadeImage', [
      transition(':enter', [
        style({ opacity: 0 }),  // Iniciar com opacidade 0
        animate('0.2s 0.2s ease-in', style({ opacity: 1 }))  // Animação para aparecer
      ]),
      transition(':leave', [
        style({ opacity: 1 }),  // Iniciar com opacidade 1
        animate('0.3s ease-out', style({ opacity: 0 }))  // Animação para desaparecer
      ])
    ])
  ]
})
export class EventoCarrosselComponent extends EditBaseComponent {
  @Output() abrirModal = new EventEmitter();
  @Input() click_abrirModal: boolean = true;

  listaImgCarrossel: string[] = [];
  imagemAtualCarrossel = 0;
  intervalId: any; // ID do intervalo
  tempoCarrossel = 8000; // 8 segundos

  constructor(protected injector: Injector,
    protected formBuilder: FormBuilder,
    protected eventoStore: EventoStore,

  ) {
    super(injector);

  }

  _abrirModal(event: MouseEvent | null) {
    if (event)
      event.stopPropagation();

    if (this.click_abrirModal) {
      this.abrirModal.emit();
    }
  }


  ngOnInit(): void {



    this.eventoStore.evento$.subscribe(_evento => {
      this.listaImgCarrossel = _evento?.eventoArquivo?.filter(x => x.base64)?.map(x => x.base64 as string) ?? []
    });
  }


  startCarrossel() {
    // Iniciar o intervalo automático
    this.intervalId = setInterval(() => {
      this.proximo_ImagemCarrossel(null);
    }, this.tempoCarrossel);
  }
  stopCarrossel() {
    // Parar o intervalo automático
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  resetInterval() {
    // Limpar e reiniciar o intervalo sempre que o usuário interagir
    this.stopCarrossel();
    this.startCarrossel();
  }


  anterior_ImagemCarrossel(event: MouseEvent | null) {
    if (event)
      event.stopPropagation();
    this.imagemAtualCarrossel = (this.imagemAtualCarrossel - 1 + this.listaImgCarrossel.length) % this.listaImgCarrossel.length;
    this.cdRef.detectChanges();
    this.resetInterval(); // Reiniciar o intervalo após interação
  }

  proximo_ImagemCarrossel(event: MouseEvent | null) {
    if (event)
      event.stopPropagation();
    this.imagemAtualCarrossel = (this.imagemAtualCarrossel + 1) % this.listaImgCarrossel.length;
    this.cdRef.detectChanges();
    this.resetInterval(); // Reiniciar o intervalo após interação

  }

}
