import { AfterViewInit, Component, ElementRef, EventEmitter, Injector, Input, OnInit, Output, QueryList, ViewChildren, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EditBaseComponent } from '../../../shared/components/edit-base.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../../shared/shared.module';
import { Categoria } from '../../../models/categoria';
import { ConsultaAuxiliaresService } from '../../../services/consulta-auxiliares.service';
import { combineLatest, distinctUntilChanged } from 'rxjs';
import { Evento, EventoCadastro } from '../../../models/evento';
import { EventoService } from '../../../services/evento/evento.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Tema } from '../../../models/tema';
import { TemaService } from '../../../services/tema/tema.service';
import { ArquivoService } from '../../../services/arquivo/arquivo.service';
import { ArquivoBase64 } from '../../../models/arquivo';
import { TemaListaSelecionarComponent } from '../../tema/tema-lista-selecionar/tema-lista-selecionar.component';
import { MAT_TIMEPICKER_CONFIG, MatTimepickerModule } from '@angular/material/timepicker';
import { format } from 'path';
@Component({
  standalone: true,
  selector: 'app-evento-dados',
  imports: [CommonModule, SharedModule, MatInputModule, MatIconModule, MatDatepickerModule, TemaListaSelecionarComponent, MatTimepickerModule],
  templateUrl: './evento-dados.component.html',
  styleUrls: ['./evento-dados.component.scss'],
  providers: [
    {
      provide: MAT_TIMEPICKER_CONFIG,
      useValue: { interval: '15 minutes', format: '24' },
    }
  ]
})
export class EventoDadosComponent extends EditBaseComponent implements OnInit, AfterViewInit {
  @Input() eventoSelecionado?: Evento;
  @Output() output_fecharCadastroEdicao = new EventEmitter<{ houveAlteracao: boolean }>();
  temas?: Tema[];

  @ViewChildren('textarea') textAreas: QueryList<ElementRef<HTMLTextAreaElement>> | undefined;



  temaSelecionado?: Tema;
  backgroundImageUrl: string = '';
  habilitarSelecaoTema: boolean = false;


  constructor(protected injector: Injector,
    protected formBuilder: FormBuilder,
    private arquivoService: ArquivoService,
    private temaService: TemaService,
    private eventoService: EventoService
  ) {
    super(injector);

  }
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: new FormControl({ value: null, disabled: this.isVisualizacao }),
      idTema: new FormControl({ value: null, disabled: this.isVisualizacao }, Validators.required),

      // Identificação
      subNomeEvento: new FormControl({ value: null, disabled: this.isVisualizacao }, Validators.required),
      nomeEvento: new FormControl({ value: '', disabled: this.isVisualizacao }, Validators.required),

      // Informações gerais
      titulo: new FormControl({ value: null, disabled: this.isVisualizacao }, Validators.required),
      texto: new FormControl({ value: null, disabled: this.isVisualizacao }, Validators.required),

      // Capa e contagem
      dataEvento: new FormControl({ value: null, disabled: this.isVisualizacao }),
      dataFimEvento: new FormControl({ value: null, disabled: this.isVisualizacao }),
      horaEvento: new FormControl({ value: null, disabled: this.isVisualizacao }),
      horaFimEvento: new FormControl({ value: null, disabled: this.isVisualizacao }),


      infoEvento: new FormControl({ value: null, disabled: this.isVisualizacao }, Validators.required),

