import * as moment from "moment";
import { Component, ChangeDetectionStrategy, Injector, OnInit } from "@angular/core";
import { EditBaseComponent } from "../../shared/components/edit-base.component";
import { DateAdapter } from "@angular/material/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";

@Component({
  standalone: false,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent extends EditBaseComponent implements OnInit {


  constructor(
    protected injector: Injector,
    protected dateAdapter: DateAdapter<Date>,
    protected formBuilder: FormBuilder,
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

    //let dashboard = this.formGroup.getRawValue() as Dashboard;


    // this.subscription.add(
    //   this.authService.dashboard(dashboard).subscribe({
    //     next: (response: DashboardDashboard) => {
    //       this.authService.setBearerToken(response?.bearer);
    //       this.sidenavService.close();
    //       this.toastr.success('Dashboard realizado com sucesso!');
    //       this.router.navigate([`/home`]);
    //     }
    //   }),
    // );

  }


}
