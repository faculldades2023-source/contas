var CATS={moradia:{e:'⬡',c:'#7c6af7'},alimentacao:{e:'◈',c:'#f5a623'},transporte:{e:'⟁',c:'#3b82f6'},saude:{e:'✛',c:'#ef4444'},lazer:{e:'◎',c:'#8b5cf6'},educacao:{e:'⬗',c:'#10b981'},trabalho:{e:'◫',c:'#06b6d4'},cartao:{e:'▣',c:'#ec4899'},outros:{e:'⬡',c:'#94a3b8'}};
var BANCOS={bb:{id:'bb',nome:'Banco do Brasil',sub:'Conta Corrente',tag:'BB',cor:'#004A9E',corLight:'rgba(0,74,158,.12)',grad:'linear-gradient(135deg,#00235A 0%,#004A9E 60%,#0060C8 100%)',shadow:'0 8px 32px rgba(0,35,90,.38)',glow1:'rgba(255,204,0,.22)',icoBg:'#FFCC00',emoji:'🏦',svg:'<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA0OCA0OCc+PHJlY3Qgd2lkdGg9JzQ4JyBoZWlnaHQ9JzQ4JyByeD0nMTAnIGZpbGw9JyNGRkNDMDAnLz48dGV4dCB5PSczMicgZm9udC1zaXplPScyNicgdGV4dC1hbmNob3I9J21pZGRsZScgeD0nMjQnIGZvbnQtZmFtaWx5PSdBcmlhbCcgZmlsbD0nIzAwNEE5RSc+QkI8L3RleHQ+PC9zdmc+" width="28" height="28" style="object-fit:contain">'},nu:{id:'nu',nome:'Nubank',sub:'Conta Digital',tag:'NU',cor:'#8200D0',corLight:'rgba(130,0,208,.12)',grad:'linear-gradient(135deg,#5E0096 0%,#8200D0 55%,#A020E0 100%)',shadow:'0 8px 32px rgba(94,0,150,.42)',glow1:'rgba(200,80,255,.18)',icoBg:'rgba(255,255,255,.14)',emoji:'💜',svg:'<svg width="28" height="28" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" fill="#8200D0"/><text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" font-size="28" font-weight="900" font-family="Arial Black,sans-serif" fill="white">N</text></svg>'},bradesco:{id:'bradesco',nome:'Bradesco',sub:'Conta Corrente',tag:'BRA',cor:'#CC0000',corLight:'rgba(204,0,0,.12)',grad:'linear-gradient(135deg,#8B0000 0%,#CC0000 55%,#E53030 100%)',shadow:'0 8px 32px rgba(180,0,0,.38)',glow1:'rgba(255,100,100,.2)',icoBg:'#CC0000',emoji:'🏛',svg:'<svg width="28" height="28" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" fill="#CC0000"/><text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" font-size="14" font-weight="900" font-family="Arial Black,sans-serif" fill="white">BRA</text></svg>'},renner:{id:'renner',nome:'Renner',sub:'Cartão de Crédito',tag:'REN',cor:'#E8000D',corLight:'rgba(232,0,13,.12)',grad:'linear-gradient(135deg,#9B0009 0%,#E8000D 55%,#FF3040 100%)',shadow:'0 8px 32px rgba(200,0,20,.38)',glow1:'rgba(255,80,80,.2)',icoBg:'#E8000D',emoji:'🛍',svg:'<svg width="28" height="28" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="10" fill="#E8000D"/><text x="50%" y="57%" dominant-baseline="middle" text-anchor="middle" font-size="15" font-weight="900" font-family="Arial Black,sans-serif" fill="white">REN</text></svg>'},caju:{id:'caju',nome:'Caju',sub:'Benefícios',tag:'CAJ',cor:'#FF6B35',corLight:'rgba(255,107,53,.12)',grad:'linear-gradient(135deg,#C04010 0%,#FF6B35 55%,#FF9060 100%)',shadow:'0 8px 32px rgba(200,80,20,.38)',glow1:'rgba(255,160,80,.22)',icoBg:'#FF6B35',emoji:'🥭',svg:'<svg width="28" height="28" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" fill="#FF6B35"/><text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" font-size="15" font-weight="900" font-family="Arial Black,sans-serif" fill="white">CAJ</text></svg>'}};

