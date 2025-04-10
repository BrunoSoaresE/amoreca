import * as moment from "moment";
import { Component, ChangeDetectionStrategy, Injector, OnInit } from "@angular/core";
import { EditBaseComponent } from "../../shared/components/edit-base.component";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { DateAdapter } from "@angular/material/core";
import { Login, PessoaLogin } from "../../models/pessoa";
import { AuthService } from "../../services/auth.service";
import { SidenavService } from "../../services/sidenav.service";

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends EditBaseComponent implements OnInit {


  constructor(
    protected injector: Injector,
    protected dateAdapter: DateAdapter<Date>,
    protected formBuilder: FormBuilder,
    protected authService: AuthService,
    private sidenavService: SidenavService,
  ) {
    super(injector);
    moment.locale('pt-BR');
    dateAdapter.setLocale('pt-BR');
  }


  ngOnInit() {
    //this.onLoadForm();

    this.formGroup = this.formBuilder.group({
      email: new FormControl({ value: null, disabled: this.isVisualizacao }, Validators.required),
      senha: new FormControl({ value: null, disabled: this.isVisualizacao }, Validators.required),
    });
  }

  onSubmit(): void {
    if (!this.formGroup.valid) {
      this.onInvalidForm();
      return;
    }

    let login = this.formGroup.getRawValue() as Login;


    this.subscription.add(
      this.authService.login(login).subscribe({
        next: (response: PessoaLogin) => {
          this.authService.setBearerToken(response?.bearer);
          this.sidenavService.close();
          this.toastr.success('Login realizado com sucesso!');
          this.router.navigate([`/home`]);
        }
      }),
    );

  }


}
