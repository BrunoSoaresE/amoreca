import { Component, EventEmitter, Injector, Input, OnInit, Output, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PresenteService } from '../../../services/presente/presente.service';
import { EditBaseComponent } from '../../../shared/components/edit-base.component';
import { Presente, PresenteCadastro } from '../../../models/presente';
import { SharedModule } from '../../../shared/shared.module';
import { Categoria } from '../../../models/categoria';
import { ConsultaAuxiliaresService } from '../../../services/consulta-auxiliares.service';
import { combineLatest } from 'rxjs';


@Component({
  standalone: true,
  selector: 'app-presente-dados',
  imports: [CommonModule, SharedModule, MatInputModule,],
  templateUrl: './presente-dados.component.html',
  styleUrls: ['./presente-dados.component.scss']
})
export class PresenteDadosComponent extends EditBaseComponent implements OnInit {
  @Input() presenteSelecionado?: Presente;
  @Output() output_fecharCadastroEdicao = new EventEmitter<{ houveAlteracao: boolean }>();
  categorias?: Categoria[];

  arquivo?: File;
  arquivoBase64?: string;


  constructor(protected injector: Injector,
    protected formBuilder: FormBuilder,
    private consultaAuxiliaresService: ConsultaAuxiliaresService,
    private presenteService: PresenteService
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: new FormControl({ value: null, disabled: this.isVisualizacao }),

      descricao: new FormControl({ value: null, disabled: this.isVisualizacao }, Validators.required),
      listIdCategoria: new FormControl({ value: null, disabled: this.isVisualizacao }, Validators.required),
    });



    if (this.presenteSelecionado) {
      this.formGroup.patchValue(this.presenteSelecionado);
      this.arquivoBase64 = this.presenteSelecionado.base64;
    }
    this.getConsultaAuxiliares();

  }



  selecionarArquivo(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.arquivo = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.arquivoBase64 = reader.result as string;
        this.cdRef.detectChanges();
      };
      reader.readAsDataURL(this.arquivo);
      this.cdRef.detectChanges();
    }
  }



  salvar(): void {


    if (!this.formGroup.valid) {
      this.onInvalidForm();
      return;
    }

    let presenteCadastro = this.formGroup.getRawValue() as PresenteCadastro;
    console.log("🚀 ~ PresenteDadosComponent ~ salvar ~ presenteCadastro:", presenteCadastro)
    presenteCadastro.file = this.arquivo;


    this.subscription.add(
      this.presenteService.salvarPresente(presenteCadastro).subscribe({
        next: (response: Presente) => {
          this.presenteSelecionado = response;
          this.output_fecharCadastroEdicao.emit({ houveAlteracao: true });
          this.formGroup.reset(response);
          this.toastr.success('Presente salvo com sucesso!');

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
