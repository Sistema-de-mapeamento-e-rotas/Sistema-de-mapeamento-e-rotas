import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Estabelecimento, EstabelecimentoService } from '../estabelecimento.service';

@Component({
  selector: 'app-cabecalho',
  imports: [CommonModule],
  templateUrl: './cabecalho.html',
  styleUrl: './cabecalho.scss',
})
export class Cabecalho {
  readonly locais: Estabelecimento[];
  sugestoesOrigem: Estabelecimento[] = [];
  sugestoesDestino: Estabelecimento[] = [];
  campoAtivo: 'origem' | 'destino' | null = null;
  private highlightedSvgId: string | null = null;

  constructor(private readonly estabelecimentoService: EstabelecimentoService) {
    this.locais = this.estabelecimentoService.getLocais();
  }

  onInput(event: Event, tipo: 'origem' | 'destino') {
    const valor = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.campoAtivo = tipo;

    const sugestoes = !valor
      ? []
      : this.locais.filter((local) => local.nome.toLowerCase().includes(valor));

    if (tipo === 'origem') {
      this.sugestoesOrigem = sugestoes;
      return;
    }

    this.sugestoesDestino = sugestoes;
  }

  selecionarSugestao(nome: string, tipo: 'origem' | 'destino', input: HTMLInputElement) {
    input.value = nome;

    if (tipo === 'origem') {
      this.sugestoesOrigem = [];
    } else {
      this.sugestoesDestino = [];
    }

    this.campoAtivo = null;
  }

  limparBusca(origemInput: HTMLInputElement, destinoInput: HTMLInputElement) {
    origemInput.value = '';
    destinoInput.value = '';
    this.sugestoesOrigem = [];
    this.sugestoesDestino = [];
    this.campoAtivo = null;
    this.estabelecimentoService.limparEstabelecimento();
    this.estabelecimentoService.limparOverlayImagem();
    this.clearHighlightedSvg();
  }

  pesquisar(event: Event, origemInput: HTMLInputElement, destinoInput: HTMLInputElement) {
    event.preventDefault();

    const origem = origemInput.value.trim();
    const destino = destinoInput.value.trim();
    const localEncontrado = this.estabelecimentoService.buscarPorNome(origem);
    const localDestino = this.estabelecimentoService.buscarPorNome(destino);

    const deveMostrarMockMasculino =
      localEncontrado?.nome.toLowerCase() === 'l130' &&
      localDestino?.nome.toLowerCase() === 'banheiro masculino';

    const deveMostrarMockFeminino =
      localEncontrado?.nome.toLowerCase() === 'l130' &&
      localDestino?.nome.toLowerCase() === 'banheiro feminino';

    const deveMostrarMockElevadorLab =
      localEncontrado?.nome.toLowerCase() === 'elevador 2' &&
      localDestino?.nome.toLowerCase() === 'l178';

    if (deveMostrarMockMasculino) {
      this.estabelecimentoService.definirOverlayImagem('/images/banheiro_masculino.png');
      this.estabelecimentoService.definirEstabelecimento(localEncontrado);
      this.highlightSvg(localEncontrado.svgId);
      return;
    }

    if (deveMostrarMockFeminino) {
      this.estabelecimentoService.definirOverlayImagem('/images/banheiro_feminino.png');
      this.estabelecimentoService.definirEstabelecimento(localEncontrado);
      this.highlightSvg(localEncontrado.svgId);
      return;
    }

    if (deveMostrarMockElevadorLab) {
      this.estabelecimentoService.definirOverlayImagem('/images/elevador-lab.png');
      this.estabelecimentoService.definirEstabelecimento(localEncontrado);
      this.highlightSvg(localEncontrado.svgId);
      return;
    }

    this.estabelecimentoService.limparOverlayImagem();

    if (localEncontrado && !destino) {
      this.estabelecimentoService.definirEstabelecimento(localEncontrado);
      this.highlightSvg(localEncontrado.svgId);
      return;
    }

    this.estabelecimentoService.limparEstabelecimento();
    this.clearHighlightedSvg();
  }

  private highlightSvg(svgId: string): void {
    this.clearHighlightedSvg();

    const element = document.getElementById(svgId);
    if (!element) {
      return;
    }

    element.setAttribute('stroke', '#4CAF50');
    element.setAttribute('stroke-width', '20');
    element.setAttribute('stroke-linejoin', 'round');
    this.highlightedSvgId = svgId;
  }

  private clearHighlightedSvg(): void {
    if (!this.highlightedSvgId) {
      return;
    }

    const previous = document.getElementById(this.highlightedSvgId);
    if (!previous) {
      this.highlightedSvgId = null;
      return;
    }

    previous.removeAttribute('stroke');
    previous.removeAttribute('stroke-width');
    previous.removeAttribute('stroke-linejoin');
    this.highlightedSvgId = null;
  }
}
