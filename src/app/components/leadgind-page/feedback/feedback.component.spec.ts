import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FeedbackComponent } from "./feedback.component";
import { FeedbackModule } from "./feedback.module";



describe('FeedbackComponent', () => {

    let component: FeedbackComponent;
    let fixture: ComponentFixture<FeedbackComponent>;


    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FeedbackModule]
        ,providers: []

      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(FeedbackComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });


    it('should create', () => {
      expect(component).toBeTruthy();
    });




});
