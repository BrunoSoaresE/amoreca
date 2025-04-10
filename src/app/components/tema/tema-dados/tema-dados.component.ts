// import { Component, EventEmitter, Injector, Input, OnInit, Output, } from '@angular/core';
// import { FormBuilder, FormControl, Validators } from '@angular/forms';
// import { InstrutorService } from 'src/app/_core/services/instrutor/instrutor.service';
// import { Instrutor, InstrutorCadastroEdicao } from 'src/app/models/instrutor/instrutor';
// import { EditBaseComponent } from 'src/app/_shared/components/common/edit-base.component';
// import { TipoInstrutor } from 'src/app/models/instrutor/tipo-instrutor';
// import { InstrutorStore } from 'src/app/_shared/services/storage/instrutor.storage';
// import { TipoFormacao } from 'src/app/models/colaborador/formacao/tipo-formacao';

// @Component({
//   selector: 'app-instrutores-dados',
//   templateUrl: './instrutores-dados.component.html',
//   styleUrls: ['./instrutores-dados.component.scss']
// })
// export class InstrutoresDadosComponent extends EditBaseComponent implements OnInit {
//   @Input() instrutor: Instrutor | undefined;
//   @Input() dadosTiposInstrutor!: TipoInstrutor[];
//   @Input() dadosTipoFormacao!: TipoFormacao[];

//   @Output() output_fecharCadastroEdicao = new EventEmitter<{ houveAlteracao: boolean }>();


//   constructor(protected injector: Injector,
//     protected formBuilder: FormBuilder,
//     protected instrutorService: InstrutorService,
//     protected instrutorStore: InstrutorStore,
//   ) { super(injector) }

//   ngOnInit() {
//     this.onLoadForm();
//     this.definirForm();
//   }

//   private definirForm() {
//     this.formGroup = this.formBuilder.group({
//       id: new FormControl({ value: null, disabled: this.isVisualizacao }),
//       nome: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(255)]),
//       cpfCnpj: new FormControl({ value: null, disabled: this.isVisualizacao }, [Validators.required, Validators.maxLength(18)]),
//       email: new FormControl({ value: null, disabled: this.isVisualizacao }, [Validators.required, Validators.email]),
//       telefone: new FormControl({ value: null, disabled: this.isVisualizacao },),
//       idTipoInstrutor: new FormControl({ value: null, disabled: this.isVisualizacao }, Validators.required),
//       listIdTipoFormacao: new FormControl({ value: null, disabled: this.isVisualizacao }, Validators.required),
//     });
//     this.popularForm();
//   }

//   private popularForm() {
//     if (this.instrutor) {
//       this.formGroup.patchValue(this.instrutor);

//       if (this.instrutor?.pessoa) {
//         this.formGroup.get('cpfCnpj')?.setValue(this.instrutor.pessoa.cpf);
//         this.formGroup.get('nome')?.setValue(this.instrutor.pessoa.nome);
//       }
//     }
//   }

//   public salvarInstrutor() {
//     var nomeValue = this.formGroup.get('nome')?.value
//     if (nomeValue === null || nomeValue === '' || nomeValue === undefined) {
//       this.formGroup?.get('nome')?.setErrors({ invalid: true });
//       this.formGroup?.setErrors({ invalid: true });
//     }

//     if (!this.formGroup.valid) {
//       this.onInvalidForm();
//       return;
//     }
//     const instrutorCadastroEdicao = this.formGroup.getRawValue() as InstrutorCadastroEdicao;

//     if (this.instrutor) {
//       this.atualizar(instrutorCadastroEdicao);
//     } else {
//       this.cadastrar(instrutorCadastroEdicao)
//     }
//   }

//   private atualizar(instrutor: InstrutorCadastroEdicao) {
//     this.instrutorService.editar(instrutor).subscribe(() => {
//       this.toastService.success('Instrutor atualizado com sucesso!');
//       this.output_fecharCadastroEdicao.emit({ houveAlteracao: true });
//       this.instrutorStore.buscarInstrutorLogado().subscribe();

//     })
//   }

//   private cadastrar(instrutor: InstrutorCadastroEdicao) {
//     this.instrutorService.salvar(instrutor).subscribe(() => {
//       this.toastService.success('Instrutor cadastrado com sucesso!');
//       this.output_fecharCadastroEdicao.emit({ houveAlteracao: true });
//       this.instrutorStore.buscarInstrutorLogado().subscribe();

//     })
//   }

//   fecharCadastroEdicao() {
//     this.output_fecharCadastroEdicao.emit({ houveAlteracao: false });
//   }


// }

