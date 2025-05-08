import { Component, Injector, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EditBaseComponent } from '../../../../shared/components/edit-base.component';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  standalone: true,
  selector: 'app-evento-presenca',
  imports: [CommonModule, SharedModule, MatInputModule],
  templateUrl: './evento-presenca.component.html',
  styleUrls: ['./evento-presenca.component.scss'],
})
export class EventoPresencaComponent extends EditBaseComponent implements OnInit {

  constructor(protected injector: Injector,
    protected formBuilder: FormBuilder,

  ) {
    super(injector);

  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      nome: new FormControl({ value: null, disabled: this.isVisualizacao }, Validators.required),
      acompanhantes: this.formBuilder.array([])
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
      console.log('Dados enviados:', this.formGroup.value);
      alert('Confirmação enviada com sucesso!');
      this.formGroup.reset();
      this.acompanhantes.clear();
    } else {
      this.formGroup.markAllAsTouched();
    }
  }


}
