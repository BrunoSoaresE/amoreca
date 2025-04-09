import { Component, ChangeDetectionStrategy, OnInit, ViewChild, ElementRef } from "@angular/core";

@Component({
  standalone: false,
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PessoaComponent {


  subNomeEvento = 'Cháversário';
  nomeEvento = 'Cecília';
  fotoCapaUrl = 'assets/backgrounds/amor.png';
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




  imagemAtual = 0;



  // anterior() {
  //   this.imagemAtual = (this.imagemAtual - 1 + this.backgrounds.length) % this.backgrounds.length;
  // }

  // proximo() {
  //   this.imagemAtual = (this.imagemAtual + 1) % this.backgrounds.length;
  // }
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
