import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Estabelecimento {
    id: number;
    nome: string;
    infos: string;
    tipo: string;
    svgId: string;
}

@Injectable({
    providedIn: 'root',
})
export class EstabelecimentoService {
    private readonly estabelecimentos: Estabelecimento[] = [
        {
            id: 1,
            nome: 'l130',
            infos: 'Sala de aula',
            tipo: 'sala de aula',
            svgId: 'sala-24'
        },
        {
            id: 2,
            nome: 'l178',
            infos: 'Laboratório do departamento de química',
            tipo: 'laboratório',
            svgId: 'sala-16'
        },
        {
            id: 3,
            nome: 'l150',
            infos: 'Sala de aula',
            tipo: 'sala de aula',
            svgId: 'sala-4'
        },
        {
            id: 4,
            nome: 'banheiro masculino',
            infos: 'banheiro masculino e PCD',
            tipo: 'banheiro',
            svgId: 'banheiro-8'
        },
        {
            id: 5,
            nome: 'banheiro feminino',
            infos: 'banheiro feminino',
            tipo: 'banheiro',
            svgId: 'banheiro-6'
        },
        {
            id: 6,
            nome: 'escada 1',
            infos: 'Conecta primeiro andar com o segundo',
            tipo: 'escada',
            svgId: 'escada-1'
        },
        {
            id: 7,
            nome: 'escada 2',
            infos: 'Conecta o térreo com o primeiro andar',
            tipo: 'escada',
            svgId: 'escada-2'
        },
        {
            id: 8,
            nome: 'elevador 2',
            infos: 'Atende do primeiro ao quinto andar',
            tipo: 'elevador',
            svgId: 'elevador-2'
        }
    ];

    private readonly estabelecimentoSelecionadoSubject = new BehaviorSubject<Estabelecimento | null>(null);
    readonly estabelecimentoSelecionado$ = this.estabelecimentoSelecionadoSubject.asObservable();

    private readonly overlayImagemSubject = new BehaviorSubject<string | null>(null);
    readonly overlayImagem$ = this.overlayImagemSubject.asObservable();

    getLocais(): Estabelecimento[] {
        return this.estabelecimentos;
    }

    buscarPorNome(nome: string): Estabelecimento | undefined {
        const valor = nome.trim().toLowerCase();

        if (!valor) {
            return undefined;
        }

        return this.estabelecimentos.find((estabelecimento) => estabelecimento.nome.toLowerCase() === valor);
    }

    definirEstabelecimento(estabelecimento: Estabelecimento | null): void {
        this.estabelecimentoSelecionadoSubject.next(estabelecimento);
    }

    limparEstabelecimento(): void {
        this.estabelecimentoSelecionadoSubject.next(null);
    }

    definirOverlayImagem(url: string | null): void {
        this.overlayImagemSubject.next(url);
    }

    limparOverlayImagem(): void {
        this.overlayImagemSubject.next(null);
    }
}
