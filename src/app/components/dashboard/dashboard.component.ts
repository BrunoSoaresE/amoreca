import * as moment from "moment";
import { Component, ChangeDetectionStrategy, Injector, OnInit } from "@angular/core";
import { EditBaseComponent } from "../../shared/components/edit-base.component";
import { DateAdapter } from "@angular/material/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { DashboardService } from "../../services/dashboard/dashboard.service";
import { Dashboard } from "../../models/dashboard";

@Component({
  standalone: false,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent extends EditBaseComponent implements OnInit {

  data?: Dashboard;

  constructor(
    protected injector: Injector,
    protected dateAdapter: DateAdapter<Date>,
    protected formBuilder: FormBuilder,
    protected dashboardService: DashboardService,

  ) {
    super(injector);
    moment.locale('pt-BR');
    dateAdapter.setLocale('pt-BR');
  }


  ngOnInit() {
    //this.onLoadForm();

    this.formGroup = this.formBuilder.group({
      // email: new FormControl({ value: null, disabled: this.isVisualizacao }, Validators.required),
      // senha: new FormControl({ value: null, disabled: this.isVisualizacao }, Validators.required),
    });

    this.subscription.add(
      this.dashboardService.getDashboard().subscribe({
        next: (response: Dashboard) => {
          this.data = response;
          this.cdRef.detectChanges();
        }
      }),
    );

  }

  onSubmit(): void {
    if (!this.formGroup.valid) {
      this.onInvalidForm();
      return;
    }

    //let dashboard = this.formGroup.getRawValue() as Dashboard;




  }


}
