import { Component, Injector, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventoDadosComponent } from '../evento-dados/evento-dados/evento-dados.component';
import { MatTableModule } from '@angular/material/table';
import { EditBaseComponent } from '../../../shared/components/edit-base.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '../../../shared/shared.module';
import { Evento } from '../../../models/evento';
import { EventoService } from '../../../services/evento/evento.service';

@Component({
    standalone: true,
    selector: 'app-evento-lista',
    imports: [CommonModule, EventoDadosComponent, MatTableModule
        , MatMenuModule, MatButtonModule, MatIconModule, SharedModule
    ],
    templateUrl: './evento-lista.component.html',
    styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent extends EditBaseComponent implements OnInit {
    displayedColumns: string[] = ['descricao', 'nomeArquivo', 'data', 'cores', 'acao',];
    eventoSelecionado?: Evento;
    habilitarCadastroEdicao: boolean = false;
    listEventos = signal<Evento[]>([]);;

    constructor(protected injector: Injector,
        private eventoService: EventoService
    ) {
        super(injector);
    }
    ngOnInit(): void {
        this.buscarListaEventos();
    }


    buscarListaEventos(): void {

        this.subscription.add(
            this.eventoService.getListEvento().subscribe({
                next: (response: Evento[]) => {
                    this.listEventos.set(response);
                }
            }),
        );

    }

    abrirCadastroEdicao(evento?: Evento): void {
        this.habilitarCadastroEdicao = true;
        this.eventoSelecionado = evento;
    }


    fecharCadastroEdicao(event?: any): void {

        this.habilitarCadastroEdicao = false;
        this.eventoSelecionado = undefined;

        if ((event as any)?.houveAlteracao === true) {
            this.buscarListaEventos();
        }
        this.cdRef.detectChanges();
    }



}
