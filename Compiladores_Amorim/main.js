import { pessoas, emojis } from "./dados.js"

function teste() {
    console.log("Hello World!")
}

function traduzir() {
    const erros = [];
    let texto = escaparHTML(document.getElementById("entrada").value);

    texto = subMencoes(texto, erros);
    texto = subHashtags(texto, erros);

    const hashtags = texto.match(/#[\wÀ-ÿ:]+/g) || [];
    const mencoes = texto.match(/@[\wÀ-ÿ]+/g) || [];

    document.getElementById("saida").innerHTML = texto;

    const lista = document.getElementById("erros");
    lista.innerHTML = "";

    if (erros.length === 0) {
        lista.innerHTML = "<li>Nenhum erro encontrado.</li>";
    }

    for (const mensagem of erros) {
        const item = document.createElement("li");
        item.className = "erro";
        item.textContent = mensagem;
        lista.appendChild(item);
    }
    
    console.log("Menções:", mencoes);
    console.log("Hashtags", hashtags);
    console.log("Erros: ", erros)
}

function marcarErro(trecho) {
    return '<span class="erro">' + trecho + "</span>";
}

function subMencoes(texto, erros) {
    const padrao = /@([\wÀ-ÿ]+)/g;

    return texto.replace(padrao, function (trecho, usuario) {
        const chave = usuario.toLowerCase();

        if (!Object.hasOwn(pessoas, chave)) {
            erros.push("Menção desconhecida: " + trecho);
            return marcarErro(trecho);
        }
        return pessoas[chave];
    });
}

function subHashtags(texto, erros) {
    const padrao = /#([\wÀ-ÿ]+)(?::([\wÀ-ÿ]+))?/g;

    return texto.replace(padrao, function (trecho, categoria, valor) {
        if (valor == undefined) {
            erros.push(
                "Hashtag em formato inválido: " + trecho + " (use #categoria:valor)"
            );
            return marcarErro(trecho);
        }

        const chave = (categoria + ":" + valor).toLowerCase();

        if (!Object.hasOwn(emojis, chave)) {
            erros.push("Hashtag desconhecida: " + trecho);
            return marcarErro(trecho);
        }

        return emojis[chave];
    }); 
}

function escaparHtml(texto) {
    return texto
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }

document.getElementById("botao").addEventListener("click", traduzir);