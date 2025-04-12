import { Component, ChangeDetectionStrategy, Injector, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Tema } from "../../models/tema";
import { TemaService } from "../../services/tema/tema.service";
import { EditBaseComponent } from "../../shared/components/edit-base.component";
import { ArquivoService } from "../../services/arquivo/arquivo.service";

@Component({
  standalone: false,
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PessoaComponent extends EditBaseComponent implements OnInit {
  temaSelecionado?: Tema;
  backgroundImageUrl: string = '';
  capaImageUrl: string = '';
  backgrounds: string[] = [];
  imagemAtual = 0;


  subNomeEvento = 'Cháversário';
  nomeEvento = 'Cecília';
  diasRestantes = 5;
  tituloMensagem = 'Comemoração em dose dupla!!!';
  textoMensagem = `É com muita alegria que convido todos para celebrarmos juntos dois momentos especiais: o chá de bebê da nossa Cecília e o aniversário da mamãe de 29 anos!

Vamos nos reunir para um almoço com bebidas e música animada para tornar a celebração ainda mais divertida. Será um momento cheio de alegria e carinho!

Para presentear a Cecília é só acessar a lista de presentes, mas, caso prefiram, podem fazer um PIX CPF: 018.538.896-52. Fiquem à vontade para escolher a forma que for mais conveniente.

Deixe sua mensagem no nosso mural de recados. Vamos adorar ler cada uma delas!

Espero ver todos vocês lá! 🥰`;
  dataEvento = '07/04/2025';
  localEvento = 'Rua Frederico Cornélio, 48  / Salão de Festa';
  horarioEvento = '12:30h';





  constructor(protected injector: Injector,
    protected formBuilder: FormBuilder,

    private temaService: TemaService,
    private arquivoService: ArquivoService
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({

    });

    this.subscription.add(
      this.temaService.getTemaById(13).subscribe({
        next: (response: Tema) => {
          this.temaSelecionado = response;
          const el = this.elementRef.nativeElement;
          el.style.setProperty('--cor-primaria', this.temaSelecionado?.corPrimaria || '#fff');
          el.style.setProperty('--cor-secundaria', this.temaSelecionado?.corSecundaria || '#000');
          el.style.setProperty('--cor-terciaria', this.temaSelecionado?.corTerciaria || '#ccc');
          this.baixarArquivo();
        }
      }),
    );




  }

  baixarArquivo() {
    if (this.temaSelecionado?.arquivo?.caminhoFisico)
      this.subscription.add(
        this.arquivoService.getArquivoByCaminho(this.temaSelecionado?.arquivo?.nomeArmazenado).subscribe({
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
//   @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
//   canvas!: fabric.Canvas;

//   ngOnInit(): void {
//     this.canvas = new fabric.Canvas(this.canvasRef.nativeElement, {
//       preserveObjectStacking: true,
//       backgroundColor: '#fff'
//     });
//   }

//   addText(): void {
//     const text = new fabric.IText('Seu texto aqui', {
//       left: 50,
//       top: 50,
//       fontSize: 24,
//       fill: '#000',
//       fontFamily: 'Arial'
//     });

//     this.canvas.add(text);
//     this.canvas.setActiveObject(text);
//   }

//   onBackgroundSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files[0]) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         fabric.Image.fromURL(reader.result as string).then((img) => {
//           img.scaleToWidth(this.canvas.getWidth());
//           img.scaleToHeight(this.canvas.getHeight());

//           (this.canvas as any).setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas));
//         });
//       };
//       reader.readAsDataURL(input.files[0]);
//     }
//   }

// }
