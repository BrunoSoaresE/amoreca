import { CommonModule } from "@angular/common";
import { Component, OnInit, Input, ViewChildren, QueryList, ElementRef, Injector, SimpleChanges, OnChanges } from "@angular/core";
import { FormBuilder, FormGroup, } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatTimepickerModule, MAT_TIMEPICKER_CONFIG } from "@angular/material/timepicker";
import { distinctUntilChanged } from "rxjs";
import { Evento } from "../../../../models/evento";
import { Tema } from "../../../../models/tema";
import { EventoService } from "../../../../services/evento/evento.service";
import { EditBaseComponent } from "../../../../shared/components/edit-base.component";
import { SharedModule } from "../../../../shared/shared.module";
import { EventoArquivo } from "../../../../models/evento-arquivo";
//import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { animate, style, transition, trigger, } from '@angular/animations';
import { EventoTipoContadorComponent } from "../evento-tipo-contador/evento-tipo-contador.component";
@Component({
  standalone: true,
  selector: 'app-evento-dados-site',
  imports: [CommonModule, SharedModule, MatInputModule, MatDatepickerModule, MatTimepickerModule//, BrowserAnimationsModule
    , EventoTipoContadorComponent
  ],
  templateUrl: './evento-dados-site.component.html',
  styleUrls: ['./evento-dados-site.component.scss'],
  providers: [
    {
      provide: MAT_TIMEPICKER_CONFIG,
      useValue: { interval: '15 minutes', format: '24' },
    }
  ],
  animations: [
    trigger('fadeImage', [
      transition(':enter', [
        style({ opacity: 0 }),  // Iniciar com opacidade 0
        animate('0.3s 0.2s ease-in', style({ opacity: 1 }))  // Animação para aparecer
      ]),
      transition(':leave', [
        style({ opacity: 1 }),  // Iniciar com opacidade 1
        animate('0.3s ease-out', style({ opacity: 0 }))  // Animação para desaparecer
      ])
    ])
  ]
})
export class EventoDadosSiteComponent extends EditBaseComponent implements OnInit, OnChanges {
  @Input() eventoSelecionado?: Evento;
  @Input() temaSelecionado?: Tema;
  @Input() backgroundImageUrl?: string;
  @Input() override formGroup: FormGroup = {} as FormGroup;

  @ViewChildren('textarea') textAreas: QueryList<ElementRef<HTMLTextAreaElement>> | undefined;


  listaImgs: string[] = [];



  constructor(protected injector: Injector,
    protected formBuilder: FormBuilder,
    private eventoService: EventoService
  ) {
    super(injector);

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['backgroundImageUrl']) {
      this.definirTamanhoCampos();
    }


    this.listaImgs = this.eventoSelecionado?.eventoArquivo?.filter(x => x.base64 && x.ativo)?.map(x => x.base64 as string) ?? [];
    this.imagemAtualCarrossel = 0;

  }
  ngOnInit(): void {
    this.listaImgs = this.eventoSelecionado?.eventoArquivo?.filter(x => x.base64 && x.ativo)?.map(x => x.base64 as string) ?? []

    this.formGroup?.get('texto')?.valueChanges.pipe(
      distinctUntilChanged(),
    ).subscribe(novoValor => {
      this.definirTamanhoCampos();
    });
    this.definirTamanhoCampos();


    this.startCarrossel();

  }

  calcularTamanhoInput(formControlName: string, fontSize: number, minSize: number): number {
    var result = this.formGroup.get(formControlName)?.value?.length * fontSize || minSize;

    return result < minSize ? minSize : result;
  }




  definirTamanhoCampos() {

    setTimeout(() => {
      if (this.textAreas) {
        this.textAreas.forEach(textArea => {
          this.adjustHeight(textArea.nativeElement);
        });
      }

      this.formGroup?.updateValueAndValidity();
      this.controlarHeigthCampo();

    }, 300);



  }

  adjustHeight(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto'; // Reseta a altura para calcular a nova altura
    textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta a altura para o scrollHeight
  }


  controlarHeigthCampo() {
    if (this.textAreas) {
      this.textAreas.forEach(textArea => {
        textArea.nativeElement.addEventListener('input', () => this.adjustHeight(textArea.nativeElement));
        this.adjustHeight(textArea.nativeElement); // Ajusta altura inicial
        textArea.nativeElement.dispatchEvent(new Event('input')); // Força a chamada do evento 'input'
        this.cdRef.detectChanges();
      });
    }
  }


  getCapa(): EventoArquivo | undefined {
    return this.eventoSelecionado?.eventoArquivo?.find(x => x.capa && x.ativo)
  }



  intervalId: any; // ID do intervalo
  tempoCarrossel = 8000; // 8 segundos

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


  imagemAtualCarrossel = 0;
  anterior_ImagemCarrossel(event: MouseEvent | null) {
    if (event)
      event.stopPropagation();
    this.imagemAtualCarrossel = (this.imagemAtualCarrossel - 1 + this.listaImgs.length) % this.listaImgs.length;
    this.cdRef.detectChanges();
    this.resetInterval(); // Reiniciar o intervalo após interação
  }

  proximo_ImagemCarrossel(event: MouseEvent | null) {
    if (event)
      event.stopPropagation();
    this.imagemAtualCarrossel = (this.imagemAtualCarrossel + 1) % this.listaImgs.length;
    this.cdRef.detectChanges();
    this.resetInterval(); // Reiniciar o intervalo após interação

  }




}


