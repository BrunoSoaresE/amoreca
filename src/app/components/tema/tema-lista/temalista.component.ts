// import { Component, Injector, OnInit } from '@angular/core';
// import { FormBuilder } from '@angular/forms';
// import { EditBaseComponent } from '../../../shared/components/edit-base.component';
// import { Tema } from '../../../models/tema';
// import { TemaService } from '../../../services/tema/tema.service';


// @Component({
//   selector: 'app-tema-lista',
//   templateUrl: './tema-lista.component.html',
//   styleUrls: ['./tema-lista.component.scss']
// })
// export class TemaListaComponent extends EditBaseComponent implements OnInit {
//   temaSelecionado: Tema | undefined;
//   listTemas!: Tema[];
//   habilitarCadastroEdicaoTema: boolean = false;

//   constructor(
//     protected injector: Injector,
//     protected formBuilder: FormBuilder,
//     protected temaService: TemaService) { super(injector) }

//   ngOnInit() {
//     // this.getConsultaAuxiliares();
//     this.carregarTemas();



//   }

//   // getConsultaAuxiliares() {
//   //   const getTipoTema = this.consultaAuxiliaresService.tipoTema$;
//   //   const getTipoFormacao = this.consultaAuxiliaresService.tipoFormacao$;


//   //   combineLatest([getTipoTema, getTipoFormacao]).subscribe(([listTipoTema, listTipoFormacao]) => {
//   //     this.tiposTema = listTipoTema;
//   //     this.tiposTemaFiltro = this.tiposTema.map(tipo => ({
//   //       label: tipo.descricao,
//   //       value: tipo.id
//   //     }));

//   //     this.tipoFormacao = listTipoFormacao;
//   //     this.tipoFormacaoFiltro = listTipoFormacao.map(tipo => ({
//   //       label: tipo.descricao,
//   //       value: tipo.id
//   //     })) as SelectItem[];;

//   //   });
//   // }


//   carregarTemas() {
//     this.temaService.getListTema().subscribe(response => {
//       this.listTemas = response;
//     });
//   }

//   abrirCadastroEdicaoTema(tema?: Tema): void {
//     this.habilitarCadastroEdicaoTema = true;
//     this.temaSelecionado = tema;
//   }

//   fecharCadastroEdicaoTema(recarregarListaCursto: boolean = false): void {
//     this.habilitarCadastroEdicaoTema = false;
//     this.temaSelecionado = undefined;

//     if (recarregarListaCursto) {
//       this.carregarTemas();
//     }
//   }

//   excluirTema(tema: Tema): void {
//     // tema.ativo = false;

//     // this.temaService.inativar(tema.id).subscribe({
//     //   next: () => {
//     //     this.toastService.success('Tema excluido com sucesso!');
//     //     this.temaStore.buscarTemaLogado().subscribe();
//     //     this.carregarTemas();
//     //   },
//     //   error: (err) => {
//     //     console.error('Erro ao excluir tema:', err);
//     //     this.toastService.error('Erro ao excluir tema.', err);
//     //   }
//     // });
//   }

//   ativarTema(tema: Tema): void {
//     // tema.ativo = true;

//     // this.temaService.ativar(tema.id).subscribe({
//     //   next: () => {
//     //     this.toastService.success('Tema excluido com sucesso!');
//     //     this.temaStore.buscarTemaLogado().subscribe();
//     //     this.carregarTemas();
//     //   },
//     //   error: (err) => {
//     //     console.error('Erro ao excluir tema:', err);
//     //     this.toastService.error('Erro ao excluir tema.', err);
//     //   }
//     // });
//   }

//   // limparFiltros() {
//   //   this.pTable.reset(); // Limpa todos os filtros
//   // }



// }
