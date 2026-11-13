export function analisarSintatico(tokens) {
    let i = 0;      // ponteiro: posição do token atual na lista de tokens

    function esperar(tipo) {
        const token = tokens[i];                             // o token da vez

        if (token === undefined) {                           // acabaram os tokens
            throw new Error("Erro sintático: esperado " + tipo + ", mas o programa terminou");
        }

        if (token.tipo !== tipo) {                           // não é o tipo que a gramática pede
            throw new Error("Erro sintático na linha " + token.linha +
                ": esperado " + tipo + ", encontrado " + token.tipo);
        }

        i = i + 1;                                           // era o certo: consome e avança
        return token;
    }

    function comecaComando() {
        const token = tokens[i];
        if (token === undefined) {                           // sem token, não começa comando
            return false;
        }
        if (token.tipo === "TELA" || token.tipo === "FORMATO") {
            return true;
        }
        return false;
    }

    function lista() {
        const comandos = [];
        while (i < tokens.length) {
            comandos.push(comando())
        }
        return comandos;
    }

    function analisarParametro() {
        esperar("ABRE");
        const parametros = {};

        while (tokens[i] && tokens[i].tipo !== "FECHA") {
            const tokenChave = tokens[i];

            if (["LARGURA", "ALTURA", "POSICAOX", "POSICAOY", "COR", "ESPESSURA", "BORDA", "PREENCHIMENTO", "FORMATO"].includes(tokenChave.tipo)) {
                i++;
                const tokenValor = tokens[i];
                if (!tokenValor || (tokenValor.tipo !== "NUM" && tokenValor.tipo !== "COR")) {
                    throw new Error(`Erro sintático na linha ${tokenValor?.linha || tokenChave.linha}: esperado um valor (número ou cor) para ${tokenChave.lexema}`);
                }
                i++;

                parametros[tokenChave.tipo.toLowerCase()] = tokenValor.lexema;
            } else {
                throw new Error(`Erro sintático na linha ${tokenChave.linha}: propriedade inesperada '${tokenChave.lexema}'`);
            }
        }

        esperar("FECHA");
        return parametros;
    }

    function comando() {
        const token = tokens[i];

        if (token === undefined) {
            throw new Error("Erro sintático: esperado um comando, mas o programa terminou");
        }

        if (token.tipo === "TELA") {                      // comando → TELA COR
            esperar("TELA");

            let cor = "branco";
            if (tokens[i] && tokens[i].tipo === "COR") {
                cor = esperar("COR").lexema;
            }

            let parametros = {};
            if (tokens[i] && tokens[i].tipo === "ABRE") {
                parametros = analisarParametro();
            }

            return { tipo: "tela", ...parametros }
        } else if (token.tipo === "FORMA") {
            const formaToken = esperar("FORMA");

            let parametros = {};
            if (tokens[i] && tokens[i].tipo === "ABRE") {
                parametros = analisarParametro();
            }
            return { tipo: "forma", forma: formaToken.lexema, ...parametros }
        } else {
            throw new Error("Erro sintático na linha " + token.linha +
                ": esperado um comando, encontrado " + token.tipo);
        }
    }

    const comandos = lista();

    if (i < tokens.length) {                                 // sobrou algum token?
        const token = tokens[i];
        throw new Error("Erro sintático na linha " + token.linha +
            ": esperado o fim do programa, encontrado " + token.tipo);
    }

    return { tipo: "programa", comandos: comandos }
}