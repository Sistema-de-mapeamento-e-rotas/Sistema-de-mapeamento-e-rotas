import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Centro } from "./centro/centro";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Centro],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('puc-map-ui');
}
