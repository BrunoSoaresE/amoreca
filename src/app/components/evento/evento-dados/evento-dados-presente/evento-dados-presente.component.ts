import { CommonModule } from '@angular/common';
import { Component, Injector, Input, OnInit, } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { EditBaseComponent } from '../../../../shared/components/edit-base.component';
import { ArquivoService } from '../../../../services/arquivo/arquivo.service';
import { Presente } from '../../../../models/presente';
import { MatInputModule } from '@angular/material/input';
import { Evento } from '../../../../models/evento/evento';

@Component({
  standalone: true,
  selector: 'app-evento-dados-presente',
  imports: [CommonModule, SharedModule, MatInputModule],
  templateUrl: './evento-dados-presente.component.html',
  styleUrls: ['./evento-dados-presente.component.scss'],
})
export class EventoDadosPresenteComponent extends EditBaseComponent implements OnInit {
  @Input() eventoSelecionado?: Evento;
  @Input() listPresentes?: Presente[];
  @Input() override formGroup: FormGroup = {} as FormGroup;




  constructor(protected injector: Injector,
    protected formBuilder: FormBuilder,
    protected arquivoService: ArquivoService,

  ) {
    super(injector);

  }
  ngOnInit(): void {
  }
  get presentesControls() {
    return (this.formGroup.get('presentes') as FormArray).controls;
  }







  onAtivoChange(index: number) {
    const presenteForm = (this.formGroup.get('presentes') as FormArray).at(index) as FormGroup;

    let idPresente = presenteForm.get('idPresente')?.value;

    const presenteAtual = this.listPresentes?.find(x => x.id == idPresente);

    if (presenteForm.get('ativo')?.value) {
      presenteForm.get('quantidade')?.setValidators([Validators.required, Validators.min(1)]);
      presenteForm.get('preco')?.setValidators([Validators.required]);



      presenteForm.get('quantidade')?.setValue(presenteAtual?.quantidadeSugerida);
      presenteForm.get('preco')?.setValue(presenteAtual?.precoSugerido);

      presenteForm.get('preco')?.enable();
      presenteForm.get('quantidade')?.enable();

    } else {
      presenteForm.get('quantidade')?.clearValidators();
      presenteForm.get('preco')?.clearValidators();

      presenteForm.get('quantidade')?.setValue(undefined);
      presenteForm.get('preco')?.setValue(undefined);

      presenteForm.get('preco')?.disable();
      presenteForm.get('quantidade')?.disable();


    }

    presenteForm.get('quantidade')?.updateValueAndValidity();
    presenteForm.get('preco')?.updateValueAndValidity();
  }




}