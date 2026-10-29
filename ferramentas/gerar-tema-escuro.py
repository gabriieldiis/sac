# Gera css/tema-escuro.css a partir de css/componentes.css e css/sac.css.
# Uso (na pasta do projeto):  python ferramentas/gerar-tema-escuro.py
# Ajustes feitos à mão ficam em css/tema-escuro-ajustes.css (este script não mexe nele).
import re,colorsys,sys,os
R=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..')
P=lambda *a:os.path.join(R,*a)
src=open(P('css','componentes.css'),encoding='utf-8').read()+'\n'+open(P('css','sac.css'),encoding='utf-8').read()
src=re.sub(r'/\*.*?\*/','',src,flags=re.S)
def parse(s):
  out=[];i=0
  while i<len(s):
    j=s.find('{',i)
    if j<0:break
    pre=s[i:j].strip()
    if pre.startswith('@'):
      d=1;k=j+1
      while d:
        if s[k]=='{':d+=1
        elif s[k]=='}':d-=1
        k+=1
      if pre.startswith('@media'):out.append((pre,parse(s[j+1:k-1])))
      i=k
    else:
      k=s.find('}',j);out.append((pre,s[j+1:k]));i=k+1
  return out
HEX=re.compile(r'#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b|rgba?\(([^)]*)\)')
def tohls(m):
  if m.group(1):
    h=m.group(1)
    if len(h)==3:h=''.join(c*2 for c in h)
    r,g,b=[int(h[i:i+2],16)/255 for i in (0,2,4)];a=None
  else:
    p=[x.strip() for x in m.group(2).split(',')]
    if len(p)<3:return None
    r,g,b=[float(x)/255 for x in p[:3]];a=p[3] if len(p)>3 else None
  return colorsys.rgb_to_hls(r,g,b),a
def fmt(h,l,s,a):
  r,g,b=colorsys.hls_to_rgb(h,max(0,min(1,l)),max(0,min(1,s)))
  if a is not None:return f'rgba({round(r*255)},{round(g*255)},{round(b*255)},{a})'
  return '#%02x%02x%02x'%(round(r*255),round(g*255),round(b*255))
def tr(kind):
  def f(m):
    x=tohls(m)
    if not x:return m.group(0)
    (h,l,s),a=x
    if kind=='shadow':
      if a is not None:return m.group(0)
      return fmt(h,0.11+(1-l)*0.6,s*0.42,a) if l>=0.8 else m.group(0)
    if a is not None and kind!='text':
      try:
        if float(a)<0.35 and l<0.3:return fmt(h,0.95,s,a)  # sombras/linhas pretas translúcidas viram claras
      except:pass
    if kind=='bg':
      if l<0.8:return m.group(0)
      if s<0.08:h,s=0.585,0.62
      return fmt(h,0.125+(1-l)*0.85,min(s*0.42,0.34),a)
    if kind=='border':
      if l<0.7:return m.group(0)
      if s<0.08:h,s=0.585,0.4
      return fmt(h,0.215+(1-l)*0.5,min(s*0.5,0.26),a)
    if kind=='text':
      if l>=0.55:return m.group(0)
      return fmt(h,0.93-l*0.5,min(s,0.75),a)
  return f
PK={'background':'bg','background-color':'bg','color':'text','border':'border','border-top':'border','border-bottom':'border','border-left':'border','border-right':'border','border-color':'border','border-top-color':'border','border-left-color':'border','outline':'border','fill':'text','box-shadow':'shadow'}
SKIP=re.compile(r'^(html|body)\b(?!\.one)|dragging|::-webkit')
def scope(sel):
  out=[]
  for s in sel.split(','):
    s=s.strip()
    if not s or SKIP.search(s):continue
    if s.startswith('html.one'):out.append('html.dark.one'+s[8:])
    elif s.startswith(':root'):continue
    else:out.append('html.dark '+s)
  return ','.join(out)
def rules(lst):
  res=[]
  for pre,body in lst:
    if isinstance(body,list):
      inner=rules(body)
      if inner:res.append(pre+'{'+''.join(inner)+'}')
      continue
    decls=[]
    for d in body.split(';'):
      if ':' not in d:continue
      p,v=d.split(':',1);p=p.strip().lower();v=v.strip()
      if p in PK:
        nv=HEX.sub(tr(PK[p]),v) if HEX.search(v) else v
        decls.append(f'{p}:{nv}')
    sc=scope(pre)
    if decls and sc:res.append(sc+'{'+';'.join(decls)+'}')
  return res
base='''html.dark body{background:#0d1319}
html.dark .content{color:#d9dee4}
html.dark .content-header h1{color:#eef1f4}html.dark .bc,html.dark .bc .fa{color:#aeb6bf}html.dark .bc .cur{color:#8b949e}
html.dark .content input,html.dark .content select,html.dark .content textarea,html.dark .pmodal input,html.dark .pmodal select,html.dark .pmodal textarea{background-color:#111a23;color:#e6ecf2;border-color:#34475a}
html.dark .content input::placeholder,html.dark .content [data-ph]::before{color:#7d8792}
html.dark .content a:not(.gbtn):not(.lbtn):not(.pill):not(.btn){color:#6fb3ea}
html.dark .content b,html.dark .content strong{color:inherit}
html.dark mark,html.dark .rta span[style*="background"],html.dark .rtx span[style*="background"],html.dark .hbody span[style*="background"]{color:#1a1a1a}
html.dark .pimg{background:#fff}
html.dark{color-scheme:dark}
'''
open(P('css','tema-escuro.css'),'w',encoding='utf-8').write('/* Modo escuro GERADO a partir de componentes.css e sac.css. Não edite à mão: rode ferramentas/gerar-tema-escuro.py */\n'+base+'\n'.join(rules(parse(src)))+'\n')
print('css/tema-escuro.css atualizado')
