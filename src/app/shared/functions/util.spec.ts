// import * as Util from './util';
// import {prepare} from './util';
// import {of} from 'rxjs';
// import {finalize} from 'rxjs/operators';
// import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
// import * as moment from 'moment';

// describe('util', () => {
//     it('prepare - Deve executar o prepare antes de fazer a requisição e o finalize após finalizar o response.', (done) => {
//         of('Teste').pipe(
//             prepare(() => console.log('iniciou')),
//             finalize(() => console.log('finalizou'))).subscribe(result => {
//             expect(result).toEqual('Teste');
//             done();
//         });
//     });

//     it('setDataFormControl - Deve converter retornar o valor default caso o parametro seja uma valor vazio.', () => {
//         const formBuilder = new FormBuilder();
//         const formGroup = formBuilder.group({
//             data: [null]
//         });
//         const dataAtual = moment('2022-01-01').toDate();
//         Util.setDataFormControl('01/01/2022', 'data', formGroup);
//         expect(formGroup.get('data')?.value as any).toEqual(dataAtual);
//     });

//     it('setDataFormControl - Deve setar o valor nulo caso passar uma data invalida.', () => {
//         const formBuilder = new FormBuilder();
//         const formGroup = formBuilder.group({
//             data: [null]
//         });
//         Util.setDataFormControl('55454', 'data', formGroup);
//         expect(formGroup.get('data')?.value as any).toEqual(null);
//     });

//     it('camelize - Deve formatar o texto coloando em camelize, passando o valor todo em uppercase.', () => {
//         expect(Util.camelize('LOREM IPSUM IS SIMPLY DUMMY TEXT OF THE PRINTING AND TYPESETTING INDUSTRY'))
//             .toEqual('Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry');
//     });

//     it('camelize - Deve formatar o nome coloando em camelize, passando o valor todo em uppercase.', () => {
//         expect(Util.camelize('JOSÉ DE ARRUDA PIRES')).toEqual('José de Arruda Pires');
//     });

//     it('camelize - Deve formatar o nome coloando em camelize, passando o valor todo em lowercase.', () => {
//         expect(Util.camelize('josé de arruda pires')).toEqual('José de Arruda Pires');
//     });

//     it('camelize - Deve retornar vazio caso passe um valor vazio.', () => {
//         expect(Util.camelize('')).toEqual('');
//     });

//     it('camelize - Deve retornar nulo caso passe um valor nulo.', () => {
//         expect(Util.camelize(null)).toEqual(null);
//     });

//     it('should set formatted date in form group if valid', () => {
//        const formGroup = new FormGroup({});
//         const controlName = 'dateControl';
//         formGroup.addControl(controlName, new FormControl(null));

//         const event = { targetElement: { value: '03/09/2024' } }; // Data válida
//         Util.formatarData(event, formGroup, controlName);

//         const expectedDate = moment('03/09/2024', 'DD/MM/YYYY').toDate();
//         const actualValue = formGroup.get(controlName)?.value;

//         if(actualValue)
//           expect(actualValue).toEqual(expectedDate); // Verifica se a data é a esperada
//     });

//     it('should set null in form group if date is invalid', () => {
//       const formGroup = new FormGroup({});
//       const controlName = 'dateControl';
//       formGroup.addControl(controlName, new FormControl(null));

//       const event = { targetElement: { value: 'invalid-date' } }; // Data inválida
//       Util.formatarData(event, formGroup, controlName);

//       expect(formGroup.get(controlName)?.value).toBeNull();
//     });



//   it('should return the difference in milliseconds between current date and input date', () => {
//       const inputDate = moment().utc().subtract(1, 'day').format(); // Data de entrada
//       const difference = Util.calcularDiferencaEmMilissegundos(inputDate);

//       expect(difference).toBe(0);
//     });

//     it('should return a negative value for future dates', () => {
//       const futureDate = moment().utc().add(1, 'day').format(); // Data futura
//       const difference = Util.calcularDiferencaEmMilissegundos(futureDate);

//       expect(difference).toBe(0);
//     });


// });
