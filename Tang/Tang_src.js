//西夏倉頡字碼捜索
const enir=byId('enir');
let datumoj=[];//haystack
function src(){
	//正則化輸入
	let q=enir.value.toLowerCase();
	q=q.replace(/^\u002f|\u002f$/g,'');
	if(!q)return;
	if(byId('opt0').checked)q='^'+q+'$';
	//實行捜索
	let lon=datumoj.length;let kar=HTML=str='';let lin=[];let kont=0;
	let srcOpt=byId('opt1').checked?1:0;
	for(i=0;i<lon;i++){
		lin=datumoj[i];
		str=srcOpt?lin[1]:lin[2];
		if(!str){log(`eraro: linio ${i}`);continue;}
		if(str.match(new RegExp(q))){
			kar=String.fromCodePoint(parseInt('0x'+lin[0]));
			HTML+=`<a href='http://ccamc.org/tangut.php?n4694=${kar}' target='_blank' rel='noopener noreferrer' title='U+${lin[0]}\n全字碼 ${lin[2]}\n輸入碼 ${lin[1]}'>${kar}</a>`;
			kont++;
		}
	}
	//表示結果
	byId('kontMontr').innerHTML=`找到 ${kont} 個字`;
	byId('respondo').innerHTML=HTML;
}
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
aEL(enir,'keydown',function(e){if(e.code=='Enter')src();});
aEL(byId('srcbtn'),'click',src);
aEL(document.body,'keyup',function(e){if(e.code=='KeyF'){//返回熱鍵
	enir.focus();
	enir.setSelectionRange(0,enir.value.length);
}});
akirTSV();
