/* 全站共通函式庫 */
let byId=ById=(str='')=>document.getElementById(str);
let log=(str='laboras')=>console.log(str);
let aEL=(el, ev='click', func=log('laboras'))=>el.addEventListener(ev,func,false);
let reskr=(el,str='')=>el.innerHTML=str;
let skribi=(str='')=>document.write(str);
let $$=(elek,ctx)=>{
  ctx=ctx||document;
  let elj=ctx.querySelectorAll(elek);
  return Array.prototype.slice.call(elj);
}
