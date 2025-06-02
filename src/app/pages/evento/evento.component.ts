import { ChangeDetectionStrategy, Component, HostListener, Injector, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ArquivoService } from '../../services/arquivo/arquivo.service';
import { EditBaseComponent } from '../../shared/components/edit-base.component';
import { EventoStore } from '../../services/evento/evento.store';
import { combineLatest, map, } from 'rxjs';
import { Evento } from '../../models/evento/evento';

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



      this.download_BackgroundImage();
      this.download_FotosVinculadas();
      this.download_FotosPresentesVinculadas();

      this.cdRef.markForCheck();
      this.cdRef.detectChanges();

    });
  }

  fixarNavbar = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const limite = 230; // ajuste esse valor conforme seu layout
    this.fixarNavbar = window.pageYOffset >= limite;
    console.log("🚀 ~ EventoComponent ~ onWindowScroll ~ window.pageYOffset:", window.pageYOffset)
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

        return this.arquivoService.getArquivoBase64ByCaminho(ea.arquivo!.nomeArmazenado).pipe(
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

  download_FotosPresentesVinculadas() {
    if (!this.evento?.eventoPresente) return;

    const requests = this.evento.eventoPresente
      .filter(ea => ea.presente?.arquivo?.nomeArmazenado && !ea.presente?.base64)
      .map(ea => {

        return this.arquivoService.getArquivoBase64ByCaminho(ea.presente!.arquivo!.nomeArmazenado).pipe(
          map(response => ({ ea, base64: response.base64 }))

        );
      });



    if (requests.length === 0) return;


    combineLatest(requests)
      .subscribe((results) => {
        results.forEach(({ ea, base64 }) => {
          if (ea.presente)
            ea.presente.base64 = base64;
        });
        this.eventoStore.setEvento(this.evento);
      });
  }














}
