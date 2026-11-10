/* [em aprovação: só aparece com SUG ligado] Anexos: qualquer tipo de arquivo no registro do atendimento e em cada trâmite.
   No protótipo o arquivo fica só nesta aba do navegador. No ERP ele precisa ser gravado no servidor (DBA/TI). */
const ANX={};
const kb=n=>n<1024?n+' B':n<1048576?Math.round(n/1024)+' KB':(n/1048576).toFixed(1).replace('.',',')+' MB';
const anxIc=n=>{const e=(String(n).split('.').pop()||'').toLowerCase();return /^pdf$/.test(e)?'fa-file-pdf-o':/^(png|jpe?g|gif|webp|heic|bmp)$/.test(e)?'fa-file-image-o':/^(xlsx?|csv|ods)$/.test(e)?'fa-file-excel-o':/^(docx?|odt|rtf|txt)$/.test(e)?'fa-file-word-o':/^(zip|rar|7z)$/.test(e)?'fa-file-archive-o':/^(mp4|mov|avi)$/.test(e)?'fa-file-video-o':/^(mp3|wav|ogg|m4a|opus)$/.test(e)?'fa-file-audio-o':/^(eml|msg)$/.test(e)?'fa-envelope-o':'fa-file-o'};
const ANX_HINT='Foto, PDF, nota fiscal, planilha, e-mail, áudio… qualquer arquivo. Também dá para arrastar para cá.';
function anxChips(id){return (ANX[id]||[]).map((f,i)=>`<span class="anxc"><i class="fa ${anxIc(f.name)}"></i><span class="anxn">${esc(f.name)}</span><small>${kb(f.size)}</small><button type="button" class="anxx" data-anxrm="${id}|${i}" aria-label="Remover ${esc(f.name)}"><i class="fa fa-times"></i></button></span>`).join('')}
function anxHTML(id){if(!SUG)return '';const n=(ANX[id]||[]).length;return `<div class="anx" data-anx="${id}">${sugTag()}<label class="lbtn sm anxb"><input type="file" multiple data-anxin="${id}"><i class="fa fa-paperclip"></i> Anexar arquivo</label><span class="anxl">${anxChips(id)}</span><span class="soft anxh"${n?' hidden':''}>${ANX_HINT}</span></div>`}
function anxRefresh(id){const w=document.querySelector(`[data-anx="${id}"]`);if(!w)return;w.querySelector('.anxl').innerHTML=anxChips(id);w.querySelector('.anxh').hidden=!!(ANX[id]||[]).length}
function anxAdd(id,files){(ANX[id]=ANX[id]||[]).push(...[...files].map(f=>({name:f.name,size:f.size,url:URL.createObjectURL(f)})));anxRefresh(id);if(files.length)toast(files.length>1?files.length+' arquivos anexados':'Arquivo anexado')}
/* entrega os anexos para o registro que está sendo salvo e limpa o campo */
function anxTake(id){const L=ANX[id]||[];delete ANX[id];return L.length?L:undefined}
function anxView(L){return L&&L.length?`<div class="hanx"><span class="hanx-t"><i class="fa fa-paperclip"></i> ${L.length} anexo${L.length>1?'s':''}</span>${L.map(f=>`<a class="anxc" href="${f.url}" target="_blank" rel="noopener" download="${esc(f.name)}" title="Abrir ${esc(f.name)}"><i class="fa ${anxIc(f.name)}"></i><span class="anxn">${esc(f.name)}</span><small>${kb(f.size)}</small></a>`).join('')}</div>`:''}
document.addEventListener('change',e=>{const i=e.target.closest&&e.target.closest('[data-anxin]');if(!i)return;anxAdd(i.dataset.anxin,i.files);i.value=''});
document.addEventListener('click',e=>{const b=e.target.closest('[data-anxrm]');if(!b)return;const [id,j]=b.dataset.anxrm.split('|');ANX[id].splice(+j,1);anxRefresh(id)});
document.addEventListener('dragover',e=>{const w=e.target.closest&&e.target.closest('[data-anx]');if(!w)return;e.preventDefault();w.classList.add('drop')});
document.addEventListener('dragleave',e=>{const w=e.target.closest&&e.target.closest('[data-anx]');if(w)w.classList.remove('drop')});
document.addEventListener('drop',e=>{const w=e.target.closest&&e.target.closest('[data-anx]');if(!w)return;e.preventDefault();w.classList.remove('drop');anxAdd(w.dataset.anx,e.dataTransfer.files)});
