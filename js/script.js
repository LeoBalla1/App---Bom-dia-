let dados = {
    bomdia: [
        "Que seu dia seja repleto de luz e alegria.",
        "Comece o dia com um sorriso e tudo dará certo.",
        "Que a paz de Deus acompanhe cada passo seu hoje.",
        "Aproveite cada segundo deste novo dia que se inicia.",
        "Que a felicidade te encontre e te siga por onde for.",
        "Hoje é um novo dia para recomeçar e fazer o seu melhor.",
        "Que a sua manhã seja tão linda quanto a sua alma.",
        "Acorde com determinação e vá dormir com satisfação.",
        "Um café quente e um coração cheio de fé para começar.",
        "Que hoje as coisas boas te sigam e te alcancem."
    ],
    boatarde: [
        "Que sua tarde seja tranquila e muito produtiva.",
        "Que o restante do seu dia seja maravilhoso e iluminado.",
        "Falta pouco para o fim do dia, continue com foco e força!",
        "Que a beleza do entardecer renove suas energias.",
        "Aproveite o sol da tarde e as boas vibrações que ele traz.",
        "Que cada minuto desta tarde seja preenchido com motivos para sorrir.",
        "Que a calma invada seu peito e a produtividade guie suas mãos.",
        "Desejo que sua tarde seja doce, leve e cheia de boas surpresas.",
        "Que o café da tarde seja acompanhado de bons pensamentos.",
        "Boa tarde! Mantenha o otimismo, o melhor ainda está por vir."
    ],
    boanoite: [
        "Que sua noite seja de paz e sonhos maravilhosos.",
        "Descanse profundamente para renovar as forças para amanhã.",
        "Que as estrelas iluminem seu sono e tragam tranquilidade.",
        "Que a serenidade tome conta do seu coração agora.",
        "Apague as luzes, relaxe e deixe os problemas para amanhã.",
        "Desejo uma noite imensamente abençoada e um sono reparador.",
        "Que o silêncio da noite traga as respostas que você tanto procura.",
        "Que os anjos protejam seu sono e te preparem para um novo dia.",
        "Agradeça pelo dia que passou e durma com a certeza de um amanhã melhor.",
        "Que a lua seja sua guia em sonhos cheios de esperança e alegria."
    ]
};
let periodoAtual = "";

// TAREFA: Integração com Peapix Spotlight API
let peapixImages = [];

async function carregarPeapixSpotlight() {
    try {
        const response = await fetch('https://peapix.com/spotlight/feed?n=10');
        const data = await response.json();
        peapixImages = data.map(item => item.fullUrl);
        console.log("Spotlight Images carregadas:", peapixImages.length);
    } catch (err) {
        console.warn("Falha ao carregar Peapix Spotlight:", err);
    }
}

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

