/* =========================================================
   Red Team Portfolio — interactions
   ========================================================= */
(function(){
  'use strict';

  /* ---- mobile nav ----------------------------------------------------- */
  const tog = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(tog && links){
    tog.addEventListener('click', ()=> links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> links.classList.remove('open')));
  }

  /* ---- THEME : defense (blue) / hacker (red) -------------------------- */
  const RAIN = { bright:'rgba(59,130,246,0.85)', dim:'rgba(59,130,246,0.45)', fade:'rgba(11,14,20,0.12)' };
  function hexToRgb(h){
    h=(h||'').trim().replace('#',''); if(h.length===3) h=h.split('').map(c=>c+c).join('');
    const n=parseInt(h,16)||0; return {r:(n>>16)&255,g:(n>>8)&255,b:n&255};
  }
  function updateRainTheme(){
    const cs=getComputedStyle(document.body);
    const a=hexToRgb(cs.getPropertyValue('--accent')||'#3b82f6');
    const b=hexToRgb(cs.getPropertyValue('--bg')||'#0b0e14');
    RAIN.bright=`rgba(${a.r},${a.g},${a.b},0.85)`;
    RAIN.dim=`rgba(${a.r},${a.g},${a.b},0.42)`;
    RAIN.fade=`rgba(${b.r},${b.g},${b.b},0.12)`;
  }
  const THEME_KEY='am_theme';
  function applyTheme(t, save){
    t = (t==='hacker') ? 'hacker' : 'defense';
    var root = document.documentElement;
    root.classList.add('no-trans');
    root.setAttribute('data-theme', t);
    if(save!==false){ try{ localStorage.setItem(THEME_KEY,t); }catch(e){} }
    document.querySelectorAll('[data-theme-btn]').forEach(b=>{
      const on = b.dataset.themeBtn===t;
      b.classList.toggle('on', on); b.setAttribute('aria-pressed', on);
    });
    updateRainTheme();
    document.dispatchEvent(new CustomEvent('themechange',{detail:t}));
    requestAnimationFrame(()=>requestAnimationFrame(()=>root.classList.remove('no-trans')));
  }
  document.querySelectorAll('[data-theme-btn]').forEach(b=>{
    b.addEventListener('click', ()=> applyTheme(b.dataset.themeBtn));
  });
  let stored = document.documentElement.getAttribute('data-theme') || 'defense';
  try{ stored = localStorage.getItem(THEME_KEY) || stored; }catch(e){}
  applyTheme(stored, false);

  /* ---- matrix code-rain ----------------------------------------------- */
  const cv = document.getElementById('rain');
  if(cv){
    const ctx = cv.getContext('2d');
    const glyphs = 'アカサタナ0123456789ABCDEF<>/{}[]#$%&*';
    let cols, drops, fs, W, H, dpr;
    function setup(){
      dpr = Math.min(window.devicePixelRatio||1, 2);
      W = cv.width  = innerWidth  * dpr;
      H = cv.height = innerHeight * dpr;
      cv.style.width = innerWidth+'px'; cv.style.height = innerHeight+'px';
      fs = 15 * dpr;
      cols = Math.floor(W / fs);
      drops = new Array(cols).fill(0).map(()=> Math.random()*-80);
    }
    setup();
    let last = 0;
    function draw(t){
      if(t - last > 55){
        last = t;
        ctx.fillStyle = RAIN.fade;
        ctx.fillRect(0,0,W,H);
        ctx.font = fs+'px JetBrains Mono, monospace';
        for(let i=0;i<cols;i++){
          const ch = glyphs[(Math.random()*glyphs.length)|0];
          const x = i*fs, y = drops[i]*fs;
          ctx.fillStyle = Math.random()>0.985 ? RAIN.bright : RAIN.dim;
          ctx.fillText(ch, x, y);
          if(y > H && Math.random() > 0.975) drops[i] = 0;
          drops[i] += 1;
        }
      }
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
    let rt; addEventListener('resize', ()=>{ clearTimeout(rt); rt=setTimeout(setup,180); });
  }

  /* ---- terminal typewriter -------------------------------------------- */
  const term = document.getElementById('hero-term');
  if(term){
    const lines = [
      {p:'albmont@redteam:~$ ', cmd:'whoami', out:['alberto_montefusco — red team operator']},
      {p:'albmont@redteam:~$ ', cmd:'cat ./role.txt', out:['Penetration Tester @ DGS S.p.A','MSc Cybersecurity · 110 cum laude']},
      {p:'albmont@redteam:~$ ', cmd:'nmap -sV target.local', out:['PORT     STATE  SERVICE','22/tcp   open   ssh','443/tcp  open   https','> 2 open ports. access granted_']}
    ];
    const screen = term.querySelector('.term-body');
    let li=0;
    function typeCmd(line, cb){
      const row = document.createElement('div');
      row.className='t-row';
      row.innerHTML = `<span class="t-prompt">${line.p}</span><span class="t-cmd"></span><span class="t-cur">▋</span>`;
      screen.appendChild(row);
      const span = row.querySelector('.t-cmd');
      const cur = row.querySelector('.t-cur');
      let i=0;
      (function tick(){
        if(i<=line.cmd.length){ span.textContent = line.cmd.slice(0,i++); setTimeout(tick, 55+Math.random()*45); }
        else { cur.remove(); printOut(line.out, 0, cb); }
      })();
    }
    function printOut(out, k, cb){
      if(k>=out.length){ setTimeout(cb, 520); return; }
      const d = document.createElement('div');
      d.className='t-out'; d.textContent = out[k];
      if(out[k].includes('access granted')) d.classList.add('ok');
      if(out[k].includes('open')) d.classList.add('hl');
      screen.appendChild(d);
      setTimeout(()=>printOut(out, k+1, cb), 230);
    }
    function run(){
      if(li>=lines.length){ setTimeout(()=>{ screen.innerHTML=''; li=0; run(); }, 2600); return; }
      typeCmd(lines[li++], run);
    }
    run();
  }

  /* ---- rotating role (hero subtitle) ---------------------------------- */
  const rot = document.querySelector('[data-rotate]');
  if(rot){
    const words = ['Penetration Tester','Offensive Security','IoT Security','Red Team Operator'];
    let w=0, c=0, del=false;
    (function loop(){
      const word = words[w];
      rot.textContent = del ? word.slice(0,--c) : word.slice(0,++c);
      let wait = del ? 45 : 95;
      if(!del && c===word.length){ wait=1500; del=true; }
      else if(del && c===0){ del=false; w=(w+1)%words.length; wait=320; }
      setTimeout(loop, wait);
    })();
  }

  /* ---- scramble glitch on hover (name) -------------------------------- */
  document.querySelectorAll('[data-scramble]').forEach(el=>{
    const real = el.textContent;
    const chars = '!<>-_\\/[]{}—=+*^?#01';
    let raf;
    el.addEventListener('mouseenter', ()=>{
      let frame=0; cancelAnimationFrame(raf);
      (function go(){
        el.textContent = real.split('').map((ch,i)=>{
          if(ch===' ') return ' ';
          if(i < frame/2) return real[i];
          return chars[(Math.random()*chars.length)|0];
        }).join('');
        frame++;
        if(frame/2 < real.length) raf=requestAnimationFrame(go);
        else el.textContent = real;
      })();
    });
  });

  /* ---- reveal on scroll ----------------------------------------------- */
  const io = new IntersectionObserver((es)=>{
    es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:.12, rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach((el,i)=>{
    el.style.transitionDelay = (Math.min(i%4,3)*70)+'ms';
    io.observe(el);
  });

  /* ---- count-up stats ------------------------------------------------- */
  const cio = new IntersectionObserver((es)=>{
    es.forEach(e=>{
      if(!e.isIntersecting) return;
      const el = e.target; cio.unobserve(el);
      const target = parseFloat(el.dataset.count);
      const dur = 1400, t0 = performance.now();
      (function step(t){
        const k = Math.min((t-t0)/dur, 1);
        const val = Math.floor((1-Math.pow(1-k,3)) * target);
        el.textContent = val.toLocaleString('en-US');
        if(k<1) requestAnimationFrame(step); else el.textContent = target.toLocaleString('en-US');
      })(t0);
    });
  }, {threshold:.5});
  document.querySelectorAll('[data-count]').forEach(el=> cio.observe(el));

  /* ---- back-to-top ---------------------------------------------------- */
  const toTop = document.getElementById('toTop');
  if(toTop){
    const onScroll = ()=> toTop.classList.toggle('show', window.scrollY > 480);
    addEventListener('scroll', onScroll, {passive:true}); onScroll();
    toTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
  }

  /* ---- certificate / publication lightbox (images + PDFs) ------------- */
  const lb = document.getElementById('lightbox');
  if(lb){
    const lbMedia = document.getElementById('lbMedia');
    const lbCap = document.getElementById('lbCap');
    const lbOpen = document.getElementById('lbOpen');
    const lbClose = document.getElementById('lbClose');
    function openLB(src, cap){
      const pdf = /\.pdf(\?|#|$)/i.test(src);
      lbMedia.innerHTML = pdf
        ? '<iframe src="'+src+'#view=FitH" title="document preview"></iframe>'
        : '<img src="'+src+'" alt="preview">';
      lbCap.innerHTML = cap || '';
      lbOpen.href = src;
      lb.classList.add('open'); lb.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
    }
    function closeLB(){
      lb.classList.remove('open'); lb.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
      setTimeout(()=>{ if(!lb.classList.contains('open')) lbMedia.innerHTML=''; }, 320);
    }
    document.querySelectorAll('.cert[data-doc]').forEach(el=>{
      function open(){ openLB(el.getAttribute('data-doc') || '', el.dataset.cap || ''); }
      el.addEventListener('click', e=>{
        if(e.target.closest('.cverify')) return;       // let the verify link open normally
        if(e.metaKey||e.ctrlKey||e.shiftKey) return;
        e.preventDefault();
        open();
      });
      el.addEventListener('keydown', e=>{
        if(e.key==='Enter' || e.key===' '){ e.preventDefault(); open(); }
      });
    });
    lbClose.addEventListener('click', closeLB);
    lb.addEventListener('click', e=>{ if(e.target===lb) closeLB(); });
    addEventListener('keydown', e=>{ if(e.key==='Escape' && lb.classList.contains('open')) closeLB(); });
  }

  /* ---- smart nav: in-page smooth-scroll vs cross-page navigate+anchor -- */
  function currentFile(){
    var p = (location.pathname.split('/').pop() || '').toLowerCase();
    return p || 'index.html';
  }
  function scrollToId(id){
    var el = document.getElementById(id);
    if(!el) return false;
    var y = el.getBoundingClientRect().top + window.scrollY - 74;
    window.scrollTo({ top:Math.max(0,y), behavior:'smooth' });
    return true;
  }
  // jump to hash on fresh page load (offset for sticky nav)
  if(location.hash && location.hash.length>1){
    var hid = decodeURIComponent(location.hash.slice(1));
    requestAnimationFrame(function(){ setTimeout(function(){ scrollToId(hid); }, 60); });
  }
  document.querySelectorAll('a[href]').forEach(function(a){
    var raw = a.getAttribute('href') || '';
    if(a.target==='_blank') return;
    var m = raw.match(/^(index|resume|contact)\.html(?:#(.+))?$/i);
    var hashOnly = raw.match(/^#(.+)$/);
    if(!m && !hashOnly) return;
    a.addEventListener('click', function(e){
      if(e.metaKey||e.ctrlKey||e.shiftKey||e.button===1) return;
      var targetPage = m ? (m[1].toLowerCase()+'.html') : currentFile();
      var hash = m ? m[2] : hashOnly[1];
      var samePage = targetPage === currentFile();
      if(samePage){
        e.preventDefault();
        if(links) links.classList.remove('open');
        if(hash){ scrollToId(decodeURIComponent(hash)); history.replaceState(null,'','#'+hash); }
        else { window.scrollTo({ top:0, behavior:'smooth' }); }
        return;
      }
      // different page → crossfade out, then navigate (hash preserved by browser)
      e.preventDefault();
      document.body.classList.add('leaving');
      setTimeout(function(){ location.href = raw; }, 230);
    });
  });

  /* ---- years of experience (since Apr 2025) --------------------------- */
  const yrsEl = document.getElementById('yrsExp');
  if(yrsEl){
    const start = new Date(2025, 3, 1);            // April 2025
    const months = Math.max(0, (Date.now() - start) / (1000*60*60*24*30.44));
    const yrs = Math.floor(months / 12);
    yrsEl.textContent = yrs >= 1 ? yrs + '+' : Math.max(1, Math.round(months)) + 'mo';
  }

  /* ---- dynamic footer year ------------------------------------------- */
  var yrEl = document.getElementById('yr');
  if(yrEl) yrEl.textContent = new Date().getFullYear();

})();
