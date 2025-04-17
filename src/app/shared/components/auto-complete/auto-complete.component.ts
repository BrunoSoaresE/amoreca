
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, Subscription } from 'rxjs';
import { removerCaracteresEspeciais } from '../../../services/util';
import { ArquivoService } from '../../../services/arquivo/arquivo.service';
import { ArquivoBase64 } from '../../../models/arquivo';

@Component({
  standalone: false,
  selector: 'app-autocomplete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoCompleteComponent implements OnInit, OnChanges, OnDestroy {
  @Output() valorDigitado = new EventEmitter<string | undefined>(undefined);

  @Input() formGroup: FormGroup | undefined;
  @Input() labelName: string = "";

  @Input() nomeCampoId: string = "id";
  @Input() nomeCampoDescricao: string = "descricao";
  @Input() nomeCampoDescricaoSecundario?: string;
  @Input() nomeCampoFoto?: string;
  @Input() _formControlName: string = "";
  @Input() listaOption: any[] | undefined;
  @Input() multiple: boolean = false;
  listaOptionFiltrado: any[] | undefined;
  opcaoSelecionada?: any;

  labelName_find: string = `Buscar ${this.labelName}`;
  control_formControlName: string = `control_${this._formControlName}`;

  subscription: Subscription = new Subscription();

  constructor(
    protected arquivoService: ArquivoService,
    protected cdRef: ChangeDetectorRef,
  ) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.listaOptionFiltrado = this.listaOption;
    if (this.nomeCampoFoto) {
      this.downloadBase64Foto()
    }
  }

  getSelectedOption(): any {

    const value = this.formGroup?.get(this._formControlName)?.value;
    if (!this.listaOption) return null;

    return this.listaOption.find(option => option[this.nomeCampoId] === value);

  }

  ngOnInit(): void {
    this.labelName_find = `Buscar ${this.labelName}`;
    this.control_formControlName = `control_${this._formControlName}`;
    this.listaOptionFiltrado = this.listaOption;
    if (this.nomeCampoFoto) {
      this.downloadBase64Foto()
    }


    this.formGroup?.addControl(this.control_formControlName, new FormControl({ value: null, disabled: false }));

    this.formGroup?.get(this.control_formControlName,)?.valueChanges.subscribe(novoValor => {
      novoValor = novoValor ? removerCaracteresEspeciais(novoValor.toLowerCase()) : novoValor;

      this.listaOptionFiltrado = novoValor
        ? this.listaOption?.filter(
          option =>
            removerCaracteresEspeciais(this.getNestedValue(option, this.nomeCampoDescricao).toLowerCase()).includes(novoValor) ||
            (this.nomeCampoDescricaoSecundario && removerCaracteresEspeciais(this.getNestedValue(option, this.nomeCampoDescricaoSecundario).toLowerCase()).includes(novoValor))
        )
        : this.listaOption;
    });

    this.formGroup?.get(this.control_formControlName,)?.valueChanges.pipe(
      debounceTime(600), // Aguarda 300ms após o último input
      distinctUntilChanged(), // Evita requisições desnecessárias
      filter(value => value && value.length >= 4), // Só busca após 4 caracteres
    ).subscribe(novoValor => {

      this.opcaoSelecionada = this.getSelectedOption();
      this.valorDigitado.emit(novoValor)
    });






  }

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
  }


  toggleAll(marcarTodas: boolean) {
    if (marcarTodas) {
      const valoresSelecionados = new Set(this.formGroup?.get(this._formControlName)?.value || []);

      this.listaOption?.forEach((item) => valoresSelecionados.add(item.id));

      this.formGroup?.get(this._formControlName)?.setValue(Array.from(valoresSelecionados));

    } else {
      // Desmarcar todos
      this.formGroup?.get(this._formControlName)?.setValue([]);
    }
  }

  downloadBase64Foto() {

    this.listaOption?.forEach((item) => {
      if (this.nomeCampoFoto && !item.foto) {
        var campo = this.getNestedValue(item, this.nomeCampoFoto);
        if (campo) {
          this.subscription.add(
            this.arquivoService.getArquivoBase64ByCaminho(campo).subscribe({
              next: (response: ArquivoBase64) => {
                item.foto = response;
                this.cdRef.detectChanges();
              }
            }),
          );
        }
      }

    });




  }



}


