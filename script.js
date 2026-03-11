let dados = {
    bomdia: [
        "Que seu dia seja repleto de luz e alegria.",
        "Comece o dia com um sorriso e tudo dará certo.",
        "Que a paz de Deus acompanhe cada passo seu hoje.",
        "Aproveite cada segundo deste novo dia que se inicia.",
        "Que a felicidade te encontre e te siga por onde for."
    ],
    boatarde: [
        "Que sua tarde seja tranquila e muito produtiva.",
        "Que o restante do seu dia seja maravilhoso e iluminado.",
        "Falta pouco para o fim do dia, continue com foco e força!",
        "Que a beleza do entardecer renove suas energias.",
        "Aproveite o sol da tarde e as boas vibrações que ele traz."
    ],
    boanoite: [
        "Que sua noite seja de paz e sonhos maravilhosos.",
        "Descanse profundamente para renovar as forças para amanhã.",
        "Que as estrelas iluminem seu sono e tragam tranquilidade.",
        "Que a serenidade tome conta do seu coração agora.",
        "Apague as luzes, relaxe e deixe os problemas para amanhã."
    ]
};
let periodoAtual = "";

function vibrar() {
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

function showToast(mensagem, duracao = 3000) {
    const toast = document.getElementById("toast");
    toast.innerText = mensagem;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), duracao);
}

function atualizarRelogio() {
    const agora = new Date();
    
    // Relógio
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    const relogioElement = document.getElementById("relogio");
    if (relogioElement) relogioElement.innerText = `${horas}:${minutos}`;

    // Data completa
    const opcoes = { weekday: 'long', day: 'numeric', month: 'long' };
    const dataFormatada = agora.toLocaleDateString('pt-BR', opcoes);
    const dataElement = document.getElementById("data-completa");
    if (dataElement) dataElement.innerText = dataFormatada;

    // Verificar Dia Especial
    verificarDiaEspecial(agora);

    // Verificar Pop-up de Horário (07:00, 14:00, 19:00)
    verificarPopUpHorario(agora);
}

function verificarPopUpHorario(agora) {
    const horas = agora.getHours();
    const minutos = agora.getMinutes();
    const chavePopUp = `popup_enviado_${horas}`;

    // Lista de horários permitidos
    const horariosAlvo = [7, 14, 19];

    if (horariosAlvo.includes(horas) && minutos === 0) {
        // Verifica se já não enviamos este pop-up na última hora para evitar repetições
        const ultimoEnvio = localStorage.getItem(chavePopUp);
        const hoje = agora.toDateString();

        if (ultimoEnvio !== hoje) {
            enviarPopUp(horas);
            localStorage.setItem(chavePopUp, hoje);
        }
    }
}

function enviarPopUp(hora) {
    let periodo = "boanoite";
    if (hora === 7) periodo = "bomdia";
    else if (hora === 14) periodo = "boatarde";

    const lista = dados[periodo];
    const msg = lista[Math.floor(Math.random() * lista.length)];

    // 1. Tentar Notificação Push (se permitido)
    if (Notification.permission === "granted") {
        navigator.serviceWorker.ready.then(registration => {
            registration.showNotification("Mensagem do Momento 🌟", {
                body: msg,
                icon: "icon-192.png",
                badge: "icon-192.png",
                vibrate: [200, 100, 200]
            });
        });
    } else {
        // 2. Fallback: Pop-up Interno (Toast persistente ou Modal)
        showToast(`🔔 ${msg}`, 10000); // Toast que dura 10 segundos
    }
}

function solicitarPermissaoNotificacao() {
    if (!("Notification" in window)) return;

    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            showToast("🔔 Notificações ativadas!");
            const btnNotif = document.getElementById("btn-notificacao");
            if (btnNotif) btnNotif.style.display = "none";
        }
    });
}

function verificarDiaEspecial(data) {
    const dia = data.getDate();
    const mes = data.getMonth() + 1; // Janeiro é 0
    const chave = `${dia}/${mes}`;

    const diasEspeciais = {
        "1/1": "Confraternização Universal (Ano Novo)",
        "25/1": "Dia do Carteiro",
        "1/2": "Dia do Publicitário",
        "8/3": "Dia Internacional da Mulher",
        "15/3": "Dia do Consumidor",
        "20/3": "Início do Outono",
        "1/4": "Dia da Mentira",
        "19/4": "Dia dos Povos Indígenas",
        "21/4": "Tiradentes",
        "27/4": "Dia da Empregada Doméstica",
        "1/5": "Dia do Trabalhador",
        "12/5": "Dia das Mães",
        "12/6": "Dia dos Namorados",
        "24/6": "Dia de São João",
        "20/7": "Dia do Amigo",
        "11/8": "Dia do Estudante / Dia dos Pais",
        "15/8": "Dia da Informática",
        "7/9": "Independência do Brasil",
        "13/9": "Dia do Programador",
        "12/10": "Nossa Senhora Aparecida / Dia das Crianças",
        "15/10": "Dia do Professor",
        "18/10": "Dia do Médico",
        "19/10": "Dia do Profissional de TI",
        "28/10": "Dia do Servidor Público",
        "31/10": "Halloween",
        "2/11": "Finados",
        "15/11": "Proclamação da República",
        "20/11": "Dia da Consciência Negra",
        "8/12": "Dia da Família",
        "25/12": "Natal"
    };

    const container = document.getElementById("dia-especial");
    const texto = document.getElementById("texto-dia-especial");

    if (diasEspeciais[chave]) {
        if (texto) texto.innerText = `Hoje é ${diasEspeciais[chave]}!`;
        if (container) container.style.display = "block";
    } else {
        if (container) container.style.display = "none";
    }
}

