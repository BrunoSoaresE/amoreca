import { AfterViewInit, Component, EventEmitter, inject, Injector, Input, OnInit, Output, QueryList, ViewChild, ViewChildren, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EditBaseComponent } from '../../../../shared/components/edit-base.component';
import { SharedModule } from '../../../../shared/shared.module';
import { EventoService } from '../../../../services/evento/evento.service';
import { Tema } from '../../../../models/tema';
import { TemaService } from '../../../../services/tema/tema.service';
import { ArquivoService } from '../../../../services/arquivo/arquivo.service';
import { distinctUntilChanged, combineLatest, debounceTime, startWith } from 'rxjs';
import { ArquivoBase64 } from '../../../../models/arquivo';
import { Categoria } from '../../../../models/categoria';
import { Evento, EventoCadastro } from '../../../../models/evento/evento';
import { EventoArquivoCadastro } from '../../../../models/evento/evento-arquivo';
import { EventoPresente } from '../../../../models/evento/evento-presente';
import { Presente } from '../../../../models/presente';
import { ConsultaAuxiliaresService } from '../../../../services/consulta-auxiliares.service';
import { PresenteService } from '../../../../services/presente/presente.service';
import { EventoDadosPresenteComponent } from '../../evento-dados/evento-dados-presente/evento-dados-presente.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { EventoConfirmacaoPresenca } from '../../../../models/evento/evento-confirmacao-presenca';
import { GerenciarEventoPresencaComponent } from '../../gerenciar-evento/gerenciar-evento-presenca/gerenciar-evento-presenca.component';
import { ActivatedRoute } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { TabPersonaliseComponent } from './tabs/tab-personalise/tab-personalise.component';
import { TabListaPresenteComponent } from './tabs/tab-lista-presente/tab-lista-presente.component';

@Component({
  standalone: true,
  selector: 'app-evento-dados',
  imports: [CommonModule, SharedModule, MatInputModule, MatExpansionModule, GerenciarEventoPresencaComponent, MatTabsModule, TabPersonaliseComponent
    , TabListaPresenteComponent],
  templateUrl: './evento-dados.component.html',
  styleUrls: ['./evento-dados.component.scss'],
})
export class EventoDadosNewComponent extends EditBaseComponent implements OnInit, AfterViewInit {


  idEvento?: number;
  eventoSelecionado?: Evento;


  temas?: Tema[];
  categorias?: Categoria[];
  temaSelecionado?: Tema;
  backgroundImageUrl?: string;
  eventoArquivoCadastro?: EventoArquivoCadastro[];
  removerArquivos?: number[]



  lista: EventoConfirmacaoPresenca[] = [];


  habilitar_ListaPresente?: boolean;
  habilitar_Gerenciar?: boolean;



  constructor(protected injector: Injector,
    protected formBuilder: FormBuilder,
    private arquivoService: ArquivoService,
    private temaService: TemaService,
    private eventoService: EventoService,
    private presenteService: PresenteService,
    private consultaAuxiliaresService: ConsultaAuxiliaresService,
    private route: ActivatedRoute
  ) {
    super(injector);

  }
  ngAfterViewInit(): void {
    this._setFornsControl();
  }
  private _formBuilder = inject(FormBuilder);

  formGroup_categoriaTema = this._formBuilder.group({
    idTema: new FormControl<any>({ value: (null as number | null), disabled: this.isVisualizacao }, Validators.required),
    idCategoria: new FormControl<any>({ value: (null as number | null), disabled: this.isVisualizacao }, Validators.required),
  });
  formGroup_fotos = this._formBuilder.group({
    // linkSite: new FormControl<any>({ value: null, disabled: this.isVisualizacao }, Validators.required),
  });

  presentesFormGroup = this._formBuilder.group({
    presentes: this._formBuilder.array([])
  });

