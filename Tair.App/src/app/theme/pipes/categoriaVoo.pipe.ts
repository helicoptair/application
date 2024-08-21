import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoriaVoo'
})
export class CategoriaVooPipe implements PipeTransform {
  transform(categoria: number) {  
    if(categoria == 1){
      return "Panorâmico"
    } else if(categoria == 2){
      return "Translado"
    } else if(categoria == 3){
      return "Doors-Off"
    } else{
      return "N/A"
    }
  }
}