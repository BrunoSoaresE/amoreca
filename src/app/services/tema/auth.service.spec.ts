// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { UserService } from '@cnj/uikit';
// import { HttpClient } from '@angular/common/http';
// import { ColaboradorStore } from 'src/app/_shared/services/colaborador.store';
// import { ConsultaAuxiliaresService } from './consulta-auxiliares.service';
// import { environment } from 'src/environments/environment';
// import { of } from 'rxjs';
// import { Nacionalidade } from 'src/app/models/consulta-auxiliares/nacionalidade';

// describe('ConsultaAuxiliaresService', () => {

//     let service: ConsultaAuxiliaresService;
//     let httpClient: HttpClient;

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [HttpClientTestingModule],
//             providers: [ConsultaAuxiliaresService, UserService, ColaboradorStore],
//         });
//         service = TestBed.inject(ConsultaAuxiliaresService);
//         httpClient = TestBed.inject(HttpClient);
//     });

//     it('servico ConsultaAuxiliaresService criado corretamente', () => {
//         expect(service).toBeTruthy();
//     });

//     it('obterListaColaboradores', () => {
//       const mockResult = { id: 1, descricao: "teste" } as Nacionalidade;


//         const endpoint = `${environment.api.url}/consulta-auxiliar/tipos-nacionalidade`;

//         const spy = spyOn(httpClient, 'get').and.returnValue(of([mockResult]));

//         service.getNacionalidades().subscribe((result) => {
//           expect(result).toEqual([mockResult]);
//         });


//         expect(spy).toHaveBeenCalledWith(endpoint,jasmine.any(Object));
//     });


// });
