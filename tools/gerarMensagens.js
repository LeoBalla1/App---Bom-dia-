const fs = require("fs");

/**
 * Gera mensagens únicas combinando prefixos, frases base e sufixos.
 */
function gerarVariedade(tipo, prefixos, frases, sufixos, meta = 1000) {
    let setUnico = new Set();
    let tentativas = 0;
    const maxTentativas = meta * 10;

    while (setUnico.size < meta && tentativas < maxTentativas) {
        tentativas++;
        let p = prefixos[Math.floor(Math.random() * prefixos.length)];
        let f = frases[Math.floor(Math.random() * frases.length)];
        let s = sufixos[Math.floor(Math.random() * sufixos.length)];

        let mensagem = `${p} ${f} ${s}`.trim().replace(/\s+/g, ' ');
        
        // Evita duplicatas visuais de saudação
        if (mensagem.toLowerCase().startsWith(`${tipo.toLowerCase()}! ${tipo.toLowerCase()}!`)) {
            mensagem = mensagem.substring(tipo.length + 2);
        }

        setUnico.add(mensagem);
    }
    return Array.from(setUnico);
}

const dados = {
    bomdia: gerarVariedade("Bom dia", 
        ["Bom dia!", "Olá!", "Acorda!", "Bom dia, família!", "Bom dia, amigos!", "Um lindo dia!", "Amanheceu!"],
        [
            "Que seu dia seja repleto de luz e alegria.",
            "Comece o dia com um sorriso e veja como tudo melhora.",
            "Desejo uma manhã produtiva e cheia de boas notícias.",
            "Que a paz de Deus acompanhe cada passo seu hoje.",
            "Aproveite cada segundo deste novo dia que se inicia.",
            "Que a felicidade te encontre e te siga por onde for.",
            "Hoje é um novo dia para recomeçar e fazer o seu melhor.",
            "Que a sua manhã seja tão linda quanto a sua alma.",
            "Acorde com determinação e vá dormir com satisfação.",
            "Um café quente e um coração cheio de fé para começar.",
            "Que hoje as coisas boas te sigam e te alcancem.",
            "Lembre-se que cada dia é uma nova oportunidade.",
            "Que o brilho do sol ilumine seus caminhos.",
            "Desejo que seu dia seja leve e cheio de sorrisos.",
            "Não espere por dias melhores, faça o hoje ser o melhor.",
            "Que a sua jornada hoje seja guiada pelo amor.",
            "Espalhe gentileza e colha sorrisos por onde passar.",
            "Que a coragem te acompanhe e a paz te fortaleça.",
            "A vida é um presente, aproveite cada instante.",
            "Que Deus abençoe seus planos e realize seus sonhos."
        ],
        ["Tenha um excelente dia!", "Deus te abençoe.", "Vamos com tudo!", "Muita paz hoje.", "Aproveite!", "Sorria sempre.", "Foco e fé!"]
    ),
    boatarde: gerarVariedade("Boa tarde",
        ["Boa tarde!", "Olá!", "Passando para desejar...", "Uma ótima tarde!", "Boa tarde a todos!"],
        [
            "Que sua tarde seja tranquila e muito produtiva.",
            "Desejo um descanso merecido no meio da sua jornada.",
            "Que o restante do seu dia seja maravilhoso e iluminado.",
            "Falta pouco para o fim do dia, continue com foco!",
            "Que a beleza deste entardecer renove suas energias.",
            "Aproveite o sol da tarde e as boas vibrações.",
            "Que cada minuto desta tarde seja para sorrir.",
            "Que a calma invada seu peito e a produtividade guie suas mãos.",
            "Desejo que sua tarde seja doce e cheia de boas surpresas.",
            "Que o café da tarde seja acompanhado de bons pensamentos.",
            "Lembre-se de fazer uma pausa e agradecer pelo caminho.",
            "Que a luz do entardecer traga clareza para suas decisões.",
            "Desejo que o seu trabalho renda e o descanso seja bom.",
            "Que a sua tarde seja tão especial quanto você merece.",
            "Recarregue as baterias e siga com entusiasmo.",
            "Que o sucesso te encontre em cada tarefa.",
            "Mantenha o otimismo, o melhor ainda está por vir.",
            "Que a serenidade do fim do dia se aproxime.",
            "Que a sua determinação vença qualquer obstáculo.",
            "Desejo uma tarde iluminada e feliz."
        ],
        ["Bom trabalho!", "Aproveite o descanso.", "Fique em paz.", "Até mais tarde!", "Continue firme!", "Deus no controle."]
    ),
    boanoite: gerarVariedade("Boa noite",
        ["Boa noite!", "Durma bem!", "Bom descanso!", "Noite abençoada!", "Até amanhã!"],
        [
            "Que sua noite seja de paz e sonhos maravilhosos.",
            "Descanse profundamente para renovar as forças.",
            "Que as estrelas iluminem seu sono e tragam tranquilidade.",
            "Que a serenidade tome conta do seu coração agora.",
            "Apague as luzes, relaxe e deixe os problemas para amanhã.",
            "Desejo uma noite abençoada e um sono reparador.",
            "Que o silêncio da noite traga as respostas que procura.",
            "Que os anjos protejam seu sono e te preparem.",
            "Agradeça pelo dia e durma com a certeza de um amanhã melhor.",
            "Que a lua seja sua guia em sonhos cheios de esperança.",
            "É hora de descansar a mente e deixar a alma sonhar.",
            "Acorde amanhã com a energia renovada e coração vibrante.",
            "Que o aconchego da sua cama cure todo o cansaço.",
            "Que a sua fé seja o travesseiro onde você repousa.",
            "Durma em paz, sabendo que você fez o seu melhor.",
            "Que o seu sono seja leve e você acorde pronto para brilhar.",
            "Deixe que a escuridão leve embora o que foi pesado.",
            "Que os sonhos de hoje sejam combustível para amanhã.",
            "Que a paz de Deus seja a sentinela do seu lar.",
            "Um novo capítulo cheio de oportunidades te espera."
        ],
        ["Fique com Deus.", "Bons sonhos!", "Até amanhã cedo.", "Descanse muito.", "Paz e luz.", "Obrigado por hoje."]
    )
};

fs.writeFileSync("mensagens.json", JSON.stringify(dados, null, 2));
console.log(`Sucesso! Geradas ${dados.bomdia.length} de Bom dia, ${dados.boatarde.length} de Boa tarde e ${dados.boanoite.length} de Boa noite.`);
