import { Component, Injector, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
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
export class EventoRecadosComponent extends EditBaseComponent {

  constructor(protected injector: Injector,
    protected formBuilder: FormBuilder,

  ) {
    super(injector);

  }


}
