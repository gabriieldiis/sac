/* Estado da tela, navegação entre telas (go/render) e utilitários de busca. */
/* ================= estado e navegação ================= */
const app=$('app');
let S={v:'home'},N=null,HQ={q:'',msg:''};
function go(v,extra){['pom','oom','okm'].forEach(i=>{const m=$(i);m&&m.style.display==='block'&&m._close&&m._close()});S=Object.assign({v},extra||{});render();scrollTo(0,0)}
$('nav-home').onclick=e=>{e.preventDefault();go('home')};
function pageTitle(){const o=S.ped&&ORDERS[S.ped],c=S.doc&&CLIENTES[cliByDoc(S.doc)];return {home:MODE==='pv'?'Pós-Venda':'Atendimento',novo:'Novo atendimento',proto:'Protocolo '+(S.p||''),cli:o?'Pedido #'+S.ped:c?c.nome:'Protocolos do cliente',adm:'Assuntos e tópicos',dash:'Painel da diretoria'}[S.v]}
function render(){const h1=document.querySelector('.content-header h1');if(h1)h1.textContent=pageTitle();document.title=pageTitle()+' · SAC Kalunga';$('bc').textContent={home:MODE==='pv'?'Fila do Pós-Venda':'Atendimento',novo:'Novo atendimento',proto:'Protocolo '+(S.p||''),cli:'Protocolos do cliente',adm:'Assuntos e tópicos',dash:'Painel da diretoria'}[S.v];document.querySelectorAll('.tree a').forEach(a=>a.classList.toggle('on',(a.id==='nav-adm'?S.v==='adm':a.id==='nav-dash'?S.v==='dash':!['adm','dash'].includes(S.v))));
 ({home:renderHome,novo:renderNovo,proto:renderProto,cli:renderCli,adm:renderAdm,dash:renderDash})[S.v]();}
const back=`<button type="button" class="backlink" data-home><i class="fa fa-arrow-left"></i> Início</button>`;
function bindCommon(){app.querySelectorAll('[data-home]').forEach(b=>b.onclick=()=>go('home'));
 app.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>go('proto',{p:b.dataset.open}));
 app.querySelectorAll('[data-cpn]').forEach(b=>b.onclick=()=>copyTxt(b.dataset.cpn,'Número copiado'));}
const digits=v=>String(v||'').replace(/\D/g,'');
const cliByDoc=d=>Object.keys(CLIENTES).find(k=>digits(CLIENTES[k].doc)===d);
const orderBy=d=>Object.keys(ORDERS).find(n=>n===d||ORDERS[n].kom===d||ORDERS[n].nf===d);
const fmtDoc=d=>d.length===11?d.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,'$1.$2.$3-$4'):d.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,'$1.$2.$3/$4-$5');
const cliOf=p=>p.cli?CLIENTES[p.cli]:p.cliNovo;
function toast(t){const e=$('toast');e.textContent=t;e.style.display='block';clearTimeout(e._t);e._t=setTimeout(()=>e.style.display='none',2400)}
function copyTxt(t,ok){navigator.clipboard?.writeText(t).then(()=>toast(ok||'Texto copiado'),()=>toast('Não foi possível copiar'))}
