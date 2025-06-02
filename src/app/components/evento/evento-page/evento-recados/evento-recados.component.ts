import { Component, Injector, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EditBaseComponent } from '../../../../shared/components/edit-base.component';
import { SharedModule } from '../../../../shared/shared.module';
import { EventoRecado } from '../../../../models/evento/evento-recado';
import { EventoService } from '../../../../services/evento/evento.service';
import { Evento, EventoCadastro } from '../../../../models/evento/evento';
import { EventoStore } from '../../../../services/evento/evento.store';

@Component({
  standalone: true,
  selector: 'app-evento-recados',
  imports: [CommonModule, SharedModule, MatInputModule],
  templateUrl: './evento-recados.component.html',
  styleUrls: ['./evento-recados.component.scss'],
})
export class EventoRecadosComponent extends EditBaseComponent implements OnInit {
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
      mensagem: new FormControl({ value: null, disabled: this.isVisualizacao }, Validators.required),
    });

    this.eventoStore.evento$.subscribe(_evento => {
      this.evento = _evento;
    });
  }

  enviarRecado() {



    if (this.formGroup.valid) {

      let eventoRecado: EventoRecado = {
        idEvento: this.evento?.id,
        ...this.formGroup.value,
      } as EventoRecado;


      this.subscription.add(
        this.eventoService.salvarEvento_Recados(eventoRecado).subscribe({
          next: (response: any) => {
            this.toastr.success('Recado enviado com sucesso!');

            if (this.evento) {
              if (!this.evento.eventoRecado)
                this.evento.eventoRecado = [];

              this.evento.eventoRecado.push(eventoRecado);
              this.cdRef.detectChanges();
            }


          }
        }),
      );



      this.formGroup.reset();
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

}
