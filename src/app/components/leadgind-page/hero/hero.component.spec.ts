import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { HeroModule } from "./hero.module";



describe('HeroComponent', () => {

    let component: HeroComponent;
    let fixture: ComponentFixture<HeroComponent>;


    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HeroModule]
        ,providers: []

      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(HeroComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });


    it('should create', () => {
      expect(component).toBeTruthy();
    });




});
