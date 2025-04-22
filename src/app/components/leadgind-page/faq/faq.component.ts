import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  standalone: false,
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaqComponent {

  faqs = [
    {
      question: 'Como faço para criar meu primeiro evento?',
      answer: 'É só clicar no botão "Começar Grátis", criar sua conta e seguir o passo a passo para montar seu primeiro Amoreca!',
      show: false,
    },
    {
      question: 'O que está incluso no plano gratuito?',
      answer: 'Você pode criar 1 evento ativo com até 5 fotos. Depois que o evento acabar, ele será removido automaticamente.',
      show: false,
    },
    {
      question: 'E se eu quiser manter meu evento como recordação?',
      answer: 'Com qualquer plano de assinatura, seus eventos ficam salvos como lembranças e você pode acessar sempre que quiser.',
      show: false,
    },
    {
      question: 'Posso cancelar a qualquer momento?',
      answer: 'Claro! Você pode cancelar sua assinatura quando quiser, sem multa nem complicações.',
      show: false,
    },
    {
      question: 'Como falo com o suporte?',
      answer: 'Você pode nos chamar pelo WhatsApp ou enviar uma mensagem pelo nosso formulário de contato aqui no site.',
      show: false,
    },
  ];


}
