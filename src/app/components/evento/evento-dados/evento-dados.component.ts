import { Component, EventEmitter, Injector, Input, OnInit, Output, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EditBaseComponent } from '../../../shared/components/edit-base.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../../shared/shared.module';
import { Categoria } from '../../../models/categoria';
import { ConsultaAuxiliaresService } from '../../../services/consulta-auxiliares.service';
import { combineLatest } from 'rxjs';
import { Evento, EventoCadastro } from '../../../models/evento';
import { EventoService } from '../../../services/evento/evento.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Tema } from '../../../models/tema';
import { TemaService } from '../../../services/tema/tema.service';


@Component({
  standalone: true,
  selector: 'app-evento-dados',
  imports: [CommonModule, SharedModule, MatInputModule, MatIconModule, MatDatepickerModule],
  templateUrl: './evento-dados.component.html',
  styleUrls: ['./evento-dados.component.scss']
})
export class EventoDadosComponent extends EditBaseComponent implements OnInit {
  @Input() eventoSelecionado?: Evento;
  @Output() output_fecharCadastroEdicao = new EventEmitter<{ houveAlteracao: boolean }>();
  temas?: Tema[];



  constructor(protected injector: Injector,
    protected formBuilder: FormBuilder,
    private consultaAuxiliaresService: ConsultaAuxiliaresService,
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
      dataEvento: new FormControl({ value: null, disabled: this.isVisualizacao }, Validators.required),
      dataFimEvento: new FormControl({ value: null, disabled: this.isVisualizacao }),
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

    if (this.eventoSelecionado)
      this.formGroup.patchValue(this.eventoSelecionado);

    this.getConsultaAuxiliares();
  }



  salvar(): void {


    if (!this.formGroup.valid) {
      this.onInvalidForm();
      return;
    }

    let eventoCadastro = this.formGroup.getRawValue() as EventoCadastro;
    console.log("🚀 ~ EventoDadosComponent ~ salvar ~ eventoCadastro:", eventoCadastro)


    this.subscription.add(
      this.eventoService.salvarEvento(eventoCadastro).subscribe({
        next: (response: Evento) => {
          this.eventoSelecionado = response;
          // this.output_fecharCadastroEdicao.emit({ houveAlteracao: true });
          this.formGroup.reset(response);
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

    });
  }

}
