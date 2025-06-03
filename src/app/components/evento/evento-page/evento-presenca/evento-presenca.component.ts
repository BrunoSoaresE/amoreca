import { Component, Injector, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EditBaseComponent } from '../../../../shared/components/edit-base.component';
import { SharedModule } from '../../../../shared/shared.module';
import { EventoService } from '../../../../services/evento/evento.service';
import { EventoStore } from '../../../../services/evento/evento.store';
import { Evento } from '../../../../models/evento/evento';
import { EventoConfirmacaoPresencaCadastro } from '../../../../models/evento/evento-confirmacao-presenca';

@Component({
  standalone: true,
  selector: 'app-evento-presenca',
  imports: [CommonModule, SharedModule, MatInputModule],
  templateUrl: './evento-presenca.component.html',
  styleUrls: ['./evento-presenca.component.scss'],
})
export class EventoPresencaComponent extends EditBaseComponent implements OnInit {
  evento?: Evento;


  constructor(protected injector: Injector,
    protected formBuilder: FormBuilder,
    protected eventoService: EventoService,
    protected eventoStore: EventoStore,

  ) {
    super(injector);

  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      nome: new FormControl({ value: null, disabled: this.isVisualizacao }, Validators.required),
      acompanhantes: this.formBuilder.array([])
    });

    this.eventoStore.evento$.subscribe(_evento => {
      this.evento = _evento;
    });

  }



  get acompanhantes() {
    return this.formGroup.get('acompanhantes') as FormArray;
  }

  get acompanhantesControls(): FormControl[] {
    return this.acompanhantes.controls as FormControl[];
  }


  adicionarAcompanhante() {
    this.acompanhantes.push(this.formBuilder.control('', Validators.required));
  }

  removerAcompanhante(index: number) {
    this.acompanhantes.removeAt(index);
  }

  onSubmit() {
    console.log('onSubmitDados enviados:', this.formGroup.value);

    if (this.formGroup.valid) {

      let eventoRecado: EventoConfirmacaoPresencaCadastro = {
        idEvento: this.evento?.id,
        ...this.formGroup.value,
      } as EventoConfirmacaoPresencaCadastro;


      this.subscription.add(
        this.eventoService.salvarEvento_Confirmacao(eventoRecado).subscribe({
          next: (response: any) => {
            this.toastr.success('Confirmação enviada com sucesso!');
          }
        }),
      );



      this.formGroup.reset();
      this.acompanhantes.clear();
    } else {
      this.formGroup.markAllAsTouched();
    }
  }


}
