import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { EstabelecimentoService } from '../../estabelecimento.service';

@Component({
  selector: 'app-mapa',
  imports: [CommonModule],
  templateUrl: './mapa.html',
  styleUrl: './mapa.scss',
})
export class Mapa implements OnDestroy {
  overlayImageUrl: string | null = null;
  private readonly overlaySubscription;

  constructor(private readonly estabelecimentoService: EstabelecimentoService) {
    this.overlaySubscription = this.estabelecimentoService.overlayImagem$.subscribe((url) => {
      this.overlayImageUrl = url;
    });
  }

  ngOnDestroy(): void {
    this.overlaySubscription.unsubscribe();
  }
}
