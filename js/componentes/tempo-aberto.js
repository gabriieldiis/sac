/* Etiqueta "Aberto há X dias". */
/* ================= há quantos dias o protocolo está aberto ================= */
const pDate=s=>{const [d,m,y]=String(s).slice(0,10).split('/').map(Number);return new Date(y,m-1,d)};
const daysBetween=(a,b)=>Math.max(0,Math.round((b-a)/864e5));
function ageTag(p,sm){const ab=pDate(p.ab);
 if(!isOpen(p)){const f=[...p.tram].reverse().find(t=>t[2]==='fim'||t[2]==='rem'||t[2]==='cli');const end=f?pDate(f[0]):TODAY,n=daysBetween(ab,end);
  return `<span class="agetag done${sm?' sm':''}" title="Tempo entre a abertura e o fechamento"><i class="fa fa-flag-checkered"></i> ${n===0?'Fechado no mesmo dia':`Ficou aberto ${n} dia${n>1?'s':''}`}</span>`}
 const n=daysBetween(ab,TODAY),lv=n>7?'late':n>=5?'warn':'ok';
 return `<span class="agetag ${lv}${sm?' sm':''}" title="${n>7?`Passou do prazo de 7 dias há ${n-7} dia${n-7>1?'s':''}`:`Prazo de 7 dias: ${7-n===0?'vence hoje':`faltam ${7-n} dia${7-n>1?'s':''}`}`}"><i class="fa ${n>7?'fa-exclamation-triangle':'fa-hourglass-half'}"></i> ${n===0?'Aberto hoje':`Aberto há ${n} dia${n>1?'s':''}`}</span>`}
