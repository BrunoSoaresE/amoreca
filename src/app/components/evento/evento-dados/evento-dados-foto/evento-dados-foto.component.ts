import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { EditBaseComponent } from '../../../../shared/components/edit-base.component';
import { ArquivoService } from '../../../../services/arquivo/arquivo.service';
import { Evento } from '../../../../models/evento/evento';
import { EventoArquivoCadastro } from '../../../../models/evento/evento-arquivo';

@Component({
  standalone: true,
  selector: 'app-evento-dados-foto',
  imports: [CommonModule, SharedModule,],
  templateUrl: './evento-dados-foto.component.html',
  styleUrls: ['./evento-dados-foto.component.scss'],
})
export class EventoDadosFotoComponent extends EditBaseComponent implements OnInit {
  @Input() eventoSelecionado?: Evento;
  @Output() output_arquivos = new EventEmitter<EventoArquivoCadastro[]>();
  @Output() output_removeArquivos = new EventEmitter<number[]>();

  arquivos: EventoArquivoCadastro[] = [];
  removeArquivos: number[] = [];

  constructor(protected injector: Injector,
    protected formBuilder: FormBuilder,
    protected arquivoService: ArquivoService,
  ) {
    super(injector);

  }
  ngOnInit(): void {

    this.formatarArquivos();
    this.formGroup = this.formBuilder.group({
      //   textoRodape: new FormControl({ value: null, disabled: this.isVisualizacao }),
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventoSelecionado']) {
      setTimeout(() => {
        this.formatarArquivos();
      }, 50);

    }
  }

  formatarArquivos() {
    this.arquivos = [];
    let possuiArquivoNaoBaixado = false

    if (this.eventoSelecionado?.eventoArquivo)
      this.eventoSelecionado.eventoArquivo.filter(x => x.ativo).forEach(element => {

        var novoArquivo: EventoArquivoCadastro = {
          id: element.id,
          file: undefined,
          base64: element.base64,
          capa: element.capa,
          arquivo: element.arquivo
        }

        if (!element.base64)
          possuiArquivoNaoBaixado = true

        this.arquivos.push(novoArquivo);
      });


    if (possuiArquivoNaoBaixado) {
      setTimeout(() => {
        this.formatarArquivos();
      }, 10);
    }

    this.cdRef.detectChanges();
  }






  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    Array.from(input.files).forEach(file => {
      var novoArquivo: EventoArquivoCadastro = {
        file,
        capa: false
      }
      this.arquivos.push(novoArquivo);
    });

    input.value = '';
    this.output_arquivos.emit(this.arquivos);


  }

  definirComoCapa(index: number): void {
    this.arquivos.forEach((arquivo, i) => arquivo.capa = i === index);
    this.output_arquivos.emit(this.arquivos);

  }

  removerArquivo(index: number): void {
    if (this.arquivos[index].id) {
      this.removeArquivos.push(this.arquivos[index].id);
      this.output_removeArquivos.emit(this.removeArquivos);

    }
    this.arquivos.splice(index, 1);



    // const temCapa = this.arquivos.some(a => a.isCapa);
    // if (!temCapa && this.arquivos.length > 0) {
    //   this.arquivos[0].isCapa = true; // define a primeira como capa por padrão
    // }
  }


}