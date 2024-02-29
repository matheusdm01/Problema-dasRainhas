let tamtabuleiro = 8;
let solucao = Array(tamtabuleiro).fill(-1); // Inicializa com -1 para representar uma posição vazia
let t0, tf;

function tempo() {
    t0 = performance.now();
    acharsolucao(0);
    tf = performance.now();
    exibir();
}

function acharsolucao(linha) {
    if (linha === tamtabuleiro) {
        return true; // Solução encontrada
    }

    for (let col = 0; col < tamtabuleiro; col++) {
        if (tasafe(linha, col)) {
            solucao[linha] = col; // Coloca uma rainha na posição (linha, col)
            if (acharsolucao(linha + 1)) {
                return true; // Se encontrou uma solução, retorna verdadeiro
            }
            solucao[linha] = -1; // Desfaz a escolha se não levou a uma solução válida
        }
    }

    return false; // Se não encontrou solução para essa linha, retorna falso
}

function tasafe(linha, col) {
    for (let i = 0; i < linha; i++) {
        if (solucao[i] === col || Math.abs(solucao[i] - col) === linha - i) {
            return false; // Verifica se há conflito na mesma coluna ou diagonal
        }
    }
    return true;
}

function exibir() {
    let tab = "";
    for (let linha = 0; linha < tamtabuleiro; linha++) {
        for (let col = 0; col < tamtabuleiro; col++) {
            if (solucao[linha] === col) {
                tab += "Q ";
            } else {
                tab += ". ";
            }
        }
        tab += "\n";
    }
    let deltat = (tf - t0);

    document.getElementById("tabuleiro").textContent = tab;
    document.getElementById("tempo").textContent = "Tempo para solução: " + deltat + " milissegundos";
}