      // Endereço detalhado
      cep: new FormControl({ value: null, disabled: this.isVisualizacao }),
      estado: new FormControl({ value: null, disabled: this.isVisualizacao }),
      cidade: new FormControl({ value: null, disabled: this.isVisualizacao }),
      bairro: new FormControl({ value: null, disabled: this.isVisualizacao }),
      rua: new FormControl({ value: null, disabled: this.isVisualizacao }),
      numero: new FormControl({ value: null, disabled: this.isVisualizacao }),
      complemento: new FormControl({ value: null, disabled: this.isVisualizacao }),
      // Rodapé
      textoRodape: new FormControl({ value: null, disabled: this.isVisualizacao }),
    });

    if (this.eventoSelecionado) {
      this.formGroup.patchValue(this.eventoSelecionado);
      this.formGroup.get('horaEvento')?.setValue(this.eventoSelecionado.dataEvento);
      this.formGroup.get('horaFimEvento')?.setValue(this.eventoSelecionado.dataFimEvento);



    } else {
      this.habilitarSelecaoTema = true;
    }

    this.formGroup?.get('idTema')?.valueChanges.pipe(
      distinctUntilChanged(), // Evita requisições desnecessárias
    ).subscribe(novoValor => {
      this.downloadBase64Foto_TemaSelecionado();
      this.definirTamanhoCampos();
      this.controlarHeigthCampo();
    });


    this.formGroup?.get('texto')?.valueChanges.pipe(
      distinctUntilChanged(),
    ).subscribe(novoValor => {
      this.controlarHeigthCampo();
    });



    this.getConsultaAuxiliares();
  }

  calcularTamanhoInput(formControlName: string, fontSize: number, minSize: number): number {
    var result = this.formGroup.get(formControlName)?.value?.length * fontSize || minSize;

    return result < minSize ? minSize : result;
  }

  onTemaSelecionado(tema: Tema) {
    this.formGroup.get('idTema')?.setValue(tema.id);
    this.habilitarSelecaoTema = false;

  }

  unificarCampoDataHora(dataControl: string, horaControl: string): Date | undefined {
    const data = this.formGroup.get(dataControl)?.value;
    const hora = this.formGroup.get(horaControl)?.value;

    if (!data || !hora) return undefined;

    try {
      const dataHoraUnificada = new Date(data);

      let horas: number;
      let minutos: number;

      if (typeof hora === 'string') {
        console.log("🚀 ~ EventoDadosComponent ~ unificarCampoDataHora ~ hora str:", hora)
        // Hora no formato string, exemplo: "08:30"

        const horaDate = new Date(hora);
        console.log("🚀 ~ EventoDadosComponent ~ unificarCampoDataHora ~ hora str:", horaDate)
        console.log("🚀 ~ EventoDadosComponent ~ unificarCampoDataHora ~ hora str:", horaDate.getHours())

        if (isNaN(horaDate.getTime())) return undefined;

        horas = horaDate.getHours();
        minutos = horaDate.getMinutes();
      } else

        if (hora instanceof Date) {
          console.log("🚀 ~ EventoDadosComponent ~ unificarCampoDataHora ~ hora date:", hora)

          // Hora é um objeto Date
          horas = hora.getHours();
          minutos = hora.getMinutes();
        } else {
          return undefined;
        }

      dataHoraUnificada.setUTCHours(horas, minutos, 0);

      return dataHoraUnificada;
    } catch (error) {
      return undefined;
    }
  }


  salvar(): void {


    if (!this.formGroup.valid) {
      this.onInvalidForm();
      return;
    }

    let eventoCadastro = this.formGroup.getRawValue() as EventoCadastro;
    eventoCadastro.dataEvento = this.unificarCampoDataHora('dataEvento', 'horaEvento');
    eventoCadastro.dataFimEvento = this.unificarCampoDataHora('dataFimEvento', 'horaFimEvento');


    this.subscription.add(
      this.eventoService.salvarEvento(eventoCadastro).subscribe({
        next: (response: Evento) => {
          this.eventoSelecionado = response;
          // this.output_fecharCadastroEdicao.emit({ houveAlteracao: true });
          this.formGroup.reset(this.eventoSelecionado);
          this.formGroup.get('horaEvento')?.setValue(this.eventoSelecionado.dataEvento);
          this.formGroup.get('horaFimEvento')?.setValue(this.eventoSelecionado.dataFimEvento);
          this.toastr.success('Evento salvo com sucesso!');

        }
      }),
    );

  }

  getConsultaAuxiliares() {
    const getListTema = this.temaService.getListTema();
    // const getCategoria = this.consultaAuxiliaresService.categoria$;


    combineLatest([getListTema]).subscribe(([listTema]) => {
      this.temas = listTema;
      this.cdRef.detectChanges();
      this.downloadBase64Foto_TemaSelecionado();

    });
  }

  downloadBase64Foto_TemaSelecionado() {

    const novoTemaSelecionado = this.temas?.find(x => x.id == this.formGroup?.get('idTema')?.value);


    if (novoTemaSelecionado?.arquivo && novoTemaSelecionado.id != this.temaSelecionado?.id) {

      const el = this.elementRef.nativeElement;
      el.style.setProperty('--cor-primaria', novoTemaSelecionado?.corPrimaria || '#fff');
      el.style.setProperty('--cor-secundaria', novoTemaSelecionado?.corSecundaria || '#000');
      el.style.setProperty('--cor-terciaria', novoTemaSelecionado?.corTerciaria || '#ccc');

      this.arquivoService.getArquivoBase64ByCaminho(novoTemaSelecionado.arquivo?.nomeArmazenado).subscribe({
        next: (response: ArquivoBase64) => {
          novoTemaSelecionado.arquivoBase64 = response;
          this.backgroundImageUrl = `linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url('${response.base64}')`;

          this.cdRef.detectChanges();
        }
      });
    }


    this.temaSelecionado = novoTemaSelecionado;

    // this.listaOption?.forEach((item) => {
    //   if (this.nomeCampoFoto) {
    //     var campo = this.getNestedValue(item, this.nomeCampoFoto);

    //     if (campo) {
    //       this.subscription.add(
    //         this.arquivoService.getArquivoBase64ByCaminho(campo).subscribe({
    //           next: (response: ArquivoBase64) => {
    //             item.foto = response;
    //             this.cdRef.detectChanges();
    //           }
    //         }),
    //       );
    //     }
    //   }

    // });

  }


  definirTamanhoCampos() {
    setTimeout(() => {

      if (this.textAreas) {
        this.textAreas.forEach(textArea => {
          this.adjustHeight(textArea.nativeElement);
        });
      }

      this.formGroup?.updateValueAndValidity();


    }, 0);


  }

  adjustHeight(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto'; // Reseta a altura para calcular a nova altura
    textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta a altura para o scrollHeight
  }

  ngAfterViewInit(): void {
    this.controlarHeigthCampo();
  }

  controlarHeigthCampo() {
    if (this.textAreas) {
      this.textAreas.forEach(textArea => {
        textArea.nativeElement.addEventListener('input', () => this.adjustHeight(textArea.nativeElement));
        this.adjustHeight(textArea.nativeElement); // Ajusta altura inicial
        textArea.nativeElement.dispatchEvent(new Event('input')); // Força a chamada do evento 'input'
      });
    }
  }





}
