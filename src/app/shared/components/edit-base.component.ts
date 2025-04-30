import { Injectable, OnDestroy, ChangeDetectorRef, Input, Injector, ElementRef, OnInit, HostListener } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import moment from "moment";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";



@Injectable()
export abstract class EditBaseComponent implements OnDestroy {
  protected router: Router;
  protected toastr: ToastrService
  protected cdRef: ChangeDetectorRef;
  protected elementRef: ElementRef;
  //protected loaderService: LoaderService;


  isSmallScreen: boolean = window.innerWidth <= 768;
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isSmallScreen = window.innerWidth <= 768;
  }

  @Input() formGroup: FormGroup = {} as FormGroup;
  @Input() isVisualizacao: boolean = false;

  subscription: Subscription = new Subscription();
  //mensagemLoader: string;


  constructor(injector: Injector) {
    this.router = injector.get(Router);
    this.toastr = injector.get(ToastrService);
    this.cdRef = injector.get(ChangeDetectorRef);
    this.elementRef = injector.get(ElementRef);
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

  updateValueAndValidityControl() {

    if (!this.formGroup?.controls) {
      return;
    }

    Object.keys(this.formGroup.controls).forEach(key => {
      const control = this.formGroup.get(key);
      if (control?.invalid) {
        console.log('invalid - ' + key)
        this.formGroup?.get(key)?.updateValueAndValidity();
      }
    });

  }

  getFirstInvalidControl(): string | null {
    const controls = this.formGroup.controls;
    for (const controlName in controls) {
      if (controls[controlName].invalid) {
        return controlName;
      }
    }
    return null;
  }

  scrollToInvalidControl() {
    let controlName = this.getFirstInvalidControl();
    const invalidControlElement = this.elementRef.nativeElement.querySelector(`[formControlName="${controlName}"]`) ?? this.elementRef.nativeElement.querySelector(`.${controlName}`);
    const containerPrincipalElement = this.elementRef.nativeElement.querySelector(`.containerPrincipal`);


    if (invalidControlElement) {
      const elementPosition = invalidControlElement.getBoundingClientRect().top - containerPrincipalElement.getBoundingClientRect().top;


      containerPrincipalElement.scrollTo({
        top: (containerPrincipalElement.scrollTop + elementPosition) - 140,
        behavior: 'smooth'

      });
    }
  }

  onInvalidForm(mensagem?: string) {
    this.formGroup.markAllAsTouched();
    this.updateValueAndValidityControl();
    this.scrollToInvalidControl();

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
