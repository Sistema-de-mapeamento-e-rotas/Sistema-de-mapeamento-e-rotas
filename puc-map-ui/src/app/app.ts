import { Component, signal } from '@angular/core';
import { Centro } from "./centro/centro";
import { Cabecalho } from "./cabecalho/cabecalho";
import { BarraLateral } from "./barra-lateral/barra-lateral";

@Component({
  selector: 'app-root',
  imports: [Centro, Cabecalho, BarraLateral],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('puc-map-ui');
}
