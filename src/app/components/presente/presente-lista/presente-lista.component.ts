import { ChangeDetectionStrategy, Component, Injector, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresenteDadosComponent } from '../presente-dados/presente-dados.component';
import { MatTableModule } from '@angular/material/table';
import { PresenteService } from '../../../services/presente/presente.service';
import { EditBaseComponent } from '../../../shared/components/edit-base.component';
import { Presente } from '../../../models/presente';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '../../../shared/shared.module';
import { ArquivoService } from '../../../services/arquivo/arquivo.service';
import { ArquivoBase64 } from '../../../models/arquivo';

@Component({
    standalone: true,
    selector: 'app-presente-lista',
    imports: [CommonModule, PresenteDadosComponent, MatTableModule
        , MatMenuModule, MatButtonModule, SharedModule
    ],
    templateUrl: './presente-lista.component.html',
    styleUrls: ['./presente-lista.component.scss'],

})
export class PresenteListaComponent extends EditBaseComponent implements OnInit {
    displayedColumns: string[] = ['descricao', 'nomeArquivo', 'categoria', 'acao',];
    presenteSelecionado?: Presente;
    habilitarCadastroEdicao: boolean = false;
    listPresentes?: Presente[];

    constructor(protected injector: Injector,
        private presenteService: PresenteService,
        private arquivoService: ArquivoService
    ) {
        super(injector);
    }
    ngOnInit(): void {
        this.buscarListaPresentes();
    }


    buscarListaPresentes(): void {

        this.subscription.add(
            this.presenteService.getListPresente().subscribe({
                next: (response: Presente[]) => {

                    this.listPresentes = response;
                    this.cdRef.markForCheck();
                    this.cdRef.detectChanges();
                    this.downloadBase64Foto();
                }
            }),
        );

    }

    abrirCadastroEdicao(presente?: Presente): void {
        this.habilitarCadastroEdicao = true;
        this.presenteSelecionado = presente;
    }


    fecharCadastroEdicao(event?: any): void {

        this.habilitarCadastroEdicao = false;
        this.presenteSelecionado = undefined;

        if ((event as any)?.houveAlteracao === true) {
            this.buscarListaPresentes();
        }
        this.cdRef.detectChanges();
    }

    getCategoriaArray(presente: Presente): string[] {
        return (presente.presenteCategoria ?? [])
            .map(ctf => ctf.categoria?.descricao || '')
            .filter(descricao => descricao !== '');
    }


    downloadBase64Foto() {

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
