import { Component, ElementRef, EventEmitter, inject, Injector, Input, OnInit, Output, QueryList, ViewChildren, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EditBaseComponent } from '../../../shared/components/edit-base.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../../shared/shared.module';
import { Evento, } from '../../../models/evento';
import { EventoService } from '../../../services/evento/evento.service';
import { Tema } from '../../../models/tema';
import { TemaService } from '../../../services/tema/tema.service';
import { ArquivoService } from '../../../services/arquivo/arquivo.service';
import { MAT_TIMEPICKER_CONFIG } from '@angular/material/timepicker';
import { format } from 'path';
import { EventoDadosSiteComponent } from './evento-dados-site/evento-dados-site.component';
import { MatStepperModule } from '@angular/material/stepper';
import { TemaListaSelecionarComponent } from '../../tema/tema-lista-selecionar/tema-lista-selecionar.component';
import { combineLatest, distinctUntilChanged } from 'rxjs';
import { ArquivoBase64 } from '../../../models/arquivo';
import { EventoDadosFotoComponent } from './evento-dados-foto/evento-dados-foto.component';


@Component({
  standalone: true,
  selector: 'app-evento-dados',
  imports: [CommonModule, SharedModule, MatInputModule, MatIconModule, EventoDadosSiteComponent, MatStepperModule, TemaListaSelecionarComponent
    , EventoDadosFotoComponent
  ],
  templateUrl: './evento-dados.component.html',
  styleUrls: ['./evento-dados.component.scss'],
  providers: [
    {
      provide: MAT_TIMEPICKER_CONFIG,
      useValue: { interval: '15 minutes', format: '24' },
    }
  ]
})
export class EventoDadosComponent extends EditBaseComponent implements OnInit {
  @Input() eventoSelecionado?: Evento;
  @Output() output_fecharCadastroEdicao = new EventEmitter<{ houveAlteracao: boolean }>();
  habilitarSelecaoTema: boolean = false;
  temas?: Tema[];
  temaSelecionado?: Tema;
  backgroundImageUrl?: string;


  constructor(protected injector: Injector,
    protected formBuilder: FormBuilder,
    private arquivoService: ArquivoService,
    private temaService: TemaService,
    private eventoService: EventoService
  ) {
    super(injector);

  }
  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    idTema: new FormControl({ value: (undefined as number | undefined), disabled: this.isVisualizacao }, Validators.required),
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['',],
  });


  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      id: new FormControl({ value: null, disabled: this.isVisualizacao }),
    });

    if (this.eventoSelecionado) {
      this.formGroup.patchValue(this.eventoSelecionado);
      this.firstFormGroup.patchValue(this.eventoSelecionado);
    }

    this.firstFormGroup?.get('idTema')?.valueChanges.pipe(
      distinctUntilChanged(), // Evita requisições desnecessárias
    ).subscribe(novoValor => {
      this.downloadBase64Foto_TemaSelecionado();
    });

    this.getConsultaAuxiliares();

  }

  getConsultaAuxiliares() {
    const getListTema = this.temaService.getListTema();


    combineLatest([getListTema]).subscribe(([listTema]) => {
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

  onTemaSelecionado(tema?: Tema) {
    this.firstFormGroup.get('idTema')?.setValue(tema?.id);
    this.habilitarSelecaoTema = false;
  }






}
