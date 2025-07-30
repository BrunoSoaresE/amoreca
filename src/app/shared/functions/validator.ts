import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError, debounceTime, switchMap, first } from 'rxjs/operators';
import { EventoService } from '../../services/evento/evento.service';

export function linkDuplicadoValidator(eventoService: EventoService, idEvento: number): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if (!control.value) return of(null); // campo vazio não valida duplicidade

        return of(control.value).pipe(
            debounceTime(400),
            switchMap((linkSite: string) =>
                eventoService.existeEventoByLink(linkSite, idEvento).pipe(
                    map((existe: boolean) => (existe ? { linkDuplicado: true } : null)),
                    catchError(() => of(null)),
                    first()
                )
            )
        );
    };
}
