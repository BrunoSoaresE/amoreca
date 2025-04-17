import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Tema } from '../../../models/tema';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-tema-confirmacao-dialog',
  standalone: true,
  templateUrl: './tema-confirmacao-dialog.component.html',
  styleUrl: './tema-confirmacao-dialog.component.scss',
  imports: [CommonModule, SharedModule, MatInputModule, MatDialogModule]
})
export class TemaConfirmacaoDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { tema: Tema },
    private dialogRef: MatDialogRef<TemaConfirmacaoDialogComponent>
  ) { }

  onCancelar() {
    this.dialogRef.close(false);
  }

  onConfirmar() {
    this.dialogRef.close(true);
  }
}
