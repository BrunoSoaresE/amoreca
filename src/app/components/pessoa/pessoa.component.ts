import { Component, ChangeDetectionStrategy, Injector, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Tema } from "../../models/tema";
import { TemaService } from "../../services/tema/tema.service";
import { EditBaseComponent } from "../../shared/components/edit-base.component";
import { ArquivoService } from "../../services/arquivo/arquivo.service";
import { EventoService } from "../../services/evento/evento.service";
import { Evento } from "../../models/evento";

@Component({
  standalone: false,
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PessoaComponent extends EditBaseComponent implements OnInit {
  evento?: Evento;
  backgroundImageUrl: string = '';
  capaImageUrl: string = '';
  backgrounds: string[] = [];
  imagemAtual = 0;






  constructor(protected injector: Injector,
    protected formBuilder: FormBuilder,

    private eventoService: EventoService,
    private arquivoService: ArquivoService
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({

    });

    // this.subscription.add(
    //   this.temaService.getTemaById(13).subscribe({
    //     next: (response: Tema) => {
    //       this.temaSelecionado = response;
    //       const el = this.elementRef.nativeElement;
    //       el.style.setProperty('--cor-primaria', this.temaSelecionado?.corPrimaria || '#fff');
    //       el.style.setProperty('--cor-secundaria', this.temaSelecionado?.corSecundaria || '#000');
    //       el.style.setProperty('--cor-terciaria', this.temaSelecionado?.corTerciaria || '#ccc');
    //       this.baixarArquivo();
    //     }
    //   }),
    // );


    this.subscription.add(
      this.eventoService.getEventoById(2).subscribe({
        next: (response: Evento) => {
          this.evento = response;
          console.log("🚀 ~ PessoaComponent ~ this.eventoService.getEventoById ~ this.evento:", this.evento)
          const el = this.elementRef.nativeElement;
          el.style.setProperty('--cor-primaria', this.evento.tema?.corPrimaria || '#fff');
          el.style.setProperty('--cor-secundaria', this.evento.tema?.corSecundaria || '#000');
          el.style.setProperty('--cor-terciaria', this.evento.tema?.corTerciaria || '#ccc');
          this.baixarArquivo();
        }
      }),
    );


    setInterval(() => {
      this.proximo(null);
    }, 10000); // 10000 milissegundos = 10 segundos


  }

  baixarArquivo() {
    if (this.evento?.tema?.arquivo?.nomeArmazenado)
      this.subscription.add(
        this.arquivoService.getArquivoByCaminho(this.evento.tema?.arquivo?.nomeArmazenado).subscribe({
          next: (response: Blob) => {
            console.log("🚀 ~ PessoaComponent ~ this.arquivoService.getArquivoByCaminho ~ response:", response)
            const blobUrl = URL.createObjectURL(response);
            this.backgroundImageUrl = `linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url('${blobUrl}')`;


            this.capaImageUrl = blobUrl;
            this.backgrounds.push(blobUrl);
            this.backgrounds.push(blobUrl);
            this.backgrounds.push(blobUrl);
            this.backgrounds.push(blobUrl);
            this.cdRef.detectChanges();
          }
        }),
      );
  }



  anterior(event: MouseEvent | null) {
    if (event)
      event.stopPropagation();

    this.imagemAtual = (this.imagemAtual - 1 + this.backgrounds.length) % this.backgrounds.length;
  }

  proximo(event: MouseEvent | null) {
    if (event)
      event.stopPropagation();

    this.imagemAtual = (this.imagemAtual + 1) % this.backgrounds.length;
  }

  modalAberto = false;
  modalCapaAberto = false;

  abrirModal() {
    this.modalAberto = true;
  }
  abrirCapaModal() {
    this.modalCapaAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
    this.modalCapaAberto = false;
  }
}
