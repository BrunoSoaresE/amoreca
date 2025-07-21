import { CommonModule } from "@angular/common";
import { Component, OnInit, Injector, Input } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { debounceTime, startWith, combineLatest } from "rxjs";
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


@Component({
  standalone: true,
  selector: 'app-tab-personalise',
  imports: [CommonModule, SharedModule, MatInputModule, EventoDadosSiteComponent, TemaListaSelecionarComponent
    , EventoDadosFotoComponent, MatExpansionModule, MatTabsModule
  ],
  templateUrl: './tab-personalise.component.html',
  styleUrls: ['./tab-personalise.component.scss'],
})
export class TabPersonaliseComponent extends EditBaseComponent implements OnInit {

  @Input() formGroup_categoriaTema: FormGroup = {} as FormGroup;
  @Input() formGroup_fotos: FormGroup = {} as FormGroup;
  @Input() formGroup_editeSeuSite: FormGroup = {} as FormGroup;
  @Input() formGroup_Link: FormGroup = {} as FormGroup;


  @Input() categorias?: Categoria[];
  @Input() temaSelecionado?: Tema;
  @Input() eventoSelecionado?: Evento;
  @Input() backgroundImageUrl?: string;


  habilitarSelecaoTema: boolean = false;
  habilitar_Fotos?: boolean;
  habilitar_Previa?: boolean;
  habilitar_Link?: boolean;


  constructor(protected injector: Injector,
    protected formBuilder: FormBuilder,
    protected consultaAuxiliaresService: ConsultaAuxiliaresService,

  ) {
    super(injector);

  }

  ngOnInit(): void {
    const formGroup_categoriaTema$ = this.formGroup_categoriaTema!.valueChanges.pipe(
      debounceTime(100),
      startWith(this.formGroup_categoriaTema!.value)
    );

    const formGroup_EditeSeuSite$ = this.formGroup_editeSeuSite!.valueChanges.pipe(
      debounceTime(600),
      startWith(this.formGroup_editeSeuSite!.value)
    );


    combineLatest([formGroup_categoriaTema$, formGroup_EditeSeuSite$]).subscribe(([]) => {
      this.habilitar_Fotos = this.formGroup_categoriaTema.valid;
      this.habilitar_Previa = this.formGroup_categoriaTema.valid && this.existeFotoAnexada();
      this.habilitar_Link = this.formGroup_categoriaTema.valid && this.existeFotoAnexada() && this.formGroup_editeSeuSite.valid;
      this.cdRef.detectChanges();

    });
  }



  onTemaSelecionado(tema?: Tema) {
    if (tema)
      this.formGroup_categoriaTema.get('idTema')?.setValue(tema?.id);
    this.habilitarSelecaoTema = false;
  }

  processArquivosCadastro(eventoArquivoCadastro: EventoArquivoCadastro[]) {
    //todo
    //this.eventoArquivoCadastro = eventoArquivoCadastro;
    // this.salvar(false);

  }

  processRemoverArquivos(removerArquivos: number[]) {
    //todo
    //this.removerArquivos = removerArquivos;
    // this.salvar(false);
  }
  existeFotoAnexada(): boolean {
    return this.eventoSelecionado?.eventoArquivo?.length ?? 0 > 0 ? true : false;
  }
}
