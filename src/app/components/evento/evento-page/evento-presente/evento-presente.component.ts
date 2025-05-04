import { Component, Injector, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EditBaseComponent } from '../../../../shared/components/edit-base.component';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  standalone: true,
  selector: 'app-evento-presente',
  imports: [CommonModule, SharedModule, MatInputModule],
  templateUrl: './evento-presente.component.html',
  styleUrls: ['./evento-presente.component.scss'],
})
export class EventoPresenteComponent extends EditBaseComponent {

  constructor(protected injector: Injector,
    protected formBuilder: FormBuilder,

  ) {
    super(injector);

  }


}
