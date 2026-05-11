import { Component } from '@angular/core';
import { Mapa } from "./mapa/mapa";

@Component({
  selector: 'app-centro',
  imports: [Mapa],
  templateUrl: './centro.html',
  styleUrl: './centro.scss',
})
export class Centro {}
