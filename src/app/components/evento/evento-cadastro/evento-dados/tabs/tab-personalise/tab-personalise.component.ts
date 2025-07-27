import { CommonModule } from "@angular/common";
import { Component, OnInit, Injector, Input, EventEmitter, Output, ElementRef, QueryList, ViewChildren } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { debounceTime, startWith, combineLatest, distinctUntilChanged } from "rxjs";
import { Categoria } from "../../../../../../models/categoria";
import { Evento } from "../../../../../../models/evento/evento";
import { EventoArquivoCadastro } from "../../../../../../models/evento/evento-arquivo";

import { Tema } from "../../../../../../models/tema";
import { ConsultaAuxiliaresService } from "../../../../../../services/consulta-auxiliares.service";

import { EditBaseComponent } from "../../../../../../shared/components/edit-base.component";
import { SharedModule } from "../../../../../../shared/shared.module";
import { TemaListaSelecionarComponent } from "../../../../../tema/tema-lista-selecionar/tema-lista-selecionar.component";
import { EventoDadosFotoComponent } from "../../../../evento-dados/evento-dados-foto/evento-dados-foto.component";
import { EventoDadosSiteComponent } from "../../../../evento-dados/evento-dados-site/evento-dados-site.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTimepickerModule } from "@angular/material/timepicker";
import { MatDividerModule } from "@angular/material/divider";
import { EventoTipoContadorComponent } from "../../../../evento-dados/evento-tipo-contador/evento-tipo-contador.component";


@Component({
  standalone: true,
  selector: 'app-tab-personalise',
  imports: [CommonModule, SharedModule, MatInputModule, EventoDadosSiteComponent, TemaListaSelecionarComponent
    , EventoDadosFotoComponent, MatExpansionModule, MatTabsModule, MatDatepickerModule, MatTimepickerModule, MatDividerModule, EventoTipoContadorComponent
  ],
  templateUrl: './tab-personalise.component.html',
  styleUrls: ['./tab-personalise.component.scss'],
})
export class TabPersonaliseComponent extends EditBaseComponent implements OnInit {
  @ViewChildren('textarea') textAreas: QueryList<ElementRef<HTMLTextAreaElement>> | undefined;

  @Input() formGroup_categoriaTema: FormGroup = {} as FormGroup;
  @Input() formGroup_fotos: FormGroup = {} as FormGroup;
  @Input() formGroup_editeSeuSite: FormGroup = {} as FormGroup;
  @Input() formGroup_Link: FormGroup = {} as FormGroup;


  @Input() categorias?: Categoria[];
  @Input() temaSelecionado?: Tema;
  @Input() eventoSelecionado?: Evento;
  @Input() backgroundImageUrl?: string;

  @Output() output_arquivos = new EventEmitter<EventoArquivoCadastro[]>();
  @Output() output_removeArquivos = new EventEmitter<number[]>();

  habilitarSelecaoTema: boolean = false;

  painelAberto: string = 'nomeEvento';
  habilitar_NomeEvento: boolean = true;
  habilitar_CategoriaTema: boolean = false;
  habilitar_MsgBoaVindas: boolean = false;
  habilitar_DataHora: boolean = false;
  habilitar_Endereco: boolean = false;
  habilitar_Fotos: boolean = false;
  habilitar_Link: boolean = false;



  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  constructor(protected injector: Injector,
    protected formBuilder: FormBuilder,
    protected consultaAuxiliaresService: ConsultaAuxiliaresService,

  ) {
    super(injector);

  }

  ngOnInit(): void {
    this.controlarExibicao();

    this.formGroup_editeSeuSite?.get('texto')?.valueChanges.pipe(
      distinctUntilChanged(),
    ).subscribe(novoValor => {
      this.definirTamanhoCampos();
    });

    this.formGroup_editeSeuSite?.get('infoEvento')?.valueChanges.pipe(
      distinctUntilChanged(),
    ).subscribe(novoValor => {
      this.definirTamanhoCampos();
    });



    this.definirTamanhoCampos();

  }

  controlarExibicao() {


    this.habilitar_NomeEvento = true;
    this.habilitar_CategoriaTema = this.abaValid_NomeEvento();
    this.habilitar_MsgBoaVindas = this.habilitar_CategoriaTema && this.formGroup_categoriaTema.valid;
    this.habilitar_DataHora = this.habilitar_MsgBoaVindas && this.abaValid_MsgBoaVindas();
    this.habilitar_Fotos = this.habilitar_DataHora && this.abaValid_DataHora();
    this.habilitar_Link = this.habilitar_Fotos && this.existeFotoAnexada();
    this.habilitar_Endereco = this.habilitar_DataHora && this.formGroup_Link.valid;


  }






  onTemaSelecionado(tema?: Tema) {
    if (tema)
      this.formGroup_categoriaTema.get('idTema')?.setValue(tema?.id);
    this.habilitarSelecaoTema = false;
  }

  processArquivosCadastro(eventoArquivoCadastro: EventoArquivoCadastro[]) {
    this.output_arquivos.emit(eventoArquivoCadastro);
  }

  processRemoverArquivos(removerArquivos: number[]) {
    this.output_removeArquivos.emit(removerArquivos);
  }
  existeFotoAnexada(): boolean {
    return this.eventoSelecionado?.eventoArquivo?.length ?? 0 > 0 ? true : false;
  }




