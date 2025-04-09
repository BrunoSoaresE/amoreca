import * as moment from 'moment';
import {defer, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {FormGroup} from '@angular/forms';
import {toMilliseconds} from './convert';
import { GetMenuGestorCadastro_AnaliseColaborador, Menu, MenuColaboradorCadastro } from 'src/app/models/common/menu';

export function prepare<T>(callback: () => void): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> =>
        defer(() => {
            callback();
            return source;
        });
}

export function setDataFormControl(valueString: any, name: any, formGroup: any, format = 'DD/MM/YYYY') {
    const convertDate = moment(valueString, format);

    if (convertDate.isValid()) {
        formGroup.get(name).setValue(convertDate.toDate(), {
            onlyself: true
        });
    } else {
        formGroup.get(name).setValue(null, {
            onlyself: true
        });
    }
}

export function camelize(str: any) {
    if (!str) {
        return str;
    }

    const preposicoes = ['da', 'de', 'di', 'do', 'du'];
    return str.toLowerCase().split(' ').map((c: any) => {
        if (preposicoes.includes(c)) {
            return c;
        }
        return `${c.substring(0, 1).toUpperCase()}${c.substring(1, c.length)}`;
    }).join(' ');
}

export const requestFileSource = (url: string) => new Promise<any>((resolve, reject) => {
    const request = new XMLHttpRequest();
    const method = 'GET';
    request.open(method, url, true);
    request.onload = () => {
        if (request.status === 200) {
            const response = JSON.parse(request.responseText);
            resolve(response);
        } else {
            resolve(environment);
        }
    };
    request.send();
});

export function formatarData(event: any, formGroup: FormGroup, name: string) {
    const convertDate = moment(event.targetElement.value, 'DD/MM/YYYY');

    if (convertDate.isValid()) {
        formGroup.get(name)?.setValue(convertDate.toDate(), {
            onlyself: true
        });
    } else {
        formGroup.get(name)?.setValue(null, {
            onlyself: true
        });
    }
}

export function calcularDiferencaEmMilissegundos(data: string): number {
    const totalMillisecondDataAtual = toMilliseconds(moment().utc().toDate());
    const totalMillisecondData = toMilliseconds(moment(data).utc().toDate());
    return totalMillisecondDataAtual - totalMillisecondData;
}

export function localizarMenuPelaRota(linkAtual: string, idColaborador: string | undefined): Menu | undefined {
  const menuColaborador = MenuColaboradorCadastro;

  const menuColaboradorAnalise = idColaborador ? GetMenuGestorCadastro_AnaliseColaborador(idColaborador) : [];

  const menuCompleto: Menu[] = [...menuColaborador, ...menuColaboradorAnalise];

  menuColaborador.forEach((object) => {
    if (object.subMenu) {
      object.subMenu.forEach((objectSubMenu) => {
        menuCompleto.push(objectSubMenu);
      });
    }
  });
  menuColaboradorAnalise.forEach((object) => {
    if (object.subMenu) {
      object.subMenu.forEach((objectSubMenu) => {
        menuCompleto.push(objectSubMenu);
      });
    }
  });

  console.log('linkAtual');
  console.log('linkAtual');
  console.log('linkAtual');
  console.log('linkAtual');
  console.log(idColaborador);
  console.log(linkAtual);
  console.log(menuCompleto);
  return menuCompleto.find((item) => item.router === linkAtual);

}

export function removerCaracteresEspeciais(valor: string): string {
  if (valor) {
    return valor.replace(/[^\w\s]/gi, '');
  } else {
    return '';
  }
}

export function calcularIdade(dataNascimento: Date): number {
  const hoje = new Date();
  dataNascimento = new Date(dataNascimento);

  let idade = hoje.getFullYear() - dataNascimento.getFullYear();

  const mesAtual = hoje.getMonth();
  const mesNascimento = dataNascimento.getMonth();

  // Verifica se ainda não fez aniversário este ano
  if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < dataNascimento.getDate())) {
    idade--;
  }

  return idade;
}

