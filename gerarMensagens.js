Estou desenvolvendo um app gerador de mensagens - bomdia/boa tarde/boa noite
 
Vou te mandar os codigos que tenho agora e quero que voce de ideias de melhoria - uma coisa que preciso mudar é ao entrar na pagina ele verifica o horario atual e gera a mensagem de acordo Mas quero uma opção para clicar em gerar mensagens de outro periodo
 
Vou passar os codigos atuais abaixo
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Mensagens do Dia</title>
<link rel="stylesheet" href="style.css">
</head>
<body class="inicio">
<header>
<h1>Mensagens do Dia</h1>
<p>Escolha o período</p>
</header>
<div id="menu">
<button onclick="carregarPeriodo('bomdia')">☀️ Bom Dia</button>
<button onclick="carregarPeriodo('boatarde')">🌇 Boa Tarde</button>
<button onclick="carregarPeriodo('boanoite')">🌙 Boa Noite</button>
</div>
<main id="conteudo" style="display:none;">
<h2 id="tituloPeriodo"></h2>
<div id="listaMensagens"></div>
</main>
<script src="script.js"></script>
</body>
</html>
 
let dados = {}
fetch("mensagens.json")
.then(r=>r.json())
.then(json=>{
dados=json
})
function carregarPeriodo(periodo){
document.body.className=periodo
document.getElementById("menu").style.display="none"
document.getElementById("conteudo").style.display="block"
let titulo=""
if(periodo=="bomdia") titulo="☀️ Mensagens de Bom Dia"
if(periodo=="boatarde") titulo="🌇 Mensagens de Boa Tarde"
if(periodo=="boanoite") titulo="🌙 Mensagens de Boa Noite"
document.getElementById("tituloPeriodo").innerText=titulo
mostrarMensagens(dados[periodo])
}
function mostrarMensagens(lista){
let container=document.getElementById("listaMensagens")
container.innerHTML=""
lista.forEach(msg=>{
let div=document.createElement("div")
div.className="mensagem"
div.innerHTML=`
<p>${msg}</p>
<div class="botoes">
<button onclick="copiar('${msg}')">Copiar</button>
<button onclick="compartilhar('${msg}')">Compartilhar</button>
<button onclick="whatsapp('${msg}')">WhatsApp</button>
</div>
`
container.appendChild(div)
})
}
function copiar(texto){
navigator.clipboard.writeText(texto)
alert("Copiado!")
}
function compartilhar(texto){
if(navigator.share){
navigator.share({
text:texto
})
}
}
function whatsapp(texto){
window.open(
"https://wa.me/?text="+encodeURIComponent(texto)
)
}
 
body{
margin:0;
font-family:Arial;
text-align:center;
color:white;
}
header{
padding:20px;
}
#menu{
display:flex;
flex-direction:column;
gap:15px;
padding:20px;
}
button{
padding:15px;
border:none;
border-radius:12px;
font-size:18px;
background:white;
color:#333;
cursor:pointer;
}
#listaMensagens{
padding:15px;
display:flex;
flex-direction:column;
gap:15px;
}
.mensagem{
background:rgba(255,255,255,0.9);
color:#333;
padding:20px;
border-radius:12px;
}
.botoes{
margin-top:10px;
display:flex;
gap:10px;
justify-content:center;
}
.botoes button{
font-size:14px;
padding:8px 12px;
}
/* TEMAS */
.bomdia{
background:linear-gradient(#ffb347,#ffcc33);
}
.boatarde{
background:linear-gradient(#ff7e5f,#feb47b);
}
.boanoite{
background:linear-gradient(#141e30,#243b55);
}
 
const fs = require("fs")
function gerar(tipo, base){
let lista=[]
for(let i=1;i<=3333;i++){
lista.push(`${tipo}! ${base} #${i}`)
}
return lista
}
let dados={
bomdia:gerar("Bom dia","Que seu dia seja cheio de alegria"),
boatarde:gerar("Boa tarde","Que sua tarde seja produtiva"),
boanoite:gerar("Boa noite","Que sua noite seja tranquila")
}
fs.writeFileSync("mensagens.json",JSON.stringify(dados,null,2))
 
 
Esta dividido em HTML - JS - CSS e gerarmensagens.js
