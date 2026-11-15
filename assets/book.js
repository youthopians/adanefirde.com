(function(){
var f=document.getElementById('bf');if(!f)return;
var q=function(n){var c=f.querySelector('input[name="'+n+'"]:checked');return c?c.value:''};
function upd(){var k=q('kind');document.getElementById('s-kind').textContent=k==='question'?'A question first':'Strategy Session';
document.getElementById('s-day').textContent=q('day')||'Any weekday';
var t=f.querySelector('input[name="time"]:checked');document.getElementById('s-time').textContent=t?t.value+' EAT':'Any time'}
f.addEventListener('change',upd);upd();
f.addEventListener('submit',function(e){e.preventDefault();
var nm=f.name.value.trim(),em=f.email.value.trim(),err=document.getElementById('err');
if(!nm||!em||em.indexOf('@')<1){err.hidden=false;(nm?f.email:f.name).focus();return}err.hidden=true;
var k=q('kind')==='question'?'A question first':'Strategy Session (90 min)';
var body=['Request: '+k,'Day: '+(q('day')||'Any weekday'),'Time: '+(q('time')?q('time')+' EAT':'Any time'),'','Name: '+nm,'Organisation: '+f.org.value,'Email: '+em,'Phone or Telegram: '+f.phone.value,'','What I would like to fix first:',f.msg.value].join('\n');
var subj=(q('kind')==='question'?'Question':'Strategy Session request')+' — '+nm;
window.location.href='mailto:hi@adanefirde.com?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body);
document.getElementById('done').hidden=false;document.getElementById('done').scrollIntoView({behavior:'smooth',block:'center'})});
})();
