import { CommonModule } from "@angular/common";
import { Component, OnInit, Injector, Input } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { Evento } from "../../../../../../models/evento/evento";

import { ConsultaAuxiliaresService } from "../../../../../../services/consulta-auxiliares.service";

import { EditBaseComponent } from "../../../../../../shared/components/edit-base.component";
import { SharedModule } from "../../../../../../shared/shared.module";

import { Presente } from "../../../../../../models/presente";
import { PresenteService } from "../../../../../../services/presente/presente.service";
import { ArquivoService } from "../../../../../../services/arquivo/arquivo.service";
import { ArquivoBase64 } from "../../../../../../models/arquivo";
import { EventoPresente } from "../../../../../../models/evento/evento-presente";
import { EventoDadosPresenteComponent } from "../../../../evento-dados/evento-dados-presente/evento-dados-presente.component";


@Component({
  standalone: true,
  selector: 'app-tab-lista-presente',
  imports: [CommonModule, SharedModule, MatInputModule, MatExpansionModule, MatTabsModule, EventoDadosPresenteComponent],
  templateUrl: './tab-lista-presente.component.html',
  styleUrls: ['./tab-lista-presente.component.scss'],
})
export class TabListaPresenteComponent extends EditBaseComponent implements OnInit {

  @Input() presentesFormGroup: FormGroup = {} as FormGroup;
  @Input() eventoSelecionado?: Evento;

  listPresentes?: Presente[];
  presenteisReady: boolean = false;


  constructor(protected injector: Injector,
    protected formBuilder: FormBuilder,
    protected consultaAuxiliaresService: ConsultaAuxiliaresService,
    protected presenteService: PresenteService,
    protected arquivoService: ArquivoService,

  ) {
    super(injector);

  }
  ngOnInit(): void {
    this.buscarListaPresentes();

  }




  buscarListaPresentes(): void {
    if (!this.listPresentes) {
      this.subscription.add(
        this.presenteService.getListPresente().subscribe({
          next: (response: Presente[]) => {



            this.listPresentes = response;
            this.listPresentes.forEach(presente => {
              presente.eventoPresente = this._getPresenteEvento(presente);
            });
            const presentesArray = this.presentesFormGroup.get('presentes') as FormArray;

            if (this.listPresentes) {
              this.listPresentes.forEach(presente => {



                const presenteEvento = this.eventoSelecionado?.eventoPresente?.find(x => x.idPresente === presente.id);

                const _quantidade = presenteEvento ? presenteEvento.quantidade : presente.quantidadeSugerida;
                const _preco = presenteEvento ? presenteEvento.preco : presente.precoSugerido;
                const _ativo = presenteEvento ? presenteEvento.ativo : true;
                presentesArray.push(this.formBuilder.group({
                  id: new FormControl<any>({ value: presenteEvento?.id, disabled: this.isVisualizacao }),
                  idPresente: new FormControl<any>({ value: presente.id, disabled: this.isVisualizacao }),
                  ativo: new FormControl<any>({ value: _ativo, disabled: this.isVisualizacao }),
                  quantidade: new FormControl<any>({ value: _quantidade, disabled: this.isVisualizacao }, Validators.required),
                  preco: new FormControl<any>({ value: _preco, disabled: this.isVisualizacao }, Validators.required),
                }));


              });
            }
            this.presenteisReady = true;
            this.cdRef.markForCheck();
            this.cdRef.detectChanges();
            this.downloadPresenteBase64Foto();


          }
        }),
      );

    }

  }

  _getPresenteEvento(presente: Presente): EventoPresente {
    const presenteEventoPadrao: EventoPresente = {
      id: 0,
      idEvento: this.eventoSelecionado?.id ?? 0,
      idPresente: presente.id,
      ativo: true,
      quantidade: 10,
      preco: 10
    }

    return this.eventoSelecionado?.eventoPresente?.find(x => x.idPresente === presente.id) ?? presenteEventoPadrao;
  }

  downloadPresenteBase64Foto() {

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
