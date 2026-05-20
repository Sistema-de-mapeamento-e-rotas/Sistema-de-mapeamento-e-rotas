import { Component } from '@angular/core';

@Component({
  selector: 'app-cabecalho',
  imports: [],
  templateUrl: './cabecalho.html',
  styleUrl: './cabecalho.scss',
})
export class Cabecalho {
  pesquisar(event: Event, origemInput: HTMLInputElement, destinoInput: HTMLInputElement) {
    event.preventDefault();
    console.log('Pesquisar:', origemInput.value, destinoInput.value);
  }
}
