document.getElementById('year').textContent = new Date().getFullYear();

const recForm = document.getElementById('recForm');
const recList = document.getElementById('recList');
const recEmpty = document.getElementById('recEmpty');

recForm.addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('recName').value.trim();
  const text = document.getElementById('recText').value.trim();
  if(!name || !text){ alert('Please fill in both your name and a recommendation.'); return; }

  // textContent (not innerHTML) so visitors can't inject HTML
  const card = document.createElement('div');
  card.className = 'card rec';
  card.appendChild(document.createTextNode(text));
  const cite = document.createElement('cite');
  cite.textContent = '— ' + name;
  card.appendChild(cite);
  recList.prepend(card);
  recEmpty.hidden = true;

  showConfirm('Thanks, ' + name + '! Your recommendation was added.');
  recForm.reset();
});

function showConfirm(message){
  const overlay = document.createElement('div');
  Object.assign(overlay.style,{position:'fixed',inset:'0',background:'rgba(0,0,0,.6)',display:'grid',placeItems:'center',zIndex:'1000'});
  const dialog = document.createElement('div');
  dialog.setAttribute('role','dialog');
  dialog.setAttribute('aria-modal','true');
  Object.assign(dialog.style,{background:'#111827',border:'1px solid rgba(148,163,184,.25)',borderRadius:'16px',padding:'18px 18px 14px',minWidth:'280px',maxWidth:'90vw'});
  const p = document.createElement('p');
  p.textContent = message;
  p.style.margin = '0 0 12px';
  const ok = document.createElement('button');
  ok.textContent = 'OK';
  ok.addEventListener('click', ()=> document.body.removeChild(overlay));
  dialog.append(p, ok);
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);
  setTimeout(()=> ok.focus(), 0);
}