import { AfterViewInit, Component, EventEmitter, inject, Injector, Input, OnInit, Output, QueryList, ViewChild, ViewChildren, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EditBaseComponent } from '../../../../shared/components/edit-base.component';
import { SharedModule } from '../../../../shared/shared.module';
import { Evento, EventoCadastro, } from '../../../../models/evento';
import { EventoService } from '../../../../services/evento/evento.service';
import { Tema } from '../../../../models/tema';
import { TemaService } from '../../../../services/tema/tema.service';
import { ArquivoService } from '../../../../services/arquivo/arquivo.service';
import { EventoDadosSiteComponent } from '../evento-dados-site/evento-dados-site.component';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { TemaListaSelecionarComponent } from '../../../tema/tema-lista-selecionar/tema-lista-selecionar.component';
import { combineLatest, distinctUntilChanged, timeout } from 'rxjs';
import { ArquivoBase64 } from '../../../../models/arquivo';
import { EventoDadosFotoComponent } from '../evento-dados-foto/evento-dados-foto.component';
import { EventoArquivoCadastro } from '../../../../models/evento-arquivo';
import { EventoDadosPresenteComponent } from '../evento-dados-presente/evento-dados-presente.component';
import { Presente } from '../../../../models/presente';
import { PresenteService } from '../../../../services/presente/presente.service';
import { EventoPresente } from '../../../../models/evento-presente';
import { Categoria } from '../../../../models/categoria';
import { ConsultaAuxiliaresService } from '../../../../services/consulta-auxiliares.service';


@Component({
  standalone: true,
  selector: 'app-evento-dados',
  imports: [CommonModule, SharedModule, MatInputModule, EventoDadosSiteComponent, MatStepperModule, TemaListaSelecionarComponent
    , EventoDadosFotoComponent, EventoDadosPresenteComponent
  ],
  templateUrl: './evento-dados.component.html',
  styleUrls: ['./evento-dados.component.scss'],
})
export class EventoDadosComponent extends EditBaseComponent implements OnInit, AfterViewInit {
  @ViewChild('stepper') stepper!: MatStepper;


  @Input() eventoSelecionado?: Evento;
  @Output() output_fecharCadastroEdicao = new EventEmitter<{ houveAlteracao: boolean }>();
  habilitarSelecaoTema: boolean = false;
  temas?: Tema[];
  categorias?: Categoria[];
  temaSelecionado?: Tema;
  backgroundImageUrl?: string;
  eventoArquivoCadastro?: EventoArquivoCadastro[];
  removerArquivos?: number[]


  listPresentes?: Presente[];
  presenteisReady: boolean = false;

