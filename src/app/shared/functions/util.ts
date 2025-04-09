import { defer, Observable } from "rxjs";


export function prepare<T>(callback: () => void): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> =>
        defer(() => {
            callback();
            return source;
        });
}

// export function setDataFormControl(valueString: any, name: any, formGroup: any, format = 'DD/MM/YYYY') {
//     const convertDate = moment(valueString, format);

//     if (convertDate.isValid()) {
//         formGroup.get(name).setValue(convertDate.toDate(), {
//             onlyself: true
//         });
//     } else {
//         formGroup.get(name).setValue(null, {
//             onlyself: true
//         });
//     }
// }

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


export function  isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
}


