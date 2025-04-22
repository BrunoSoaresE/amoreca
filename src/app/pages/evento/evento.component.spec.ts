import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventoComponent } from './evento.component';
import { EventoModule } from './evento.module';



describe('EventoComponent', () => {
  let component: EventoComponent;
  let fixture: ComponentFixture<EventoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EventoModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });






});
