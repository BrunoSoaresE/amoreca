import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FooterComponent } from "./footer.component";
import { FooterModule } from "./footer.module";



describe('FooterComponent', () => {

    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;


    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FooterModule]
        ,providers: []

      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(FooterComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });


    it('should create', () => {
      expect(component).toBeTruthy();
    });




});
