import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusReserva'
})
export class StatusReservaPipe implements PipeTransform {
  transform(status: string) {  
    if(status == "Charge Succeeded"){
      return "Pago"
    } else if(status == "Charge Failed"){
      return "Erro no pagamento"
    } else if(status == "Pending"){
      return "Pendente"
    } else if(status == "Charge Refunded"){
      return "Reembolsado"
    }
    else{return ""}
  }
}