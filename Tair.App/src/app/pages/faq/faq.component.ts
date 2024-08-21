import { Component } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { Faq } from '../../common/interfaces/faq';
import { GetInTouchComponent } from '@shared-components/get-in-touch/get-in-touch.component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    FlexLayoutModule,
    MatExpansionModule,
    MatButtonModule,
    GetInTouchComponent
  ],
  templateUrl: './faq.component.html'
})
export class FaqComponent {
  public faqs: Faq[] = [
    { 
      question: 'É seguro voar com a Helicoptair?', 
      status: '', 
      answer: 'Sem dúvida. Todas as aeronaves possuem plano de manutenção totalmente em dia e os pilotos possuem experiência comprovada e todos os cursos necessários para estarem aptos a exercer a função a bordo.' 
    },
    { 
      question: 'O tempo de voo é realizado corretamente?', 
      status: '', 
      answer: 'Todos os tempos de voo são somente estimados, como informado na hora da venda. Os voos se diferenciam pelos roteiros, que são cumpridos em sua totalidade, exceto em caso de alguma restrição de visibilidade ou não autorização dos órgãos de controle.' 
    },
    { 
      question: 'Com quanto tempo de antecedência devo me apresentar para check-in?', 
      status: '', 
      answer: 'Todos os passageiros devem chegar com pelo menos 30min de antecedência da hora de decolagem, com risco de perder a reserva em caso de atrasos.' 
    },
    { 
      question: 'Quais as políticas de cancelamento e reembolso da empresa?', 
      status: '', 
      answer: 'Qualquer cancelamento ou reagendamento realizado com pelo menos 24h do horário de decolagem pode ser realizado. Mudanças com menos de 24h não serão permitidas e nenhum reembolso será feito, independente da situação.' 
    },
    { 
      question: 'A aeronave possui seguro para terceiros?', 
      status: '', 
      answer: 'Sim. Todas as aeronaves utilizadas possuem o seguro RETA que é obrigatório a todas as aeronaves e outro seguro opcional que cobre danos a aeronaves e as pessoas a bordo.' 
    },
    { 
      question: 'Como faço para realizar a reserva?', 
      status: '', 
      answer: 'O agendamento pode ser realizado diretamente nesta página, com o pagamento de R$ 300 de tarifa de reserva e o restante pago no dia do voo. Caso prefira, também pode nos chamar no WhatsApp e realizar o procedimento por lá com nossa equipe. Nosso número é +55 21 99558-5986.' 
    },
    { 
      question: 'Qual limite de peso?', 
      status: '', 
      answer: 'Máximo permitido de 120kg por assento, sendo o passageiro responsável por tal informação. Caso o passageiro reserve o voo e no dia o seu peso esteja acima do permitido, é considerado reserva perdida e não há devolução.' 
    },
    { 
      question: 'Até quantas pessoas vão na aeronave nos voos compartilhados?', 
      status: '', 
      answer: 'Utilizamos aeronaves com capacidade máxima de 4 passageiros + piloto.' 
    },
    { 
      question: 'É permitido levar cachorro em voo?', 
      status: '', 
      answer: 'Somente raças bem pequenas que possam ir no colo e obrigatoriamente nos assentos traseiros. Raças como Shitzu, por exemplo, são permitidas.' 
    },
    { 
      question: 'Tem alguma restrição ou desconto devido a idade?', 
      status: '', 
      answer: 'Não há qualquer restrição quanto a idade. Passageiros com até 1 ano e 11 meses tem gratuidade.' 
    },
    { 
      question: 'O que acontece em caso de condição climática adversa?', 
      status: '', 
      answer: 'Não realizamos cancelamentos ou reagendamentos somente por algum ponto do roteiro estar com visibilidade restrita. Para que possamos reagendar ou cancelar o voo tem que ser impedido de decolar por condições adversas.' 
    }
  ]
}
