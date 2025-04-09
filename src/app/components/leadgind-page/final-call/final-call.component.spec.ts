import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FinalCallComponent } from "./final-call.component";
import { FinalCallModule } from "./final-call.module";




describe('FinalCallComponent', () => {

    let component: FinalCallComponent;
    let fixture: ComponentFixture<FinalCallComponent>;


    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FinalCallModule]
        ,providers: []

      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(FinalCallComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });


    it('should create', () => {
      expect(component).toBeTruthy();
    });




});
