export class Voos {
  id: number;
  tempo_de_voo_minutos: number;
  quantidade_pax: number;
  tipo_de_voo: TipoVooEnum;
  categoria_de_voo: CategoriaVooEnum;
  preco_pix_total: number;
  preco_pix_pessoa: number;
  preco_cartao_total: number;
  preco_cartao_pessoa: number;
  imagem_grande: string;
  imagem_media: string;
  imagem_pequena: string;
  titulo: string;
  status: string;
  url_voo: string;
}

enum CategoriaVooEnum {
  panoramico = 1,
  translado = 2,
  doorsoff = 3
}

enum TipoVooEnum {
  compartilhado = 1,
  exclusivo = 2,
  fotoOuVideo = 3,
  fotoEVideo = 4,
  doorsOff = 5
}