/* Regra: ao escolher "Outros", obriga escrever o assunto. */
/* ================= "Outros" / "Outro": obriga a escrever o assunto antes de seguir ================= */
let OUT={};
const isOutAs=a=>a==='Outros',isOutSub=t=>t==='Outro';
function outVal(k){return OUT[k]&&OUT[k].ok?OUT[k].v:''}
const asTxt=p=>isOutAs(p.as)&&p.asOut?'Outros: '+p.asOut:p.as;
const subTxt=p=>isOutSub(p.sub)&&p.subOut?'Outro: '+p.subOut:p.sub;
function outHTML(k,w){const o=OUT[k]||(OUT[k]={v:'',ok:false}),a=w==='a',nm=a?'assunto':'sub-assunto';
 if(o.ok)return `<div class="outbox ok"><i class="fa fa-pencil-square-o"></i><span>${a?'Assunto':'Sub-assunto'} escrito: <b>${esc(o.v)}</b></span><button type="button" class="lnk" data-outed="${k}">Editar</button></div>`;
 return `<div class="outbox"><div class="outmsg"><i class="fa fa-exclamation-triangle"></i><span>Você escolheu <b>${a?'Outros':'Outro'}</b>. Escreva qual é o ${nm} para continuar. <span class="soft">O atendimento só segue depois disso.</span></span></div>
  <form class="sform" data-outf="${k}" novalidate><input id="out_${k}" value="${esc(o.v)}" maxlength="80" autocomplete="off" aria-label="Qual é o ${nm}?" placeholder="${a?'Qual é o assunto? Ex.: Dúvida sobre nota fiscal de serviço':'Qual é o sub-assunto? Ex.: Entregue em outro endereço'}"><button type="submit" class="gbtn"><i class="fa fa-check"></i> Confirmar</button></form></div>`}
function bindOut(root,after){root.querySelectorAll('[data-outf]').forEach(f=>{const k=f.dataset.outf,inp=f.querySelector('input');
  inp.oninput=()=>{OUT[k].v=inp.value};
  f.onsubmit=e=>{e.preventDefault();const v=inp.value.trim().replace(/\s+/g,' ');if(v.length<3){toast('Escreva o '+(k==='as'||k==='tas'?'assunto':'sub-assunto')+' (pelo menos 3 letras)');inp.classList.add('shake');setTimeout(()=>inp.classList.remove('shake'),400);inp.focus();return}
   if(/^outros?$/i.test(v)){toast('Escreva qual é o assunto, não apenas "outro"');inp.focus();return}OUT[k]={v,ok:true};after(k)}});
 root.querySelectorAll('[data-outed]').forEach(b=>b.onclick=()=>{const k=b.dataset.outed;OUT[k].ok=false;after(k);setTimeout(()=>$('out_'+k)?.focus(),30)})}