// TAREFA 6 - Notificações Diárias Aprimoradas
function verificarPopUpHorario(agora) {
    const horas = agora.getHours();
    const minutos = agora.getMinutes();
    const chavePopUp = `popup_v3_${horas}_${agora.toDateString()}`;

    // 4 Momentos: 7h (Manhã), 12h (Almoço), 18h (Tarde), 21h (Noite)
    const horariosAlvo = [7, 12, 18, 21];

    if (horariosAlvo.includes(horas) && minutos === 0) {
        if (!localStorage.getItem(chavePopUp)) {
            enviarPopUp(horas);
            localStorage.setItem(chavePopUp, 'true');
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
window.addEventListener('DOMContentLoaded', async () => {
    // Esconde o fundo inicialmente para evitar flash de imagem antiga
    const fundo = document.getElementById("fundo");
    if (fundo) fundo.style.opacity = 0;

    // Carregar imagens do Spotlight primeiro (Prioridade Total)
    await carregarPeapixSpotlight();
    
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

// TAREFA 2 - Sistema de Fundo de Tela (Prioridade Total Peapix Spotlight)
function definirFundo(periodo) {
    const fundo = document.getElementById("fundo");
    
    // Agora usamos APENAS o Peapix Spotlight para evitar imagens repetidas ou genéricas
    // Se o Peapix falhar, usamos um Unsplash Source como último recurso de emergência
    let imgUrl = "";
    
    if (peapixImages.length > 0) {
        // Pega uma imagem aleatória do Spotlight carregado
        imgUrl = peapixImages[Math.floor(Math.random() * peapixImages.length)];
    } else {
        // Fallback de emergência caso a API Peapix falhe (Unsplash Source)
        const keywords = {
            bomdia: "sunrise,morning",
            boatarde: "sunset,landscape",
            boanoite: "night,stars"
        };
        imgUrl = `https://source.unsplash.com/featured/1920x1080/?${keywords[periodo]}&sig=${Math.random()}`;
    }
    
    // Pré-carrega a imagem para evitar flash branco ou mostrar imagem antiga
    const imgPreload = new Image();
    imgPreload.src = imgUrl;
    imgPreload.onload = () => {
        fundo.style.backgroundImage = `url('${imgUrl}')`;
        fundo.style.opacity = 1; // Garante que o fundo apareça suavemente
    };
}

function carregarPeriodo(periodo) {
    periodoAtual = periodo;
    vibrar();
    
    definirFundo(periodo);

    // Atualizar UI com animação
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

function trocarMensagemRapida() {
    vibrar();
    const btn = document.querySelector('.btn-refresh');
    btn.classList.add('rotating');
    
    const periodo = getPeriodoPelaHora();
    configurarMensagemRapida(periodo);
    
    setTimeout(() => btn.classList.remove('rotating'), 600);
}

function getPeriodoPelaHora() {
    const hora = new Date().getHours();
    if (hora >= 5 && hora < 12) return "bomdia";
    if (hora >= 12 && hora < 18) return "boatarde";
    return "boanoite";
}

function configurarMensagemRapida(periodo) {
    if (!dados[periodo] || dados[periodo].length === 0) return;
    
    const lista = dados[periodo];
    const msgAleatoria = lista[Math.floor(Math.random() * lista.length)];
    
    const textoElement = document.getElementById("msg-dia-texto");
    if (textoElement) {
        // Animação suave de troca de texto
        textoElement.style.opacity = 0;
        setTimeout(() => {
            textoElement.innerText = msgAleatoria;
            textoElement.style.opacity = 1;
        }, 200);
    }

    // Configurar botões da mensagem rápida
    const setupBtn = (id, icon, onClick) => {
        const btn = document.getElementById(id);
        if (!btn) return;
        btn.innerHTML = `<i class="${icon}"></i>`;
        btn.onclick = () => {
            vibrar();
            onClick();
        };
    };

    setupBtn("btn-copiar-rapido", "fa-solid fa-link", () => {
        navigator.clipboard.writeText(msgAleatoria);
        showToast("Copiado com sucesso! ✨");
    });

    setupBtn("btn-zap-rapido", "fa-brands fa-whatsapp", () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(msgAleatoria)}`);
    });

    setupBtn("btn-share-rapido", "fa-solid fa-share-nodes", () => {
        if (navigator.share) navigator.share({ text: msgAleatoria });
    });

    definirFundo(periodo);
}

function detectarPeriodoAutomatico() {
    configurarMensagemRapida(getPeriodoPelaHora());
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

// Tentar carregar histórico de mensagens vistas do localStorage
let mensagensVistas = {
    bomdia: new Set(JSON.parse(localStorage.getItem('vistas_bomdia') || '[]')),
    boatarde: new Set(JSON.parse(localStorage.getItem('vistas_boatarde') || '[]')),
    boanoite: new Set(JSON.parse(localStorage.getItem('vistas_boanoite') || '[]'))
};

function salvarVistas() {
    localStorage.setItem('vistas_bomdia', JSON.stringify(Array.from(mensagensVistas.bomdia)));
    localStorage.setItem('vistas_boatarde', JSON.stringify(Array.from(mensagensVistas.boatarde)));
    localStorage.setItem('vistas_boanoite', JSON.stringify(Array.from(mensagensVistas.boanoite)));
}

// TAREFA 10 - Sistema de Favoritos
let favoritos = new Set(JSON.parse(localStorage.getItem('favoritos') || '[]'));

function toggleFavorito(texto, btn) {
    vibrar();
    if (favoritos.has(texto)) {
        favoritos.delete(texto);
        btn.classList.remove('active');
        showToast("Removido dos favoritos");
    } else {
        favoritos.add(texto);
        btn.classList.add('active');
        showToast("Adicionado aos favoritos! ❤️");
    }
    localStorage.setItem('favoritos', JSON.stringify(Array.from(favoritos)));
}

function verFavoritos() {
    periodoAtual = 'favoritos';
    vibrar();
    
    document.getElementById("home").style.display = "none";
    document.getElementById("conteudo").style.display = "block";
    document.getElementById("tituloPeriodo").innerText = "❤️ Meus Favoritos";
    document.getElementById("btn-gerar-mais").style.display = "none";

    const container = document.getElementById("listaMensagens");
    container.innerHTML = "";

    if (favoritos.size === 0) {
        container.innerHTML = "<p style='margin-top:50px; opacity:0.7;'>Você ainda não tem mensagens favoritas.</p>";
        return;
    }

    Array.from(favoritos).reverse().forEach(msg => {
        container.appendChild(criarCardMensagem(msg));
    });
}

// TAREFA 11 - Compartilhar como Imagem (Canvas)
async function compartilharComoImagem(texto) {
    vibrar();
    showToast("Gerando imagem... 🎨");
    
    const canvas = document.getElementById('canvasShare');
    const ctx = canvas.getContext('2d');
    
    // Configurações do canvas (Instagram Stories size)
    canvas.width = 1080;
    canvas.height = 1920;
    
    // Fundo (Gradiente baseado no período)
    const gradient = ctx.createLinearGradient(0, 0, 0, 1920);
    if (periodoAtual === 'bomdia') {
        gradient.addColorStop(0, '#ffb347'); gradient.addColorStop(1, '#ffcc33');
    } else if (periodoAtual === 'boatarde') {
        gradient.addColorStop(0, '#ff7e5f'); gradient.addColorStop(1, '#feb47b');
    } else {
        gradient.addColorStop(0, '#141e30'); gradient.addColorStop(1, '#243b55');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1920);

    // Texto da Mensagem
    ctx.fillStyle = "white";
    ctx.font = "bold 60px Segoe UI";
    ctx.textAlign = "center";
    
    // Quebra de linha inteligente
    const words = texto.split(' ');
    let line = '';
    let y = 800;
    const maxWidth = 800;
    const lineHeight = 80;

    for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        let metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
            ctx.fillText(line, 540, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, 540, y);

    // Rodapé
    ctx.font = "40px Segoe UI";
    ctx.globalAlpha = 0.7;
    ctx.fillText("Mensagens do Dia", 540, 1800);
    
    // Compartilhar
    canvas.toBlob(blob => {
        const file = new File([blob], 'mensagem.png', { type: 'image/png' });
        if (navigator.share) {
            navigator.share({
                files: [file],
                title: 'Mensagem do Dia',
                text: texto
            });
        } else {
            const link = document.createElement('a');
            link.download = 'mensagem.png';
            link.href = canvas.toDataURL();
            link.click();
        }
    });
}

function atualizarMensagens() {
    if (!dados[periodoAtual]) return;
    
    document.getElementById("btn-gerar-mais").style.display = "block";
    const container = document.getElementById("listaMensagens");
    container.innerHTML = "";

    // TAREFA 12 - Contador de mensagens
    let totalEnviadas = parseInt(localStorage.getItem('total_enviadas') || '0');
    totalEnviadas++;
    localStorage.setItem('total_enviadas', totalEnviadas);
    
    const badge = document.createElement("div");
    badge.className = "stats-badge";
    badge.innerText = `✨ ${totalEnviadas} inspiradas`;
    if (!document.querySelector('.stats-badge')) document.body.appendChild(badge);

    // Mostrar Skeletons
    for(let i=0; i<3; i++) {
        const skeleton = document.createElement("div");
        skeleton.className = "skeleton";
        container.appendChild(skeleton);
    }

    setTimeout(() => {
        container.innerHTML = "";
        const lista = dados[periodoAtual];
        let disponiveis = lista.filter(m => !mensagensVistas[periodoAtual].has(m));
        
        if (disponiveis.length < 15) {
            mensagensVistas[periodoAtual].clear();
            disponiveis = [...lista];
        }

        const selecionadas = shuffle([...disponiveis]).slice(0, 15);
        selecionadas.forEach(m => mensagensVistas[periodoAtual].add(m));
        salvarVistas();

        selecionadas.forEach((msg, index) => {
            container.appendChild(criarCardMensagem(msg));
            if (index === 4) {
                const adDiv = document.createElement("div");
                adDiv.className = "ads-container ads-middle";
                adDiv.innerHTML = `<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXXXXXXXXXX" data-ad-slot="XXXXXXXXXX" data-ad-format="auto" data-full-width-responsive="true"></ins>`;
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

    // Botão Favorito
    const btnFav = document.createElement("button");
    btnFav.className = `btn-acao btn-fav ${favoritos.has(texto) ? 'active' : ''}`;
    btnFav.innerHTML = '<i class="fa-solid fa-heart"></i>';
    btnFav.onclick = () => toggleFavorito(texto, btnFav);

    // Botão Imagem (Status)
    const btnImg = document.createElement("button");
    btnImg.className = "btn-acao btn-img";
    btnImg.innerHTML = '<i class="fa-solid fa-image"></i>';
    btnImg.title = "Postar no Status";
    btnImg.onclick = () => compartilharComoImagem(texto);

    const btnCopiar = document.createElement("button");
    btnCopiar.className = "btn-acao btn-copy";
    btnCopiar.innerHTML = '<i class="fa-solid fa-link"></i>';
    btnCopiar.onclick = () => {
        vibrar();
        navigator.clipboard.writeText(texto);
        showToast("Copiado! ✨");
    };

    const btnZap = document.createElement("button");
    btnZap.className = "btn-acao btn-whatsapp";
    btnZap.innerHTML = '<i class="fa-brands fa-whatsapp"></i>';
    btnZap.onclick = () => {
        vibrar();
        window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`);
    };

    acoes.appendChild(btnFav);
    acoes.appendChild(btnImg);
    acoes.appendChild(btnCopiar);
    acoes.appendChild(btnZap);
    
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
