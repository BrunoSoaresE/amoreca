import { Component, Injector, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemaDadosComponent } from '../tema-dados/tema-dados.component';
import { MatTableModule } from '@angular/material/table';
import { FormGroup } from '@angular/forms';
import { TemaService } from '../../../services/tema/tema.service';
import { EditBaseComponent } from '../../../shared/components/edit-base.component';
import { Tema } from '../../../models/tema';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '../../../shared/shared.module';
import { ConsultaAuxiliaresService } from '../../../services/consulta-auxiliares.service';

@Component({
    standalone: true,
    selector: 'app-tema-lista',
    imports: [CommonModule, TemaDadosComponent, MatTableModule
        , MatMenuModule, MatButtonModule, MatIconModule, SharedModule
    ],
    templateUrl: './tema-lista.component.html',
    styleUrls: ['./tema-lista.component.scss']
})
export class TemaListaComponent extends EditBaseComponent implements OnInit {
    displayedColumns: string[] = ['descricao', 'nomeArquivo', 'categoria', 'cores', 'acao',];
    temaSelecionado?: Tema;
    habilitarCadastroEdicao: boolean = false;
    listTemas = signal<Tema[]>([]);;

    constructor(protected injector: Injector,
        private temaService: TemaService
    ) {
        super(injector);
    }
    ngOnInit(): void {
        this.buscarListaTemas();
    }


    buscarListaTemas(): void {

        this.subscription.add(
            this.temaService.getListTema().subscribe({
                next: (response: Tema[]) => {
                    this.listTemas.set(response);
                }
            }),
        );

    }

    abrirCadastroEdicao(tema?: Tema): void {
        this.habilitarCadastroEdicao = true;
        this.temaSelecionado = tema;
    }


    fecharCadastroEdicao(event?: any): void {

        this.habilitarCadastroEdicao = false;
        this.temaSelecionado = undefined;

        if ((event as any)?.houveAlteracao === true) {
            this.buscarListaTemas();
        }
        this.cdRef.detectChanges();
    }

    getCategoriaArray(tema: Tema): string[] {
        return (tema.temaCategoria ?? [])
            .map(ctf => ctf.categoria?.descricao || '')
            .filter(descricao => descricao !== '');
    }

}
