export class Reservas {
  id: string;
  quantidade_pax: number;
  data_voo: Date;
  charge_status: string;
  valor_pago: number;
  forma_pagamento: string;
  tempo_de_voo: number;
  pode_cancelar_ou_remarcar: boolean;
  categoria_voo: string;
}