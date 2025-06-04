import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EditBaseComponent } from '../../../../shared/components/edit-base.component';
import { SharedModule } from '../../../../shared/shared.module';
import { Component, OnInit, Injector, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { EventoConfirmacaoPresenca } from '../../../../models/evento/evento-confirmacao-presenca';

import { GerenciarEventoPresencaComponent } from '../gerenciar-evento-presenca/gerenciar-evento-presenca.component';


@Component({
  standalone: true,
  selector: 'app-gerenciar-evento',
  imports: [CommonModule, SharedModule, MatInputModule, MatExpansionModule, GerenciarEventoPresencaComponent
  ],
  templateUrl: './gerenciar-evento.component.html',
  styleUrls: ['./gerenciar-evento.component.scss'],
})
export class GerenciarEventoComponent extends EditBaseComponent implements OnInit {
  @Input() override formGroup: FormGroup = {} as FormGroup;
  @Input() lista: EventoConfirmacaoPresenca[] = [];

  constructor(protected injector: Injector,
    protected formBuilder: FormBuilder,

  ) {
    super(injector);

  }


  ngOnInit() {



    this.lista = [
      {
        id: 1,
        nome: 'Ana Oliveira',
        criadoEm: new Date(),
        acompanhantes: [
          { id: 101, nome: 'Carlos Oliveira', idConfirmacaoPresenca: 1 },
          { id: 102, nome: 'Lúcia Oliveira', idConfirmacaoPresenca: 1 }
        ]
      },
      {
        id: 2,
        nome: 'Bruno Silva',
        criadoEm: new Date(),
        acompanhantes: [
          { id: 201, nome: 'Fernanda Silva', idConfirmacaoPresenca: 2 }
        ]
      },
      {
        id: 3,
        nome: 'Carla Souza',
        criadoEm: new Date(),
        acompanhantes: []
      }
    ];


  }

  contarTotalPessoas(): number {
    return this.lista.reduce((total, convidado) => {
      // Soma 1 para o convidado principal + o número de acompanhantes
      return total + 1 + convidado.acompanhantes.length;
    }, 0);
  }

}