  formGroup_editeSeuSite = this._formBuilder.group({
    subNomeEvento: new FormControl<any>({ value: null, disabled: this.isVisualizacao }, Validators.required),
    nomeEvento: new FormControl<any>({ value: null, disabled: this.isVisualizacao }, Validators.required),
    idTipoContador: new FormControl<any>({ value: null, disabled: this.isVisualizacao }, Validators.required),
    semanaGravidezAtual: new FormControl<any>({ value: null, disabled: this.isVisualizacao }),
    idDiaSemana: new FormControl<any>({ value: null, disabled: this.isVisualizacao }),

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

  formGroup_Link = this._formBuilder.group({
    linkSite: new FormControl<any>({ value: null, disabled: this.isVisualizacao }, Validators.required),
  });

  //     this.formGroup = this.formBuilder.group({
  //   presencas: this.formBuilder.array(this.lista.map(p => this.createPresencaForm(p)))
  // });


  gerenciarFormGroup = this._formBuilder.group({
    presencas: this._formBuilder.array([])
  });


  _setFornsControl() {
    if (this.eventoSelecionado) {
      this.formGroup.patchValue(this.eventoSelecionado);
      this.formGroup_categoriaTema.patchValue(this.eventoSelecionado);
      this.formGroup_fotos.patchValue(this.eventoSelecionado);
      this.formGroup_editeSeuSite.patchValue(this.eventoSelecionado);
      this.formGroup_editeSeuSite.get('horaEvento')?.setValue(this.eventoSelecionado.dataEvento);
      this.formGroup_editeSeuSite.get('horaFimEvento')?.setValue(this.eventoSelecionado.dataFimEvento);
      this.formGroup_Link.patchValue(this.eventoSelecionado);

      //todo
      // if (this.stepper) {
      //   this.stepper.steps.forEach((step, index) => {
      //     let currentFormValid: boolean = false;

      //     if (index === 0) currentFormValid = this.formGroup_categoriaTema.valid;
      //     else if (index === 1) currentFormValid = this.formGroup_fotos.valid;
      //     else if (index === 2) currentFormValid = this.formGroup_editeSeuSite.valid;
      //     else if (index === 3) currentFormValid = this.presentesFormGroup.valid;
      //     else if (index === 4) currentFormValid = this.formGroup_Link.valid;
      //     else if (index === 5) currentFormValid = this.gerenciarFormGroup.valid;

      //     if (step && currentFormValid) {
      //       step.completed = true;
      //     }

      //   });

      //   this.cdRef.detectChanges();
      // }



      this.downloadBase64Foto();


    }
  }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      id: new FormControl<any>({ value: null, disabled: this.isVisualizacao }),
    });


    this.formGroup_categoriaTema?.get('idTema')?.valueChanges.pipe(
      distinctUntilChanged(), // Evita requisições desnecessárias
    ).subscribe(novoValor => {
      this.downloadBase64Foto_TemaSelecionado();

      //  setTimeout(() => {

      //todo
      // if (!this.formGroup_categoriaTema.valid) {
      //   this.stepper.selectedIndex = 0;
      // } else if (!this.formGroup_fotos.valid) {
      //   this.stepper.selectedIndex = 1;
      // } else if (!this.formGroup_editeSeuSite.valid) {
      //   this.stepper.selectedIndex = 2;
      // } else if (!this.presentesFormGroup.valid) {
      //   this.stepper.selectedIndex = 3;
      // } else if (!this.formGroup_Link.valid) {
      //   this.stepper.selectedIndex = 4;
      // } else {
      //   this.stepper.selectedIndex = 5;
      // }

      //}, 10);


    });

    this.getConsultaAuxiliares();


    const formGroup_categoriaTema$ = this.formGroup_categoriaTema!.valueChanges.pipe(
      debounceTime(100),
      startWith(this.formGroup_categoriaTema!.value)
    );

    const formGroup_editeSeuSite$ = this.formGroup_editeSeuSite!.valueChanges.pipe(
      debounceTime(600),
      startWith(this.formGroup_editeSeuSite!.value)
    );

    const formGroup_Link$ = this.formGroup_Link!.valueChanges.pipe(
      debounceTime(600),
      startWith(this.formGroup_Link!.value)
    );

    combineLatest([formGroup_categoriaTema$, formGroup_editeSeuSite$, formGroup_Link$]).subscribe(([status1, status2, status3]) => {
      this.habilitar_ListaPresente = this.formGroup_categoriaTema.valid && this.existeFotoAnexada() && this.formGroup_editeSeuSite.valid && this.formGroup_Link.valid;
      this.habilitar_Gerenciar = this.formGroup_categoriaTema.valid && this.existeFotoAnexada() && this.formGroup_editeSeuSite.valid && this.formGroup_Link.valid;
      this.cdRef.detectChanges();

    });

    this.subscription.add(
      this.route.params.subscribe((params) => {
        if (!params['idEvento']) {
          return;
        }
        this.idEvento = parseInt(params['idEvento']);
        this.buscarEventoById();
      })
    );


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


    const novoTemaSelecionado = this.temas?.find(x => x.id == this.formGroup_categoriaTema?.get('idTema')?.value);


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
          this.cdRef.markForCheck();
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

