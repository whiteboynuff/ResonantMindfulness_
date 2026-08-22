(function(){
  var pacer=document.getElementById('pacer');
  if(pacer){
    var stage=pacer.querySelector('.pacer-stage'),
        orb=document.getElementById('orb'),
        arc=document.getElementById('arc'),
        hero=document.getElementById('top'),
        phase=document.getElementById('phase'),
        rounds=document.getElementById('rounds'),
        toggle=document.getElementById('pacer-toggle'),
        root=document.documentElement,
        stillMotion=window.matchMedia('(prefers-reduced-motion: reduce)'),
        IN=4000, OUT=7000, MILESTONE=6,
        running=false, timer=null, count=0, isIn=false;

    function setPhaseTime(ms){ root.style.setProperty('--phase',ms+'ms'); }

    function say(text){
      if(stillMotion.matches){ phase.textContent=text; return; }
      phase.classList.add('is-swapping');
      setTimeout(function(){
        phase.textContent=text;
        phase.classList.remove('is-swapping');
      },170);
    }

    function ripple(){
      if(stillMotion.matches) return;
      var r=document.createElement('span');
      r.className='ripple';
      stage.appendChild(r);
      setTimeout(function(){ r.remove(); },2900);
    }

    function glow(open){
      hero.style.setProperty('--glow',open?'1':'.35');
      hero.style.setProperty('--glow-scale',open?'1.07':'.94');
    }

    function step(){
      if(!running) return;
      isIn=!isIn;
      if(isIn){
        setPhaseTime(IN);
        orb.classList.add('is-in');
        arc.classList.add('is-in');
        glow(true);
        say('Let the breath in');
        timer=setTimeout(step,IN);
      }else{
        setPhaseTime(OUT);
        orb.classList.remove('is-in');
        arc.classList.remove('is-in');
        glow(false);
        ripple();
        say('Out, longer');
        count++;
        rounds.textContent=count+(count===1?' round':' rounds');
        if(count===MILESTONE) pacer.classList.add('is-milestone');
        timer=setTimeout(step,OUT);
      }
    }

    var words={'6000':'six','7000':'seven','8000':'eight','10000':'ten'},
        outWord=document.getElementById('out-word');
    Array.prototype.forEach.call(document.querySelectorAll('.pace-btn'),function(btn){
      btn.addEventListener('click',function(){
        OUT=parseInt(btn.getAttribute('data-out'),10);
        outWord.textContent=words[btn.getAttribute('data-out')];
        Array.prototype.forEach.call(document.querySelectorAll('.pace-btn'),function(b){
          b.setAttribute('aria-pressed',b===btn?'true':'false');
        });
      });
    });

    toggle.addEventListener('click',function(){
      running=!running;
      if(running){
        pacer.classList.add('is-running');
        toggle.textContent='Pause';
        isIn=false;
        step();
      }else{
        clearTimeout(timer);
        toggle.textContent='Start breathing';
        say('Paused');
        setPhaseTime(1100);
        orb.classList.remove('is-in');
        arc.classList.remove('is-in');
        glow(false);
        setTimeout(function(){
          if(!running){ pacer.classList.remove('is-running'); }
        },1150);
      }
    });
  }

  var form=document.getElementById('optin'),
      msg=document.getElementById('form-msg');
  if(form){
    form.addEventListener('submit',function(e){
      if(form.getAttribute('action')==='#REPLACE-FORM-ACTION'){
        e.preventDefault();
        msg.textContent='Connect your email provider to this form and it will send.';
      }
    });
  }

  var grid=document.getElementById('book-grid');
  if(grid){
    var chips=document.querySelectorAll('.chip'),
        out=document.getElementById('chooser-out'),
        books=grid.querySelectorAll('.book'),
        reasons={
          nervous:'Start with NERVOUS?. It is the one written for a body still braced long after the danger has gone.',
          rest:'Start with Rest. It is aimed at the tiredness a full night of sleep has stopped reaching.',
          soothe:'Start with Soothe. Stories rather than instruction, so you can open it on a bad day and begin anywhere.',
          luminous:'Start with Perfect Luminous Peace. It goes at what has been carried the longest.',
          spirit:'Start with Spirit of Motivation. It works on purpose first, and lets the motivation follow that.',
          awakened:'Start with Awakened Peace. It lays out the principle the other five apply.'
        };

    function choose(key){
      Array.prototype.forEach.call(chips,function(c){
        c.setAttribute('aria-pressed',c.getAttribute('data-pick')===key?'true':'false');
      });
      Array.prototype.forEach.call(books,function(b){
        b.classList.toggle('is-pick',b.getAttribute('data-book')===key);
      });
      if(key==='all'){
        grid.classList.remove('is-filtered');
        out.classList.remove('is-on');
        setTimeout(function(){ if(!out.classList.contains('is-on')) out.textContent=''; },500);
      }else{
        grid.classList.add('is-filtered');
        out.textContent=reasons[key];
        out.classList.add('is-on');
      }
    }

    Array.prototype.forEach.call(chips,function(c){
      c.addEventListener('click',function(){ choose(c.getAttribute('data-pick')); });
    });
  }

  var yearEl=document.getElementById('year');
  if(yearEl){
    yearEl.textContent=new Date().getFullYear();
  }

  var items=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){en.target.classList.add('is-seen');io.unobserve(en.target);}
      });
    },{rootMargin:'0px 0px -8% 0px',threshold:.08});
    items.forEach(function(el){io.observe(el);});
  }else{
    items.forEach(function(el){el.classList.add('is-seen');});
  }
})();