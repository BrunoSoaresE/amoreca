import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FeaturesComponent } from "./features.component";
import { FeaturesModule } from "./features.module";



describe('FeaturesComponent', () => {

    let component: FeaturesComponent;
    let fixture: ComponentFixture<FeaturesComponent>;


    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FeaturesModule]
        ,providers: []

      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(FeaturesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });


    it('should create', () => {
      expect(component).toBeTruthy();
    });




});
