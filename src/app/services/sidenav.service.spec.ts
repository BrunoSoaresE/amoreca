import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { SidenavService } from './sidenav.service';

describe('SidenavService', () => {
  let service: SidenavService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      //imports: [HttpClientTestingModule,HttpClientTestingModule],
      providers: [
        SidenavService,
      ],
    });
    service = TestBed.inject(SidenavService);
    httpClient = TestBed.inject(HttpClient);
  });


  it('servico criado corretamente', () => {
    expect(service).toBeTruthy();
  });





});