window._currentUser='';window._currentUserNome='';window._admAutenticado=false;
var lista=[],gr={},SB_URL='',SB_KEY='',modoLocal=true,temaAtual=localStorage.getItem('mc_tema')||'dark',viewAtual='dash',bancoAtual='bb',bancoFiltro='',filtro='',anoAtual=new Date().getFullYear(),_selecionadas=new Set(),_delId=null,tipo='despesa',mesAtual=new Date().getMonth(),MESES=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],MESES_FULL=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],MESES_C=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],cfFiltro='all',_mesAtual=(function(){var d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0');})(),_mensalTipo='ambos';

/* ═══ AUTH ═══ */
var ADMIN_USER='alex';
var ADMIN_PIN_RAW='2818';
function authHash(s){var h=0;for(var i=0;i<s.length;i++){h=((h<<5)-h)+s.charCodeAt(i);h=h&h;}return h.toString(36);}
var ADMIN_HASH=authHash(ADMIN_PIN_RAW);
function authGetUsers(){try{return JSON.parse(localStorage.getItem('conr_auth_users')||'[]');}catch(e){return[];}}
function authSetUsers(arr){localStorage.setItem('conr_auth_users',JSON.stringify(arr));}
function garantirAdmin(){var users=authGetUsers();if(!users.find(function(u){return u.user===ADMIN_USER;})){users.unshift({user:ADMIN_USER,nome:'Alex',hash:ADMIN_HASH,criado:Date.now()});authSetUsers(users);}}
function isAdmin(){return window._currentUser===ADMIN_USER||window._admAutenticado;}

function setLoginTab(tab){
  document.getElementById('ltab-login').classList.toggle('on',tab==='login');
  document.getElementById('ltab-reg').classList.toggle('on',tab==='reg');
  document.getElementById('loginFormEntrar').style.display=tab==='login'?'':'none';
  document.getElementById('loginFormCriar').style.display=tab==='reg'?'':'none';
  document.getElementById('loginError').textContent='';
}

function renderLoginUsers(){
  var listEl=document.getElementById('loginUsersList');
  var orEl=document.getElementById('loginOr');
  if(listEl)listEl.style.display='none';
  if(orEl)orEl.style.display='none';
}
function loginRapido(el){
  document.getElementById('lUser').value=el.getAttribute('data-user');
  setLoginTab('login');
  setTimeout(function(){document.getElementById('lPass').focus();},60);
}
function fazerLogin(){
  var errEl=document.getElementById('loginError');
  var user=(document.getElementById('lUser').value||'').trim().toLowerCase();
  var pin=(document.getElementById('lPass').value||'').trim();
  if(!user){errEl.textContent='Informe o usuário.';return;}
  if(!pin){errEl.textContent='Informe o PIN.';return;}
  var found=null;
  authGetUsers().forEach(function(u){if(u.user===user)found=u;});
  if(!found){errEl.textContent='Usuário não encontrado.';return;}
  if(found.hash!==authHash(pin)){errEl.textContent='PIN incorreto.';return;}
  window._currentUser=user;window._currentUserNome=found.nome||user;
  localStorage.setItem('conr_session',JSON.stringify({user:user,nome:found.nome||user,ts:Date.now()}));
  entrarNoApp();
}
function criarConta(){
  var errEl=document.getElementById('loginError');
  var nome=(document.getElementById('rNome').value||'').trim();
  var pin=(document.getElementById('rPin').value||'').trim();
  if(!nome){errEl.textContent='Informe seu nome.';return;}
  if(!/^[0-9]{4}$/.test(pin)){errEl.textContent='PIN deve ter exatamente 4 números.';return;}
  var user=nome.toLowerCase().replace(/[^a-z0-9]/g,'').substring(0,12)||'user'+Date.now().toString().slice(-4);
  var users=authGetUsers();
  if(users.find(function(u){return u.user===user;}))user=user+Date.now().toString().slice(-3);
  users.push({user:user,nome:nome,hash:authHash(pin),criado:Date.now()});
  authSetUsers(users);
  window._currentUser=user;window._currentUserNome=nome;
  localStorage.setItem('conr_session',JSON.stringify({user:user,nome:nome,ts:Date.now()}));
  entrarNoApp();
}
function entrarNoApp(){
  var ls=document.getElementById('loginScreen');
  var lo=document.getElementById('loadingOverlay');
  if(ls)ls.classList.add('hidden');
  if(lo)lo.classList.add('hidden');
  renderUserTopbar();
  iniciarApp();
}
function fazerLogout(){localStorage.removeItem('conr_session');location.reload();}
function renderUserTopbar(){
  var topR=document.querySelector('.topbar-r');if(!topR)return;
  var old=document.getElementById('userBadgeWrap');if(old)old.remove();
  var ini=(window._currentUserNome||'?').charAt(0).toUpperCase();
  var wrap=document.createElement('div');wrap.id='userBadgeWrap';
  wrap.style.cssText='display:flex;align-items:center;gap:8px;flex-shrink:0;';
  wrap.innerHTML='<div class="user-badge-top"><div class="user-avatar-sm">'+ini+'</div>'
    +'<span class="user-name-sm">'+window._currentUserNome+'</span></div>'
    +'<button class="logout-btn" onclick="fazerLogout()">Sair</button>';
  topR.insertBefore(wrap,topR.firstChild);
  var btnAdm=document.getElementById('btnAdm');
  if(btnAdm)btnAdm.style.display=isAdmin()?'inline-flex':'none';
}
function verificarSessao(){
  garantirAdmin();renderLoginUsers();
  try{
    var sess=JSON.parse(localStorage.getItem('conr_session')||'null');
    if(!sess||!sess.user)return false;
    if(Date.now()-sess.ts>7*24*60*60*1000)return false;
    var found=authGetUsers().find(function(u){return u.user===sess.user;});
    if(found){window._currentUser=sess.user;window._currentUserNome=sess.nome||sess.user;return true;}
  }catch(e){}
  return false;
}

/* ═══ ADM ═══ */
// Abre o painel admin — se não estiver logado como admin, pede autenticação
function abrirAdmLogin(){
  // Sempre abre o painel; a seção interna decide o que mostrar
  _admAutenticado=false;
  var loginSec=document.getElementById('admLoginSection');
  var contentSec=document.getElementById('admContent');
  // Se já logado como admin no app, vai direto
  if(window._currentUser===ADMIN_USER){
    _admAutenticado=true;loginSec.style.display='none';contentSec.style.display='block';
    renderAdmUsers();
  }else{
    loginSec.style.display='block';contentSec.style.display='none';
    document.getElementById('admLoginPin').value='';
    document.getElementById('admLoginMsg').textContent='';
  }
  document.getElementById('admOverlay').classList.add('open');
  setTimeout(function(){var el=document.getElementById(_admAutenticado?'admNome':'admLoginPin');if(el)el.focus();},80);
}
function abrirAdm(){
  if(!isAdmin())return;
  _admAutenticado=true;
  document.getElementById('admLoginSection').style.display='none';
  document.getElementById('admContent').style.display='block';
  renderAdmUsers();
  document.getElementById('admOverlay').classList.add('open');
}
function autenticarAdm(){
  var pin=(document.getElementById('admLoginPin').value||'').trim();
  var msgEl=document.getElementById('admLoginMsg');
  if(!pin){msgEl.className='adm-msg err';msgEl.textContent='Informe o PIN.';return;}
  if(authHash(pin)!==ADMIN_HASH){msgEl.className='adm-msg err';msgEl.textContent='PIN incorreto.';return;}
  _admAutenticado=true;
  document.getElementById('admLoginSection').style.display='none';
  document.getElementById('admContent').style.display='block';
  renderAdmUsers();
}
function fecharAdm(){
  document.getElementById('admOverlay').classList.remove('open');
  _admAutenticado=false;
  var admNome=document.getElementById('admNome');if(admNome)admNome.value='';
  var admPin=document.getElementById('admPin');if(admPin)admPin.value='';
  var m=document.getElementById('admMsg');if(m){m.textContent='';m.className='adm-msg';}
  var lp=document.getElementById('admLoginPin');if(lp)lp.value='';
  var lm=document.getElementById('admLoginMsg');if(lm){lm.textContent='';lm.className='adm-msg';}
}
function renderAdmUsers(){
  var users=authGetUsers();
  var contador=document.getElementById('admContadorContas');if(contador)contador.textContent=users.length+' conta'+(users.length!==1?'s':'');
  var el=document.getElementById('admUsersList');if(!el)return;
  if(!users.length){el.innerHTML='<div style="font-size:.75rem;color:rgba(255,255,255,.3);text-align:center;padding:12px;">Nenhum usuário cadastrado</div>';return;}
  el.innerHTML=users.map(function(u){
    var ini=(u.nome||u.user).charAt(0).toUpperCase();
    var isAdm=u.user===ADMIN_USER;
    var d=new Date(u.criado||0).toLocaleDateString('pt-BR');
    var btns=isAdm?'':'<div class="adm-actions">'
      +'<button class="adm-btn-sm adm-btn-pin" data-user="'+u.user+'" onclick="admPinEl(this)">&#128273; PIN</button>'
      +' <button class="adm-btn-sm adm-btn-del" data-user="'+u.user+'" onclick="admDelEl(this)">&#128465;</button>'
      +'</div>';
    return '<div class="adm-user-row">'
      +'<div class="adm-user-avatar">'+ini+'</div>'
      +'<div class="adm-user-info"><div class="adm-user-name">'+(u.nome||u.user)+(isAdm?'<span class="adm-user-admin">ADMIN</span>':'')+'</div>'
      +'<div class="adm-user-sub">@'+u.user+' &bull; '+d+'</div></div>'+btns+'</div>';
  }).join('');
}
function admPinEl(el){admResetarPin(el.getAttribute('data-user'));}
function admDelEl(el){admDeletarUser(el.getAttribute('data-user'));}
function admCriarConta(){
  var msgEl=document.getElementById('admMsg');
  var nome=(document.getElementById('admNome').value||'').trim();
  var pin=(document.getElementById('admPin').value||'').trim();
  msgEl.className='adm-msg';msgEl.textContent='';
  if(!nome){msgEl.className='adm-msg err';msgEl.textContent='Informe o nome.';return;}
  if(!/^[0-9]{4}$/.test(pin)){msgEl.className='adm-msg err';msgEl.textContent='PIN deve ter 4 números.';return;}
  var user=nome.toLowerCase().replace(/[^a-z0-9]/g,'').substring(0,12)||'user'+Date.now().toString().slice(-4);
  var users=authGetUsers();
  if(users.find(function(u){return u.user===user;}))user=user+Date.now().toString().slice(-3);
  users.push({user:user,nome:nome,hash:authHash(pin),criado:Date.now()});
  authSetUsers(users);
  document.getElementById('admNome').value='';document.getElementById('admPin').value='';
  msgEl.className='adm-msg ok';msgEl.textContent='✅ Conta @'+user+' criada!';
  renderAdmUsers();renderLoginUsers();
}
function admResetarPin(targetUser){
  var novoPin=prompt('Novo PIN (4 dígitos) para @'+targetUser+':');
  if(!novoPin)return;
  if(!/^[0-9]{4}$/.test(novoPin)){alert('PIN deve ter exatamente 4 números.');return;}
  var users=authGetUsers();var u=users.find(function(x){return x.user===targetUser;});
  if(!u){alert('Usuário não encontrado.');return;}
  u.hash=authHash(novoPin);authSetUsers(users);renderAdmUsers();
  alert('PIN de @'+targetUser+' atualizado!');
}
function admDeletarUser(targetUser){
  if(targetUser===ADMIN_USER){alert('Não é possível excluir o admin.');return;}
  if(!confirm('Excluir a conta @'+targetUser+'?'))return;
  var users=authGetUsers().filter(function(u){return u.user!==targetUser;});
  authSetUsers(users);
  Object.keys(localStorage).filter(function(k){return k.startsWith('mc_u_'+targetUser+'_');}).forEach(function(k){localStorage.removeItem(k);});
  renderAdmUsers();renderLoginUsers();
}

/* ═══ APP ═══ */
function chaveUsuario(s){return 'mc_u_'+(window._currentUser||'guest')+'_'+s;}
function fmt(v){return 'R$ '+Number(v).toFixed(2).replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g,'.');}
function fmtK(v){if(v>=1000000)return 'R$'+(v/1000000).toFixed(1)+'M';if(v>=1000)return 'R$'+(v/1000).toFixed(0)+'k';return fmt(v);}
function calcStatus(t){
  if(t.tipo==='receita')return 'receita';
  if(t.pago)return 'pago';
  if(t.valorPago&&t.valorPago>0)return 'parcial';
  var h=new Date();h.setHours(0,0,0,0);
  return new Date(t.data+'T12:00:00')<h?'vencida':'avencer';
}
function getBancoBadge(key){var b=BANCOS[key];if(!b)return '<span class="bbank">'+key+'</span>';return '<span class="bbank '+key+'">'+b.emoji+' '+b.tag+'</span>';}
function getBancosAtivos(){try{var s=localStorage.getItem(chaveUsuario('bancos'));if(s)return JSON.parse(s);}catch(e){}return['bb','nu','bradesco','renner','caju'];}
function setBancosAtivos(arr){localStorage.setItem(chaveUsuario('bancos'),JSON.stringify(arr));}
function iniciarApp(){carregarBancosCustom();carregarConfigUsuario();try{var salvo=localStorage.getItem(chaveUsuario('tx'));lista=salvo?JSON.parse(salvo):[];}catch(e){lista=[];}if(SB_URL){var cu=document.getElementById('cfgUrl');if(cu)cu.value=SB_URL;}if(SB_KEY){var ck=document.getElementById('cfgKey');if(ck)ck.value=SB_KEY;}renderSidebarBancos();renderCards();renderBancoPicker();sincSidebar();setView('dash');render();}
function carregarConfigUsuario(){SB_URL=localStorage.getItem(chaveUsuario('sb_url'))||'';SB_KEY=localStorage.getItem(chaveUsuario('sb_key'))||'';modoLocal=!SB_URL||!SB_KEY;}
function toggleGearMenu(e){e.stopPropagation();document.getElementById('gearDropdown').classList.toggle('open');}
function closeGearMenu(){document.getElementById('gearDropdown').classList.remove('open');}
function abrirBancosModal(){closeGearMenu();renderBancosListaModal();var m=document.getElementById('bancosModal');m.style.display='flex';requestAnimationFrame(function(){m.classList.add('open');});}
function fecharBancosModal(){var m=document.getElementById('bancosModal');m.classList.remove('open');setTimeout(function(){m.style.display='none';},200);renderCards();renderBancoPicker();renderSidebarBancos();render();}
function renderBancosListaModal(){var ativos=getBancosAtivos();var container=document.getElementById('bancosListModal');if(!container)return;var html='';Object.keys(BANCOS).forEach(function(bid){var b=BANCOS[bid];var on=ativos.indexOf(bid)!==-1;var ico=b.svg?'<div class="banco-row-ico" style="background:'+b.cor+'">'+b.svg+'</div>':'<div class="banco-row-ico" style="background:'+b.cor+';color:#fff;font-size:1.1rem">'+b.emoji+'</div>';var del=b._custom?'<button onclick="excluirBancoCustom(\''+bid+'\')" style="background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.3);color:#ef4444;border-radius:6px;padding:3px 7px;font-size:.68rem;cursor:pointer;margin-right:5px">✕</button>':'';var tog='<button class="banco-toggle'+(on?' on':'')+'" onclick="toggleBancoModal(\''+bid+'\')" title="'+(on?'Desativar':'Ativar')+'"></button>';html+='<div class="banco-row'+(on?' ativo':'')+'">'+ico+'<div class="banco-row-info"><div class="banco-row-nome">'+b.nome+'</div><div class="banco-row-sub">'+b.sub+'</div></div><div style="display:flex;align-items:center;gap:4px">'+del+tog+'</div></div>';});html+='<div style="margin-top:14px;padding-top:14px;border-top:1px solid rgba(245,166,35,.15)"><div style="font-size:.6rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:rgba(245,166,35,.55);margin-bottom:8px">Adicionar Cartão</div><div style="display:flex;gap:7px;align-items:center"><input id="novoCartaoNome" type="text" placeholder="Nome do cartão" maxlength="20" style="flex:1;background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.12);border-radius:7px;padding:8px 10px;color:#e8eaed;font-family:Inter,sans-serif;font-size:.78rem;outline:none;min-width:0"><input id="novoCartaoCor" type="color" value="#6c5df7" title="Cor" style="width:34px;height:34px;border:none;border-radius:6px;cursor:pointer;padding:2px;background:transparent;flex-shrink:0"><button onclick="adicionarBancoCustom()" style="background:var(--acc);color:#0d0f13;border:none;border-radius:7px;padding:8px 12px;font-weight:700;font-size:.72rem;cursor:pointer;white-space:nowrap;flex-shrink:0">+ Adicionar</button></div></div>';container.innerHTML=html;}
function toggleBancoModal(bid){var ativos=getBancosAtivos();var idx=ativos.indexOf(bid);if(idx===-1){ativos.push(bid);}else{if(ativos.length<=1){showToast('⚠️ Mantenha ao menos 1 cartão ativo','#ef4444');return;}ativos.splice(idx,1);if(viewAtual==='banco-'+bid)setView('dash');}setBancosAtivos(ativos);renderBancosListaModal();renderCards();renderSidebarBancos();renderBancoPicker();}
function excluirBancoCustom(bid){var b=BANCOS[bid];if(!b||!b._custom){showToast('Apenas cartões criados por você podem ser excluídos','#ef4444');return;}if(!confirm('Excluir o cartão "'+b.nome+'"?')){return;}var ativos=getBancosAtivos().filter(function(k){return k!==bid;});if(ativos.length===0){ativos=Object.keys(BANCOS).filter(function(k){return k!==bid;}).slice(0,1);}setBancosAtivos(ativos);delete BANCOS[bid];salvarBancosCustom();if(viewAtual==='banco-'+bid)setView('dash');renderBancosListaModal();renderCards();renderSidebarBancos();renderBancoPicker();showToast('✅ Cartão excluído','#10b981');}
function adicionarBancoCustom(){var nome=(document.getElementById('novoCartaoNome').value||'').trim();var cor=document.getElementById('novoCartaoCor').value||'#6c5df7';if(!nome){showToast('Digite um nome para o cartão','#ef4444');return;}var slug=nome.toLowerCase().replace(/[^a-z0-9]/g,'').slice(0,12);var id='cx_'+slug+'_'+Date.now().toString(36).slice(-4);if(BANCOS[id]){showToast('Nome já existe, use outro','#ef4444');return;}var tag=nome.replace(/[^a-zA-Z0-9]/g,'').slice(0,3).toUpperCase()||'NEW';BANCOS[id]={id:id,nome:nome,sub:'Cartão Personalizado',tag:tag,cor:cor,corLight:cor+'26',grad:'linear-gradient(135deg,'+cor+'99 0%,'+cor+' 100%)',shadow:'0 8px 32px '+cor+'55',glow1:cor+'33',icoBg:cor,emoji:'💳',svg:'<svg width="28" height="28" viewBox="0 0 48 48"><rect width="48" height="48" rx="10" fill="'+cor+'"/><text x="50%" y="57%" dominant-baseline="middle" text-anchor="middle" font-size="13" font-weight="900" font-family="Arial Black,sans-serif" fill="white">'+tag+'</text></svg>',_custom:true};var ativos=getBancosAtivos();ativos.push(id);setBancosAtivos(ativos);salvarBancosCustom();document.getElementById('novoCartaoNome').value='';renderBancosListaModal();renderCards();renderSidebarBancos();renderBancoPicker();showToast('✅ Cartão "'+nome+'" adicionado!','#10b981');}
function salvarBancosCustom(){var custom={};Object.keys(BANCOS).forEach(function(k){if(BANCOS[k]._custom)custom[k]=BANCOS[k];});localStorage.setItem('mc_bancos_custom',JSON.stringify(custom));}
function carregarBancosCustom(){try{var saved=JSON.parse(localStorage.getItem('mc_bancos_custom')||'{}');Object.keys(saved).forEach(function(k){BANCOS[k]=saved[k];});}catch(e){}}
function abrirConfig(){document.getElementById('cfgOverlay').style.display='flex';}
function usarLocal(){modoLocal=true;localStorage.removeItem(chaveUsuario('sb_url'));localStorage.removeItem(chaveUsuario('sb_key'));document.getElementById('cfgOverlay').style.display='none';}
function salvarConfig(){var url=document.getElementById('cfgUrl').value.trim().replace(/\/$/,'');var key=document.getElementById('cfgKey').value.trim();if(!url||!key){alert('Preencha os dois campos!');return;}document.getElementById('cfgOverlay').style.display='none';SB_URL=url;SB_KEY=key;modoLocal=false;localStorage.setItem(chaveUsuario('sb_url'),SB_URL);localStorage.setItem(chaveUsuario('sb_key'),SB_KEY);showToast('✅ Conectado','#10b981');}
function abrirSidebar(){document.getElementById('sidebar').classList.add('open');document.getElementById('sbOverlay').classList.add('open');}
function fecharSidebar(){document.getElementById('sidebar').classList.remove('open');document.getElementById('sbOverlay').classList.remove('open');}
function mobNav(v){fecharSidebar();setView(v);}
function setView(v){viewAtual=v;['dash','anual','mensal','vencida','avencer','pago','todos'].forEach(function(id){var el=document.getElementById('view-'+id);if(el)el.style.display=(id===v)?'':'none';});var bancoView=document.getElementById('view-banco-dinamico');if(bancoView)bancoView.style.display=(v.indexOf('banco-')===0)?'':'none';document.getElementById('nav-dash').classList.toggle('on',v==='dash');document.getElementById('nav-anual').classList.toggle('on',v==='anual');var nm=document.getElementById('nav-mensal');if(nm)nm.classList.toggle('on',v==='mensal');['dash','anual','mensal'].forEach(function(id){var el=document.getElementById('mnav-'+id);if(el)el.classList.toggle('on',v===id);});Object.keys(BANCOS).forEach(function(bid){var btn=document.getElementById('sb-'+bid);if(btn)btn.classList.toggle('on',v==='banco-'+bid);});if(v==='anual')renderAnual();if(v==='mensal')renderMensalView();if(v==='todos')renderTodosView();if(v==='vencida'||v==='avencer'||v==='pago')renderStatusView(v);if(v.indexOf('banco-')===0)renderBancoView(v.replace('banco-',''));sincSidebar();}
function setFiltro(f){if(f===''){setView('todos');return;}setView(f);}
function setBancoFiltro(b){bancoFiltro=b;sincSidebar();if(b&&BANCOS[b]){setView('banco-'+b);return;}if(viewAtual.indexOf('banco-')===0)setView('dash');renderTabela();}
function renderSidebarBancos(){var container=document.getElementById('sbBancosButtons');if(!container)return;container.innerHTML='';getBancosAtivos().forEach(function(k){var b=BANCOS[k];if(!b)return;var btn=document.createElement('button');btn.className='sb-btn';btn.id='sb-'+k;btn.innerHTML='<i>'+b.emoji+'</i>'+b.nome;(function(bid){btn.addEventListener('click',function(){setBancoFiltro(bid);});})(k);container.appendChild(btn);});}
function renderCards(){renderBankCards();}
function renderBankCards(){var row=document.getElementById('bcardsDynamic');if(!row)return;var ativos=getBancosAtivos();row.innerHTML='';ativos.forEach(function(k){var b=BANCOS[k];if(!b)return;var rec=lista.filter(function(t){return t.tipo==='receita'&&(t.banco||'bb')===k;}).reduce(function(s,t){return s+t.valor;},0);var desPago=lista.filter(function(t){return t.tipo==='despesa'&&(t.cartaoPagamento||t.banco||'bb')===k&&(t.pago||t.valorPago>0);}).reduce(function(s,t){return s+(t.pago&&!t.valorPago?t.valor:(t.valorPago||0));},0);var desTotal=lista.filter(function(t){return t.tipo==='despesa'&&(t.banco||'bb')===k;}).reduce(function(s,t){return s+t.valor;},0);var saldo=rec-desPago;var pendente=desTotal-desPago;var div=document.createElement('div');div.className='bcard '+k;div.style.cursor='pointer';div.innerHTML='<div class="bc-glow1"></div><div class="bc-glow2"></div><div class="bc-top"><div class="bc-logo"><div class="bc-ico">'+b.svg+'</div><div><div class="bc-bank">'+b.nome+'</div><div class="bc-sub">'+b.sub+'</div></div></div><div class="bc-tag">'+b.tag+'</div></div><div class="bc-bot"><div><div class="bc-lbl">Saldo Atual</div><div class="bc-val" style="color:'+(saldo>=0?'var(--grn)':'var(--red)')+';font-size:1.15rem">'+(saldo<0?'-':'')+fmt(Math.abs(saldo))+'</div>'+(pendente>0?'<div style="font-size:.55rem;color:var(--red);margin-top:2px;opacity:.8">📉 '+fmt(pendente)+' pendente</div>':'')+'</div><div class="bc-chip"></div></div>';(function(id){div.addEventListener('click',function(){setBancoFiltro(id);});})(k);row.appendChild(div);});}
function renderBancoPicker(){var ativos=getBancosAtivos();var row=document.getElementById('bcPickRow');if(!row)return;row.innerHTML='';ativos.forEach(function(bid){var b=BANCOS[bid];if(!b)return;var isSel=bancoAtual===bid;var d=document.createElement('div');d.className='bc-pick '+bid+(isSel?' sel-'+bid:'');d.id='bpick-'+bid;d.innerHTML='<div class="bpi" style="background:'+b.icoBg+';width:26px;height:26px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:.7rem;overflow:hidden;">'+b.svg+'</div><div><div class="bpnm">'+b.tag+'</div><div class="bpsb">'+b.sub.split(' ')[0]+'</div></div>';(function(id){d.addEventListener('click',function(){setBanco(id);});})(bid);row.appendChild(d);});}
function setBanco(b){bancoAtual=b;Object.keys(BANCOS).forEach(function(k){var el=document.getElementById('bpick-'+k);if(el)el.className='bc-pick '+k+(b===k?' sel-'+k:'');});}
function sincSidebar(){['todos','vencida','avencer','pago'].forEach(function(k){var el=document.getElementById('sf-'+k);if(el)el.classList.toggle('on',viewAtual===k||(k==='todos'&&viewAtual==='dash'&&!bancoFiltro));});Object.keys(BANCOS).forEach(function(k){var el=document.getElementById('sb-'+k);if(el)el.classList.toggle('on',viewAtual==='banco-'+k);});['','vencida','avencer','pago'].forEach(function(v){var fp=document.getElementById('fp-'+v);if(fp)fp.classList.toggle('on',filtro===v);});}
function abrirModal(){renderBancoPicker();document.getElementById('ovl').classList.add('open');setTimeout(function(){document.getElementById('fDesc').focus();},80);}
function fecharModal(){document.getElementById('ovl').classList.remove('open');}
function fecharDel(){document.getElementById('ovlDel').classList.remove('open');_delId=null;}
function setTipo(t){tipo=t;document.getElementById('mBR').className='t-btn'+(t==='receita'?' tr':'');document.getElementById('mBD').className='t-btn'+(t==='despesa'?' td':'');}
function selectCat(el,cat){document.querySelectorAll('.cat-item').forEach(function(i){i.classList.remove('sel');});el.classList.add('sel');document.getElementById('fCat').value=cat;}
function setPill(el,f){document.querySelectorAll('.pills .pill').forEach(function(p){p.classList.remove('on');});el.classList.add('on');filtro=f;sincSidebar();renderTabela();}
function setCF(el,f){document.querySelectorAll('.pills .pill').forEach(function(p){p.classList.remove('on');});el.classList.add('on');cfFiltro=f;desenhaGraficos();}
function getTx(){var m=document.getElementById('sbMes').value;return m?lista.filter(function(t){return t.data.startsWith(m);}):lista.slice();}
function render(){atualizaMeses();var tx=getTx();var rec=tx.filter(function(t){return t.tipo==='receita';}).reduce(function(s,t){return s+t.valor;},0);var des=tx.filter(function(t){return t.tipo==='despesa';}).reduce(function(s,t){return s+t.valor;},0);var nR=tx.filter(function(t){return t.tipo==='receita';}).length;var nD=tx.filter(function(t){return t.tipo==='despesa';}).length;var desp=tx.filter(function(t){return t.tipo==='despesa';});var nV=0,nA=0,nP=0,sV=0,sA=0,sP=0;var desPagoTotal=0;desp.forEach(function(t){var s=calcStatus(t);if(s==='vencida'){nV++;sV+=t.valor;}else if(s==='avencer'){nA++;sA+=t.valor;}else if(s==='parcial'){sA+=t.valor;nA++;}else{nP++;sP+=t.valor;}if(t.pago){desPagoTotal+=t.valor;}else if(t.valorPago&&t.valorPago>0){desPagoTotal+=t.valorPago;}});var desPendente=des-desPagoTotal;var saldo=getBancosAtivos().reduce(function(total,k){return total+getSaldoCartao(k);},0);document.getElementById('mSaldo').textContent=fmt(saldo);document.getElementById('mSaldo').style.color=saldo>=0?'var(--grn)':'var(--red)';document.getElementById('mSaldoTag').textContent=saldo>=0?'▲ positivo':'▼ negativo';document.getElementById('mSaldoTag').className='tag '+(saldo>=0?'up':'dn');document.getElementById('mRec').textContent=fmt(rec);document.getElementById('mRecN').textContent=nR+' lançamento'+(nR!==1?'s':'');document.getElementById('mDes').textContent=fmt(des);document.getElementById('mDesN').textContent=nD+' lançamento'+(nD!==1?'s':'');document.getElementById('mDesPago').textContent=fmt(desPagoTotal);document.getElementById('mDesRestoTag').textContent=fmt(desPendente)+' pendente';document.getElementById('mVen').textContent=nV;document.getElementById('mAvcTag').textContent=nA+' a vencer';document.getElementById('stVenV').textContent=fmt(sV);document.getElementById('stVenN').textContent=nV;document.getElementById('stAvcV').textContent=fmt(sA);document.getElementById('stAvcN').textContent=nA;document.getElementById('stPagV').textContent=fmt(sP);document.getElementById('stPagN').textContent=nP;renderTabela();desenhaGraficos();renderBankCards();}
function atualizaMeses(){var meses=[];lista.forEach(function(t){var m=t.data.slice(0,7);if(meses.indexOf(m)<0)meses.push(m);});meses.sort().reverse();var el=document.getElementById('sbMes'),v=el.value;el.innerHTML='<option value="">Todos os meses</option>'+meses.map(function(m){var p=m.split('-');var n=new Date(p[0],p[1]-1).toLocaleDateString('pt-BR',{month:'long',year:'numeric'});return '<option value="'+m+'">'+n+'</option>';}).join('');if(v)el.value=v;}
function pagProgresso(t){if(t.tipo!=='despesa'||!t.valorPago||t.valorPago<=0)return '';var pct=Math.min(100,Math.round(t.valorPago/t.valor*100));return '<div style="margin-top:2px;height:3px;background:rgba(139,92,246,.2);border-radius:3px;overflow:hidden;"><div style="height:100%;width:'+pct+'%;background:#a78bfa;border-radius:3px"></div></div><div style="font-size:.57rem;color:#a78bfa;margin-top:1px">'+fmt(t.valorPago)+' de '+fmt(t.valor)+'</div>';}
function renderTabela(){var tx=getTx();var arr=bancoFiltro?tx.filter(function(t){return(t.banco||'bb')===bancoFiltro;}):tx;if(filtro)arr=arr.filter(function(t){return t.tipo==='receita'?filtro==='receita':calcStatus(t)===filtro;});var ord={vencida:0,avencer:1,parcial:1,pago:2,receita:3};arr.sort(function(a,b){var d=ord[calcStatus(a)]-ord[calcStatus(b)];return d!==0?d:b.data.localeCompare(a.data);});document.getElementById('txCount').textContent=arr.length+' registro'+(arr.length!==1?'s':'');var nm={pago:'Pago',avencer:'A vencer',vencida:'Vencida',receita:'Receita',parcial:'Parcial'};var tbody=document.getElementById('txBody');if(!arr.length){_selecionadas.clear();atualizaBulk();tbody.innerHTML='<tr class="empty-r"><td colspan="9">Nenhuma transação encontrada.</td></tr>';return;}var idsVisiveis=arr.map(function(t){return t.id;});_selecionadas.forEach(function(id){if(idsVisiveis.indexOf(id)<0)_selecionadas.delete(id);});tbody.innerHTML=arr.map(function(t){var cat=CATS[t.cat]||CATS.outros,st=calcStatus(t),bk=t.banco||'bb';var df=new Date(t.data+'T12:00:00').toLocaleDateString('pt-BR');var bp=t.tipo==='despesa'?'<button class="act pag" data-id="'+t.id+'" onclick="pagarEl(this)" title="'+(t.pago?'Desfazer':(st==='parcial'?'Continuar':'Pagar'))+'">'+(t.pago?'↩':(st==='parcial'?'💰':'✓'))+'</button>':'';var bbadge=getBancoBadge(bk);var chk=_selecionadas.has(t.id)?'checked':'';var selCls=_selecionadas.has(t.id)?' sel':'';return '<tr class="'+selCls+'"><td><input type="checkbox" class="tx-cb" '+chk+' data-id="'+t.id+'" onchange="toggleSelEl(this,this)"></td><td><div class="tico" style="background:'+cat.c+'1a">'+cat.e+'</div></td><td><div class="tnm">'+t.desc+'</div></td><td class="tct">'+t.cat+'</td><td>'+bbadge+'</td><td style="color:var(--mut);font-size:.71rem">'+df+'</td><td class="tv '+(t.tipo==='receita'?'p':'n')+'">'+(t.tipo==='receita'?'+':'-')+fmt(t.valor)+'</td><td><span class="ts '+st+'">'+nm[st]+'</span></td><td>'+bp+'<button class="act del" data-id="'+t.id+'" onclick="removerEl(this)" title="Excluir">🗑</button></td></tr>';}).join('');atualizaBulk();}
function toggleSel(id,el){if(el.checked)_selecionadas.add(id);else _selecionadas.delete(id);var row=el.closest('tr');if(row)row.classList.toggle('sel',el.checked);atualizaBulk();}
function toggleTodos(el){document.querySelectorAll('#txBody .tx-cb').forEach(function(cb){cb.checked=el.checked;var id=cb.getAttribute('data-id');if(el.checked)_selecionadas.add(id);else _selecionadas.delete(id);var row=cb.closest('tr');if(row)row.classList.toggle('sel',el.checked);});atualizaBulk();}
function atualizaBulk(){var n=_selecionadas.size;var bar=document.getElementById('bulkBar');var info=document.getElementById('bulkInfo');var cbTodos=document.getElementById('cbTodos');if(bar)bar.classList.toggle('show',n>0);if(info)info.textContent=n+' transaç'+(n===1?'ão selecionada':'ões selecionadas');if(cbTodos){var total=document.querySelectorAll('#txBody .tx-cb').length;cbTodos.checked=total>0&&n>=total;cbTodos.indeterminate=n>0&&n<total;}}
function limparSel(){_selecionadas.clear();renderTabela();var cb=document.getElementById('cbTodos');if(cb){cb.checked=false;cb.indeterminate=false;}}
function excluirSelecionadas(){var n=_selecionadas.size;if(!n)return;document.getElementById('delDesc').textContent=n+' transaç'+(n===1?'ão selecionada':'ões selecionadas')+' serão removidas.';_delId='bulk';document.getElementById('ovlDel').classList.add('open');}
function getSaldoCartao(k){
  var r=lista.filter(function(t){return t.tipo==='receita'&&(t.banco||'bb')===k;}).reduce(function(s,t){return s+t.valor;},0);
  // Soma o que já foi efetivamente pago neste cartão (parcial ou total)
  var d=lista.filter(function(t){
    return t.tipo==='despesa'&&(t.cartaoPagamento||t.banco||'bb')===k&&(t.pago||t.valorPago>0);
  }).reduce(function(s,t){
    return s+(t.pago&&!t.valorPago?t.valor:(t.valorPago||0));
  },0);
  return r-d;
}
var _pagId=null,_pagCartaoSel=null,_pagValorTotal=0,_pagJaPago=0;

function pagar(id){
  var t=lista.find(function(x){return x.id==id;});
  if(!t)return;
  // Desfazer pagamento total
  if(t.pago){t.pago=false;t.valorPago=0;t.cartaoPagamento=null;salva(null,t,null);return;}
  _pagId=id;_pagCartaoSel=null;
  _pagValorTotal=t.valor;
  _pagJaPago=t.valorPago||0;
  var restante=_pagValorTotal-_pagJaPago;
  document.getElementById('pagTotalTxt').textContent=fmt(_pagValorTotal);
  document.getElementById('pagJaPagoTxt').textContent=fmt(_pagJaPago);
  document.getElementById('pagRestanteTxt').textContent=fmt(restante);
  document.getElementById('pagValorInput').value=restante.toFixed(2);
  document.getElementById('pagRestanteAviso').style.display='none';
  document.getElementById('pagInsuf').style.display='none';
  document.getElementById('btnConfPag').style.opacity='.4';
  document.getElementById('btnConfPag').style.pointerEvents='none';
  _renderCartoesPag();
  document.getElementById('ovlPag').style.display='flex';
  setTimeout(function(){document.getElementById('pagValorInput').select();},80);
}

function _renderCartoesPag(){
  var container=document.getElementById('pagCartoesLista');
  container.innerHTML='';
  getBancosAtivos().forEach(function(k){
    var b=BANCOS[k];if(!b)return;
    var saldo=getSaldoCartao(k);
    var saldoCls=saldo>=0?'pos':'neg';
    var div=document.createElement('div');
    div.className='pag-card-option'+(_pagCartaoSel===k?' selected':'');
    div.setAttribute('data-cartao',k);
    div.innerHTML='<div class="pag-card-ico" style="background:'+b.corLight+'">'+b.emoji+'</div>'
      +'<span class="pag-card-nome">'+b.nome+'</span>'
      +'<span class="pag-card-saldo '+saldoCls+'">'+fmt(saldo)+'</span>';
    div.addEventListener('click',function(){selecionarCartaoPag(k);});
    container.appendChild(div);
  });
}

function atualizarValorPag(){
  var v=parseFloat(document.getElementById('pagValorInput').value)||0;
  var restante=_pagValorTotal-_pagJaPago;
  var avisEl=document.getElementById('pagRestanteAviso');
  var rvEl=document.getElementById('pagRestanteVal');
  document.getElementById('pagRestanteTxt').textContent=fmt(Math.max(0,restante-v));
  if(v>0&&v<restante-0.001){
    rvEl.textContent=fmt(restante-v);
    avisEl.style.display='block';
  }else{
    avisEl.style.display='none';
  }
  _validarPagamento(v);
}

function pagValorMax(){
  var restante=_pagValorTotal-_pagJaPago;
  document.getElementById('pagValorInput').value=restante.toFixed(2);
  atualizarValorPag();
}

function selecionarCartaoPag(k){
  _pagCartaoSel=k;
  // Update selection visually without re-rendering the whole list
  document.querySelectorAll('.pag-card-option').forEach(function(el){
    el.classList.toggle('selected', el.getAttribute('data-cartao')===k);
  });
  var v=parseFloat(document.getElementById('pagValorInput').value)||0;
  _validarPagamento(v);
}

function _validarPagamento(v){
  var restante=_pagValorTotal-_pagJaPago;
  var insuf=document.getElementById('pagInsuf');
  var btnConf=document.getElementById('btnConfPag');
  // Precisa de cartão selecionado e valor válido
  if(!_pagCartaoSel||!(v>0)||v>restante+0.01){
    insuf.style.display='none';
    btnConf.style.opacity='.4';
    btnConf.style.pointerEvents='none';
    return;
  }
  var saldo=getSaldoCartao(_pagCartaoSel);
  if(v>saldo+0.01){
    insuf.style.display='block';
    insuf.textContent='⚠️ Saldo insuficiente no cartão (disponível: '+fmt(Math.max(0,saldo))+')';
    btnConf.style.opacity='.4';
    btnConf.style.pointerEvents='none';
  }else{
    insuf.style.display='none';
    btnConf.style.opacity='1';
    btnConf.style.pointerEvents='auto';
  }
}

function confirmarPagamento(){
  if(!_pagId||!_pagCartaoSel)return;
  var t=lista.find(function(x){return x.id===_pagId;});
  if(!t)return;
  var v=parseFloat(document.getElementById('pagValorInput').value)||0;
  var restante=_pagValorTotal-_pagJaPago;
  if(v<=0||v>restante+0.001){showToast('⚠️ Valor inválido','#ef4444');return;}
  var novoPago=_pagJaPago+v;
  if(novoPago>=_pagValorTotal-0.001){
    t.pago=true;t.valorPago=_pagValorTotal;t.cartaoPagamento=_pagCartaoSel;
    showToast('✅ Conta quitada!','#10b981');
  }else{
    t.pago=false;t.valorPago=novoPago;t.cartaoPagamento=_pagCartaoSel;
    showToast('💰 Parcial salvo — restam '+fmt(_pagValorTotal-novoPago),'#f5a623');
  }
  fecharPagModal();
  salva(null,t,null);
}

function fecharPagModal(){
  document.getElementById('ovlPag').style.display='none';
  _pagId=null;_pagCartaoSel=null;_pagValorTotal=0;_pagJaPago=0;
}
function pagarEl(el){pagar(el.getAttribute('data-id'));}
function removerEl(el){remover(el.getAttribute('data-id'));}
function removerSvEl(el){removerESv(el.getAttribute('data-id'));}
function toggleSelEl(el,cb){toggleSel(el.getAttribute('data-id'),cb||el);}
function toggleSelSvEl(el,cb){toggleSelSv(el.getAttribute('data-id'),cb||el);}
function remover(id){var t=lista.find(function(x){return x.id===id;});if(!t)return;_delId=id;document.getElementById('delDesc').textContent='"'+t.desc+'" — '+fmt(t.valor);document.getElementById('ovlDel').classList.add('open');}
function salva(novaTransacao,transacaoAtualizada,idsExcluidos){localStorage.setItem(chaveUsuario('tx'),JSON.stringify(lista));render();if(viewAtual==='anual')renderAnual();if(viewAtual==='todos')renderTodosView();if(viewAtual==='mensal')renderMensalView();if(viewAtual==='vencida'||viewAtual==='avencer'||viewAtual==='pago')renderStatusView(viewAtual);if(viewAtual.indexOf('banco-')===0)renderBancoView(viewAtual.replace('banco-',''));}
function desenhaGraficos(){var todos=lista,meses=[];todos.forEach(function(t){var m=t.data.slice(0,7);if(meses.indexOf(m)<0)meses.push(m);});meses.sort();if(cfFiltro==='6m')meses=meses.slice(-6);else if(cfFiltro==='3m')meses=meses.slice(-3);var recM=meses.map(function(m){return todos.filter(function(t){return t.tipo==='receita'&&t.data.startsWith(m);}).reduce(function(s,t){return s+t.valor;},0);});var desM=meses.map(function(m){return todos.filter(function(t){return t.tipo==='despesa'&&t.data.startsWith(m);}).reduce(function(s,t){return s+t.valor;},0);});var labM=meses.map(function(m){var p=m.split('-');return new Date(p[0],p[1]-1).toLocaleDateString('pt-BR',{month:'short',year:'2-digit'});});if(gr.fluxo){try{gr.fluxo.destroy();}catch(e){}}if(gr.cat){try{gr.cat.destroy();}catch(e){}}var ctxFluxo=document.getElementById('gFluxo').getContext('2d');var gradRec=ctxFluxo.createLinearGradient(0,0,0,230);gradRec.addColorStop(0,'rgba(245,166,35,.45)');gradRec.addColorStop(1,'rgba(245,166,35,.0)');var gradDes=ctxFluxo.createLinearGradient(0,0,0,230);gradDes.addColorStop(0,'rgba(239,68,68,.35)');gradDes.addColorStop(1,'rgba(239,68,68,.0)');gr.fluxo=new Chart(ctxFluxo,{type:'line',data:{labels:labM.length?labM:['—'],datasets:[{label:'Receitas',data:recM.length?recM:[0],borderColor:'#f5a623',backgroundColor:gradRec,tension:0.4,fill:true,pointRadius:4},{label:'Despesas',data:desM.length?desM:[0],borderColor:'#ef4444',backgroundColor:gradDes,tension:0.4,fill:true,pointRadius:3}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{ticks:{callback:function(v){return fmtK(Math.abs(v));},color:'rgba(255,255,255,0.5)'},grid:{color:'rgba(255,255,255,0.05)'}},x:{ticks:{color:'rgba(255,255,255,0.5)'},grid:{display:false}}}}});var tx2=getTx(),desp2=tx2.filter(function(t){return t.tipo==='despesa';}),ct={};desp2.forEach(function(t){ct[t.cat]=(ct[t.cat]||0)+t.valor;});var ks=Object.keys(ct),tot=desp2.reduce(function(s,t){return s+t.valor;},0);document.getElementById('dcVal').textContent=ks.length?fmtK(tot):'—';if(ks.length){gr.cat=new Chart(document.getElementById('gCat'),{type:'doughnut',data:{labels:ks.map(function(k){return(CATS[k]?CATS[k].e:'📦')+' '+k;}),datasets:[{data:ks.map(function(k){return ct[k];}),backgroundColor:ks.map(function(k){return CATS[k]?CATS[k].c:'#94a3b8';}),borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,cutout:'70%',plugins:{legend:{display:false}}}});}}
function renderAnual(){document.getElementById('anoLabel').textContent=anoAtual;var hoje=new Date(),grid=document.getElementById('anualGrid'),html='';for(var m=0;m<12;m++){var ms=anoAtual+'-'+(m<9?'0':'')+(m+1);var txm=lista.filter(function(t){return t.data.startsWith(ms);});var r=txm.filter(function(t){return t.tipo==='receita';}).reduce(function(s,t){return s+t.valor;},0);var d=txm.filter(function(t){return t.tipo==='despesa';}).reduce(function(s,t){return s+t.valor;},0);var sl=r-d,tem=txm.length>0;var eHoje=hoje.getFullYear()===anoAtual&&hoje.getMonth()===m;var cls='mes-card'+(tem?'':' sem-dados');var barCls=!tem?'neu':(sl>=0?'pos':'neg');var cor=!tem?'var(--mut)':(sl>=0?'var(--grn)':'var(--red)');var oc=tem?' onclick="clicarMes(\''+ms+'\')"':'';html+='<div class="'+cls+'"'+oc+'>'+(eHoje?'<div class="mes-hoje">Atual</div>':'')+'<div class="mes-nome">'+MESES[m]+'</div><div class="mes-saldo" style="color:'+cor+'">'+(tem?(sl>=0?'+':'')+fmt(sl):'Sem dados')+'</div>'+(tem?'<div class="mes-row"><div class="mes-mini r">↑ <span>'+fmtK(r)+'</span></div><div class="mes-mini d">↓ <span>'+fmtK(d)+'</span></div></div>':'')+'<div class="mes-bar '+barCls+'"></div></div>';}grid.innerHTML=html;var recA=[],desA=[];for(var m2=0;m2<12;m2++){var ms2=anoAtual+'-'+(m2<9?'0':'')+(m2+1);var r2=lista.filter(function(t){return t.tipo==='receita'&&t.data.startsWith(ms2);}).reduce(function(s,t){return s+t.valor;},0);var d2=lista.filter(function(t){return t.tipo==='despesa'&&t.data.startsWith(ms2);}).reduce(function(s,t){return s+t.valor;},0);recA.push(r2);desA.push(d2);}if(gr.anual)gr.anual.destroy();gr.anual=new Chart(document.getElementById('gAnual'),{type:'bar',data:{labels:MESES_C,datasets:[{label:'Receitas',data:recA,backgroundColor:'rgba(0,196,140,.72)',borderRadius:5},{label:'Despesas',data:desA,backgroundColor:'rgba(255,77,109,.72)',borderRadius:5}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{ticks:{callback:function(v){return fmtK(Math.abs(v));}},grid:{color:'rgba(255,255,255,0.05)'}},x:{grid:{display:false}}}}});}
function mudaAno(d){anoAtual+=d;renderAnual();}
function clicarMes(mesStr){setView('dash');document.getElementById('sbMes').value=mesStr;render();}
function renderMensalView(){var p=_mesAtual.split('-'),y=parseInt(p[0]),m=parseInt(p[1]);var nomeMes=new Date(y,m-1,1).toLocaleDateString('pt-BR',{month:'long',year:'numeric'});var nomeMesCurto=new Date(y,m-1,1).toLocaleDateString('pt-BR',{month:'long'});document.getElementById('mensalLabel').textContent=nomeMes;document.getElementById('mensal-titulo').textContent=nomeMesCurto.toUpperCase()+' '+y;var diasNoMes=new Date(y,m,0).getDate();var dias=[];for(var d=1;d<=diasNoMes;d++)dias.push(d);var tx=lista.filter(function(t){return t.data.startsWith(_mesAtual);});var rec=tx.filter(function(t){return t.tipo==='receita';}).reduce(function(s,t){return s+t.valor;},0);var des=tx.filter(function(t){return t.tipo==='despesa';}).reduce(function(s,t){return s+t.valor;},0);document.getElementById('vm-rec').textContent=fmt(rec);document.getElementById('vm-des').textContent=fmt(des);document.getElementById('vm-saldo').textContent=fmt(rec-des);document.getElementById('vm-n').textContent=tx.length;var recDia=dias.map(function(d){var ds=_mesAtual+'-'+String(d).padStart(2,'0');return tx.filter(function(t){return t.tipo==='receita'&&t.data===ds;}).reduce(function(s,t){return s+t.valor;},0);});var desDia=dias.map(function(d){var ds=_mesAtual+'-'+String(d).padStart(2,'0');return tx.filter(function(t){return t.tipo==='despesa'&&t.data===ds;}).reduce(function(s,t){return s+t.valor;},0);});if(gr.mensal)gr.mensal.destroy();var ctx=document.getElementById('gMensal').getContext('2d');var datasets=[];if(_mensalTipo==='ambos'||_mensalTipo==='receita')datasets.push({label:'Receitas',data:recDia,borderColor:'#f5a623',backgroundColor:'rgba(245,166,35,0.1)',tension:0.4,fill:true});if(_mensalTipo==='ambos'||_mensalTipo==='despesa')datasets.push({label:'Despesas',data:desDia,borderColor:'#ef4444',backgroundColor:'rgba(239,68,68,0.1)',tension:0.4,fill:true});gr.mensal=new Chart(ctx,{type:'line',data:{labels:dias,datasets:datasets},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{ticks:{callback:function(v){return fmtK(Math.abs(v));}},grid:{color:'rgba(255,255,255,0.05)'}},x:{grid:{display:false}}}}});var semanas=[];var semAtual={n:1,rec:0,des:0,dias:[]};dias.forEach(function(d,i){var dow=new Date(y,m-1,d).getDay();semAtual.rec+=recDia[i];semAtual.des+=desDia[i];semAtual.dias.push(d);if(dow===6||d===diasNoMes){semanas.push({n:semAtual.n,rec:semAtual.rec,des:semAtual.des,dias:semAtual.dias.slice()});semAtual={n:semAtual.n+1,rec:0,des:0,dias:[]};}});var semGrid=document.getElementById('semanaGrid');if(semGrid)semGrid.innerHTML=semanas.map(function(s){var saldo=s.rec-s.des;var cor=saldo>=0?'var(--grn)':'var(--red)';var dMin=s.dias[0],dMax=s.dias[s.dias.length-1];return '<div style="background:var(--card2);border:1px solid var(--bor);border-radius:6px;padding:10px 12px;display:flex;align-items:center;gap:10px;"><div style="font-size:.62rem;font-weight:700;color:var(--acc);text-transform:uppercase;letter-spacing:.8px;min-width:56px;">Sem '+s.n+'<br><span style="color:var(--mut);font-weight:400">'+dMin+' – '+dMax+'/'+String(m).padStart(2,'0')+'</span></div><div style="flex:1"><div style="font-size:.68rem;color:var(--grn);font-family:JetBrains Mono,monospace">+'+fmt(s.rec)+'</div><div style="font-size:.68rem;color:var(--red);font-family:JetBrains Mono,monospace">-'+fmt(s.des)+'</div></div><div style="font-family:JetBrains Mono,monospace;font-size:.82rem;font-weight:700;color:'+cor+'">'+fmt(Math.abs(saldo))+'</div></div>';}).join('');var movs=dias.map(function(d,i){return{d:d,total:recDia[i]+desDia[i]};}).filter(function(x){return x.total>0;}).sort(function(a,b){return b.total-a.total;}).slice(0,6);var topGrid=document.getElementById('topDiasGrid');if(topGrid){if(!movs.length){topGrid.innerHTML='<div style="font-size:.75rem;color:var(--mut);text-align:center;padding:16px;">Sem movimentações neste mês</div>';}else{var maxTotal=movs[0].total||1;topGrid.innerHTML=movs.map(function(x){var pct=Math.round(x.total/maxTotal*100);return '<div style="display:flex;align-items:center;gap:8px;"><div style="font-size:.65rem;font-weight:700;min-width:30px;text-align:right;color:var(--acc);">'+String(x.d).padStart(2,'0')+'</div><div style="flex:1;height:6px;background:var(--card2);border-radius:3px;overflow:hidden;"><div style="height:100%;width:'+pct+'%;background:var(--acc);border-radius:3px;"></div></div><div style="font-size:.65rem;font-family:JetBrains Mono,monospace;color:var(--txt);min-width:56px;text-align:right;">'+fmt(x.total)+'</div></div>';}).join('');}}}
function mudaMes(dir){var p=_mesAtual.split('-'),y=parseInt(p[0]),m=parseInt(p[1]);m+=dir;if(m>12){m=1;y++;}if(m<1){m=12;y--;}_mesAtual=y+'-'+String(m).padStart(2,'0');renderMensalView();}
function setMensalTipo(el,tipo){document.querySelectorAll('#mensalPills .pill').forEach(function(p){p.classList.remove('on');});el.classList.add('on');_mensalTipo=tipo;renderMensalView();}
function renderStatusView(tipo){var CFG={vencida:{tbody:'txBodyVen',total:'sv-ven-total',count:'sv-ven-count'},avencer:{tbody:'txBodyAvc',total:'sv-avc-total',count:'sv-avc-count'},pago:{tbody:'txBodyPag',total:'sv-pag-total',count:'sv-pag-count'}};var cfg=CFG[tipo];var tx=getTx();var arr=tx.filter(function(t){return t.tipo==='despesa'&&calcStatus(t)===tipo;});if(bancoFiltro)arr=arr.filter(function(t){return(t.banco||'bb')===bancoFiltro;});arr.sort(function(a,b){return a.data.localeCompare(b.data);});var soma=arr.reduce(function(s,t){return s+t.valor;},0);document.getElementById(cfg.total).textContent=fmt(soma);document.getElementById(cfg.count).textContent=arr.length+' conta'+(arr.length!==1?'s':'');var nm={pago:'Pago',avencer:'A vencer',vencida:'Vencida',parcial:'Parcial'};var tbody=document.getElementById(cfg.tbody);if(!arr.length){tbody.innerHTML='<tr class="empty-r"><td colspan="9">Nenhuma transação encontrada.</td></tr>';return;}tbody.innerHTML=arr.map(function(t){var cat=CATS[t.cat]||CATS.outros,st=calcStatus(t),bk=t.banco||'bb';var df=new Date(t.data+'T12:00:00').toLocaleDateString('pt-BR');var bp='<button class="act pag" data-id="'+t.id+'" onclick="pagarEl(this)" title="'+(t.pago?'Desfazer':(st==='parcial'?'Continuar':'Pagar'))+'">'+(t.pago?'↩':(st==='parcial'?'💰':'✓'))+'</button>';var bbadge=getBancoBadge(bk);return '<tr><td><input type="checkbox" class="tx-cb sv-cb" data-id="'+t.id+'" onchange="toggleSelSvEl(this,this)"></td><td><div class="tico" style="background:'+cat.c+'1a">'+cat.e+'</div></td><td><div class="tnm">'+t.desc+'</div></td><td class="tct">'+t.cat+'</td><td>'+bbadge+'</td><td style="color:var(--mut);font-size:.71rem">'+df+'</td><td class="tv n">-'+fmt(t.valor)+'</td><td><span class="ts '+st+'">'+nm[st]+'</span></td><td>'+bp+'<button class="act del" data-id="'+t.id+'" onclick="removerSvEl(this)">🗑</button></td></tr>';}).join('');}
function removerESv(id){var t=lista.find(function(x){return x.id===id;});if(!t)return;_delId=id;document.getElementById('delDesc').textContent='"'+t.desc+'" — '+fmt(t.valor);document.getElementById('ovlDel').classList.add('open');}
function toggleSelSv(id,el){if(el.checked)_selecionadas.add(id);else _selecionadas.delete(id);var row=el.closest('tr');if(row)row.classList.toggle('sel',el.checked);}
function toggleTodosView(tipo,el){var cbs=document.querySelectorAll('#view-'+tipo+' .sv-cb');cbs.forEach(function(cb){cb.checked=el.checked;var id=cb.getAttribute('data-id');if(el.checked)_selecionadas.add(id);else _selecionadas.delete(id);var row=cb.closest('tr');if(row)row.classList.toggle('sel',el.checked);});}
function renderTodosView(){var tx=getTx();var nm={pago:'Pago',avencer:'A vencer',vencida:'Vencida',parcial:'Parcial'};['vencida','avencer','pago'].forEach(function(st){var cfg={vencida:{soma:'vt-ven-soma',cnt:'vt-ven-cnt',body:'vt-body-ven'},avencer:{soma:'vt-avc-soma',cnt:'vt-avc-cnt',body:'vt-body-avc'},pago:{soma:'vt-pag-soma',cnt:'vt-pag-cnt',body:'vt-body-pag'}}[st];var arr=tx.filter(function(t){return t.tipo==='despesa'&&calcStatus(t)===st;});if(bancoFiltro)arr=arr.filter(function(t){return(t.banco||'bb')===bancoFiltro;});arr.sort(function(a,b){return a.data.localeCompare(b.data);});var soma=arr.reduce(function(s,t){return s+t.valor;},0);document.getElementById(cfg.soma).textContent=fmt(soma);document.getElementById(cfg.cnt).textContent=arr.length+' conta'+(arr.length!==1?'s':'');var tbody=document.getElementById(cfg.body);if(!arr.length){tbody.innerHTML='<tr class="empty-r"><td colspan="8">Nenhuma transação.</td></tr>';return;}tbody.innerHTML=arr.map(function(t){var cat=CATS[t.cat]||CATS.outros,bk=t.banco||'bb';var df=new Date(t.data+'T12:00:00').toLocaleDateString('pt-BR');var bbadge=getBancoBadge(bk);var bp='<button class="act pag" data-id="'+t.id+'" onclick="pagarEl(this)" title="'+(t.pago?'Desfazer':(st==='parcial'?'Continuar':'Pagar'))+'">'+(t.pago?'↩':(st==='parcial'?'💰':'✓'))+'</button>';return '<tr><td><div class="tico" style="background:'+cat.c+'1a">'+cat.e+'</div></td><td><div class="tnm">'+t.desc+'</div></td><td class="tct">'+t.cat+'</td><td>'+bbadge+'</td><td style="color:var(--mut);font-size:.71rem">'+df+'</td><td class="tv n">-'+fmt(t.valor)+'</td><td><span class="ts '+st+'">'+nm[st]+'</span></td><td>'+bp+'<button class="act del" data-id="'+t.id+'" onclick="removerSvEl(this)">🗑</button></td></tr>';}).join('');});}
function renderBancoView(banco){var b=BANCOS[banco];if(!b)return;var view=document.getElementById('view-banco-dinamico');if(!view)return;var txAll=getTx().filter(function(t){return(t.banco||'bb')===banco;});var recTotal=txAll.filter(function(t){return t.tipo==='receita';}).reduce(function(s,t){return s+t.valor;},0);var desTotal=lista.filter(function(t){return t.tipo==='despesa'&&t.pago&&(t.cartaoPagamento||t.banco||'bb')===banco;}).reduce(function(s,t){return s+t.valor;},0);var saldo=recTotal-desTotal;var nm={pago:'Pago',avencer:'A vencer',vencida:'Vencida',receita:'Receita',parcial:'Parcial'};var receitas=txAll.filter(function(t){return t.tipo==='receita';}).sort(function(a,b){return b.data.localeCompare(a.data);});var despesas=txAll.filter(function(t){return t.tipo==='despesa';}).sort(function(a,b){var ord={vencida:0,avencer:1,parcial:1,pago:2};return(ord[calcStatus(a)]||0)-(ord[calcStatus(b)]||0)||b.data.localeCompare(a.data);});function makeRows(arr,tipo){if(!arr.length)return '<tr class="empty-r"><td colspan="6">Nenhuma '+(tipo==='receita'?'receita':'despesa')+' encontrada.</td></tr>';return arr.map(function(t){var cat=CATS[t.cat]||CATS.outros,st=calcStatus(t);var df=new Date(t.data+'T12:00:00').toLocaleDateString('pt-BR');var bp=t.tipo==='despesa'?'<button class="act pag" data-id="'+t.id+'" onclick="pagarEl(this)" title="'+(t.pago?'Desfazer':'Pagar')+'">'+(t.pago?'↩':'✓')+'</button>':'';return '<tr><td><div class="tico" style="background:'+cat.c+'1a">'+cat.e+'</div></td><td><div class="tnm">'+t.desc+'</div></td><td class="tct">'+t.cat+'</td><td style="color:var(--mut);font-size:.71rem">'+df+'</td><td class="tv '+(t.tipo==='receita'?'p':'n')+'">'+(t.tipo==='receita'?'+':'-')+fmt(t.valor)+'</td><td>'+bp+'<button class="act del" data-id="'+t.id+'" onclick="removerSvEl(this)">🗑</button></td></tr>';}).join('');}view.innerHTML='<div style="display:flex;align-items:center;gap:12px;margin-bottom:18px"><button class="sv-back" onclick="setBancoFiltro(\'\')">← Todos os bancos</button><span style="font-size:.78rem;color:var(--mut)">Dashboard / '+b.nome+'</span></div><div class="bv-header '+banco+'"><div class="bv-ico">'+b.svg+'</div><div><div class="bv-title">'+b.nome+'</div><div class="bv-sub">'+b.sub+' — todas as transações</div></div><div class="bv-stats"><div class="bv-stat"><div class="bv-stat-val" style="color:'+(saldo>=0?'var(--grn)':'var(--red)')+'">'+fmt(saldo)+'</div><div class="bv-stat-lbl">Saldo</div></div><div class="bv-stat"><div class="bv-stat-val" style="color:var(--grn)">'+fmt(recTotal)+'</div><div class="bv-stat-lbl">Receitas</div></div><div class="bv-stat"><div class="bv-stat-val" style="color:var(--red)">'+fmt(desTotal)+'</div><div class="bv-stat-lbl">Despesas</div></div><div class="bv-stat"><div class="bv-stat-val" style="color:var(--mut)">'+txAll.length+'</div><div class="bv-stat-lbl">Transações</div></div></div></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:18px"><div class="ccard"><div class="ch"><div><h4 style="color:var(--grn)">📈 Receitas</h4><div class="csub">'+receitas.length+' lançamento'+(receitas.length!==1?'s':'')+'</div></div></div><div class="tbl-scroll"><table class="tx"><thead><tr><th></th><th>Descrição</th><th>Categoria</th><th>Data</th><th>Valor</th><th></th></tr></thead><tbody>'+makeRows(receitas,'receita')+'</tbody></table></div></div><div class="ccard"><div class="ch"><div><h4 style="color:var(--red)">📉 Despesas</h4><div class="csub">'+despesas.length+' lançamento'+(despesas.length!==1?'s':'')+'</div></div></div><div class="tbl-scroll"><table class="tx"><thead><tr><th></th><th>Descrição</th><th>Categoria</th><th>Data</th><th>Valor</th><th></th></tr></thead><tbody>'+makeRows(despesas,'despesa')+'</tbody></table></div></div></div>';}
function aplicarTema(t){temaAtual=t;document.documentElement.setAttribute('data-theme',t);var btn=document.getElementById('btnTema');if(btn)btn.textContent=t==='light'?'☀️':'🌙';localStorage.setItem('mc_tema',t);desenhaGraficos();if(viewAtual==='anual')renderAnual();}
function showToast(msg,color){var t=document.getElementById('toast');if(!t){t=document.createElement('div');t.id='toast';t.style.cssText='position:fixed;bottom:28px;left:50%;transform:translateX(-50%);z-index:9999;padding:10px 20px;border-radius:10px;font-size:.78rem;font-weight:700;color:#fff;box-shadow:0 4px 20px rgba(0,0,0,.4);transition:opacity .3s;pointer-events:none;';document.body.appendChild(t);}t.textContent=msg;t.style.background=color||'var(--acc)';t.style.opacity='1';clearTimeout(t._timer);t._timer=setTimeout(function(){t.style.opacity='0';},2500);}

window.addEventListener('DOMContentLoaded',function(){
  var now=new Date();
  document.getElementById('topDate').textContent=now.toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long'});
  function atualizaRelogio(){var agora=new Date();var data=agora.toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit',year:'numeric'});var hora=agora.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit',second:'2-digit'});var sbData=document.getElementById('sbData');if(sbData)sbData.textContent=data+' '+hora;}
  atualizaRelogio();setInterval(atualizaRelogio,1000);
  var fData=document.getElementById('fData');if(fData)fData.valueAsDate=new Date();
  var btnTema=document.getElementById('btnTema');if(btnTema){btnTema.addEventListener('click',function(){aplicarTema(temaAtual==='dark'?'light':'dark');});}
  document.getElementById('ovl').addEventListener('click',function(e){if(e.target===this)fecharModal();});
  document.getElementById('ovlDel').addEventListener('click',function(e){if(e.target===this)fecharDel();});
  document.getElementById('ovlPag').addEventListener('click',function(e){if(e.target===this)fecharPagModal();});
  document.getElementById('bancosModal').addEventListener('click',function(e){if(e.target===this)fecharBancosModal();});
  document.getElementById('cfgOverlay').addEventListener('click',function(e){if(e.target===this)document.getElementById('cfgOverlay').style.display='none';});
  document.getElementById('admOverlay').addEventListener('click',function(e){if(e.target===this)fecharAdm();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){fecharModal();fecharDel();fecharBancosModal();fecharPagModal();fecharAdm();closeGearMenu();}});
  document.addEventListener('click',function(e){var gearBtn=document.getElementById('gearBtn');var gearDropdown=document.getElementById('gearDropdown');if(gearDropdown&&!gearDropdown.contains(e.target)&&e.target!==gearBtn&&!gearBtn.contains(e.target)){gearDropdown.classList.remove('open');}});
  document.getElementById('btnConfDel').addEventListener('click',function(){if(_delId===null)return;if(_delId==='bulk'){lista=lista.filter(function(x){return!_selecionadas.has(x.id);});_selecionadas.clear();}else{lista=lista.filter(function(x){return x.id!==_delId;});}_delId=null;fecharDel();salva(null,null,null);});
  document.getElementById('btnSalvar').addEventListener('click',function(){var desc=document.getElementById('fDesc').value.trim();var valor=parseFloat(document.getElementById('fVal').value);var cat=document.getElementById('fCat').value;var data=document.getElementById('fData').value;if(!desc){alert('Informe a descrição!');document.getElementById('fDesc').focus();return;}if(!valor||valor<=0){alert('Informe um valor válido!');document.getElementById('fVal').focus();return;}if(!data){alert('Informe a data!');document.getElementById('fData').focus();return;}var novaT={id:String(Date.now()),tipo:tipo,banco:bancoAtual,desc:desc,valor:valor,cat:cat,data:data,pago:false};lista.push(novaT);salva(novaT,null,null);fecharModal();document.getElementById('fDesc').value='';document.getElementById('fVal').value='';document.getElementById('fData').valueAsDate=new Date();document.querySelectorAll('.cat-item').forEach(function(i){i.classList.remove('sel');});var first=document.querySelector('.cat-item[data-cat="moradia"]');if(first)first.classList.add('sel');document.getElementById('fCat').value='moradia';});
  aplicarTema(temaAtual);

  // Enter no login
  (function(){
    function ke(id,fn){var el=document.getElementById(id);if(el)el.addEventListener('keydown',function(e){if(e.key==='Enter')fn();});}
    ke('lUser',fazerLogin);ke('lPass',fazerLogin);ke('rNome',criarConta);ke('rPin',criarConta);
    ke('admLoginPin',autenticarAdm);ke('admPin',admCriarConta);
  })();

  if(verificarSessao()){entrarNoApp();}
  else{var _ls=document.getElementById('loginScreen');if(_ls)_ls.classList.remove('hidden');}

  // Swipe para abrir sidebar no mobile
  var _txX=0,_txY=0;
  document.addEventListener('touchstart',function(e){_txX=e.touches[0].clientX;_txY=e.touches[0].clientY;},{passive:true});
  document.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-_txX;var dy=e.changedTouches[0].clientY-_txY;var sb=document.getElementById('sidebar');if(!sb)return;var isOpen=sb.classList.contains('open');if(!isOpen&&_txX<32&&dx>60&&Math.abs(dy)<80)abrirSidebar();if(isOpen&&dx<-60&&Math.abs(dy)<80)fecharSidebar();},{passive:true});

  window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();var btn=document.createElement('button');btn.textContent='📲 Instalar App';btn.style='position:fixed;bottom:20px;right:20px;z-index:500;padding:10px 18px;border-radius:12px;border:none;background:linear-gradient(135deg,#3b7ef8,#6c5df7);color:#fff;font-family:Inter,sans-serif;font-weight:700;font-size:.8rem;cursor:pointer;box-shadow:0 4px 20px rgba(59,126,248,.5);';btn.onclick=function(){e.prompt();btn.remove();};document.body.appendChild(btn);setTimeout(function(){if(btn.parentNode)btn.remove();},15000);});
});
