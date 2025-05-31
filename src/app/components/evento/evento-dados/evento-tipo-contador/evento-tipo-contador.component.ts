import { Component, Injector, Input, OnInit, ViewChild, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EditBaseComponent } from '../../../../shared/components/edit-base.component';
import { SharedModule } from '../../../../shared/shared.module';


@Component({
  standalone: true,
  selector: 'app-evento-tipo-contador',
  imports: [CommonModule, SharedModule, MatInputModule],
  templateUrl: './evento-tipo-contador.component.html',
  styleUrls: ['./evento-tipo-contador.component.scss'],
})
export class EventoTipoContadorComponent extends EditBaseComponent implements OnInit {
  @Input() override formGroup: FormGroup = {} as FormGroup;

  tipos = [
    { id: 'gravidez', descricao: 'Contador semana Gravidez' },
    { id: 'evento', descricao: 'Contador para data do Evento' },
  ];

  diaSemana = [
    { id: '1', descricao: 'Domingo' },
    { id: '2', descricao: 'Segunda-feira' },
    { id: '3', descricao: 'Terça-feira' },
    { id: '4', descricao: 'Quarta-feira' },
    { id: '5', descricao: 'Quinta-feira' },
    { id: '6', descricao: 'Sexta-feira' },
    { id: '7', descricao: 'Sabado' },
  ];

  constructor(protected injector: Injector,
    protected formBuilder: FormBuilder,
  ) {
    super(injector);

  }
  ngOnInit(): void {


    this.formGroup?.get('idTipoContador')?.valueChanges.subscribe(_idTipoContador => {
      const semanaCtrl = this.formGroup.get('semanaGravidezAtual');
      const diaSemanaCtrl = this.formGroup.get('idDiaSemana');

      if (_idTipoContador == 'gravidez') {
        semanaCtrl?.setValidators([Validators.required]);
        diaSemanaCtrl?.setValidators([Validators.required]);
      } else {
        semanaCtrl?.clearValidators();
        diaSemanaCtrl?.clearValidators();
        semanaCtrl?.setValue(null);
        diaSemanaCtrl?.setValue(null);
      }

      semanaCtrl?.updateValueAndValidity();
      diaSemanaCtrl?.updateValueAndValidity();
    });

  }






}
