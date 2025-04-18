import { CommonModule } from "@angular/common";
import { Component, OnInit, AfterViewInit, Input, Output, ViewChildren, QueryList, ElementRef, Injector, SimpleChanges, OnChanges } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTimepickerModule, MAT_TIMEPICKER_CONFIG } from "@angular/material/timepicker";
import EventEmitter from "events";
import { distinctUntilChanged, combineLatest } from "rxjs";
import { ArquivoBase64 } from "../../../../models/arquivo";
import { Evento, EventoCadastro } from "../../../../models/evento";
import { Tema } from "../../../../models/tema";
import { ArquivoService } from "../../../../services/arquivo/arquivo.service";
import { EventoService } from "../../../../services/evento/evento.service";
import { TemaService } from "../../../../services/tema/tema.service";
import { EditBaseComponent } from "../../../../shared/components/edit-base.component";
import { SharedModule } from "../../../../shared/shared.module";
import { TemaListaSelecionarComponent } from "../../../tema/tema-lista-selecionar/tema-lista-selecionar.component";

@Component({
  standalone: true,
  selector: 'app-evento-dados-site',
  imports: [CommonModule, SharedModule, MatInputModule, MatIconModule, MatDatepickerModule, TemaListaSelecionarComponent, MatTimepickerModule],
  templateUrl: './evento-dados-site.component.html',
  styleUrls: ['./evento-dados-site.component.scss'],
  providers: [
    {
      provide: MAT_TIMEPICKER_CONFIG,
      useValue: { interval: '15 minutes', format: '24' },
    }
  ]
})
export class EventoDadosSiteComponent extends EditBaseComponent implements OnInit, OnChanges {
  @Input() eventoSelecionado?: Evento;
  @Input() temaSelecionado?: Tema;
  @Input() backgroundImageUrl?: string;
  @Input() override formGroup: FormGroup = {} as FormGroup;

  @ViewChildren('textarea') textAreas: QueryList<ElementRef<HTMLTextAreaElement>> | undefined;



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
  }
  ngOnInit(): void {

    this.formGroup?.get('texto')?.valueChanges.pipe(
      distinctUntilChanged(),
    ).subscribe(novoValor => {
      this.definirTamanhoCampos();
    });
    this.definirTamanhoCampos();
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

    }, 100);


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





}
