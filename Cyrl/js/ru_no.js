//控制輸入
const planko=byId('planko');
const plafono=byId('plafono');
let steriligi=(e)=>{e.target.value=e.target.value.replace(/\D/,'');}
aEL(planko,'input',steriligi);
aEL(plafono,'input',steriligi);
//設定
const kazoj=byId('kazoj');
let kazo='им';
aEL(kazoj,'change',()=>{switch(kazoj.selectedIndex){
	case 1:kazo='рд';break;
	case 2:kazo='да';break;
	case 3:kazo='тв';break;
	case 4:kazo='сл';break;
	default:kazo='им';break;
}});
const maxmax=999999999;
let cxiQ=qa_q=1,qa_a='',min=max=1;
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
const res=byId('respondo');
aEL(q_a,'click',()=>{
	if(cxiQ){
		let kaz=kazo=='сл'?['им','рд','да','тв'][Math.floor(Math.random()*4)]:kazo;
		//問題と解答の生成
		let prep=prep_rand(kaz);
		qa_q=Math.floor(Math.E**(min+(Math.random()*(max-min))));
		if(byId('rondigi').checked)qa_q=rondigi(qa_q);
		qa_a=prep+no_ru(qa_q,kaz);
		q_a.innerHTML='解答';
		dem.innerHTML=prep+qa_q.toLocaleString();
		res.innerHTML='';
	}else{
		q_a.innerHTML='出題';
		res.innerHTML=qa_a;
	}
	cxiQ=1-cxiQ;
});
let rondigi=(n=1)=>{
	let lon=n.toString().length;
	return Math.round(n-n%(10**(lon-2)));
}
let prep_rand=(kaz='им')=>{
	let prepj=[];
	switch(kaz){
		case'рд':prepj=['до ','о́коло ','от '];break;
		case'да':prepj=['к '];break;
		case'тв':prepj=['пе́ред '];break;
		default:prepj=[''];break;
	}
	return prepj[Math.floor(Math.random()*prepj.length)];
}
//數字を綴字に變換
let no_ru=(n=1,kaz='им')=>{
	if(n<0||n>maxmax)return'eraro 20';
	if(!Number.isInteger(n))return'eraro 21';
	let malmil=n%1000000;
	let mil=(n-malmil)/1000000;
	let str=no_ru_do1e3(mil,kaz,1);
	let cxi1=0;if(mil%10==1&&mil%100!=11)cxi1=1;
	if(mil)switch(kaz){
		case'рд':str+=cxi1?' миллио́на' :' миллио́нов'; break;
		case'да':str+=cxi1?' миллио́ну' :' миллио́нам'; break;
		case'тв':str+=cxi1?' миллио́ном':' миллио́нами';break;
		case'пр':str+=cxi1?' миллио́не' :' миллио́нах'; break;
		default:
			if(cxi1)str+=' миллио́н';
			else if(mil%10==2&&mil%100!=12)str+=' миллио́на';
			else if(mil%10==3&&mil%100!=13)str+=' миллио́на';
			else if(mil%10==4&&mil%100!=14)str+=' миллио́на';
			else str+=' миллио́нов';break;
	}
	str+=' '+no_ru_do1e6(malmil,kaz);
	str=str.replace(/ {2,}/,' ');//空白の正規化
	str=str.replace(/^ | $/,'');
	return str;
}
let no_ru_do1e6=(n=1,kaz='им')=>{
	if(n<0||n>999999)return'eraro 10';
	if(!Number.isInteger(n))return'eraro 11';
	let malmil=n%1000;
	let mil=(n-malmil)/1000;
	let str=no_ru_do1e3(mil,kaz,1);
	let cxi1=0;if(mil%10==1&&mil%100!=11)cxi1=1;
	if(mil)switch(kaz){
		case'рд':str+=cxi1?' ты́сячи' :' ты́сяч'   ;break;
		case'да':str+=cxi1?' ты́сяче' :' ты́сячам' ;break;
		case'тв':str+=cxi1?' ты́сячей':' ты́сячами';break;
		case'пр':str+=cxi1?' ты́сяче' :' ты́сячах' ;break;
		default:
			if(mil%10==1&&mil%100!=11)str+=' ты́сяча';
			else if(mil%10==2&&mil%100!=12)str=no_ru_do1e3(mil-2)+' две ты́сячи';
			else if(mil%10==3&&mil%100!=13)str+=' ты́сячи';
			else if(mil%10==4&&mil%100!=14)str+=' ты́сячи';
			else str+=' ты́сяч';break;
	}
	str+=' '+no_ru_do1e3(malmil,kaz);
	str=str.replace(/ {2,}/,' ');//空白の正規化
	str=str.replace(/^ | $/,'');
	return str;
}
let no_ru_do1e3=(n=1,kaz='им',opt=0)=>{//opt 1: 位數の前
	if(n<0||n>999)return'eraro 0';
	if(!Number.isInteger(n))return'eraro 1';
	if(opt&&n==1)return'';//тысяч, миллион の前の1不要時の返値
	let malcent=n%100;
	let cent=(n-malcent)/100;//百の位
	let unu=malcent>20?malcent%10:malcent;//一の位および20まで
	let dek=(malcent-unu)/10;//十の位(30以上)
	let str='';
	switch(kaz){
		case'рд':str=do1000_de[cent]+' '+do100_de[dek]+' '+do20_de[unu];break;
		case'да':str=do1000_al[cent]+' '+do100_al[dek]+' '+do20_al[unu];break;
		case'тв':str=do1000_kn[cent]+' '+do100_kn[dek]+' '+do20_kn[unu];break;
		case'пр':str=do1000_en[cent]+' '+do100_en[dek]+' '+do20_en[unu];break;
		default: str=do1000[cent]+' '+do100[dek]+' '+do20[unu];break;
	}
	str=str.replace(/ {2,}/,' ');//空白の正規化
	str=str.replace(/^ | $/,'');
	return str;
}//no_ru_do1e3
let do20=['','оди́н','два','три','четы́ре','пять','шесть','семь','во́семь','де́вять','де́сять','оди́ннадцать','двена́дцать','трина́дцать','четы́рнадцать','пятна́дцать','шестна́дцать','семна́дцать','восемна́дцать','девятна́дцать','два́дцать'];
let do20_de=['','одного́','двух','трёх','четырёх','пяти́','шести́','семи́','восьми́','девяти́','десяти́','оди́ннадцати','двена́дцати','трина́дцати','четы́рнадцати','пятна́дцати','шестна́дцати','семна́дцати','восемна́дцати','девятна́дцати','двацати́'];
let do20_al=structuredClone(do20_de);
do20_al[1]='одному́';
do20_al[2]='двум';
do20_al[3]='трём';
do20_al[4]='четырём';
let do20_kn=['','одни́м','двумя́','тремя́','четырьмя́','пятью́','шестью́','семью́','восьмью́','девятью́','десятью́','оди́ннадцатью','двена́дцатью','трина́дцатью','четы́рнадцатью','пятна́дцатью','шестна́дцатью','семна́дцатью','восемна́дцатью','девятна́дцатью','двацатью́'];
let do20_en=structuredClone(do20_de);do20_en[1]='одно́м';
let do100=['','','два́дцать','три́дцать','со́рок','пятьдеся́т','шестьдеся́т','се́мьдесят','во́семьдесят','девяно́ста'];
let do100_de=['','','двадцати́','тридцати́','сорока́','пяти́десяти','шести́десяти','семи́десяти','восьми́десяти','девяно́ста'];
let do100_al=do100_de;
let do100_kn=['','','двадцатью́','тридцатью́','сорока́','пятью́десятью','шестью́десятью','семью́десятью','восьмью́десятью','девяно́ста'];
let do100_en=do100_de;
let do1000=['','сто','две́сти','три́ста','четы́реста','пятьсо́т','шестьсо́т','семьсо́т','восемьсо́т','девятьсо́т'];
let do1000_de=['','ста','двухсо́т','трёхсо́т','четырёхсо́т','пятисо́т','шестисо́т','семисо́т','восьмисо́т','девятисо́т'];
let do1000_al=['','ста','двумста́м','трёмста́м','четырёмста́м','пятиста́м','шестиста́м','семиста́м','восьмиста́м','девятиста́м'];
let do1000_kn=['','ста','двумяста́ми','тремяста́ми','четырьмяста́ми','пятьюста́ми','шестьюста́ми','семьюста́ми','восьмьюста́ми','девятьюста́ми'];
let do1000_en=['','ста','двухста́х','трёхста́х','четырёхста́х','пятиста́х','шестиста́х','семиста́х','восьмиста́х','девятиста́х'];
