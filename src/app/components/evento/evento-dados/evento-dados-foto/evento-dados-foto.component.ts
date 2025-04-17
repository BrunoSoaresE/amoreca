import { CommonModule } from "@angular/common";
import { Component, OnInit, AfterViewInit, Input, Output, ViewChildren, QueryList, ElementRef, Injector } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTimepickerModule, MAT_TIMEPICKER_CONFIG } from "@angular/material/timepicker";
import EventEmitter from "events";
import { distinctUntilChanged, combineLatest } from "rxjs";
import { Arquivo, ArquivoBase64 } from "../../../../models/arquivo";
import { Evento, EventoCadastro } from "../../../../models/evento";
import { Tema } from "../../../../models/tema";
import { ArquivoService } from "../../../../services/arquivo/arquivo.service";
import { EventoService } from "../../../../services/evento/evento.service";
import { TemaService } from "../../../../services/tema/tema.service";
import { EditBaseComponent } from "../../../../shared/components/edit-base.component";
import { SharedModule } from "../../../../shared/shared.module";
import { TemaListaSelecionarComponent } from "../../../tema/tema-lista-selecionar/tema-lista-selecionar.component";


interface ArquivoItem {
  file: File;
  preview: string;
  isCapa: boolean;
}


@Component({
  standalone: true,
  selector: 'app-evento-dados-foto',
  imports: [CommonModule, SharedModule,],
  templateUrl: './evento-dados-foto.component.html',
  styleUrls: ['./evento-dados-foto.component.scss'],
})
export class EventoDadosFotoComponent extends EditBaseComponent implements OnInit {
  @Input() eventoSelecionado?: Evento;
  arquivos: ArquivoItem[] = [];

  constructor(protected injector: Injector,
    protected formBuilder: FormBuilder,
  ) {
    super(injector);

  }
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({      // Rodapé
      textoRodape: new FormControl({ value: null, disabled: this.isVisualizacao }),
    });
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    Array.from(input.files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        this.arquivos.push({
          file,
          preview: reader.result as string,
          isCapa: false
        });
        this.cdRef.detectChanges();
      };
      reader.readAsDataURL(file);
    });

    // limpa input para permitir reenvio do mesmo arquivo
    input.value = '';
  }

  definirComoCapa(index: number): void {
    this.arquivos.forEach((arquivo, i) => arquivo.isCapa = i === index);
  }

  removerArquivo(index: number): void {
    this.arquivos.splice(index, 1);


    // const temCapa = this.arquivos.some(a => a.isCapa);
    // if (!temCapa && this.arquivos.length > 0) {
    //   this.arquivos[0].isCapa = true; // define a primeira como capa por padrão
    // }
  }


}