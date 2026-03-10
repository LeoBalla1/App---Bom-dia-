const fs = require("fs");

function gerarMensagens(tipo, bases) {
    let lista = [];
    for (let i = 1; i <= 1000; i++) {
        let base = bases[Math.floor(Math.random() * bases.length)];
        lista.push(`${tipo}! ${base}`);
    }
    return lista;
}

const dados = {
    bomdia: gerarMensagens("Bom dia", [
        "Que seu dia seja repleto de luz e alegria.",
        "Comece o dia com um sorriso e tudo dará certo.",
        "Desejo uma manhã produtiva e cheia de boas notícias.",
        "Que a paz de Deus acompanhe cada passo seu hoje.",
        "Aproveite cada segundo deste novo dia que se inicia.",
        "Bom dia! Que a felicidade te encontre e te siga por onde for."
    ]),
    boatarde: gerarMensagens("Boa tarde", [
        "Que sua tarde seja tranquila e muito produtiva.",
        "Desejo um descanso merecido no meio da sua jornada.",
        "Que o restante do seu dia seja maravilhoso e iluminado.",
        "Falta pouco para o fim do dia, continue com foco e força!",
        "Boa tarde! Que a beleza do entardecer renove suas energias.",
        "Aproveite o sol da tarde e as boas vibrações que ele traz."
    ]),
    boanoite: gerarMensagens("Boa noite", [
        "Que sua noite seja de paz e sonhos maravilhosos.",
        "Descanse profundamente para renovar as forças para amanhã.",
        "Que as estrelas iluminem seu sono e tragam tranquilidade.",
        "Boa noite! Que a serenidade tome conta do seu coração agora.",
        "Apague as luzes, relaxe e deixe os problemas para amanhã.",
        "Desejo uma noite abençoada e um sono reparador para você."
    ])
};

fs.writeFileSync("mensagens.json", JSON.stringify(dados, null, 2));
console.log("Arquivo mensagens.json gerado com sucesso!");
