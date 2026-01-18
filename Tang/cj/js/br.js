const supro	=byId('supro');
const enir	=byId('enir');
const mesagxo=byId('mesagxo');
const klavoj=byId('klavoj');
let viva=supro;
let vivigi=(e=supro)=>{//畫面切替
	viva.style.display='none';
	e.style.display='block';
	viva=e;
}
aEL(byId('komenci'),'click',function(){init();});
aEL(byId('rekomenci'),'click',function(){vivigi(byId('elekto'));});
aEL(byId('reiriAlSupro'),'click',function(){vivigi();});
aEL(byId('p1'),'click',function(){init(11)});
aEL(byId('p2'),'click',function(){init(37)});
aEL(byId('p3'),'click',function(){init(66)});
aEL(byId('p4'),'click',function(){init(86)});
aEL(byId('p5'),'click',function(){init(120)});
aEL(byId('p6'),'click',function(){init(148)});
aEL(byId('p7'),'click',function(){init(186)});
aEL(byId('p8'),'click',function(){init(210)});
aEL(byId('p9'),'click',function(){init(236)});
aEL(byId('p10'),'click',function(){init(258)});
aEL(byId('cxesi'),'click',function(){cxesi();});
let init=(posInit=0)=>{//開始寫經
	pos=posInit;posKom=pos;
	cxiMontri=byId('cxiMontri').checked;
	karSxargxi(pos);
	vivigi(byId('cxefo'));
	enir.focus();
}
let cxesi=()=>{//中斷寫經
	let tipis=pos-posKom;
	byId('tipito').innerHTML=tipis;
	byId('tipitparto').innerHTML=tipitparto;
	vivigi(byId('cxeso'));
}
let fini=()=>{//完了寫經
	vivigi(byId('fino'));
}
let kar=gxusto=tipitparto='',pos=posKom=cxiMontri=cxiQ=erar=0;
let karSxargxi=(pos=0)=>{
	let lin=datumoj[pos];
	kar=lin[1];
	byId('kar').innerHTML=kar;
	if(pos)byId('karPre').innerHTML='…'+datumoj[pos-1][1];
	byId('karPost').innerHTML=pos+1<datumLon?datumoj[pos+1][1]+'…':'　　';
	byId('traskribo').innerHTML=lin[2];
	byId('traduko').innerHTML=lin[3];
	gxusto=lin[4];
	byId('klavoj').innerHTML=cxiMontri?gxusto:'&nbsp;';
	enir.value='';
	mesagxo.innerHTML='Enter を押すと答え合わせ';
	cxiQ=1-cxiQ;erar=0;
}
aEL(enir,'keydown',function(e){if(e.key=='Enter'){
	if(cxiQ){//答へ合はせ
		let respondo=enir.value;
		if(respondo==kar||respondo.match(new RegExp(`^${gxusto}$`,'i'))){//正答
			pos++;
			let mes='正解 Enter で';mes+=pos==datumLon?'終了':'次の字へ';
			mesagxo.innerHTML=mes;
			enir.value='';
			cxiQ=1-cxiQ;
			tipitparto+=kar;
		}else{//誤答
			erar++;
			mesagxo.innerHTML=`タイプミス${erar} Enter で再度答え合わせ`;
		}
	}else{
		if(pos<datumLon)karSxargxi(pos);//一字進む
		else fini();//終了
	}
}});
aEL(byId('montru'),'click',function(){klavoj.innerHTML=gxusto;});
let datumoj=[];
let datumLon=0;
let akirTSV=()=>{//取得TSV
	let pet=new XMLHttpRequest();
	pet.open('get','./tsv/banruo.tsv',true);
	pet.send(null);
	pet.onload=function(){TSValList(pet.responseText);}
}
let TSValList=(txt='')=>{//釋TSV為配列
	txt=txt.replace(/\r/g,'');
	let linj=txt.replace(/\n$/,'').split("\n");
	let lon=linj.length;
	for(i=0;i<lon;i++)datumoj[i]=linj[i].split("\t");
	datumLon=datumoj.length;
}
akirTSV();
