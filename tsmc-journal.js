(()=>{'use strict';
const dialog=document.querySelector('#figure-viewer');
let opener=null;
if(dialog&&typeof dialog.showModal==='function'){
 const image=dialog.querySelector('img'),title=dialog.querySelector('#figure-title'),original=dialog.querySelector('.original-image');
 for(const link of document.querySelectorAll('[data-figure]'))link.addEventListener('click',e=>{
  e.preventDefault();opener=link;image.src=link.href;image.alt=link.querySelector('img')?.alt||link.dataset.figure;title.textContent=link.dataset.figure;original.href=link.href;dialog.showModal();dialog.querySelector('button').focus();
 });
 dialog.querySelector('button').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{opener?.focus();image.removeAttribute('src');});
}
const progress=document.querySelector('.journal-progress');
if(progress){const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?Math.min(100,Math.max(0,scrollY/max*100)):0)+'%';};addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();}
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){for(const a of document.querySelectorAll('.journal-toc a')){if(a.hash==='#'+e.target.id)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');}}},{rootMargin:'-5% 0px -65% 0px'});for(const s of document.querySelectorAll('.journal-article section[id]'))observer.observe(s);}
})();
