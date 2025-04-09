import {ComponentFixture, TestBed} from '@angular/core/testing';
import { LeadgindComponent } from './leadgind.component';
import { LeadgindModule } from './leadgind.module';



describe('LeadgindComponent', () => {
  let component: LeadgindComponent;
  let fixture: ComponentFixture<LeadgindComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ LeadgindModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadgindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });






});
