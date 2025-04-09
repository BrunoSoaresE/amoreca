import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component";
import { LoginModule } from "./login.module";
import { AppModule } from "../../app.module";



describe('LoginComponent', () => {

    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;


    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AppModule,LoginModule]
        ,providers: []

      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });


    it('should create', () => {
      expect(component).toBeTruthy();
    });




});
