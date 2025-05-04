import { ChangeDetectionStrategy, Component, Inject, Injector, OnInit, PLATFORM_ID } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { Evento } from '../../models/evento';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ArquivoBase64 } from '../../models/arquivo';
import { EventoArquivo } from '../../models/evento-arquivo';
import { ArquivoService } from '../../services/arquivo/arquivo.service';
import { EventoService } from '../../services/evento/evento.service';
import { EditBaseComponent } from '../../shared/components/edit-base.component';
import { EventoStore } from '../../services/evento/evento.store';
import { catchError, combineLatest, finalize, forkJoin, map, take, tap } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-component',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class EventoComponent extends EditBaseComponent implements OnInit {
  evento?: Evento;
  backgroundImageUrl: string = '';
  urlEvento?: string | null;



  constructor(protected injector: Injector,
    private arquivoService: ArquivoService,
    private route: ActivatedRoute,
    private eventoStore: EventoStore,

  ) {
    super(injector);
  }
  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      this.route.paramMap.subscribe(params => {
        this.urlEvento = params.get('id-evento');
        if (this.urlEvento)
          this.eventoStore.atualizarEventoByUrlEvento(this.urlEvento);
      });
    }


    this.eventoStore.evento$.subscribe(_evento => {
      this.evento = _evento;
      const el = this.elementRef.nativeElement;
      el.style.setProperty('--cor-primaria', this.evento?.tema?.corPrimaria || '#fff');
      el.style.setProperty('--cor-secundaria', this.evento?.tema?.corSecundaria || '#000');
      el.style.setProperty('--cor-terciaria', this.evento?.tema?.corTerciaria || '#ccc');
      this.cdRef.markForCheck();
      this.cdRef.detectChanges();


      this.download_BackgroundImage();
      this.download_FotosVinculadas();


    });
  }





  download_BackgroundImage() {
    if (this.evento?.tema?.arquivo?.nomeArmazenado && !this.backgroundImageUrl)
      this.subscription.add(
        this.arquivoService.getArquivoByCaminho(this.evento.tema?.arquivo?.nomeArmazenado).subscribe({
          next: (response: Blob) => {
            const blobUrl = URL.createObjectURL(response);
            this.backgroundImageUrl = `linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url('${blobUrl}')`;
            this.cdRef.detectChanges();
          }
        }),
      );
  }


  download_FotosVinculadas() {
    if (!this.evento?.eventoArquivo) return;

    const requests = this.evento.eventoArquivo
      .filter(ea => ea?.arquivo?.nomeArmazenado && !ea.base64)
      .map(ea => {

        return this.arquivoService.getArquivoBase64ByCaminho(ea.arquivo!.nomeArmazenado + 'x').pipe(
          map(response => ({ ea, base64: response.base64 }))

        );
      });



    if (requests.length === 0) return;


    combineLatest(requests)
      .subscribe((results) => {
        results.forEach(({ ea, base64 }) => {
          ea.base64 = base64;
        });
        this.eventoStore.setEvento(this.evento);
      });
  }













}
