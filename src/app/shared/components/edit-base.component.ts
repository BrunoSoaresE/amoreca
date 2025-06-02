import { isPlatformBrowser } from "@angular/common";
import { Injectable, OnDestroy, ChangeDetectorRef, Input, Injector, ElementRef, OnInit, HostListener, Inject, PLATFORM_ID, inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import moment from "moment";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { BusStore } from "../../services/bus.store";



@Injectable()
export abstract class EditBaseComponent implements OnDestroy {
  protected router: Router;
  protected toastr: ToastrService
  protected cdRef: ChangeDetectorRef;
  protected busStore: BusStore;
  protected elementRef: ElementRef;
  protected platformId = inject(PLATFORM_ID);
  //protected loaderService: LoaderService;


  @Input() formGroup: FormGroup = {} as FormGroup;
  @Input() isVisualizacao: boolean = false;

  subscription: Subscription = new Subscription();
  //mensagemLoader: string;

  isSmallScreen: boolean = isPlatformBrowser(this.platformId) ? window?.innerWidth <= 768 : false;
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isSmallScreen = window?.innerWidth <= 768;
  }

  constructor(injector: Injector,
  ) {

    this.router = injector.get(Router);
    this.toastr = injector.get(ToastrService);
    this.cdRef = injector.get(ChangeDetectorRef);
    this.elementRef = injector.get(ElementRef);
    this.busStore = injector.get(BusStore);

    if (isPlatformBrowser(this.platformId)) {
    }
    // this.loaderService = injector.get(LoaderService);
    //  this.mensagemLoader = this.loaderService.getMensagem();





  }



  // onLoadForm(): void {
  //   this.subscription.add(this.colaboradorStore.desabilitarEdicao$.subscribe(desabilitarEdicao => {

  //     if (desabilitarEdicao) {
  //       this.isVisualizacao = true;
  //       this.validarModoVisualizacaoFormControls(this.formGroup);
  //     }else{
  //       this.isVisualizacao = false;
  //       this.validarModoVisualizacaoFormControls(this.formGroup,true);
  //     }
  //   }));
  // }
  // protected validarModoVisualizacaoFormControls(form: FormGroup, enable: boolean = false) {

  //   if (!this.isVisualizacao || !form) {
  //     return;
  //   }

  //   if (!form.controls) {
  //     return;
  //   }

  //   Object.keys(form.controls).forEach(key => {
  //     if (!form?.get(key)) {
  //       return;
  //     }


  //     if (enable) {
  //       form?.get(key)?.enable({onlySelf: true,emitEvent: false});
  //     } else {
  //         form?.get(key)?.disable({onlySelf: true,emitEvent: false});
  //     }
  //   });
  // }




  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goBack(): void {
    history.back();
  }

  updateValueAndValidityControl(_formGroup: FormGroup) {

    if (!_formGroup?.controls) {
      return;
    }

    Object.keys(_formGroup.controls).forEach(key => {
      const control = _formGroup.get(key);
      if (control?.invalid) {
        console.log('invalid - ' + key)
        _formGroup?.get(key)?.updateValueAndValidity();
      }
    });

  }

  getFirstInvalidControl(_formGroup: FormGroup): string | null {
    const controls = _formGroup.controls;
    for (const controlName in controls) {
      if (controls[controlName].invalid) {
        return controlName;
      }
    }
    return null;
  }

  scrollToInvalidControl(_formGroup: FormGroup) {
    let controlName = this.getFirstInvalidControl(_formGroup);
    const invalidControlElement = this.elementRef.nativeElement.querySelector(`[formControlName="${controlName}"]`) ?? this.elementRef.nativeElement.querySelector(`.${controlName}`);
    const containerPrincipalElement = this.elementRef.nativeElement.querySelector(`.containerPrincipal`);


    if (invalidControlElement) {
      if (containerPrincipalElement) {
        const elementPosition = invalidControlElement.getBoundingClientRect().top - containerPrincipalElement.getBoundingClientRect().top;



        containerPrincipalElement.scrollTo({
          top: (containerPrincipalElement.scrollTop + elementPosition) - 140,
          behavior: 'smooth'

        });
      }
      else {
        invalidControlElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

      }
    }
  }

  onInvalidForm(mensagem?: string, _formGroup: FormGroup = this.formGroup) {
    _formGroup.markAllAsTouched();
    this.updateValueAndValidityControl(_formGroup);
    this.scrollToInvalidControl(_formGroup);

    this.toastr.warning(mensagem ? mensagem : 'Favor preencher todos os campos obrigatórios!');
  }





  alterarDataElement(e: any, name: string) {
    this.alterarData(e.targetElement.value, name);
  }

  alterarData(valueString: string, name: string, format = 'DD/MM/YYYY') {
    const convertDate = moment(valueString, format);

    if (convertDate.isValid()) {
      this.formGroup?.get(name)?.setValue(convertDate.toDate(), { onlySelf: false, emitEvent: false });
    } else {
      this.formGroup?.get(name)?.setValue(null, { onlySelf: false, emitEvent: false });
    }
  }

  alterarDataGrid(valueString: any) {
    if (!valueString) {
      return "";
    }
    const convertDate = moment(valueString, moment.ISO_8601).format("DD/MM/YYYY");

    if (convertDate && convertDate !== 'Invalid date' && convertDate !== 'Data inválida') {

      return convertDate;
    } else {
      return "";
    }
  }
  alterarDataHoraGrid(valueString: any) {
    if (!valueString) {
      return "";
    }
    const convertDate = moment(valueString, moment.ISO_8601).format("DD/MM/YYYY HH:mm");

    if (convertDate && convertDate !== 'Invalid date' && convertDate !== 'Data inválida') {

      return convertDate;
    } else {
      return "";
    }
  }



  isSmall() {
    return window.innerWidth < 600;
  }





}
