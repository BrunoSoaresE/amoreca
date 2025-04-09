import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MetricsComponent } from "./metrics.component";
import { MetricsModule } from "./metrics.module";



describe('MetricsComponent', () => {

    let component: MetricsComponent;
    let fixture: ComponentFixture<MetricsComponent>;


    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MetricsModule]
        ,providers: []

      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(MetricsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });


    it('should create', () => {
      expect(component).toBeTruthy();
    });




});
