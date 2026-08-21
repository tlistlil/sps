//取得數據
let datumoj=[];
let akirTSV=()=>{//取得TSV
	let pet=new XMLHttpRequest();
	pet.open('get','okm_pua.tsv',true);
	pet.send(null);
	pet.onload=function(){TSValList(pet.responseText);}
}
let TSValList=(txt='')=>{//釋TSV為配列
	let linj=txt.replace(/\r?\n$/,'').split(/\r?\n/);
	let lon=linj.length;
	for(i=0;i<lon;i++)datumoj[i]=linj[i].split("\t");
	datumoj.shift();//清除頭行
}
akirTSV();
const zwnj=String.fromCodePoint(0x200c);
//變換
let chkgg_hypua=(str='')=>{
	//插入文字境界識別子
	str=str.replace(/([\u11a8-\u11ff\ud7cb-\ud7fb])/g,'$1'+zwnj);//終
	str=str.replace(/([\u1160-\u11a7\ud780-\ud7c6])(?![\u11a8-\u11ff\ud7cb-\ud7fb])/g,'$1'+zwnj);//中
	//本處理
	let lon=datumoj.length,lonj,kar,kod;
	for(let i=0;i<lon;i++){
		kod=parseInt(datumoj[i][0]+'0',16);
		lonj=datumoj[i].length;
		for(let j=1;j<lonj;j++){
			kar=datumoj[i][j];
			if(!kar){kod++;continue;}
			str=str.replace(new RegExp(kar+zwnj,'g'),String.fromCodePoint(kod));
			kod++;
		}
	}
	return str;
}
let hypua_chkgg=(str='')=>{
	let lon=datumoj.length,lonj,kar,kod;
	for(let i=0;i<lon;i++){
		kod=parseInt(datumoj[i][0]+'0',16);
		lonj=datumoj[i].length;
		for(let j=1;j<lonj;j++){
			kar=datumoj[i][j];
			if(!kar){kod++;continue;}
			str=str.replace(new RegExp(String.fromCodePoint(kod),'g'),kar);
			kod++;
		}
	}
	return str;
}
