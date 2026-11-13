export const regras = [
    { tipo: "ESPACO", padrao: /\s+/y, ignorar: true },
    { tipo: "COMENTARIO", padrao: /##.*/y, ignorar: true },
    { tipo: "TELA", padrao: /tela/y },
    { tipo: "FORMA", padrao: /retangulo|quadrado|triangulo|circulo/y },
    { tipo: "RAIO", padrao: /raio/y},
    { tipo: "LARGURA", padrao: /largura/y },
    { tipo: "ALTURA", padrao: /altura/y },
    { tipo: "POSICAOX", padrao: /posicaox/y },
    { tipo: "POSICAOY", padrao: /posicaoy/y },
    { tipo: "COR", padrao: /branco|vermelho|azul|verde|amarelo|roxo|preto/y },
    { tipo: "ESPESSURA", padrao: /espessura/y },
    { tipo: "BORDA", padrao: /borda/y },
    { tipo: "PREENCHIMENTO", padrao: /preenchimento/y },
    { tipo: "NUM", padrao: /[1-9][0-9]*/y },
    { tipo: "ABRE", padrao: /\[/y },
    { tipo: "FECHA", padrao: /\]/y }
]