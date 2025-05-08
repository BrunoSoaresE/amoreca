import { Component, Injector, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EditBaseComponent } from '../../../../shared/components/edit-base.component';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  standalone: true,
  selector: 'app-evento-recados',
  imports: [CommonModule, SharedModule, MatInputModule],
  templateUrl: './evento-recados.component.html',
  styleUrls: ['./evento-recados.component.scss'],
})
export class EventoRecadosComponent extends EditBaseComponent implements OnInit {
  recados: { nome: string; mensagem: string }[] = [];

  constructor(protected injector: Injector,
    protected formBuilder: FormBuilder,

  ) {
    super(injector);

  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      nome: new FormControl({ value: null, disabled: this.isVisualizacao }, Validators.required),
      mensagem: new FormControl({ value: null, disabled: this.isVisualizacao }, Validators.required),
    });
  }

  enviarRecado() {
    if (this.formGroup.valid) {
      alert('Recado enviado com sucesso!');

      this.recados.push(this.formGroup.value);
      this.formGroup.reset();
    }
  }

}