              if (this.eventoSelecionado)
                this.eventoSelecionado = { ...this.eventoSelecionado };
              this.cdRef.markForCheck();
              this.cdRef.detectChanges();
            }
          });
        }
      });

  }




  salvar(validarForm: boolean = true): void {


    if (validarForm && (!this.formGroup.valid ||
      !this.formGroup_editeSeuSite.valid ||
      !this.formGroup_categoriaTema.valid ||
      !this.formGroup_fotos.valid ||
      !this.presentesFormGroup.valid
      || !(this.presentesFormGroup.get('presentes') as FormArray).valid
      || !this.gerenciarFormGroup.valid)
    ) {

      //todo
      if (!this.formGroup_categoriaTema.valid) {
        // this.stepper.selectedIndex = 0;
        this.onInvalidForm(undefined, this.formGroup_categoriaTema);
      } else if (!this.formGroup_fotos.valid) {
        // this.stepper.selectedIndex = 1;
        this.onInvalidForm(undefined, this.formGroup_fotos);
      } else if (!(this.presentesFormGroup.get('presentes') as FormArray).valid) {
        //this.stepper.selectedIndex = 3;
        this.onInvalidForm(undefined, this.presentesFormGroup);
      } else if (!this.formGroup_editeSeuSite.valid) {
        // this.stepper.selectedIndex = 2;
        this.onInvalidForm(undefined, this.formGroup_editeSeuSite);
      } else if (!this.gerenciarFormGroup.valid) {
        // this.stepper.selectedIndex = 5;
        this.onInvalidForm(undefined, this.gerenciarFormGroup);
      }



      // this.formGroup_categoriaTema.markAllAsTouched();
      // this.formGroup_fotos.markAllAsTouched();
      // this.presentesFormGroup.markAllAsTouched();
      // this.formGroup_editeSeuSite.markAllAsTouched();




      return;
    }
    let teste = this.gerenciarFormGroup.value;
    console.log("🚀 ~ EventoDadosComponent ~ salvar ~ teste:", teste)

    let eventoCadastro: EventoCadastro = {
      ...this.formGroup.value,
      ...this.formGroup_categoriaTema.value,
      ...this.formGroup_fotos.value,
      ...this.formGroup_editeSeuSite.value,
      ...this.formGroup_Link.value,
      ...this.gerenciarFormGroup.value,
    } as EventoCadastro;

    eventoCadastro.dataEvento = this.unificarCampoDataHora('dataEvento', 'horaEvento');
    eventoCadastro.dataFimEvento = this.unificarCampoDataHora('dataFimEvento', 'horaFimEvento');
    eventoCadastro.eventoArquivo = this.eventoArquivoCadastro;

    eventoCadastro.removerArquivos = this.removerArquivos;
    eventoCadastro.eventoPresente = ((this.presentesFormGroup.get('presentes') as FormArray).value as EventoPresente[]).filter(x => x.ativo);


    this.subscription.add(
      this.eventoService.salvarEvento(eventoCadastro).subscribe({
        next: (response: Evento) => {
          this.eventoSelecionado = response;
          this.eventoArquivoCadastro = undefined;



          this._setFornsControl()
          //  this.output_fecharCadastroEdicao.emit({ houveAlteracao: true });
          if (validarForm)
            this.toastr.success('Evento salvo com sucesso!');

          this.cdRef.detectChanges;

        }
      }),
    );

  }


  unificarCampoDataHora(dataControl: string, horaControl: string): Date | undefined {
    const data = this.formGroup_editeSeuSite.get(dataControl)?.value;
    const hora = this.formGroup_editeSeuSite.get(horaControl)?.value;

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





  getFormArray(): FormArray {
    return this.presentesFormGroup.get('presentes') as FormArray;
  }

  buscarEventoById(): void {
    if (this.idEvento) {
      this.subscription.add(
        this.eventoService.getEventoById(this.idEvento).subscribe({
          next: (response: Evento) => {
            this.eventoSelecionado = response;
            this._setFornsControl();

            this.cdRef.detectChanges();



          }
        }),
      );

    }

  }




  contarTotalPessoas(): number {
    return this.lista.reduce((total, convidado) => {
      // Soma 1 para o convidado principal + o número de acompanhantes
      return total + 1 + convidado.acompanhantes.length;
    }, 0);
  }

  existeFotoAnexada(): boolean {
    return this.eventoSelecionado?.eventoArquivo?.length ?? 0 > 0 ? true : false;
  }


}
