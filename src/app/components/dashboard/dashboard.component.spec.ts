import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DashboardComponent } from "./dashboard.component";
import { DashboardModule } from "./dashboard.module";
import { AppModule } from "../../app.module";



describe('DashboardComponent', () => {

    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;


    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AppModule,DashboardModule]
        ,providers: []

      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(DashboardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });


    it('should create', () => {
      expect(component).toBeTruthy();
    });




});
