//取得數據庫
let datumoj=[];
let akirTSV=()=>{//取得TSV
	let pet=new XMLHttpRequest();
	pet.open('get','../tsv/ip_src.tsv',true);
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
//常數
const q=byId('q');
const montri=byId('montri');
const detalvolvo=byId('detalvolvo');
//單詞捜尋
let src=()=>{
	let kl=q.value;
	if(!kl)return;
	kl=kl.replace(/\u0027/g,'’');//正則化撇號/隔音號
	let opt=byId('srcOpt').selectedIndex;//0 和, 1 羅無點, 2 羅有點, 3 法, 4 俄
	switch(opt){
		case 0:src_q(kl);break;
		case 1:case 2:src_qL(kl,opt-1);break;
		case 3:case 4:src_trad(kl,opt);break;
		default:log('opt maldefina');break;
	}
}
let src_q=(kl='縺')=>{//和文字串から檢索
	//假名（と正則表現）のみのときは讀みで檢索
	let cxiKana=kl.match(/^[!-@\u005b-\u0060\u007b-~ぁ-ゔァ-ー]*$/)?1:0;
	if(cxiKana)kl=kl.replace(/[ぁ-ゔ]/g,function(kong){return String.fromCharCode(kong.codePointAt(0)+0x60)});//平假名を片假名に
	kl=hankaku(kl);
	let lon=datumoj.length;
	let lin=[],kongruo=[],parto=[],klDouon=[],fojno='',klReg=new RegExp(kl);
	for(let i=0;i<lon;i++){//本檢索
		lin=datumoj[i];
		fojno=cxiKana?lin[2]:hankaku(lin[1]);
		if(fojno==kl){
			kongruo.push(lin);
			if(!cxiKana)klDouon.push(lin[2]);
		}else if(kl.length>1||kl.match(/[^ァ-ー]/)){//假名1字は部分一致させず
			if(fojno.match(klReg))parto.push(lin);
		}
	}
	let lonj=klDouon.length,douon=[];
	if(!cxiKana)for(let i=0;i<lon;i++){//同音異義語檢索
		lin=datumoj[i];
		if(hankaku(lin[1])==kl)continue;
		fojno=lin[2];
		for(let j=0;j<lonj;j++){
			if(fojno==klDouon[j]){douon.push(lin);break;}
		}		
	}
	//HTMLの書出し
	let html='';
	if(kongruo.length){
		html+=`<p>${kongruo.length}${i18n[0][lingvo]}</p>`;
		html+=tabHTML(kongruo);
	}
	if(douon.length){
		html+=`<p>${douon.length}${i18n[1][lingvo]}</p>`;
		html+=tabHTML(douon);
	}
	if(parto.length){
		if(lingvo=='zh')html+=`<p>包括 ${kl} 的 ${parto.length} 個結果：</p>`;
		else html+=`<p>${parto.length} ${i18n[2][lingvo]} ${kl}</p>`;
		html+=tabHTML(parto);
	}
	if(!html)html=i18n[3][lingvo];
	montri.innerHTML=html;
}//src_q
let src_qL=(kl='縺',opt=1)=>{//羅馬字字串から檢索 opt: 0 無圏點, 1 有圏點
	if(!opt)kl=maldiakritiki(kl);
	let lon=datumoj.length,lin=[],kongruo=[],parto=[],klReg=new RegExp(kl);
	for(i=0;i<lon;i++){//本檢索
		lin=datumoj[i];
		fojno=lin[4];
		if(!opt)fojno=maldiakritiki(fojno);
		if(fojno==kl)kongruo.push(lin);
		else if(fojno.match(klReg))parto.push(lin);
	}
	//HTMLの書出し
	let html='';
	if(kongruo.length){
		html+=`<p>${kongruo.length}${i18n[0][lingvo]}</p>`;
		html+=tabHTML(kongruo);
	}
	if(parto.length){
		if(lingvo=='zh')html+=`<p>包括 ${kl} 的 ${parto.length} 個結果：</p>`;
		else html+=`<p>${parto.length} ${i18n[2][lingvo]} ${kl}</p>`;
		html+=tabHTML(parto);
	}
	if(!html)html=i18n[3][lingvo];
	montri.innerHTML=html;
}//src_qL
let maldiakritiki=(str='')=>{//文字列から圏點を除去
	str=str.replace(/[ \-\u0300-\u030c]/g,'');//空白、ハイフン、合成圏點
	str=str.replace(/[áàâǎä]/g,'a');
	str=str.replace(/[íìîǐï]/g,'i');
	str=str.replace(/[úùûǔü]/g,'u');
	str=str.replace(/[éèêěë]/g,'e');
	str=str.replace(/[óòôǒö]/g,'o');
	str=str.replace(/[ýỳŷ]/g,'y');
	str=str.replace(/ẃ/g,'w');
	str=str.replace(/ç/g,'c');
	str=str.replace(/[şś]/g,'s');
	str=str.replace(/ţ/g,'t');
	str=str.replace(/ń/g,'n');
	str=str.replace(/ḱ/g,'k');
	return str;
}
let tabHTML=(tab=[])=>{//渡された配列から表格HTMLを生成
	if(!Array.isArray(tab))return'';
	let lon=tab.length;
	if(!lon)return'';
	let html='<table class="rkapo remburo nowrap" frame="ends"><tr>';
	html+=`<th>${thj[0][lingvo]}</th>`;//lingvo は全域常數
	html+=`<th>${thj[2][lingvo]}</th>`;
	html+=`<th>${thj[1][lingvo]}</th>`;
	html+=`<th>${thj[3][lingvo]}</th>`;
	if(lingvo=='zh')html+=`<th>${thj[4][lingvo]}</th>`;
	html+=`<th>${thj[5][lingvo]}</th>`;
	switch(lingvo){
		case'fr':html+=`<th>${thj[8][lingvo]}</th>`;break;
		case'ru':html+=`<th>${thj[9][lingvo]}</th>`;break;
		default:html+=`<th>${thj[6][lingvo]}</th><th>${thj[7][lingvo]}</th>`;break;
	}
	for(let i=0;i<lon;i++){
		html+='</tr><tr>';
		lin=tab[i];
		html+=`<td class='ja'>${hankaku(lin[1])}</td>`;
		html+=`<td>${lin[4]}</td>`;
		html+=`<td>${lin[3]}</td>`;
		html+=`<td>${lin[5].charAt(0)}</td>`;
		if(lingvo=='zh')html+=`<td><button class='det' onclick='detalo(${lin[0]})'>${thj[4][lingvo]}</button></td>`
		html+=`<td><a class='wtligo' href='https://en.wiktionary.org/wiki/${lin[1]}#Japanese' target='_blank' rel='noopener noreferrer'>${i18n[4][lingvo]}</a></td>`;
		switch(lingvo){
			case'fr':html+=`<td>${lin[8].replace(/;/g,'&nbsp;;')}</td>`;break;
			case'ru':html+=`<td>${lin[9]}</td>`;break;
			default:html+=`<td class='ja'>${lin[6]}</td><td class='ja'>${lin[7]}</td>`;break;
		}
	}
	html+=`</tr></table>`;
	return html;
}//tabHTML
let src_trad=(kl='縺',opt=3)=>{//譯語檢索
	kl=kl.toLowerCase().replace(/ё/g,'е');//正則化輸入
	let lon=datumoj.length,kong=[],parto=[],partSever=[],fojno=lonj=jxeton='';
	let klReg=new RegExp(kl);
	let klRegSever=new RegExp('(?<![\\wÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŸÆŒàâäçéèêëîïôöùûüÿæœ])'+kl+'(?![\\wàâäçéèêëîïôöùûüÿæœ])');
	for(let i=0;i<lon;i++){//本檢索
		lin=datumoj[i];
		fojno=lin[opt+5].replace(/\(.+\.\) |\d+\. /g,'').toLowerCase().replace(/ё/g,'е').split(/[.;] ?/);//義配列
		lonj=fojno.length;
		for(let j=0;j<lonj;j++){
			jxeton=fojno[j];
			if(kl==jxeton){kong.push(lin);break;}
			else if(jxeton.match(klRegSever)){partSever.push(lin);break;}
			else if(jxeton.match(klReg)){parto.push(lin);break;}
		}
	}
	let html='',traf=kong.length+partSever.length+parto.length;
	if(traf){
		html+=lingvo=='zh'?`共找到 ${traf} 個結果：`:`${traf}${i18n[5][lingvo]}`;
		html+='<table class="rkapo remburo nowrap" frame="ends"><tr>';
		html+=`<th>${thj[0][lingvo]}</th>`;
		html+=`<th>${thj[2][lingvo]}</th>`;
		html+=`<th>${thj[1][lingvo]}</th>`;
		html+=`<th>${thj[3][lingvo]}</th>`;
		if(lingvo=='zh')html+=`<th>${thj[4][lingvo]}</th>`;
		html+=`<th>${thj[5][lingvo]}</th>`;
		html+=`<th>${thj[opt+5][lingvo]}</th>`;
		lon=kong.length;for(i=0;i<lon;i++)html+=aldoniTr(kong[i],opt);
		lon=partSever.length;for(i=0;i<lon;i++)html+=aldoniTr(partSever[i],opt);
		lon=parto.length;for(i=0;i<lon;i++)html+=aldoniTr(parto[i],opt);
		html+='</tr></table>';
	}
	if(!html)html=i18n[3][lingvo];
	montri.innerHTML=html;
}//src_trad
let aldoniTr=(lin=[],opt=3)=>{//opt 3 法 4 俄
	if(lin.length<10)return'';
	let html='</tr><tr>';
	html+=`<td class='ja'>${hankaku(lin[1])}</td>`;
	html+=`<td>${lin[4]}</td>`;
	html+=`<td>${lin[3]}</td>`;
	html+=`<td>${lin[5].charAt(0)}</td>`;
	if(lingvo=='zh')html+=`<td><button class='det' onclick='detalo(${lin[0]})'>${thj[4][lingvo]}</button></td>`
	html+=`<td><a class='wtligo' href='https://en.wiktionary.org/wiki/${lin[1]}#Japanese' target='_blank' rel='noopener noreferrer'>${i18n[4][lingvo]}</a></td>`;
	if(opt==3)html+=`<td>${lin[opt+5].replace(/;/g,'&nbsp;;')}</td>`;
	else html+=`<td>${lin[opt+5]}</td>`;
	return html;
}
const thj=[
	{zh:'詞',		fr:'orthographe',	ru:'написание'},
	{zh:'教羅',		fr:'tokyoïte',		ru:'токийский'},
	{zh:'上方',		fr:'kansaï',		ru:'кансайский'},
	{zh:'難度',		fr:'niveau',		ru:'уровень'},
	{zh:'詳情',		fr:'detail',		ru:'далее'},
	{zh:'詞典',		fr:'Wiktionaire',	ru:'Викисловарь'},
	{zh:'大分類',	fr:'catégorie',		ru:'часть речи'},
	{zh:'小分類',	fr:'sous-catégorie',ru:'подчасть речи'},
	{zh:'翻譯',		fr:'français',		ru:'французский'},
	{zh:'翻譯',		fr:'russe',			ru:'русский'}
];
const i18n=[
	{zh:'個匹配：',	fr:' correspondence(s) exacte(s) :',		ru:' слов(а/о) в совподении:'},
	{zh:'個同音詞：',fr:' homophone(s) :',	ru:' омоним(а/ов):'},
	{zh:'包括',		fr:'mot(s) contenant',	ru:'слов(а/о), включающий/ее '},
	{zh:'無搜索結果。',fr:'Aucun résultat.',	ru:'Соответствующего слова нет.'},
	{zh:'維基詞典',		fr:'Wiktionaire',		ru:'Викисловарь'},
	{zh:'個匹配：',		fr:' mot(s) est/ont été trouvé(s).',		ru:' слов(а/о) найден(о):'}
];
//詳細解析
let detalo=(id='')=>{//詳細を表示する
	let lon=datumoj.length;
	for(i=0;i<lon;i++){if(datumoj[i][0]==id){//見附かった時のみ處理を開始
		let lin=datumoj[i];
		let kyouro=lin[3],kami=lin[4],hinsi=lin[6];
		let html=`<h2 class='ja grande'>${hankaku(lin[1])}</h2>`
		html+=`<table><caption>【詞類】</caption>`;
		html+=`<tr><th>難度</th><td>${lin[5]}</td></tr>`;
		html+=`<tr><th>大分類</th><td class='ja'>${hinsi}</td></tr>`;
		html+=`<tr><th>小分類</th><td class='ja'>${lin[7]}</td></tr></table>`;
		html+=`<table><caption>【上方語】</caption>`;
		html+=`<tr><th>上方語羅馬字</th><td>${kami}</td></tr>`;
		if(kami=='íw-, yúw-')kami='yúw';
		kami=aete(kami);
		let moraNo=lin[2].replace(/[ァィゥェォャュョヮ]/g,'').length;
		let ton=kami_ton(kami,hinsi,moraNo);
		html+=`<tr><th>曲線聲調</th><td>${ton}</td></tr>`;
		let HL=kami_ton_HL(ton);
		html+=`<tr><th>雙層符號</th><td>${HL}</td></tr>`;
		let kakko=kami_kakko(kami,hinsi,moraNo);
		html+=`<tr><th>方括弧符號</th><td>${kakko}</td></tr></table>`;
		html+=`<table><caption>【共通語】</caption>`;
		html+=`<tr><th>教育羅馬字</th><td>${kyouro}</td></tr>`;
		kyouro=kinou(kyouro);
		ton=kyouro_ton(kyouro,hinsi);
		html+=`<tr><th>曲線聲調</th><td>${ton}</td></tr>`;
		HL=kyouro_ton_HL(ton);
		html+=`<tr><th>雙層符號</th><td>${HL}</td></tr>`;
		kakko=kyouro_kakko(kyouro,hinsi);
		html+=`<tr><th>方括弧符號</th><td>${kakko}</td></tr></table>`;
		html+=`<table><caption>【翻譯】</caption>`;
		let fra=lin[8].replace(/;/g,'&nbsp;;');
		html+=`<tr><th>FRA</th><td>${fra}</td></tr>`;
		html+=`<tr><th>RUS</th><td>${lin[9]}</td></tr></table>`;
		byId('detalo').innerHTML=html;
		detalvolvo.style.display='block';
		break;
	}}
}//detalo
let aete=(str='')=>{//ハーチェクの處理
	if(str.match(/[ǎǐǔěǒ]/)){
		str=str.replace(/[aiueo]/,function(kong){switch(kong){//第二音節に核
			case'a':return'á';case'i':return'í';case'u':return'ú';
			case'e':return'é';case'o':return'ó';
		}});
		str=str.replace(/ǎ/,'à').replace(/ǐ/,'ì').replace(/ǔ/,'ù').replace(/ě/,'è').replace(/ǒ/,'ò');
	}
	return str;
}
let kami_ton=(str='',hinsi='',moraNo=4)=>{//上羅から聲調を輸出
	if(str.match(/^-/))return'';//接尾辭は除外
	let vj=str.split(', ');
	let lon=vj.length,lonj=0;APj=[];
	for(let i=0;i<lon;i++){
		APj=vj[i].split(' ');
		lonj=APj.length;
		for(let j=0;j<lonj;j++){
			let vort=APj[j];
			if(vort.match(/[iíìeéè]-$/))vort+='ru';
			else if(vort.match(/[śsz]-$/))vort+='uru';
			else if(vort.match(/[oò]-$/))vort=vort.replace(/ò-$/,'ùru').replace(/o-$/,'uru');
			APj[j]=kami_AP_ton(kami_silaboj(vort),hinsi,moraNo);
		}
		vj[i]=APj.join(' ');
	}
	str=vj.join(', ');
	return str;
}
let kami_AP_ton=(vico=[],hinsi='',moraNo=4)=>{//APの抑揚判定 輸入は音拍陣列
	if(!vico.length)return'';
	let siki=vico[0].match(/[àìùèòỳ\u0300]/)?0:1;//式判定: 1 高起, 0 低起
	//核を探す
	let kaku=lon=vico.length;
	if(vico[0].match(/[âîûêôŷ\u0302]/))kaku=1;//一拍目に核
	else if(vico.length==2 && vico[1].match(/[âîûêô]/))siki=2;//猿聟類
	else for(let i=1;i<lon;i++)//二拍目から檢索
		if(vico[i].match(/[áíúéóýẃńḱś\u0301]/))kaku=i+1;
	let res='';
	switch(siki){
		case 1:res='高'.repeat(kaku)+'降'.repeat(lon-kaku);break;
		case 0:res='昇'.repeat(kaku)+'降'.repeat(lon-kaku);
			 res=res.replace(/昇降/,'高降');break;
		case 2:res='昇降ˑ (昇高降)';break;
		default:break;
	}
	//猿聟類以外の二三拍名詞に助詞を追加
	if(hinsi=='名詞' && moraNo==2)res=res.replace(/([昇高降])$/,'$1($1)');
	else if(hinsi=='名詞' && moraNo==3)res=res.replace(/([昇高降])$/,'$1($1)');
	return res;
}
let kami_ton_HL=(str='')=>{
	str=str.replace(/昇昇昇\(昇\)/g,'LLH (LLLH)');//二拍低起無核
	str=str.replace(/昇昇\(昇\)/g,'LH (LLH)');//三拍低起無核
	str=str.replace(/高/g,'H');
	str=str.replace(/昇$|昇(?=[ ,)])/g,'H');
	str=str.replace(/降ˑ/g,'F');
	str=str.replace(/[昇降]/g,'L');
	return str;
}
let kami_kakko=(str='',hinsi='',moraNo=4)=>{
	if(str.match(/^-/))return'';//接尾辭は除外
	let vj=str.split(', ');//異形ごとに分割
	let lon=vj.length,APj=[],lonj=lonk=cxiN=0,silabj=[],vort=sstr=m=ant='';
	for(let i=0;i<lon;i++){
		APj=vj[i].split(' ');//APごとに分割
		lonj=APj.length;
		for(let j=0;j<lonj;j++){
			vort=APj[j].replace(/([iíìeéè])-$/,'$1ru');//動詞を終止形に
			vort=vort.replace(/^ś-$/,'súru').replace(/-s-$/,'suru');
			vort=vort.replace(/^kò-$/,'kùru').replace(/-ko-$/,'kuru');
			vort=vort.replace(/[uúù]w-$/,'uw');
			vort=vort.replace(/w-$/,'u');
			vort=vort.replace(/-$/,'u');
			vort=vort.replace(/şiw$/,'şuw');//ウ音便
			morae=kami_silaboj(vort);//拍ごとに分割
			lonk=morae.length;
			for(let k=0;k<lonk;k++){
				m=morae[k];cxiN=0;
				ant=k?morae[k-1]:'';
				sek=k+1==lonk?'':morae[k+1];
				if(!k){
					sstr=m.match(/[àìùèòỳ\u0300]/)?']':'[';//語頭の式判定
					if(m.match(/[âîûêôŷ\u0302]/))cxiN=1;//語頭核
				}else if(m.match(/[áâíîúûéêóôýŷẃńśḱ\u0301]/))cxiN=1;//語中核
				if(k && sstr.match(/^\]/) && cxiN)sstr+='[';
				sstr+=silab_kana(m,1,ant,sek);
				if(cxiN)sstr+=']';
			}
			//三拍以下の名詞に助詞を添加
			if(hinsi.match(/名詞/) && moraNo<4)sstr=kami_kakko_n(sstr,moraNo);
			else sstr=sstr.replace(/^\]([^\[\]]+)(.)$/,']$1[$2');//其他の低起無核語
			APj[j]=sstr;
		}
		vj[i]=APj.join(' ');
	}
	let res=vj.join(', ');
	return res;
}//kami_kakko
let kami_kakko_n=(str='',moraNo=2)=>{
	if(!str)return'';
	if(moraNo==1){
		str=str.replace(/^\[(.+)ー$/,	'[$1ー ([$1ニ)');//H0
		str=str.replace(/^\[([^ ]+)$/,	'[$1(ニ)');//H0 不伸型
		str=str.replace(/^\[(.+)\]ー$/,	'[$1]ー ([$1]ニ)');//H1
		str=str.replace(/^\](.+)ー$/,	']$1[ー (]$1[ニ)');//L0
	}else if(str.match(/^\].+\]$/))
		str=str.replace(/^\](.+)\]$/,']$1]- (]$1]ニ)');//猿聟類
	else if(str.match(/^\][^\[\]]+$/)){//松笠類、兔類
		str=str.replace(/^\](.+)(.[ァィゥェォャュョヮ])$/,']$1[$2 (]$1$2[ニ)');
		str=str.replace(/^\]([^ ]+)(.)$/,']$1[$2 (]$1$2[ニ)');
	}else str+='(ニ)';
	return str;
}
let silab_kana=(str='',opt=1,ant='',sek='')=>{//拍→假名 opt 1 上方 0 教羅
	str=str.replace(/[\u0300-\u0302]/g,'');
	str=str.replace(/[áàâä]/g,	'a');
	str=str.replace(/[íìîïı]/g,	'i');
	str=str.replace(/[úùûü]/g,	'u');
	str=str.replace(/[éèêëė]/g,	'e');
	str=str.replace(/[óòôö]/g,	'o');
	str=str.replace(/[ýỳŷ]/g,	'y');
	str=str.replace(/ẃ/g,	'w');
	str=str.replace(/([aeoyw])’$/,'$1');//母音間分離符のみ削除
	switch(str){
		case'a':return ant.match(/[aáàâ]$/)?'ー':'ア';
		case'y':return ant.match(/[iíìî]$/)?'ー':'イ';
		case'w':return ant.match(/[uúùû]$/)?'ー':'ウ';
		case'e':return ant.match(/[eéèê]$/)?'ー':'エ';
		case'o':return ant.match(/[oóòô]$/)?'ー':'オ';
		case'i':return opt?'イ':ant.match(/[ıïeë]$/)?'ー':'イ';
		case'u':return opt?'ウ':ant.match(/[uüoö]$/)?'ー':'ウ';
		case'ka':return'カ';
		case'ki':case'ky':return'キ';
		case'ku':case'k’':case'ḱ’':return'ク';
		case'k':case'ḱ':return sek.match(/^k/)?'ッ':'ク';
		case'ke':return'ケ';
		case'ko':return'コ';
		case'sa':return'サ';
		case'şi':case'si':case'ş’':return'シ';
		case'su':case's’':case'ś’':return'ス';
		case'ş':return sek.match(/^ş/)?'ッ':'シ';
		case's':case'ś':return sek.match(/^s/)?'ッ':'ス';
		case'se':return'セ';
		case'so':return'ソ';
		case'ta':return'タ';
		case'çi':case'ç’':return'チ';
		case'ţu':return'ツ';
		case'ç':return sek.match(/^ç/)?'ッ':'チ';
		case'ţ':return sek.match(/^ţ/)?'ッ':'ツ';
		case'te':return'テ';
		case'to':return'ト';
		case'na':return'ナ';
		case'ni':return'ニ';
		case'nu':return'ヌ';
		case'ne':return'ネ';
		case'no':return'ノ';
		case'ha':return'ハ';
		case'hi':case'hy':return'ヒ';
		case'hu':return'フ';
		case'h':return sek.match(/^h/)?'ッ':'フ';
		case'he':return'ヘ';
		case'ho':return'ホ';
		case'ma':return'マ';
		case'mi':return'ミ';
		case'mu':return'ム';
		case'me':return'メ';
		case'mo':return'モ';
		case'ya':return'ヤ';
		case'yu':return'ユ';
		case'ye':return'イェ';
		case'yo':return'ヨ';
		case'ra':return'ラ';
		case'ri':return'リ';
		case'ru':return'ル';
		case're':return'レ';
		case'ro':return'ロ';
		case'wa':return'ワ';
		case'wi':return'ウィ';
		case'we':return'ウェ';
		case'wo':case'who':return'ウォ';
		case'ga':return'ガ';
		case'gi':return'ギ';
		case'gu':return'グ';
		case'ge':return'ゲ';
		case'go':return'ゴ';
		case'za':return'ザ';
		case'ji':case'zi':return'ジ';
		case'zu':return'ズ';
		case'ze':return'ゼ';
		case'zo':return'ゾ';
		case'da':return'ダ';
		case'de':return'デ';
		case'do':return'ド';
		case'ba':return'バ';
		case'bi':return'ビ';
		case'bu':return'ブ';
		case'be':return'ベ';
		case'bo':return'ボ';
		case'pa':return'パ';
		case'pi':case'py':return'ピ';
		case'pu':return'プ';
		case'p':return sek.match(/^p/)?'ッ':'プ';
		case'pe':return'ペ';
		case'po':return'ポ';
		case'kya':return'キャ';
		case'kyu':return'キュ';
		case'kye':return'キェ';
		case'kyo':return'キョ';
		case'şa':case'sya':return'シャ';
		case'şu':case'şw':case'syu':return'シュ';
		case'şe':case'sye':return'シェ';
		case'şo':case'syo':return'ショ';
		case'ça':case'tya':return'チャ';
		case'çu':case'çw':return'チュ';
		case'çe':case'tye':return'チェ';
		case'ço':case'tyo':return'チョ';
		case'nya':return'ニャ';
		case'nyu':return'ニュ';
		case'nye':return'ニェ';
		case'nyo':return'ニョ';
		case'hya':return'ヒャ';
		case'hyu':return'ヒュ';
		case'hye':return'ヒェ';
		case'hyo':return'ヒョ';
		case'mya':return'ミャ';
		case'myu':return'ミュ';
		case'mye':return'ミェ';
		case'myo':return'ミョ';
		case'rya':return'リャ';
		case'ryu':return'リュ';
		case'rye':return'リェ';
		case'ryo':return'リョ';
		case'gya':return'ギャ';
		case'gyu':return'ギュ';
		case'gye':return'ギェ';
		case'gyo':return'ギョ';
		case'ja':case'zya':case'dya':return'ジャ';
		case'ju':case'zyu':return'ジュ';
		case'je':case'zye':case'dye':return'ジェ';
		case'jo':case'zyo':case'dyo':return'ジョ';
		case'bya':return'ビャ';
		case'byu':return'ビュ';
		case'bye':return'ビェ';
		case'byo':return'ビョ';
		case'pya':return'ピャ';
		case'pyu':return'ピュ';
		case'pye':return'ピェ';
		case'pyo':return'ピョ';
		case'ti':case'ty':return opt?'ティ':'チ';
		case'di':return opt?'ディ':'ジ';
		case'tyu':return opt?'テュ':'チュ';
		case'dyu':return opt?'デュ':'ジュ';
		case'tu':return opt?'トゥ':'ツ';
		case'du':return opt?'ドゥ':'ズ';
		case'thi':return 'ティ';
		case'dhi':return 'ディ';
		case'thu':return 'テュ';
		case'dhu':return 'デュ';
		case'twu':return 'トゥ';
		case'dwu':return 'ドゥ';
		case'ţa':case'tsa':return'ツァ';
		case'ţi':case'tsi':return'ツィ';
		case'ţe':case'tse':return'ツェ';
		case'ţo':case'tso':return'ツォ';
		case'fa':return'ファ';
		case'fi':return'フィ';
		case'fe':return'フェ';
		case'fo':return'フォ';
		case'n':case'n’':case'ń':case'ń’':case'nn':return'ン';
		case'—':return'ー';
		default:return'ッ';
	}
}
let kami_silaboj=(str='')=>{//字串を拍の配列に分解
	str=str.replace(/-/g,'');
	let lon=str.length,vico=[],kar=ant=sek='',lasta=0;
	for(let i=0;i<lon;i++){
		kar=str.charAt(i);
		ant=str.charAt(i-1);
		lasta=vico.length;lasta=lasta?lasta-1:0;
		switch(karspec(kar)){//字種により既存拍に追加または新拍として追加
			case'K':case'w':vico.push(kar);break;
			case'V':switch(karspec(ant)){
				case'K':case'y':case'w':vico[lasta]+=kar;break;
				default:vico.push(kar);break;
			}break;
			case'y':switch(karspec(ant)){
				case'K':vico[lasta]+=kar;break;
				default:vico.push(kar);break;
			}break;
			case'diakrito':vico[lasta]+=kar;break;
			default:break;
		}
	}
	return vico;
}
let karspec=(str='')=>{//上方語羅馬字の字類判定
	if(str.match(/^[kḱsśştçţnńhmrgzdjbpfq]/))return'K';
	if(str.match(/^[aáàâiíìîuúùûeéèêoóòô]/))return'V';
	if(str.match(/^[yýỳŷ]/))return'y';
	if(str.match(/^[wẃ]/))return'w';
	if(str.match(/^[’\u0300-\u0302]/))return'diakrito';
	if(str=='')return'';
	return'malregula';
}
let kyouro_ton=(str='',opt='名詞')=>{//教羅から昇平降式を輸出
	if(!str)return'';
	let oopt=str.match(/\(!\)$/)?0:1;//終止形フラグ
	str=str.replace(/[ˌ\-·ʻ]| \(!\)/g,'').replace(/ˈ{2,}/g,'ˈ');
	let vj=str.split(', ');//異形を分割
	let lon=vj.length,lonj=0,jxetonoj=[],sstr='';
	for(i=0;i<lon;i++){
		jxetonoj=vj[i].split(' ');//APごとに分割
		lonj=jxetonoj.length;
		for(j=0;j<lonj;j++){
			sstr=jxetonoj[j];
			if(sstr.match(/[kstmrwgbiė](ˈ?)$|sınˈ$/))jxetonoj[j]=kyouro_AP_ton_v(sstr);
			else if(!oopt)jxetonoj[j]=kyouro_AP_ton(sstr,0);
			else if(opt.match(/イ形容詞/))jxetonoj[j]=kyouro_AP_ton_v(sstr);
			else if(opt.match(/名詞/) && j+1==lonj)jxetonoj[j]=kyouro_AP_ton(sstr);//名詞句の末尾
			else jxetonoj[j]=kyouro_AP_ton(sstr,0);
		}
		vj[i]=jxetonoj.join(' ');//APを再連結
	}
	str=vj.join(', ');//異形を再連結
	return str;
}
let kyouro_AP_ton_v=(str='')=>{//用言の抑揚判定
	let streso=kyouro_streso(str);//Stress位置
	str=str.replace(/[kstnmrwgb](ˈ?)$/,'x$1');//子音幹動詞の音便フラグ
	str=str.replace(/kk|ss|tt|hh|gg|zz|dd|bb|pp|xtu/g,'q');//促音フラグ
	str=str.replace(/nn/g,'N');//撥音フラグ
	str=str.replace(/[kstnhmyrwgzdbpf]/g,'');//子音を削除
	str+='x';//Ta,ku にあたる拍を追加
	let akcent=0;
	while(str.match(/ˈ/)){//アクセント記號の左に在る拍をnDに置換
		akcent=str.indexOf('ˈ');
		str='平'.repeat(akcent+1)+str.slice(akcent+2);
	}
	str=str.replace(/[^平]/g,'降');//殘った拍をDに置換
	if(streso)str=str.replace(/^平平/,'昇平');
	return str;
}
let kyouro_AP_ton=(str='',opt=1)=>{//非用言の抑揚判定 opt 1: 助詞を付ける
	let streso=kyouro_streso(str);//Stress位置
	str=str.replace(/kk|ss|tt|hh|gg|zz|dd|bb|pp|xtu/g,'x');//促音フラグ
	str=str.replace(/nn/g,'N');//撥音フラグ
	str=str.replace(/[kstnhmyrwgzdbpf]/g,'');//子音を削除
	if(str.match(/ˈ$/)){//無核語
		str=str.replace(/ˈ/g,'').replace(/./g,'平');
		if(opt && str.length<4)str+='(平)';
		str=str.replace(/^平\(平\)$/,'昇(平)');
	}else{//有核語
		let akcent=0;
		while(str.match(/ˈ/)){//アクセント記號の左に在る拍をnDに置換
			akcent=str.indexOf('ˈ');
			str='平'.repeat(akcent+1)+str.slice(akcent+2);
		}
		str=str.replace(/[^平]/g,'降');//殘った拍をDに置換
		if(opt && str.length<4)str+='(降)';
	}
	if(streso)str=str.replace(/^平平/,'昇平');
	return str;
}
let kyouro_ton_HL=(str='')=>{
	str=str.replace(/[昇降]/g,'L');
	str=str.replace(/平/g,'H');
	return str;
}
let kyouro_kakko=(str='',hinsi='')=>{
	if(!str)return'';
	let ssk=str.match(/\(!\)$/)?1:0;//終止形フラグ
	str=str.replace(/ \(!\)$/,'');
	let vj=str.split(', ');
	let lon=vj.length,lonj=streso=opt=0,APj=[],AP='';
	for(let i=0;i<lon;i++){//異形ごとに處理
		APj=vj[i].split(' ');
		lonj=APj.length;
		for(let j=0;j<lonj;j++){//APごとに處理
			AP=APj[j];
			opt=hinsi.match(/名詞/)?j+1==lonj?1:0:0;//助詞を付けるか否か
			streso=kyouro_streso(AP);//Stress位置
			if(j+1==lonj && !ssk){
				if(hinsi.match(/イ形容詞/))AP+='ku';
				else if(hinsi.match(/動詞/))AP=kyouro_takei(AP);
			}
			AP=kyouro_kakko_AP_kana(AP);
			AP=kyouro_akcent_kakko(AP,opt,streso);
			APj[j]=AP;
		}
		vj[i]=APj.join(' ');
	}
	return vj.join(', ');
}//kyouro_kakko
let kyouro_akcent_kakko=(AP='',opt=0,streso=1)=>{//括弧表記を導出
	let moraNo=AP.replace(/[ˈァィゥェォャュョヮ]/g,'').length;
	if(opt && moraNo<4)AP+='(ニ)';
	AP=AP.replace(/ˈ\(ニ\)/,'(ニ)]');//無核語の下がり目
	AP=AP.replace(/^ˈ(.[ァィゥェォャュョヮ])/,'[$1]');//頭高（捨假名あり）
	AP=AP.replace(/^ˈ(.)/,'[$1]');//頭高
	AP=AP.replace(/ˈ(.[ァィゥェォャュョヮ])/,'$1]');//中高・尾高（捨假名あり）
	AP=AP.replace(/ˈ(.)/,'$1]');//中高・尾高
	if(streso){//頭下げ
		AP=AP.replace(/^([^ˈ\[\]][ァィゥェォャュョヮ])/,'$1[');
		AP=AP.replace(/^([^ˈ\[\]])(?![ァィゥェォャュョヮ])/,'$1[');
	}else AP=AP.replace(/^([^\[])/,'[$1');//Stress が語頭に在る場合
	AP=AP.replace(/ˈ/,'');
	return AP;
}
let kyouro_kakko_AP_kana=(AP='')=>{//分節音を假名に
	AP=AP.replace(/[ˌ·\-ʻ]/g,'');
	AP=AP.replace(/([aä])(ˈ?)a/g,'$1$2ー');
	AP=AP.replace(/([ıïeë])(ˈ?)ı/g,'$1$2ー');
	AP=AP.replace(/([uüoö])(ˈ?)u/g,'$1$2ー');
	AP=AP.replace(/[kstnhmyrwgzdbpf]?y?[aäıiïuüeėëoö]|nn|xtu|—|[td]h[ıïuü]|[td]wu|who/g,function(kong){return silab_kana(kong,0)});
	AP=AP.replace(/[kstnhmyrwgzdbpf]/g,'ッ');
	return AP;
}
let kyouro_takei=(str='')=>{//動詞語幹をタ形にする
	if(!str)return'';
	str=str.replace(/k(ˈ?)$/,'ı$1ta');
	str=str.replace(/s(ˈ?)$/,'sı$1ta');
	str=str.replace(/[trw](ˈ?)$/,'t$1ta');
	str=str.replace(/[nmb](ˈ?)$/,'nn$1da');
	str=str.replace(/g(ˈ?)$/,'ı$1da');
	str=str.replace(/([iė])(ˈ?)$/,'$1$2ta');
	return str;
}
let kinou=(str='')=>{//昨日類
	str=str.replace(/(?<!n)(ny?[aäıïuüeëoö])ˈ([aıueo])/,'ˈ$1$2');
	str=str.replace(/(?<=nn)(ny?[aäıïuüeëoö])ˈ([aıueo])/,'ˈ$1$2');
	str=str.replace(/([ksthmrwgzdbpf]?y?[aäıïuüeëoö])ˈ([aıueo])/,'ˈ$1$2');
	str=str.replace(/[ʻ·\-]/,'');
	str=str.replace(/ˈ{2,}/,'ˈ');
	return str;
}
let kyouro_streso=(str='')=>{//Stress位置の導出 返値 0: 語頭 1: 二拍目以降
	if(str.match(/^[kstnhmrwgzdbpf]?y?[aıueo]([aıueo—]|nn)/))return 0;
	if(str.match(/^[td][hw][ıu]([ıu—]|nn)/))return 0;
	return 1;
}
let hankaku=(str='')=>{//全角英字を滅ぼす
	str=str.replace(/[a-z]/g,function(kong){
		return String.fromCharCode(kong.charCodeAt(0)-0x20);//小寫を大寫に
	});
	return str.replace(/[Ａ-Ｚａ-ｚ]/g,function(kong){
		return String.fromCharCode(kong.charCodeAt(0)-0xFEE0);
	});
}
//事件
aEL(q,'keydown',(e)=>{if(e.key=='Enter')src();});
aEL(byId('q_src'),'click',src);
aEL(byId('fermi'),'click',()=>{detalvolvo.style.display='none';});
aEL(document.body,'keyup',(e)=>{//捷鍵
	if(e.key=='Escape')detalvolvo.style.display='none';
	if(e.code=='KeyF'){detalvolvo.style.display='none';q.focus();}
})
