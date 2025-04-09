import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FaqComponent } from "./faq.component";
import { FaqModule } from "./faq.module";



describe('FaqComponent', () => {

    let component: FaqComponent;
    let fixture: ComponentFixture<FaqComponent>;


    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FaqModule]
        ,providers: []

      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(FaqComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });


    it('should create', () => {
      expect(component).toBeTruthy();
    });




});
