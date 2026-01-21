const enir=ById('enir');
const kand1=ById('kand1');
const kand2=ById('kand2');
const kand3=ById('kand3');
const kand4=ById('kand4');
const kand5=ById('kand5');
const montr=ById('montr');
let datumoj=[];
let akirTSV=()=>{//取得TSV
	let pet=new XMLHttpRequest();
	pet.open('get','Tang_cangjie.tsv',true);
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
let eniri=(e)=>{switch(e.key){
	case' ':case'　':case'1':montri(kand1);break;
	case'2':montri(kand2);break;
	case'3':montri(kand3);break;
	case'4':montri(kand4);break;
	case'5':montri(kand5);break;
	default:
	let klavo=enir.value;if(klavo){
		klavo=klavo.replace(/\*/g,'.+');
		let lon=datumoj.length;
		let kanj=[];
		for(i=0;i<lon;i++){
			if(datumoj[i][1].match(new RegExp(`^${klavo}$`,'i')))
				kanj.push(String.fromCodePoint(parseInt('0x'+datumoj[i][0])));
		}
		if(kanj.length<5)for(i=0;i<lon;i++){
			if(datumoj[i][1].match(new RegExp(`^${klavo}.`,'i')))
				kanj.push(String.fromCodePoint(parseInt('0x'+datumoj[i][0])));
		}
		kand1.value=kanj[0]?kanj[0]:'';
		kand2.value=kanj[1]?kanj[1]:'';
		kand3.value=kanj[2]?kanj[2]:'';
		kand4.value=kanj[3]?kanj[3]:'';
		kand5.value=kanj[4]?kanj[4]:'';
	}else kand1.value=kand2.value=kand3.value=kand4.value=kand5.value='';
	break;
}}
let montri=(e)=>{
	montr.innerHTML+=e.value;
	enir.value=
	kand1.value=
	kand2.value=
	kand3.value=
	kand4.value=
	kand5.value='';
	enir.focus();
}
let selekti=(e)=>montri(e.target);
aEL(enir,'keyup',eniri);
aEL(kand1,'click',selekti);
aEL(kand2,'click',selekti);
aEL(kand3,'click',selekti);
aEL(kand4,'click',selekti);
aEL(kand5,'click',selekti);
