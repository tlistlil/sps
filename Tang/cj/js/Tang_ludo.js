let datumoj=[];
let akirTSV=()=>{//取得TSV
	let pet=new XMLHttpRequest();
	pet.open('get','./tsv/Tang-cangjie.tsv',true);
	pet.send(null);
	pet.onload=function(){TSValList(pet.responseText);}
}
let TSValList=(txt='')=>{//釋TSV為配列
	let linj=txt.replace(/\n$/,'').split("\n");
	let lon=linj.length;
	for(i=0;i<lon;i++)datumoj[i]=linj[i].split("\t");
	datumoj.shift();//清除頭行
}
akirTSV();
let Tang_rand=()=>{//出題する字をランダムに選擇 返値: [西夏文字,輸入碼]
	let id=Math.floor(Math.random()*datumoj.length);
	let lin=datumoj[id];
	let kar=[];
	kar[0]=String.fromCodePoint(parseInt('0x'+lin[0]));
	kar[1]=lin[1].toUpperCase();
	return kar;
}
let ludo=1;//コースの選擇
let cxiQ=0;//採點/出題フラグ
let qNo=1;//問題番號をカウント
let respondis=0;//解答數をカウント
let poentaro=0;//得點をカウント
let q=[];//問題を格納
let eraritaj=[];//間違へた問題を格納
//ID de sekcioj
const kapo=document.getElementsByTagName('header')[0];
const sup_sek	=byId('supro');
const ord_pre	=byId('ordinalo_pre');
const tat_pre	=byId('tempatako_pre');
const ord_sek	=byId('ordinalo');
const tat_sek	=byId('tempatako');
const rezulto	=byId('rezulto');
let sekViva=sup_sek;
//表示部分ID
const ord_enir	=byId('ord_enir');
const ord_qNo	=byId('ord_qNo');
const ord_poent	=byId('ord_poentaro');
const ord_enter	=byId('ord_enter');
const ord_q		=byId('ord_q');
const ord_a		=byId('ord_a');
const tat_tempo	=byId('tat_tempo');
const tat_enir	=byId('tat_enir');
const tat_qNo	=byId('tat_qNo');
const tat_poent	=byId('tat_poentaro');
const tat_enter	=byId('tat_enter');
const tat_q		=byId('tat_q');
const tat_a		=byId('tat_a');
const fina_poentaro=byId('fina_poentaro');
const eraris	=byId('eraris');
//コース選擇
let ekrani=(e,opt=1)=>e.style.display=opt?'block':'none';
let ekranSxalti=(nov)=>{//畫面切替
	ekrani(sekViva,0);
	ekrani(nov);
	ekrani(kapo,nov==sup_sek);//開始畫面のみh1を表示
	sekViva=nov;
}
aEL(byId('kurso1'),'click',function(){ekranSxalti(ord_pre);});
aEL(byId('kurso2'),'click',function(){ekranSxalti(tat_pre);});
aEL(byId('opt1_0'),'click',function(){ekranSxalti(sup_sek);});
aEL(byId('opt2_0'),'click',function(){ekranSxalti(sup_sek);});
aEL(byId('reiriAlSupro'),'click',function(){ekranSxalti(sup_sek);});
//普通コース部門
let ord=10;//普通コースの出題数
let ord_kom=(e)=>{ord_init(e.target.attributes.value.value);ludo=1;}
let ord_init=(opt=10)=>{//普通コースのゲーム開始
	ord=opt;
	qNo=1;respondis=poentaro=0;
	ord_novDemando();
	ord_poent.innerHTML='0/0';
	cxiQ=1;
	eraritaj=[];
	ekranSxalti(ord_sek);
	ord_enir.focus();
}
aEL(byId('opt1_10'),'click',ord_kom);
aEL(byId('opt1_20'),'click',ord_kom);
aEL(byId('opt1_30'),'click',ord_kom);
let ord_cxeki=(provo='')=>{
	provo=provo.toUpperCase();
	if(cxiQ){//採點
		respondis++;
		let cxiGxusta=provo==q[0]?1:provo==q[1]?1:0;
		if(cxiGxusta){
			ord_a.innerHTML='正解！';poentaro++;
		}else{
			ord_a.innerHTML=`不正解：正解は${q[1]}`;
			eraritaj.push([q[0],q[1],provo]);
		}
		ord_poent.innerHTML=`${poentaro}/${respondis}`;//得點欄を更新
		ord_enter.innerHTML=qNo==ord?'終了':'次の問題へ';
	}else if(qNo<ord){//出題
		qNo++;
		ord_novDemando();
	}else ord_fini();//終了
	cxiQ=1-cxiQ;
}
let ord_novDemando=()=>{
	ord_qNo.innerHTML=`${qNo}/${ord}`;
	q=Tang_rand();
	ord_q.innerHTML=q[0];
	ord_a.innerHTML='&nbsp;';
	ord_enir.value='';
	ord_enter.innerHTML='答え合わせ';
}
aEL(ord_enir,'keydown',function(e){if(e.code=='Enter')ord_cxeki(e.target.value);});
let ord_fini=()=>{
	let percento=Math.floor(100*poentaro/ord);
	fina_poentaro.innerHTML=`${poentaro}/${ord} (${percento}%)`;
	erarisMontri();
	ekranSxalti(rezulto);
}
//タイムアタック部門
let tat=resto=120;//制限時間、殘り時間（秒）
let tatid=0;//setInterval ID
let tat_ekprob=1;//同じ問題に複數囘答へてゐるかどうか
let tat_kom=(e)=>{tat_init(e.target.attributes.value.value);ludo=0;}
let tat_init=(opt=120)=>{//タイムアタックのゲーム開始
	tat_tempo.innerHTML=`${opt/60}:00`;
	tat=resto=opt;
	tatid=setInterval(function(){//タイマー開始
		resto--;restos=resto%60;restom=(resto-restos)/60;
		if(restos<10)restos='0'+restos;
		tat_tempo.innerHTML=`${restom}:${restos}`;
		if(!resto)tat_fini();
	},1000);
	qNo=1;respondis=poentaro=0;
	tat_novDemando();
	tat_poent.innerHTML=0;
	eraritaj=[];
	ekranSxalti(tat_sek);
	tat_enir.focus();
}
let tat_novDemando=()=>{//出題
	tat_qNo.innerHTML=`${qNo}`;
	tat_enir.value='';
	tat_a.innerHTML='&nbsp;';
	tat_enter.innerHTML='答え合わせ';
	q=Tang_rand();
	tat_q.innerHTML=q[0];
	cxiQ=1;tat_ekprob=1;
}
aEL(byId('opt2_2'),'click',tat_kom);
aEL(byId('opt2_5'),'click',tat_kom);
aEL(byId('opt2_10'),'click',tat_kom);
let tat_cxeki=(provo='')=>{
	if(cxiQ){//採點
		provo=provo.toUpperCase();
		let cxiGxusta=provo==q[0]?1:provo==q[1]?1:0;
		if(cxiGxusta){//正解、次の問題へ
			tat_a.innerHTML='正解！';poentaro++;
			cxiQ=0;
			tat_poent.innerHTML=poentaro;//得點欄を更新
			tat_enter.innerHTML='次の問題へ';
		}else{
			tat_a.innerHTML='不正解';
			tat_enter.innerHTML='再度答え合わせ';
			if(tat_ekprob){eraritaj.push([q[0],q[1],provo]);tat_ekprob=0;}
		}
	}else{//出題
		qNo++;
		tat_novDemando();
	}
}
aEL(tat_enir,'keydown',function(e){if(e.code=='Enter')tat_cxeki(e.target.value);});
aEL(byId('salti'),'click',function(){//パス
	if(tat_ekprob)eraritaj.push([q[0],q[1],'']);
	qNo++;
	tat_novDemando();
	poentaro--;
	tat_poent.innerHTML=poentaro;
});
let tat_fini=()=>{
	clearInterval(tatid);
	let avr=Math.floor(poentaro*600/tat)/10;
	if(Number.isInteger(avr))avr+='.0';
	fina_poentaro.innerHTML=`${poentaro} (${avr}字/分)`;
	erarisMontri();
	ekranSxalti(rezulto);
}
let erarisMontri=()=>{//誤答の表示
	let lon=eraritaj.length;
	let erHTML=ludo?
		lon?'間違えた問題':'全問正解しました！':
		lon?'間違えた／飛ばした問題：':poentaro?'全問一発で正解しました！':'';
	if(lon)for(i=0;i<lon;i++){
		let eraro=eraritaj[i][2];
		eraro=eraro.replace(/([\u{17000}-\u{18D7F}]+)/u,"<span class='Tang'>$1</span>");
		eraro=eraro?'誤答 '+eraro:'パス';
		erHTML+=`<br><span class='Tang'>${eraritaj[i][0]}</span> ${eraritaj[i][1]}（${eraro}）`;
	}
	eraris.innerHTML=erHTML;
}
//同じゲームをもう一度
aEL(byId('reludi'),'click',function(){if(ludo)ord_init(ord);else tat_init(tat);});
