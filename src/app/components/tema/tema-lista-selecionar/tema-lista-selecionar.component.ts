import { Component, EventEmitter, Injector, Input, OnInit, Output, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditBaseComponent } from '../../../shared/components/edit-base.component';
import { Tema } from '../../../models/tema';

import { SharedModule } from '../../../shared/shared.module';
import { TemaService } from '../../../services/tema/tema.service';
import { ArquivoService } from '../../../services/arquivo/arquivo.service';
import { ArquivoBase64 } from '../../../models/arquivo';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TemaConfirmacaoDialogComponent } from '../tema-confirmacao-dialog/tema-confirmacao-dialog.component';

@Component({
  standalone: true,
  selector: 'app-tema-lista-selecionar',
  imports: [CommonModule, SharedModule, MatInputModule
  ],
  templateUrl: './tema-lista-selecionar.component.html',
  styleUrls: ['./tema-lista-selecionar.component.scss']
})
export class TemaListaSelecionarComponent extends EditBaseComponent implements OnInit {
  @Input() temaSelecionado?: Tema;
  @Output() temaSelecionadoChange = new EventEmitter<Tema>();
  listTemas?: Tema[];
  listTemasFiltrado?: Tema[];

  constructor(protected injector: Injector,
    private temaService: TemaService,
    private arquivoService: ArquivoService,
    protected formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    super(injector);
  }



  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      filtro: new FormControl({ value: null, disabled: this.isVisualizacao }),
    });
    this.buscarListaTemas();


    this.formGroup?.get('filtro')?.valueChanges.subscribe((value) => {
      console.log("🚀 ~ TemaListaSelecionarComponent ~ this.formGroup?.get ~ value:", value)

      this.listTemasFiltrado = value && this.listTemas ? this.listTemas.filter(t =>
        t.descricao.toLowerCase().includes(value.toLowerCase())
      ) : this.listTemas;

    });

  }




  buscarListaTemas(): void {

    this.subscription.add(
      this.temaService.getListTema().subscribe({
        next: (response: Tema[]) => {
          this.listTemas = response;
          this.listTemasFiltrado = response;
          this.downloadBase64Foto();
        }
      }),
    );

  }





  selecionarTema(tema: Tema) {
    // 
    const dialogRef = this.dialog.open(TemaConfirmacaoDialogComponent, {
      width: '500px',
      maxHeight: '90vh', // garante que nunca ultrapasse a viewport
      panelClass: 'no-scroll-dialog',
      data: { tema }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.temaSelecionado = tema;
        this.temaSelecionadoChange.emit(tema);
      }
    });
  }

  getImagem(tema: Tema): string {

    return tema.arquivoBase64?.base64 ?? '';
  }

  downloadBase64Foto() {

    this.listTemas?.forEach((item) => {
      if (!item.arquivoBase64 && item.arquivo?.nomeArmazenado) {

        this.subscription.add(
          this.arquivoService.getArquivoBase64ByCaminho(item.arquivo?.nomeArmazenado).subscribe({
            next: (response: ArquivoBase64) => {
              item.arquivoBase64 = response;
              this.cdRef.detectChanges();
            }
          }),
        );

      }

    });




  }

}
