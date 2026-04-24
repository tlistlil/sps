//控制輸入
const planko=byId('planko');
const plafono=byId('plafono');
let steriligi=(e)=>{e.target.value=e.target.value.replace(/\D/,'');}
aEL(planko,'input',steriligi);
aEL(plafono,'input',steriligi);
//設定
const clj=byId('clj');
let cl='';
aEL(clj,'change',()=>{switch(clj.selectedIndex){
	case 1:cl='人';break;
	case 2:cl='歳';break;
	case 3:cl='枚';break;
	case 4:cl='亂';break;
	default:cl='';break;
}});
const maxmax=99999;
let cxiQ=qa_q=1,qa_Y=qa_P=qa_I=regj='',min=max=1;
let minsx=()=>{min=parseInt(planko.value);if(!min)min=1;min=Math.log(min);}
let maxsx=()=>{
	max=parseInt(plafono.value);if(!max)max=99;
	if(max>maxmax)max=maxmax;max=Math.log(max);
}
minsx();maxsx();
aEL(planko,'change',minsx);
aEL(plafono,'change',maxsx);
//出題と解答表示
const q_a=byId('q_a');
const dem=byId('demando');
const resY=byId('respondoY');//Yiii
const resP=byId('respondoP');//拼音
const resI=byId('respondoI');//IPA
const reguloj=byId('reguloj');//解説表示欄
aEL(q_a,'click',()=>{
	if(cxiQ){
		let kl=cl=='亂'?['','人','歳','枚'][Math.floor(Math.random()*4)]:cl;
		qa_q=Math.round(Math.E**(min+(Math.random()*(max-min))));//問題の生成
		if(byId('rondigi').checked)qa_q=rondigi(qa_q);//丸める
		qa_P=no_ii_py(qa_q,kl);
		qa_I='['+ii_py_IPA(qa_P)+']';//ii.js
		qa_Y=ii_py_Yiii(qa_P);//ii.js
		q_a.innerHTML='解答';
		dem.innerHTML=qa_q.toLocaleString()+kl;
		resY.innerHTML=resP.innerHTML=resI.innerHTML='&nbsp;';
		reguloj.innerHTML=ii_no_reguloj(qa_Y);
	}else{
		q_a.innerHTML='出題';
		resY.innerHTML=qa_Y;
		resP.innerHTML=qa_P;
		resI.innerHTML=qa_I;
	}
	cxiQ=1-cxiQ;
});
let rondigi=(n=1)=>{//丸める
	let lon=n.toString().length;
	return Math.round(n-n%(10**(lon-2)));
}
let ii_no_reguloj=(Y='')=>{//適用規則清單：彝文を輸入
	let html='';
	if(Y.match(/[ꋋꑋꏁ]/))html+='<li>中平調の十・百・千に低調の一・二・七が續くとき、後者が次高調になる</li>';
	if(Y.match(/ꊪ/))html+='<li>十一は cix zy になる</li>';
	if(Y.match(/[ꊏꊎ]/))html+='<li>二に十が續くとき、十の頭子音が無氣音化する</li>';
	if(Y.match(/[ꊯꊎ]/))html+='<li>直前が次高調以外の中平調の十に中平調の三・四・五・九が續くとき、十が次高調になる</li>';
	if(Y.match(/[ꊰꊏ][ꌕꇖꉬꈬ]/))html+='<li>直前が次高調である中平調の十に中平調の三・四・五・九が續くとき、変調は起きない</li>';
	if(Y.match(/[ꉏꄘ]/))html+='<li>直前が高調以外の中平調の百・千に中平調の三・四・五・九が續くとき、百・千が次高調になる</li>';
	if(Y.match(/[ꉐꄙ][ꌕꇖꉬꈬ]/))html+='<li>直前が高調である中平調の百・千に中平調の三・四・五・九が續くとき、変調は起きない</li>';
	if(Y.match(/[ꑻꑼꑹꁬꁯꁱ]/))html+='<li>數高量低、數低量高、數平量平</li>';
	if(Y.match(/[ꈎꈓ]/))html+='<li>不規則量詞：數平量高、數非平量平</li>';
	return html;
}
//數字を綴字に
let no_ii_py=(n=1,kl='')=>{
	let str=no_Hani(n)+kl;
	str=str.replace(/(?<![一二三四五六七八九])十一/g,' cix zy');//百以上の位にはよらないと假定
	str=str.replace(/([十百千])([一二七])/g,'$1$2x');
	str=str.replace(/(?<!x)十([三四五九])/g,'十x$1');
	str=str.replace(/(?<![六八x])([百千])([三四五九])/g,'$1x$2');
	str=str.replace(/^([一二])人/,'$1 ma');//11, 12… 101, 102… に不適用と假定
	str=str.replace(/萬/,' vat');
	str=str.replace(/千/,' dur');
	str=str.replace(/百/,' hxa');
	str=str.replace(/(二x?)十/,'$1 zi');//百以上の位にはよらないと假定
	str=str.replace(/十/,' ci');
	str=str.replace(/六/g,' fut');
	str=str.replace(/八/g,' hxit');
	str=str.replace(/三/g,' suo');
	str=str.replace(/四/g,' ly');
	str=str.replace(/五/g,' nge');
	str=str.replace(/九/g,' ggu');
	str=str.replace(/一x/g,' cyx');
	str=str.replace(/一/g,' cyp');
	str=str.replace(/二x/g,' nyix');
	str=str.replace(/二/g,' nyip');
	str=str.replace(/七x/g,' shyx');
	str=str.replace(/七/g,' shyp');
	str=str.replace(/零/g,' si nip');
	str=str.replace(/([xt])人/,'$1 yuop');//量詞變調は數詞の變調後に適用
	str=str.replace(/p人/,'p yuot');
	str=str.replace(/人/,' yuo');
	str=str.replace(/([xt])枚/,'$1 bbup');
	str=str.replace(/p枚/,'p bbut');
	str=str.replace(/枚/,' bbur');
	str=str.replace(/([xtp])歳/,'$1 kur');
	str=str.replace(/歳/,' kut');
	str=str.replace(/^ /,'');
	return str;
}
let no_Hani=(n=1)=>{//數を漢數字に
	if(!Number.isInteger(n))return'eraro malentjero';
	if(n<1)return'非正';
	if(maxmax<n)return'超過';
	n=n.toString();
	let lon=n.length,cif=str='';
	for(i=0;i<lon;i++){
		cif=Number(n.charAt(i));
		if(cif)str+=no_Hani_c[cif]+no_Hani_p[lon-i];
		else str+='零';
	}
	str=str.replace(/(?<!百)一十/,'十');
	str=str.replace(/零{2,}/g,'零');//空位の正規化
	str=str.replace(/零$/,'');//空位の正規化
	return str;
}
const no_Hani_c=['','一','二','三','四','五','六','七','八','九'];
const no_Hani_p=['','','十','百','千','萬'];
