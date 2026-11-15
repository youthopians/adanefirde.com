(function(){
var d=document,root=d.documentElement;root.classList.add('js');
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

/* hero: masked line reveal */
var hero=d.querySelector('.hero');
if(hero){requestAnimationFrame(function(){requestAnimationFrame(function(){hero.classList.add('go')})})}

/* menu on phones */
var mb=d.querySelector('.menu-btn'),nav=d.getElementById('nav');
if(mb&&nav){mb.addEventListener('click',function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o?'true':'false');mb.textContent=o?'Close':'Menu'})}

/* section entrances: heading, then text, then picture, staggered */
var items=[].slice.call(d.querySelectorAll('.rv'));
if('IntersectionObserver' in window&&!reduce){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var el=e.target;el.classList.add('in');io.unobserve(el)}})},{rootMargin:'0px 0px -8% 0px',threshold:.08});
  var groups={};items.forEach(function(el){var s=el.closest('section,footer')||d.body;var k=s.dataset.g||(s.dataset.g=Math.random().toString(36).slice(2));groups[k]=(groups[k]||0);el.style.transitionDelay=(groups[k]*75)+'ms';groups[k]++;io.observe(el)});
}else{items.forEach(function(el){el.classList.add('in')})}

/* moving picture: scroll-linked drift on full-bleed photographs */
var bl=[].slice.call(d.querySelectorAll('.bleed img'));
if(bl.length&&!reduce){var tick=false;function upd(){bl.forEach(function(im){var r=im.parentNode.getBoundingClientRect(),vh=innerHeight;if(r.bottom<0||r.top>vh)return;var p=(r.top+r.height/2-vh/2)/(vh+r.height);im.style.transform='translateY('+(-8+p*-16).toFixed(2)+'%)'});tick=false}
addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});upd()}

/* the live thing: get your sentence to the point */
var form=d.getElementById('cutf');
if(form){
  var ta=d.getElementById('cut-in'),res=d.getElementById('cut-res'),why=d.getElementById('cut-why'),nb=d.getElementById('n-before'),na=d.getElementById('n-after');
  var phrases=[[/\bwe are an? ([a-z\- ,]*?)(company|business|firm|organi[sz]ation|agency|brand|team) (that|which|who) (provides?|offers?|delivers?|creates?|helps?|makes?)\b/gi,function(m,a,b,c,v){return 'we '+v.replace(/s$/,'').toLowerCase()}],
    [/\b(is|are) (a|an) (leading|premier|top|innovative)( and (innovative|leading|dynamic))? /gi,'$1 a '],
    [/\bin order to\b/gi,'to'],[/\ball over\b/gi,'across'],[/\bthroughout the country\b/gi,'nationwide'],[/\bat the end of the day\b/gi,''],[/\ba wide range of\b/gi,''],[/\bwide variety of\b/gi,''],
    [/\bcommitted to (providing|delivering|offering)\b/gi,'$1'],[/\bdedicated to (providing|delivering|offering)\b/gi,'$1'],[/\bstrive to\b/gi,''],[/\bwe pride ourselves on\b/gi,'we offer'],
    [/\bone-stop[- ]shop( for)?\b/gi,''],[/\bnext[- ]level\b/gi,''],[/\bstate[- ]of[- ]the[- ]art\b/gi,''],[/\bcutting[- ]edge\b/gi,''],[/\bworld[- ]class\b/gi,''],[/\bbest[- ]in[- ]class\b/gi,''],[/\bhigh[- ]quality\b/gi,''],[/\btop[- ]notch\b/gi,''],[/\bvalue[- ]added\b/gi,'']];
  var words=['leading','innovative','innovation-driven','premier','unique','unparalleled','exceptional','excellent','outstanding','superior','premium','quality','valued','esteemed','dedicated','passionate','dynamic','holistic','seamless','robust','tailored','bespoke','comprehensive','customized','customised','very','really','truly','highly','extremely','incredibly','basically','actually','just','genuinely','best','great','amazing','awesome','trusted','reliable','professional','modern','creative','strategic','integrated','sustainable','synergistic','end-to-end','first-class','top','leading-edge','solutions-oriented'];
  var wre=new RegExp('\\b('+words.join('|')+')\\b,?\\s*','gi');
  function count(s){var m=s.trim().match(/[^\s]+/g);return m?m.length:0}
  function cut(s){var o=s.replace(/\s+/g,' ').trim();if(!o)return '';
    phrases.forEach(function(p){o=o.replace(p[0],p[1])});o=o.replace(wre,'');
    o=o.replace(/\b(and|,)\s*(and|,)\b/gi,'$1').replace(/\s+,/g,'').replace(/,\s*,/g,',').replace(/\b(a|an) (?=[^a-z]*(company|business))/gi,'a ').replace(/\s{2,}/g,' ').replace(/\s+([.,;:!?])/g,'$1').replace(/^[,\s]+|[,\s]+$/g,'');
    o=o.replace(/\ban ([^aeiou\W])/gi,'a $1').replace(/\ba ([aeiou])/gi,'an $1');
    o=o.replace(/[.!?…]+$/,'');if(!o)return '';o=o.charAt(0).toUpperCase()+o.slice(1);return o}
  function show(){var s=ta.value,c=cut(s),b=count(s),a=count(c);
    if(!s.trim()){res.innerHTML='Paste a sentence to see what is left<span class="pt">.</span>';why.textContent='';nb.firstChild.nodeValue='0';na.firstChild.nodeValue='0';return}
    res.textContent=c;var pt=d.createElement('span');pt.className='pt';pt.textContent='.';res.appendChild(pt);
    var gone=b-a;why.textContent=gone>0?('From '+b+' words to '+a+'. '+(gone===1?'One word did no work.':gone+' did no work.')+' What is left is what you actually said. If it isn’t much, that is where we start.'):'Nothing to cut. That is a sentence with a point.';
    [nb,na].forEach(function(el,i){el.classList.add('bump');setTimeout(function(){el.classList.remove('bump')},180)});
    nb.firstChild.nodeValue=String(b);na.firstChild.nodeValue=String(a)}
  form.addEventListener('submit',function(e){e.preventDefault();show()});
  ta.addEventListener('input',function(){clearTimeout(ta._t);ta._t=setTimeout(show,350)});
  d.getElementById('cut-ex').addEventListener('click',function(){ta.value=ta.dataset.ex;show();ta.focus()});
}
})();
