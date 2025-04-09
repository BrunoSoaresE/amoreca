import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PessoaComponent } from "./pessoa.component";
import { PessoaModule } from "./pessoa.module";
import { AppModule } from "../../app.module";



describe('PessoaComponent', () => {

    let component: PessoaComponent;
    let fixture: ComponentFixture<PessoaComponent>;


    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AppModule,PessoaModule]
        ,providers: []

      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(PessoaComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });


    it('should create', () => {
      expect(component).toBeTruthy();
    });




});
