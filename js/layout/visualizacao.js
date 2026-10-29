/* Barra de visualização: Atendente/Pós-Venda, Dividido/Corrido e modo escuro. */
/* ================= barra de visualização: layout (dividido/corrido) e tema (claro/escuro) ================= */
const LS={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}}};
let LAY=LS.get('sac_layout')||(window.SAC_ONE?'one':'split'),THEME=LS.get('sac_theme')||'light';
function applyView(){const r=document.documentElement;r.classList.toggle('one',LAY==='one');r.classList.toggle('dark',THEME==='dark');
 document.querySelectorAll('[data-lay]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lay===LAY));
 document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.mode===MODE));
 const t=$('vtheme');if(t){t.innerHTML=THEME==='dark'?'<i class="fa fa-sun-o"></i><span> Modo claro</span>':'<i class="fa fa-moon-o"></i><span> Modo escuro</span>';t.setAttribute('aria-pressed',THEME==='dark')}}
(function(){const hd=document.querySelector('.content-header');if(!hd)return;const d=document.createElement('div');d.className='vtools';
 d.innerHTML=`<div class="vseg vt-mode" role="group" aria-label="Simular a visão de"><span class="vlbl">Visão</span><button type="button" data-mode="at" title="Ver como atendente do SAC"><i class="fa fa-headphones"></i><span> Atendente</span></button><button type="button" data-mode="pv" title="Ver como Pós-Venda"><i class="fa fa-inbox"></i><span> Pós-Venda</span></button></div><div class="vseg vt-lay" role="group" aria-label="Layout da tela"><button type="button" data-lay="split" title="Duas colunas: atendimento à esquerda, cliente e pedido à direita"><i class="fa fa-columns"></i><span> Dividido</span></button><button type="button" data-lay="one" title="Uma coluna só: tudo em sequência"><i class="fa fa-align-justify"></i><span> Corrido</span></button></div><button type="button" class="vbtn" id="vtheme"></button>`;
 hd.insertBefore(d,hd.querySelector('.bc'));
 d.querySelectorAll('[data-lay]').forEach(b=>b.onclick=()=>{if(LAY===b.dataset.lay)return;LAY=b.dataset.lay;LS.set('sac_layout',LAY);applyView();const y=scrollY;render();scrollTo(0,y)});
 d.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>setMode(b.dataset.mode));
 $('vtheme').onclick=()=>{THEME=THEME==='dark'?'light':'dark';LS.set('sac_theme',THEME);document.documentElement.classList.add('thx');applyView();setTimeout(()=>document.documentElement.classList.remove('thx'),350)};
 applyView()})();
/* troca de visão: atendente <-> pós-venda, com os mesmos protocolos (simulação) */
function modeChrome(){const pv=MODE==='pv';document.title=pv?'SAC Pós-Venda':'SAC Atendimento';
 const un=document.querySelector('.uname');if(un&&un.firstChild)un.firstChild.nodeValue=pv?'Pós-Venda SAC':'Atendente SAC';
 const h1=document.querySelector('.content-header h1');h1&&(h1.textContent=pv?'Pós-Venda':'Atendimento');
 const nv=$('nav-home');nv&&(nv.innerHTML=`<i class="fa ${pv?'fa-inbox':'fa-headphones'}"></i>&nbsp; ${pv?'Pós-Venda':'Atendimento'}`);
 document.body.classList.toggle('mode-pv',pv)}
function setMode(m){if(m===MODE)return;MODE=m;ME=m==='pv'?'Você (Pós-Venda)':'Você';modeChrome();applyView();
 S.act=null;S.novo=false;HQ.msg='';if(S.v==='proto'&&S.p){render();scrollTo(0,0)}else go('home');toast(m==='pv'?'Agora você está vendo como Pós-Venda':'Agora você está vendo como Atendente')}
modeChrome();
const _render0=render;render=function(){_render0();document.body.classList.toggle('haslay',!!app.querySelector('.nlay,.play'))};