  constructor(protected injector: Injector,
    protected formBuilder: FormBuilder,
    private arquivoService: ArquivoService,
    private temaService: TemaService,
    private eventoService: EventoService,
    private presenteService: PresenteService,
    private consultaAuxiliaresService: ConsultaAuxiliaresService
  ) {
    super(injector);

  }
  ngAfterViewInit(): void {
    this._setFornsControl();

    if (this.stepper) {
      this.stepper.steps.forEach((step, index) => {
        if (index < 2) {
          step.completed = true;
        }
      });
      this.stepper.selectedIndex = 2;
      this.cdRef.detectChanges();
    }

  }
  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    idTema: new FormControl<any>({ value: (null as number | null), disabled: this.isVisualizacao }, Validators.required),
    idCategoria: new FormControl<any>({ value: (null as number | null), disabled: this.isVisualizacao }, Validators.required),
  });
  secondFormGroup = this._formBuilder.group({
    // linkSite: new FormControl<any>({ value: null, disabled: this.isVisualizacao }, Validators.required),
  });

  presentesFormGroup = this._formBuilder.group({
    presentes: this._formBuilder.array([])
  });

  eventoDadosSite_FormGroup = this._formBuilder.group({
    subNomeEvento: new FormControl<any>({ value: null, disabled: this.isVisualizacao }, Validators.required),
    nomeEvento: new FormControl<any>({ value: null, disabled: this.isVisualizacao }, Validators.required),

    titulo: new FormControl<any>({ value: null, disabled: this.isVisualizacao }, Validators.required),
    texto: new FormControl<any>({ value: null, disabled: this.isVisualizacao }, Validators.required),

    dataEvento: new FormControl<any>({ value: null, disabled: this.isVisualizacao }),
    dataFimEvento: new FormControl<any>({ value: null, disabled: this.isVisualizacao }),
    horaEvento: new FormControl<any>({ value: null, disabled: this.isVisualizacao }),
    horaFimEvento: new FormControl<any>({ value: null, disabled: this.isVisualizacao }),


    infoEvento: new FormControl<any>({ value: null, disabled: this.isVisualizacao }, Validators.required),

    cep: new FormControl<any>({ value: null, disabled: this.isVisualizacao }),
    estado: new FormControl<any>({ value: null, disabled: this.isVisualizacao }),
    cidade: new FormControl<any>({ value: null, disabled: this.isVisualizacao }),
    bairro: new FormControl<any>({ value: null, disabled: this.isVisualizacao }),
    rua: new FormControl<any>({ value: null, disabled: this.isVisualizacao }),
    numero: new FormControl<any>({ value: null, disabled: this.isVisualizacao }),
    complemento: new FormControl<any>({ value: null, disabled: this.isVisualizacao }),
    textoRodape: new FormControl<any>({ value: null, disabled: this.isVisualizacao }),
  });

  configuracoesFormGroup = this._formBuilder.group({
    linkSite: new FormControl<any>({ value: null, disabled: this.isVisualizacao }, Validators.required),
  });



  _setFornsControl() {
    if (this.eventoSelecionado) {
      this.formGroup.patchValue(this.eventoSelecionado);
      this.firstFormGroup.patchValue(this.eventoSelecionado);
      this.secondFormGroup.patchValue(this.eventoSelecionado);
      this.eventoDadosSite_FormGroup.patchValue(this.eventoSelecionado);
      this.eventoDadosSite_FormGroup.get('horaEvento')?.setValue(this.eventoSelecionado.dataEvento);
      this.eventoDadosSite_FormGroup.get('horaFimEvento')?.setValue(this.eventoSelecionado.dataFimEvento);
      this.configuracoesFormGroup.patchValue(this.eventoSelecionado);


      this.downloadBase64Foto();


    }
  }

  ngOnInit(): void {
    this.buscarListaPresentes();

    this.formGroup = this.formBuilder.group({
      id: new FormControl<any>({ value: null, disabled: this.isVisualizacao }),
    });


    this.firstFormGroup?.get('idTema')?.valueChanges.pipe(
      distinctUntilChanged(), // Evita requisições desnecessárias
    ).subscribe(novoValor => {
      this.downloadBase64Foto_TemaSelecionado();

      setTimeout(() => {
        if (!this.firstFormGroup.valid) {
          this.stepper.selectedIndex = 0;
        } else if (!this.secondFormGroup.valid) {
          this.stepper.selectedIndex = 1;
        } else if (!this.presentesFormGroup.valid) {
          this.stepper.selectedIndex = 2;
        } else if (!this.eventoDadosSite_FormGroup.valid) {
          this.stepper.selectedIndex = 3;
        }
      }, 10);


    });

    this.getConsultaAuxiliares();


  }

  getConsultaAuxiliares() {
    const getListTema = this.temaService.getListTema();
    const getCategoria = this.consultaAuxiliaresService.categoria$;


    combineLatest([getListTema, getCategoria]).subscribe(([listTema, listCategoria]) => {
      this.categorias = listCategoria;
      this.temas = listTema;
      this.cdRef.detectChanges();
      this.downloadBase64Foto_TemaSelecionado();

    });
  }

  downloadBase64Foto_TemaSelecionado() {


    const novoTemaSelecionado = this.temas?.find(x => x.id == this.firstFormGroup?.get('idTema')?.value);


    if (novoTemaSelecionado?.arquivo && novoTemaSelecionado.id != this.temaSelecionado?.id) {
      const el = this.elementRef.nativeElement;
      el.style.setProperty('--cor-primaria', novoTemaSelecionado?.corPrimaria || '#fff');
      el.style.setProperty('--cor-secundaria', novoTemaSelecionado?.corSecundaria || '#000');
      el.style.setProperty('--cor-terciaria', novoTemaSelecionado?.corTerciaria || '#ccc');

      this.arquivoService.getArquivoBase64ByCaminho(novoTemaSelecionado.arquivo?.nomeArmazenado).subscribe({
        next: (response: ArquivoBase64) => {
          novoTemaSelecionado.arquivoBase64 = response;
          this.backgroundImageUrl = `linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url('${response.base64}')`;
          this.temaSelecionado = novoTemaSelecionado;
          this.cdRef.detectChanges();
        }
      });
    }


    this.temaSelecionado = novoTemaSelecionado;
    this.cdRef.detectChanges();
  }

  downloadBase64Foto() {

    if (this.eventoSelecionado?.eventoArquivo)
      this.eventoSelecionado?.eventoArquivo.filter(x => x.ativo).forEach(eventoArquivo => {
        if (eventoArquivo?.arquivo?.nomeArmazenado && !eventoArquivo.base64) {

          this.arquivoService.getArquivoBase64ByCaminho(eventoArquivo?.arquivo?.nomeArmazenado).subscribe({
            next: (response: ArquivoBase64) => {
              eventoArquivo.base64 = response.base64;
              this.cdRef.detectChanges();
            }
          });
        }
      });

  }

  onTemaSelecionado(tema?: Tema) {
    if (tema)
      this.firstFormGroup.get('idTema')?.setValue(tema?.id);
    this.habilitarSelecaoTema = false;
  }


  salvar(validarForm: boolean = true): void {


    if (validarForm && (!this.formGroup.valid ||
      !this.firstFormGroup.valid ||
      !this.secondFormGroup.valid ||
      !this.presentesFormGroup.valid
      || !(this.presentesFormGroup.get('presentes') as FormArray).valid)
    ) {


      if (!this.firstFormGroup.valid) {
        this.stepper.selectedIndex = 0;
      } else if (!this.secondFormGroup.valid) {
        this.stepper.selectedIndex = 1;
      } else if (!(this.presentesFormGroup.get('presentes') as FormArray).valid) {
        this.stepper.selectedIndex = 2;
      } else if (!this.eventoDadosSite_FormGroup.valid) {
        this.stepper.selectedIndex = 3;
      }

      this.firstFormGroup.markAllAsTouched();
      this.secondFormGroup.markAllAsTouched();
      this.presentesFormGroup.markAllAsTouched();
      this.eventoDadosSite_FormGroup.markAllAsTouched();


      this.onInvalidForm();

      return;
    }

    let eventoCadastro: EventoCadastro = {
      ...this.formGroup.value,
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.eventoDadosSite_FormGroup.value
    } as EventoCadastro;

    eventoCadastro.dataEvento = this.unificarCampoDataHora('dataEvento', 'horaEvento');
    eventoCadastro.dataFimEvento = this.unificarCampoDataHora('dataFimEvento', 'horaFimEvento');
    eventoCadastro.eventoArquivo = this.eventoArquivoCadastro;

    eventoCadastro.removerArquivos = this.removerArquivos;
    eventoCadastro.eventoPresente = (this.presentesFormGroup.get('presentes') as FormArray).value;




    this.subscription.add(
      this.eventoService.salvarEvento(eventoCadastro).subscribe({
        next: (response: Evento) => {
          this.eventoSelecionado = response;
          this._setFornsControl()
          //  this.output_fecharCadastroEdicao.emit({ houveAlteracao: true });
          if (validarForm)
            this.toastr.success('Evento salvo com sucesso!');

        }
      }),
    );

  }


  unificarCampoDataHora(dataControl: string, horaControl: string): Date | undefined {
    const data = this.eventoDadosSite_FormGroup.get(dataControl)?.value;
    const hora = this.eventoDadosSite_FormGroup.get(horaControl)?.value;

    if (!data || !hora) return undefined;

    try {
      const dataHoraUnificada = new Date(data);

      let horas: number;
      let minutos: number;

      if (typeof hora === 'string') {

        const horaDate = new Date(hora);
        if (isNaN(horaDate.getTime())) return undefined;

        horas = horaDate.getHours();
        minutos = horaDate.getMinutes();
      } else

        if (hora instanceof Date) {

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



  processArquivosCadastro(eventoArquivoCadastro: EventoArquivoCadastro[]) {
    this.eventoArquivoCadastro = eventoArquivoCadastro;
    this.salvar(false);

  }

  processRemoverArquivos(removerArquivos: number[]) {
    this.removerArquivos = removerArquivos;
    this.salvar(false);
  }

  getFormArray(): FormArray {
    return this.presentesFormGroup.get('presentes') as FormArray;
  }
  buscarListaPresentes(): void {
    if (!this.listPresentes) {
      this.subscription.add(
        this.presenteService.getListPresente().subscribe({
          next: (response: Presente[]) => {



            this.listPresentes = response;
            this.listPresentes.forEach(presente => {
              presente.eventoPresente = this._getPresenteEvento(presente);
            });
            const presentesArray = this.presentesFormGroup.get('presentes') as FormArray;

            if (this.listPresentes) {
              this.listPresentes.forEach(presente => {

                const presenteEvento = this.eventoSelecionado?.eventoPresente?.find(x => x.idPresente === presente.id);

                const _quantidade = presenteEvento ? presenteEvento.quantidade : presente.quantidadeSugerida;
                const _preco = presenteEvento ? presenteEvento.preco : presente.precoSugerido;
                const _ativo = presenteEvento ? presenteEvento.ativo : true;
                presentesArray.push(this.formBuilder.group({
                  id: new FormControl<any>({ value: presenteEvento?.id, disabled: this.isVisualizacao }),
                  idPresente: new FormControl<any>({ value: presente.id, disabled: this.isVisualizacao }),
                  ativo: new FormControl<any>({ value: _ativo, disabled: this.isVisualizacao }),
                  quantidade: new FormControl<any>({ value: _quantidade, disabled: this.isVisualizacao }),
                  preco: new FormControl<any>({ value: _preco, disabled: this.isVisualizacao }),
                }));
              });
            }
            this.presenteisReady = true;
            this.cdRef.markForCheck();
            this.cdRef.detectChanges();
            this.downloadPresenteBase64Foto();


          }
        }),
      );

    }

  }
  _getPresenteEvento(presente: Presente): EventoPresente {
    const presenteEventoPadrao: EventoPresente = {
      id: 0,
      idEvento: this.eventoSelecionado?.id ?? 0,
      idPresente: presente.id,
      ativo: true,
      quantidade: 10,
      preco: 10
    }

    return this.eventoSelecionado?.eventoPresente?.find(x => x.idPresente === presente.id) ?? presenteEventoPadrao;
  }

  downloadPresenteBase64Foto() {

    if (this.listPresentes)
      this.listPresentes.forEach(eventoArquivo => {
        if (eventoArquivo?.arquivo?.nomeArmazenado && !eventoArquivo.base64) {

          this.arquivoService.getArquivoBase64ByCaminho(eventoArquivo?.arquivo?.nomeArmazenado).subscribe({
            next: (response: ArquivoBase64) => {
              eventoArquivo.base64 = response.base64;


              this.cdRef.markForCheck();
              this.cdRef.detectChanges();
            }
          });
        }

      });

  }

}
