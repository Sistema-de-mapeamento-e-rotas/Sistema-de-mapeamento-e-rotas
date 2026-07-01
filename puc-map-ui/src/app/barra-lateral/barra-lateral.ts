import { Component, OnDestroy } from '@angular/core';
import { Estabelecimento, EstabelecimentoService } from '../estabelecimento.service';

@Component({
  selector: 'app-barra-lateral',
  imports: [],
  templateUrl: './barra-lateral.html',
  styleUrl: './barra-lateral.scss',
})
export class BarraLateral implements OnDestroy {
  estabelecimento: Estabelecimento | null = null;
  private readonly subscription;

  constructor(private readonly estabelecimentoService: EstabelecimentoService) {
    this.subscription = this.estabelecimentoService.estabelecimentoSelecionado$.subscribe((estabelecimento) => {
      this.estabelecimento = estabelecimento;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