// Carregar mensagens extras do JSON se disponível (não bloqueia o app)
fetch("mensagens.json")
    .then(r => r.json())
    .then(json => {
        // Mesclar mensagens fixas com as do JSON e REMOVER DUPLICATAS
        dados.bomdia = Array.from(new Set([...dados.bomdia, ...json.bomdia]));
        dados.boatarde = Array.from(new Set([...dados.boatarde, ...json.boatarde]));
        dados.boanoite = Array.from(new Set([...dados.boanoite, ...json.boanoite]));
        
        console.log(`Pool carregado: ${dados.bomdia.length} bom dia, ${dados.boatarde.length} boa tarde, ${dados.boanoite.length} boa noite.`);
        
        detectarPeriodoAutomatico();
    })
    .catch(err => {
        console.warn("Aviso: mensagens.json não pôde ser carregado. Usando mensagens padrão.");
        detectarPeriodoAutomatico();
    });

// Inicializa a home assim que o script carregar
window.addEventListener('DOMContentLoaded', () => {
    detectarPeriodoAutomatico();
    atualizarRelogio();
    setInterval(atualizarRelogio, 60000); // Atualiza a cada minuto

    // Botão de notificação
    const btnNotif = document.getElementById("btn-notificacao");
    if (btnNotif && Notification.permission !== "granted" && Notification.permission !== "denied") {
        btnNotif.style.display = "flex";
        btnNotif.onclick = solicitarPermissaoNotificacao;
    }
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}

function carregarPeriodo(periodo) {
    periodoAtual = periodo;
    
    const fundo = document.getElementById("fundo");
    const keywords = {
        bomdia: "sunrise,morning,nature",
        boatarde: "sunset,afternoon,landscape",
        boanoite: "night,stars,moon,calm"
    };
    
    // Unsplash Source para fotos profissionais de alta qualidade
    // O timestamp no final (?sig=...) força uma imagem nova a cada clique
    const imgUrl = `https://source.unsplash.com/featured/1920x1080/?${keywords[periodo]}&sig=${Math.random()}`;
    
    fundo.style.backgroundImage = `url('${imgUrl}')`;

    // Atualizar UI
    document.getElementById("home").style.display = "none";
    document.getElementById("conteudo").style.display = "block";

    const titulos = {
        bomdia: "☀️ Mensagens de Bom Dia",
        boatarde: "🌇 Mensagens de Boa Tarde",
        boanoite: "🌙 Mensagens de Boa Noite"
    };
    document.getElementById("tituloPeriodo").innerText = titulos[periodo];

    atualizarMensagens();
}

function configurarMensagemRapida(periodo) {
    if (!dados[periodo] || dados[periodo].length === 0) {
        console.log("Dados ainda não carregados...");
        return;
    }
    
    const lista = dados[periodo];
    const msgAleatoria = lista[Math.floor(Math.random() * lista.length)];
    
    const textoElement = document.getElementById("msg-dia-texto");
    if (textoElement) {
        textoElement.innerText = msgAleatoria;
    }

    // Configurar botões da mensagem rápida
    const btnCopiar = document.getElementById("btn-copiar-rapido");
    if (btnCopiar) {
        btnCopiar.className = "btn-acao-mini btn-copy";
        btnCopiar.innerHTML = '<i class="fa-solid fa-link"></i>';
        btnCopiar.onclick = () => {
            vibrar();
            navigator.clipboard.writeText(msgAleatoria);
            showToast("Mensagem copiada!");
            btnCopiar.innerHTML = '<i class="fa-solid fa-check"></i>';
            setTimeout(() => btnCopiar.innerHTML = '<i class="fa-solid fa-link"></i>', 2000);
        };
    }

    const btnZap = document.getElementById("btn-zap-rapido");
    if (btnZap) {
        btnZap.className = "btn-acao-mini btn-whatsapp";
        btnZap.innerHTML = '<i class="fa-brands fa-whatsapp"></i>';
        btnZap.onclick = () => {
            vibrar();
            window.open(`https://wa.me/?text=${encodeURIComponent(msgAleatoria)}`);
        };
    }

    const btnShare = document.getElementById("btn-share-rapido");
    if (btnShare) {
        btnShare.className = "btn-acao-mini btn-share";
        btnShare.innerHTML = '<i class="fa-solid fa-share-nodes"></i>';
        btnShare.onclick = () => {
            vibrar();
            if (navigator.share) {
                navigator.share({ text: msgAleatoria });
            } else {
                showToast("Compartilhamento não suportado.");
            }
        };
    }

    // Definir fundo inicial da home baseado no horário (cada vez uma imagem nova)
    const fundo = document.getElementById("fundo");
    const keywords = {
        bomdia: "sunrise,nature",
        boatarde: "sunset,landscape",
        boanoite: "night,stars"
    };
    const imgUrl = `https://source.unsplash.com/featured/1920x1080/?${keywords[periodo]}&sig=${Math.random()}`;
    fundo.style.backgroundImage = `url('${imgUrl}')`;
}

function detectarPeriodoAutomatico() {
    const hora = new Date().getHours();
    let periodo = "boanoite";

    if (hora >= 5 && hora < 12) periodo = "bomdia";
    else if (hora >= 12 && hora < 18) periodo = "boatarde";

    configurarMensagemRapida(periodo);
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

let mensagensVistas = {
    bomdia: new Set(),
    boatarde: new Set(),
    boanoite: new Set()
};

function atualizarMensagens() {
    if (!dados[periodoAtual]) return;
    
    const container = document.getElementById("listaMensagens");
    container.innerHTML = "";

    // Mostrar Skeletons enquanto "carrega"
    for(let i=0; i<3; i++) {
        const skeleton = document.createElement("div");
        skeleton.className = "skeleton";
        container.appendChild(skeleton);
    }

    // Pequeno delay para simular carregamento e mostrar o skeleton
    setTimeout(() => {
        container.innerHTML = "";
        const lista = dados[periodoAtual];
        
        // Filtra mensagens que já foram vistas nesta sessão (se possível)
        let disponiveis = lista.filter(m => !mensagensVistas[periodoAtual].has(m));
        
        // Se todas foram vistas, reseta o histórico do período
        if (disponiveis.length < 15) {
            mensagensVistas[periodoAtual].clear();
            disponiveis = [...lista];
        }

        // Sorteia 15 mensagens únicas
        const selecionadas = shuffle([...disponiveis]).slice(0, 15);

        // Adiciona ao histórico de vistas
        selecionadas.forEach(m => mensagensVistas[periodoAtual].add(m));

        selecionadas.forEach((msg, index) => {
            const card = criarCardMensagem(msg);
            container.appendChild(card);
            
            // Adicionar anúncio no meio da lista (após a 5ª mensagem)
            if (index === 4) {
                const adDiv = document.createElement("div");
                adDiv.className = "ads-container ads-middle";
                adDiv.innerHTML = `
                    <ins class="adsbygoogle"
                         style="display:block"
                         data-ad-client="ca-pub-XXXXXXXXXXXX"
                         data-ad-slot="XXXXXXXXXX"
                         data-ad-format="auto"
                         data-full-width-responsive="true"></ins>
                `;
                container.appendChild(adDiv);
            }
        });
    }, 800);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function criarCardMensagem(texto) {
    const div = document.createElement("div");
    div.className = "mensagem-card";

    const p = document.createElement("p");
    p.className = "mensagem-texto";
    p.textContent = texto;

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const btnCopiar = document.createElement("button");
    btnCopiar.className = "btn-acao btn-copy";
    btnCopiar.innerHTML = '<i class="fa-solid fa-link"></i>';
    btnCopiar.title = "Copiar";
    btnCopiar.onclick = () => {
        vibrar();
        navigator.clipboard.writeText(texto);
        showToast("Mensagem copiada!");
        const original = btnCopiar.innerHTML;
        btnCopiar.innerHTML = '<i class="fa-solid fa-check"></i>';
        setTimeout(() => btnCopiar.innerHTML = original, 2000);
    };

    const btnZap = document.createElement("button");
    btnZap.className = "btn-acao btn-whatsapp";
    btnZap.innerHTML = '<i class="fa-brands fa-whatsapp"></i>';
    btnZap.title = "WhatsApp";
    btnZap.onclick = () => {
        vibrar();
        window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`);
    };

    const btnShare = document.createElement("button");
    btnShare.className = "btn-acao btn-share";
    btnShare.innerHTML = '<i class="fa-solid fa-share-nodes"></i>';
    btnShare.title = "Compartilhar";
    btnShare.onclick = () => {
        vibrar();
        if (navigator.share) {
            navigator.share({ text: texto });
        } else {
            showToast("Compartilhamento não suportado.");
        }
    };

    acoes.appendChild(btnCopiar);
    acoes.appendChild(btnZap);
    acoes.appendChild(btnShare);
    
    div.appendChild(p);
    div.appendChild(acoes);

    return div;
}

function voltarMenu() {
    document.getElementById("home").style.display = "flex";
    document.getElementById("conteudo").style.display = "none";
    // Volta para o fundo automático do horário
    detectarPeriodoAutomatico();
}
