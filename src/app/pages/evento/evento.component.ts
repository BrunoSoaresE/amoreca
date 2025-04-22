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

@Component({
  standalone: false,
  selector: 'app-component',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeImage', [
      transition(':enter', [
        style({ opacity: 0 }),  // Iniciar com opacidade 0
        animate('0.3s 0.2s ease-in', style({ opacity: 1 }))  // Animação para aparecer
      ]),
      transition(':leave', [
        style({ opacity: 1 }),  // Iniciar com opacidade 1
        animate('0.3s ease-out', style({ opacity: 0 }))  // Animação para desaparecer
      ])
    ])
  ]
})
export class EventoComponent extends EditBaseComponent implements OnInit {
  evento?: Evento;
  backgroundImageUrl: string = '';
  listaImgs: string[] = [];
  urlEvento?: string | null;






  constructor(protected injector: Injector,
    @Inject(PLATFORM_ID) private platformId: Object,
    protected formBuilder: FormBuilder,

    private eventoService: EventoService,
    private arquivoService: ArquivoService,
    private route: ActivatedRoute,

  ) {
    super(injector);
  }
  ngOnInit(): void {



    if (isPlatformBrowser(this.platformId)) {
      console.log("🚀 ~Executando no Navegador ngOnInit");

      this.formGroup = this.formBuilder.group({

      });

      this.route.paramMap.subscribe(params => {
        this.urlEvento = params.get('id-evento');
        this.getEvento();
      });


      this.startCarrossel();




    } else {
      console.log("🚀 ~Executando no Servidor ngOnInit");
    }

  }

  getEndereco() {
    return `${this.evento?.bairro ? this.evento.bairro : ''}
   ${this.evento?.rua ? ', ' + this.evento.rua : ''}
   ${this.evento?.numero ? ', ' + this.evento.numero : ''}
   ${this.evento?.complemento ? ' - ' + this.evento.complemento : ''}`
  }


  getEvento(): void {
    if (this.urlEvento)
      this.subscription.add(
        this.eventoService.getModelByLinkSite(this.urlEvento).subscribe({
          next: (response: Evento) => {
            this.evento = response;
            this.listaImgs = this.evento?.eventoArquivo?.filter(x => x.base64)?.map(x => x.base64 as string) ?? []

            const el = this.elementRef.nativeElement;
            el.style.setProperty('--cor-primaria', this.evento.tema?.corPrimaria || '#fff');
            el.style.setProperty('--cor-secundaria', this.evento.tema?.corSecundaria || '#000');
            el.style.setProperty('--cor-terciaria', this.evento.tema?.corTerciaria || '#ccc');
            this.cdRef.detectChanges();

            this.baixarArquivoTema();
            this.downloadTodasFotosVinculadas();
          }
        }),
      );
  }

  baixarArquivoTema() {
    if (this.evento?.tema?.arquivo?.nomeArmazenado)
      this.subscription.add(
        this.arquivoService.getArquivoByCaminho(this.evento.tema?.arquivo?.nomeArmazenado).subscribe({
          next: (response: Blob) => {
            console.log("🚀 ~ PessoaComponent ~ this.arquivoService.getArquivoByCaminho ~ response:", response)
            const blobUrl = URL.createObjectURL(response);
            this.backgroundImageUrl = `linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url('${blobUrl}')`;
            this.cdRef.detectChanges();
          }
        }),
      );
  }
  downloadTodasFotosVinculadas() {

    if (this.evento?.eventoArquivo)
      this.evento?.eventoArquivo.forEach(eventoArquivo => {
        if (eventoArquivo?.arquivo?.nomeArmazenado && !eventoArquivo.base64) {

          this.arquivoService.getArquivoBase64ByCaminho(eventoArquivo?.arquivo?.nomeArmazenado).subscribe({
            next: (response: ArquivoBase64) => {
              eventoArquivo.base64 = response.base64;
              this.listaImgs = this.evento?.eventoArquivo?.filter(x => x.base64)?.map(x => x.base64 as string) ?? []

              this.cdRef.detectChanges();
            }
          });
        }
      });

  }


  getCapa(): EventoArquivo | undefined {
    return this.evento?.eventoArquivo?.find(x => x.capa)
  }








  intervalId: any; // ID do intervalo
  tempoCarrossel = 8000; // 8 segundos

  startCarrossel() {
    // Iniciar o intervalo automático
    this.intervalId = setInterval(() => {
      this.proximo_ImagemCarrossel(null);
    }, this.tempoCarrossel);
  }
  stopCarrossel() {
    // Parar o intervalo automático
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  resetInterval() {
    // Limpar e reiniciar o intervalo sempre que o usuário interagir
    this.stopCarrossel();
    this.startCarrossel();
  }


  imagemAtualCarrossel = 0;
  anterior_ImagemCarrossel(event: MouseEvent | null) {
    if (event)
      event.stopPropagation();
    this.imagemAtualCarrossel = (this.imagemAtualCarrossel - 1 + this.listaImgs.length) % this.listaImgs.length;
    this.cdRef.detectChanges();
    this.resetInterval(); // Reiniciar o intervalo após interação
  }

  proximo_ImagemCarrossel(event: MouseEvent | null) {
    if (event)
      event.stopPropagation();
    this.imagemAtualCarrossel = (this.imagemAtualCarrossel + 1) % this.listaImgs.length;
    this.cdRef.detectChanges();
    this.resetInterval(); // Reiniciar o intervalo após interação

  }










  modalAberto = false;
  modalCapaAberto = false;

  abrirModal() {
    this.modalAberto = true;
    this.cdRef.detectChanges();
  }
  abrirCapaModal() {
    this.modalCapaAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
    this.modalCapaAberto = false;
  }


}
