import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ProvaComponent } from "./prova.component";
import { ProvaModule } from "./prova.module";



describe('ProvaComponent', () => {

    let component: ProvaComponent;
    let fixture: ComponentFixture<ProvaComponent>;


    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvaModule]
        ,providers: []

      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(ProvaComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });


    it('should create', () => {
      expect(component).toBeTruthy();
    });




});
