import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PlansComponent } from "./plans.component";
import { PlansModule } from "./plans.module";



describe('PlansComponent', () => {

    let component: PlansComponent;
    let fixture: ComponentFixture<PlansComponent>;


    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PlansModule]
        ,providers: []

      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(PlansComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });


    it('should create', () => {
      expect(component).toBeTruthy();
    });




});
