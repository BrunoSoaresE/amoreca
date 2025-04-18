import { Component, EventEmitter, Injector, Input, OnInit, Output, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TemaService } from '../../../services/tema/tema.service';
import { EditBaseComponent } from '../../../shared/components/edit-base.component';
import { Tema, TemaCadastro } from '../../../models/tema';
import { SharedModule } from '../../../shared/shared.module';
import { Categoria } from '../../../models/categoria';
import { ConsultaAuxiliaresService } from '../../../services/consulta-auxiliares.service';
import { combineLatest } from 'rxjs';


@Component({
  standalone: true,
  selector: 'app-tema-dados',
  imports: [CommonModule, SharedModule, MatInputModule,],
  templateUrl: './tema-dados.component.html',
  styleUrls: ['./tema-dados.component.scss']
})
export class TemaDadosComponent extends EditBaseComponent implements OnInit {
  @Input() temaSelecionado?: Tema;
  @Output() output_fecharCadastroEdicao = new EventEmitter<{ houveAlteracao: boolean }>();
  categorias?: Categoria[];

  arquivo?: File;


  constructor(protected injector: Injector,
    protected formBuilder: FormBuilder,
    private consultaAuxiliaresService: ConsultaAuxiliaresService,
    private temaService: TemaService
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: new FormControl({ value: null, disabled: this.isVisualizacao }),

      descricao: new FormControl({ value: null, disabled: this.isVisualizacao }, Validators.required),
      corPrimaria: new FormControl({ value: null, disabled: this.isVisualizacao },),
      corSecundaria: new FormControl({ value: null, disabled: this.isVisualizacao },),
      corTerciaria: new FormControl({ value: null, disabled: this.isVisualizacao },),
      listIdCategoria: new FormControl({ value: null, disabled: this.isVisualizacao }, Validators.required),
    });



    this.controlarObrigatoriedadeCampos();
    if (this.temaSelecionado)
      this.formGroup.patchValue(this.temaSelecionado);

    this.getConsultaAuxiliares();
  }

  controlarObrigatoriedadeCampos() {
    const coresFild = [
      'corPrimaria',
      'corSecundaria',
      'corTerciaria',
    ];

    if (this.temaSelecionado?.id) {
      coresFild.forEach(fieldName => {
        const field = this.formGroup.get(fieldName);
        field?.setValidators([Validators.required]);
        field?.updateValueAndValidity({ emitEvent: false });
      });
    } else {
      coresFild.forEach(fieldName => {
        const field = this.formGroup.get(fieldName);
        field?.clearValidators();
        field?.setValue(null);
        field?.updateValueAndValidity({ emitEvent: false });
      });
    }

  }

  selecionarArquivo(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.arquivo = input.files[0];
    }
  }



  salvar(): void {


    if (!this.formGroup.valid) {
      this.onInvalidForm();
      return;
    }

    let temaCadastro = this.formGroup.getRawValue() as TemaCadastro;
    console.log("🚀 ~ TemaDadosComponent ~ salvar ~ temaCadastro:", temaCadastro)
    temaCadastro.file = this.arquivo;


    this.subscription.add(
      this.temaService.salvarTema(temaCadastro).subscribe({
        next: (response: Tema) => {
          this.temaSelecionado = response;
          // this.output_fecharCadastroEdicao.emit({ houveAlteracao: true });
          this.formGroup.reset(response);
          this.toastr.success('Tema salvo com sucesso!');

        }
      }),
    );

  }

  getConsultaAuxiliares() {
    const getCategoria = this.consultaAuxiliaresService.categoria$;


    combineLatest([getCategoria]).subscribe(([listCategoria]) => {
      this.categorias = listCategoria;

    });
  }

}