  abaValid_NomeEvento(): boolean {

    return this.formGroup_editeSeuSite.get('subNomeEvento')?.valid
      && this.formGroup_editeSeuSite.get('nomeEvento')?.valid
      ? true : false;
  }
  abaValid_MsgBoaVindas(): boolean {

    return this.formGroup_editeSeuSite.get('titulo')?.valid
      && this.formGroup_editeSeuSite.get('texto')?.valid
      && this.formGroup_editeSeuSite.get('infoEvento')?.valid
      && this.formGroup_editeSeuSite.get('textoRodape')?.valid
      ? true : false;
  }
  abaValid_DataHora(): boolean {

    return this.formGroup_editeSeuSite.get('dataEvento')?.valid
      && this.formGroup_editeSeuSite.get('dataFimEvento')?.valid
      && this.formGroup_editeSeuSite.get('horaEvento')?.valid
      && this.formGroup_editeSeuSite.get('horaFimEvento')?.valid
      ? true : false;
  }
  abaValid_Endereco(): boolean {

    return this.formGroup_editeSeuSite.get('cep')?.valid
      && this.formGroup_editeSeuSite.get('estado')?.valid
      && this.formGroup_editeSeuSite.get('cidade')?.valid
      && this.formGroup_editeSeuSite.get('bairro')?.valid
      && this.formGroup_editeSeuSite.get('rua')?.valid
      && this.formGroup_editeSeuSite.get('numero')?.valid
      && this.formGroup_editeSeuSite.get('complemento')?.valid
      ? true : false;
  }



  proximo() {
    this.controlarExibicao();


    switch (this.painelAberto) {
      case 'nomeEvento': this.proximo_ValidarNomeEvento(); break;
      case 'categoriaTema': this.proximo_ValidarCategoria(); break;
      case 'msgBoaVindas': this.proximo_ValidarMsgBoaVindas(); break;
      case 'dataHora': this.proximo_ValidarDataHora(); break;
      case 'fotos': this.proximo_ValidarFotos(); break;
      case 'link': this.proximo_ValidarLink(); break;
      case 'endereco': this.proximo_ValidaEndereco(); break;
    }
  }


  proximo_ValidarNomeEvento() {

    if (!this.abaValid_NomeEvento() && this.painelAberto == 'nomeEvento') {
      this.onInvalidForm(undefined, this.formGroup_editeSeuSite);
      return;
    }

    if (this.habilitar_CategoriaTema)
      this.painelAberto = 'categoriaTema';


  }

  proximo_ValidarCategoria() {

    if (!this.formGroup_categoriaTema.valid && this.painelAberto == 'categoriaTema') {
      this.onInvalidForm(undefined, this.formGroup_categoriaTema);
      return;
    }


    if (this.habilitar_MsgBoaVindas)
      this.painelAberto = 'msgBoaVindas';


  }

  proximo_ValidarMsgBoaVindas() {



    if (!this.abaValid_MsgBoaVindas() && this.painelAberto == 'msgBoaVindas') {
      this.onInvalidForm(undefined, this.formGroup_editeSeuSite);
      return;
    }

    if (this.habilitar_DataHora)
      this.painelAberto = 'dataHora';


  }

  proximo_ValidarDataHora() {

    if (!this.abaValid_DataHora() && this.painelAberto == 'dataHora') {
      this.onInvalidForm(undefined, this.formGroup_editeSeuSite);
      return;
    }

    if (this.habilitar_Fotos)
      this.painelAberto = 'fotos';




  }

  proximo_ValidarFotos() {


    if (!this.existeFotoAnexada() && this.painelAberto == 'fotos') {
      this.onInvalidForm('Favor adicionar pelo menos uma foto! ', this.formGroup_fotos);
      return;
    }
    if (this.habilitar_Link)
      this.painelAberto = 'link';





  }

  proximo_ValidarLink() {

    if (!this.formGroup_Link.valid && this.painelAberto == 'link') {
      this.onInvalidForm(undefined, this.formGroup_Link);
      return;
    }

    if (this.habilitar_Endereco)
      this.painelAberto = 'endereco';






  }

  proximo_ValidaEndereco() {



    if (!this.abaValid_Endereco() && this.painelAberto == 'endereco') {
      this.onInvalidForm(undefined, this.formGroup_editeSeuSite);
      return;
    }


    alert('sucesso')






  }

  definirTamanhoCampos() {

    setTimeout(() => {
      if (this.textAreas) {
        this.textAreas.forEach(textArea => {
          this.adjustHeight(textArea.nativeElement);
        });
      }

      this.formGroup?.updateValueAndValidity();
      this.controlarHeigthCampo();

    }, 300);



  }

  adjustHeight(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto'; // Reseta a altura para calcular a nova altura
    textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta a altura para o scrollHeight
  }


  controlarHeigthCampo() {
    if (this.textAreas) {
      this.textAreas.forEach(textArea => {
        textArea.nativeElement.addEventListener('input', () => this.adjustHeight(textArea.nativeElement));
        this.adjustHeight(textArea.nativeElement); // Ajusta altura inicial
        textArea.nativeElement.dispatchEvent(new Event('input')); // Força a chamada do evento 'input'
        this.cdRef.detectChanges();
      });
    }
  }



}
