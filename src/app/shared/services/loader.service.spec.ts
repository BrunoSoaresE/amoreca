// import {HttpClientModule} from '@angular/common/http';
// import {MockBuilder, MockRender, ngMocks} from 'ng-mocks';
// import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
// import {LoaderService} from './loader.service';

// describe('LoaderService', () => {
//   let service: LoaderService;
//   let httpMock: HttpTestingController;

//   beforeEach(() => {
//     return MockBuilder(LoaderService, HttpClientModule).replace(
//       HttpClientModule,
//       HttpClientTestingModule,
//     );
//   });

//   beforeEach(() => {
//     MockRender();
//     service = ngMocks.findInstance(LoaderService);
//     httpMock = ngMocks.findInstance(HttpTestingController);
//   });

//   afterEach(() => httpMock.verify());

//   it('should create', () => {
//     expect(service).toBeTruthy();
//   });
// });
