import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EditBaseComponent } from '../../../../shared/components/edit-base.component';
import { SharedModule } from '../../../../shared/shared.module';
import { Component, OnInit, AfterViewInit, Injector, Input, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { EventoConfirmacaoPresenca } from '../../../../models/evento/evento-confirmacao-presenca';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';


@Component({
  standalone: true,
  selector: 'app-gerenciar-evento-presenca',
  imports: [CommonModule, SharedModule, MatInputModule, MatExpansionModule, MatDividerModule, MatTableModule
    , MatCardModule, MatButtonModule
  ],
  templateUrl: './gerenciar-evento-presenca.component.html',
  styleUrls: ['./gerenciar-evento-presenca.component.scss'],
})
export class GerenciarEventoPresencaComponent extends EditBaseComponent implements OnInit {
  @Input() override formGroup: FormGroup = {} as FormGroup;
  @Input() lista: EventoConfirmacaoPresenca[] = [];
  expandedPanelIndex: number | null = null;
  // displayedColumns: string[] = ['nome', 'acompanhantes', 'acoes'];

  displayedColumns: string[] = ['nome'];
  expandedIndex: number | null = null;


  toggleExpand(i: number) {
    alert(i)
    this.expandedIndex = this.expandedIndex === i ? null : i;
  }



  constructor(protected injector: Injector,
    protected formBuilder: FormBuilder,

  ) {
    super(injector);

  }


  ngOnInit() {
    const presentesArray = this.formGroup.get('presencas') as FormArray;
    this.lista.map(p => presentesArray.push(this.createPresencaForm(p)));
  }

  get presentesControls() {
    return (this.formGroup.get('presentes') as FormArray).controls;
  }

  createPresencaForm(presenca: EventoConfirmacaoPresenca): FormGroup {
    return this.formBuilder.group({
      id: [presenca.id],
      nome: [presenca.nome, Validators.required],
      criadoEm: [presenca.criadoEm],
      acompanhantes: this.formBuilder.array(
        presenca.acompanhantes.map(a => this.createAcompanhanteForm(a))
      )
    });
  }

  createAcompanhanteForm(acompanhante: any): FormGroup {
    return this.formBuilder.group({
      id: [acompanhante.id],
      idConfirmacaoPresenca: [acompanhante.idConfirmacaoPresenca],
      nome: [acompanhante.nome, Validators.required]
    });
  }

  get presencas(): FormArray {
    return this.formGroup.get('presencas') as FormArray;
  }

  getAcompanhantes(presencaIndex: number): FormArray {
    return this.presencas.at(presencaIndex).get('acompanhantes') as FormArray;
  }

  addAcompanhante(presencaIndex: number) {


    if (this.formGroup.valid) {
      const acompanhantes = this.getAcompanhantes(presencaIndex);
      acompanhantes.push(this.createAcompanhanteForm({ id: 0, nome: '', idConfirmacaoPresenca: this.presencas.at(presencaIndex).value.id }));
    } else {
      this.onInvalidForm(undefined, this.formGroup);
    }

    this.presencas.controls = [...this.presencas.controls];

  }

  removeAcompanhante(presencaIndex: number, acompanhanteIndex: number) {
    this.getAcompanhantes(presencaIndex).removeAt(acompanhanteIndex);
    this.presencas.controls = [...this.presencas.controls];

  }

  removePresenca(index: number) {
    this.presencas.removeAt(index);
    this.presencas.controls = [...this.presencas.controls];

  }

  salvar() {
    console.log(this.formGroup.value);
  }
  addPresenca() {
    if (this.formGroup.valid) {
      const teste: EventoConfirmacaoPresenca = {
        id: 0,
        nome: '',
        acompanhantes: [],
        criadoEm: new Date()
      }
      this.presencas.push(this.createPresencaForm(teste));
      this.presencas.controls = [...this.presencas.controls].sort((a, b) => {
        const nomeA = a.get('nome')?.value?.toLowerCase() || '';
        const nomeB = b.get('nome')?.value?.toLowerCase() || '';
        return nomeA.localeCompare(nomeB);
      });
      this.expandedPanelIndex = 0; // abre o último painel adicionado
      //  const invalidControlElement =  this.elementRef.nativeElement.querySelector(`.${controlName}`);

      //  invalidControlElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

    } else {
      this.onInvalidForm(undefined, this.formGroup);
    }
  }


}