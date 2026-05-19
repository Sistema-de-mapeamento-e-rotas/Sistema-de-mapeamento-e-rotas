def read_file(filename):

    global x, y
    lines = None    
    start = (0,0)
    end = (0,0)

    with open(filename) as file:
        lines = file.readlines()

        j = 0
        for line in lines:
            lines[j] = line.strip('\n')
            
            if line.find('F') > -1:
                end = (line.find('F'), j)
            if line.find('I') > -1:
                start = (line.find('I'), j)
            j += 1

    x = len(lines[0])
    y = len(lines)

    return lines, start, end

def get_value(c):
    
    v = -1

    if c == '.' or c == 'I' or c == 'F':
        v = 1
    elif c == 'X':
        v = -1

    return v


def get_char_from_map(mapa, coord):
    return mapa[coord[1]][coord[0]]

def get_value_from_map(mapa, coord):
    return get_value(get_char_from_map(mapa, coord))

def add_valid_pos(nb, mapa, coord):        
    if get_value_from_map(mapa, coord) > -1:
        nb.append(coord)

def get_neighborhood(mapa, coord):
    
    nb = []
    if coord[0] == 0:
        add_valid_pos(nb, mapa, (coord[0] + 1, coord[1]))
    
    elif coord[0] == x - 1:
        add_valid_pos(nb, mapa, (coord[0] - 1, coord[1]))
    
    else:    
        add_valid_pos(nb, mapa, (coord[0] + 1, coord[1]))
        add_valid_pos(nb, mapa, (coord[0] - 1, coord[1]))
    

    if coord[1] == 0:
        add_valid_pos(nb, mapa, (coord[0], coord[1] + 1))
    
    elif coord[1] == y - 1:
        add_valid_pos(nb, mapa, (coord[0], coord[1] - 1))
    
    else:    
        add_valid_pos(nb, mapa, (coord[0], coord[1] + 1))
        add_valid_pos(nb, mapa, (coord[0], coord[1] - 1))
    
    return nb


def salva_caminho(mapa, start, end):
    fila = [start]
    visitados = []
    pai = {}  # dicionário para guardar o caminho

    while fila:
        atual = fila.pop(0)

        if atual == end:
            # reconstruir caminho
            caminho = []
            while atual != start:
                caminho.append(atual)
                atual = pai[atual]
            caminho.append(start)
            caminho.reverse()

            print("Melhor caminho:")
            print(caminho)
            print("Passos:", len(caminho) - 1)
            return caminho

        visitados.append(atual)

        for vizinho in get_neighborhood(mapa, atual):
            if vizinho not in visitados and vizinho not in fila:
                fila.append(vizinho)
                pai[vizinho] = atual  # salva de onde veio

    return None

def desenha_caminho(mapa, caminho):
    mapa = list(mapa)

    for (x, y) in caminho:
        if mapa[y][x] not in ('I', 'F'):
            linha = mapa[y]
            mapa[y] = linha[:x] + '█' + linha[x+1:]

    for linha in mapa:
        print(linha)


mapa, start, end = read_file('maze2.txt')


caminho = salva_caminho(mapa, start, end)
desenha_caminho(mapa, caminho)