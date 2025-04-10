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
    { question: 'Como posso me inscrever?', answer: 'Você pode se inscrever diretamente em nosso site clicando no botão "Experimente gratuitamente" na parte superior.', show: false },
    { question: 'O que está incluído no plano gratuito?', answer: 'O plano gratuito inclui acesso a funcionalidades básicas, permitindo amorecar até 5 compromissos por mês.', show: false },
    { question: 'Posso cancelar a assinatura a qualquer momento?', answer: 'Sim, você pode cancelar sua assinatura a qualquer momento sem taxas adicionais.', show: false },
    { question: 'O suporte é oferecido aos usuários gratuitos?', answer: 'Sim, todos os usuários têm acesso ao nosso suporte via chat e email, independentemente do plano.', show: false },
    { question: 'Como posso entrar em contato com o suporte?', answer: 'Você pode entrar em contato com o suporte através do nosso formulário de contato disponível no site.', show: false },
  ];


}
