/*
まるやるま君：現代（新）・正（旧）仮名遣い相互変換スクリプト
js 外部スクリプトを使える Win版 IE4/NN4 以上（Netscape 6 PR3含む）で動作確認
個人使用に限り自由改変可 by Ojisam e-mail:<ojisam@hotmail.com>
source: http://www.br4.fiberbit.net/ojisam/tate/komono/Maruyaruma.html

SPS version 4.2
*/
//統一變換器接口
let kv_dkstr=(str)=>{
	str=Maruya(str,0);
	str=str.replace(/[─ー－–—]{2}/g,'――');//水平線に正規化
	str=str.replace(/\\(?!\\)/g,'');//回避
	if(document.getElementById('brOpt').checked)//改行間引き
		str=str.replace(/\n\n/g,'\n').replace(/\n\n/g,'\n');
	if(document.getElementById('malspace').checked){//全形間の半形空白削除
		const zen="[\u3041-\u30ff\u4e00-\u9fff、。]";//假名基とCJK-Aのみ
		str=str.replace(new RegExp(`(?<=${zen}) (?=${zen})`,'g'),'');
	}
	if(document.getElementById('duone').checked)//!():?以外の英數を半形に統一
		str=str.replace(/[\uff02-\uff07\uff0a-９；-＞＠-～]/g,function(s){
			return String.fromCharCode(s.charCodeAt(0)-0xFEE0);});
	if(document.getElementById('malduone').checked){//標點を全形に統一
		str=str.replace(/[!-\u{2f}:-@\u{5b}-\u{60}\u{7b}-~]/gu,function(s){
			return String.fromCharCode(s.charCodeAt(0)+0xFEE0);});	
	}
	return str;
}
let kv_snstr=(str)=>{return Maruya(str,1);}
var CR="\n";
function ruby(str,RB){
 var RB0,RB1;
 if(RB==2){RB0="（";RB1="）"}
 else{RB0="《";RB1="》"}
 var j=pt0=pt1=0;
 var k
 var res='';
 var resR='';
 var chk;
 var bz="あ".length;
 var chr;
 var Ruby="ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただ";
 Ruby+="ちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむ";
 Ruby+="めもゃやゅゆょよらりるれろゎわゐゑをん";
 Ruby+="ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダ";
 Ruby+="チヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミム";
 Ruby+="メモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ";
 Ruby+="ー";
 while(j<str.length){
  chk=1;//initialize
  pt0=str.indexOf(RB0,pt1);
  pt1=str.indexOf(RB1,pt1);
  if(pt0==-1||pt1==-1){res+=str.substring(j,str.length);break;}
  else if(pt0>pt1){
   res+=str.substring(j,pt0);
   j=pt1=pt0;
   chk=0;
  }
  else{
   for(k=pt0+bz;k<pt1+1-bz;k++){
    if(Ruby.indexOf((chr=str.substring(k,k+bz)))==-1){
     res+=str.substring(j,pt0+bz);
     j=pt1=pt0+bz;
     chk=0;
     break;
    }
    else{k+=bz-1}
   }
  if(chk){res+=str.substring(j,pt0);j=pt1+bz;}
  }
//  console.log(j+"|"+pt0+"|"+pt1+"|"+chk+"|"+chr+"|"+res)
 }
 j=pt0=pt1=0;//initialize
 while(j<res.length){
  pt0=res.indexOf("［＃",pt1);
  pt1=res.indexOf("］",pt1+bz);
  if(pt0==-1||pt1==-1){resR+=res.substring(j,res.length);break;}
  else{resR+=res.substring(j,pt0);j=pt1+bz;}
//  console.log(j+"|"+pt0+"|"+pt1+"|"+resR)
 }
 return resR;
}					//【ruby終】
function Maruya(str,opt,HP,RB){
 str='\n'+str;				//【Maruya.0 變數定義】
// str=ex_s(str,"\r\n","","。．-#]");
 if(RB==null){RB=0}
 if(HP==null){HP=0}
 if(str==null||str==''){return str}else{str+=CR}
 if(RB){str=ruby(str,RB)}
 var debug=0;//デバッグ
 var debugT=0;//デバック－時間
 if(debugT){var now0=new Date();now0=now0.getTime();}
 var New=Old=NewM=OldM='';
 if(opt==1){		//【0.3.1】opt==3の時も要るのでは？
 //文語表現
  NewM+="我窓";
  OldM+="吾窗";
 //当字・代用・俗字・異字
  New+="利用唱飛決訳記反張恐集集集集知留溜削先量講\生補補\欲保保向供活停強暖煙薫借害碍笑笑恥称選器漂覆覆覗控";
  Old+="悧傭誦蜚蹶訣徽叛脹兢輯聚蒐緝智溜澑鑿尖倆媾\棲鋪輔慾哺姆嚮饗濶碇鞏煖烟燻藉碍礙哄嗤愧頌撰噐漾蔽蓋覘扣";
  NewM+="義御御丁丁丁丁丁寧倉高高底風長模跡彼確誠連連暗格装畑黄託罰翼";
  OldM+="誼馭禦挺幀鄭牒叮嚀艙昂嵩柢諷暢摸蹟渠慥洵聯聨諳骼裳畠黌托罸翅";
  if(navigator.platform.indexOf("Win")>-1&&navigator.userAgent.indexOf("MSIE")>-1){
   NewM+="横黒神飯飼青諸緒絋都";//機種依存文字
   OldM+="橫黑神飯飼靑諸緖纊\都";//機種依存文字
  }			 //【0.3.1 終】
//【0.3.2】
  New+="援援憶戒食食干諌飢厩閏曳興喫却糾戒尭憩携枯交散踏踏激死幸消燥障穣扇疎阻掃退退注赤銜";
  Old+="掩捐臆誡蝕喰旱諫饑廏閠曵亢吃卻糺晦堯憇攜涸淆撒沓蹈戟屍倖銷躁牆穰煽疏沮剿褪頽註赭啣";
  New+="棄背包包放萌暴\膨槙侭羮盲溶溶耀屈了瑠伜僣懴抬迫叩";
  Old+="毀悖繃疱抛萠曝厖槇儘羹妄熔鎔燿窟諒璢倅僭懺擡逼擲";
  NewM+="鴬克炎\郭蛎格竃粥潅奇奇希希影英英凶頚鶏弦差更典州皐練息俊簡害略唇針尋靭酢垂翠髄線族恵殿抵逓纏";
  OldM+="鶯剋焔廓蠣挌竈鬻灌畸綺稀冀翳穎叡兇頸鷄絃叉甦奠洲皋煉熄駿翰碍掠脣鍼訊靱醋埀翆髓綫蔟貍澱觝遞纒";
  NewM+="京涛竪恵稚祢覇境腟苺譛逎鈬鈩鵞鷏麸綿卑薮盤涙篭晰枡檪殱狢獏珱畴籖筝緕冒";
  OldM+="亰濤豎慧穉禰霸疆膣莓譖遒鐸鑪鵝鷆麩棉鄙籔磐泪籠皙桝櫟殲貉貘瓔疇籤箏纃冐";
 }
 New+="与与ヶ";//三画
 Old+="與輿箇";
 NewM+="万刃";
 OldM+="萬刄";
 New+="予\欠欠双内";//四画 v.4.2 追加: 內
 Old+="豫缺歇雙內";
 NewM+="仏円区";
 OldM+="佛圓區";
 New+="写写処収払";//五画
 Old+="冩寫處收拂";
 NewM+="冊号台台圧圧広広広広広旧礼辺弁弁弁庁";
 OldM+="册號臺颱壓遏廣宏曠昿弘舊禮邊辯辨瓣廳";
 New+="争仮会伝当尽灯";//六画
 Old+="爭假會\傳當盡燈";
 NewM+="両両団弐気荘糸虫缶";
 OldM+="兩輛團貳氣莊絲蟲罐";
 New+="乱乱乱余兎兎励図囲回回回回売対労労応来没没択状即";//七画【v3.2追加: 狀】
 Old+="亂爛濫餘兔\菟勵圖圍囘廻蛔恢賣對勞撈應來沒歿擇狀卽";
 NewM+="亜体体児医壱声壮寿条沢芸麦";
 OldM+="亞體躰兒醫壹聲壯壽條澤藝麥";
 New+="並画画効参実学届拡拠担拝抜殴斉歩侭";//八画【v3.2追加: 歩儘】
 Old+="竝畫劃效參實學屆擴據擔拜拔毆齊步儘";
 NewM+="価券国宝岳弥径枢欧炉茎虱";
 OldM+="價劵國寶嶽彌\徑樞歐爐莖蝨";
 New+="乗勅叙叙変妊栄峡巻恒為狭発発発発砕砕窃";//九画
 Old+="乘敕敍抒變姙榮峽卷恆爲狹發撥溌醗碎摧竊";
 NewM+="単昼胆浄浄浅点独県";
 OldM+="單晝膽淨滌淺點獨縣";
 New+="挙挙帰帯従恋悩捜残真称粋粋\陥挟挟秘専専恵涛涜剥唖";//十画【追加: 惠濤】
 Old+="舉擧歸帶從戀惱搜殘眞稱粹萃陷挾夾祕專擅惠濤瀆剝啞";
 NewM+="党剣剤桜桧桟浜将蚕\竜晋";
 OldM+="黨劍劑櫻檜棧濱將蠶龍晉";
 New+="偽偽剰惨断済渋猟盗経粛訳転転酔釈倹斎掴渉教";//十一画【v3.2追加: 摑涉禱】
 Old+="僞佯剩慘斷濟澁獵盜經肅譯轉顛醉釋儉齋摑涉敎";
 NewM+="圏悪脳渓猪亀険蛍祷";
 OldM+="圈惡腦溪豬龜險螢禱";
 New+="堕塁奥営覚属廃弾揺湿満焼畳禄\証軽遅鈎随飲厨";//十二画【v4.2追加: 廚】
 Old+="墮壘奧營覺屬廢彈搖濕滿燒疉祿證輕遲鉤隨飮廚";
 NewM+="曽暁検殻湾湾絵蛮歯";
 OldM+="曾\曉檢殼灣彎繪蠻齒";
 New+="勧嘆奨寝寝誉慎戦摂数楽楼滞継続触豊痴";//十三画 癡不作變換、原因不明
 Old+="勸歎奬寢寐譽愼戰攝數樂樓滯繼續觸\豐癡";
 NewM+="塩滝献禅践辞鉱鉱鉱鉄賎";
 OldM+="鹽瀧獻禪踐辭鑛砿礦鐵賤";
 New+="読銭関隠駆徳縁";//十四画【v4.1 追加：德緣】
 Old+="讀錢關隱驅德緣";
 NewM+="様稲総総総聡雑静駅髪";
 OldM+="樣稻總綜惣聰雜靜驛髮";
 New+="嘱舗戯歓歓潜勲賛賛賛讃鋳黙噛";//十五画【v3.2 追加：嚙】
 Old+="囑舖戲歡驩潛勳贊讃讚讚鑄默嚙";
 NewM+="権穂縄蔵霊餅";
 OldM+="權穗繩藏靈餠";
 New+="壊壌嬢謡篭懐";//十六画【小飛社追加：籠】
 Old+="壞壤孃謠籠懷";
 NewM+="獣穏縦薬衛隷";
 OldM+="獸穩縱藥衞隸";
 New+="聴";//十七画
 Old+="聽";
 NewM+="厳厳繊覧";
 OldM+="嚴儼纖覽";
 New+="観鎮顕験翻";//十八画
 Old+="觀鎭顯驗飜";
 NewM+="顔";
 OldM+="顏";
 New+="覇";//十九画
 Old+="霸";
 NewM+="臓艶";
 OldM+="臟艷";
 New+="譲";//二十画超
 Old+="讓";
 NewM+="巌醸鬱";
 OldM+="巖釀欝";
//当字・代用・俗字・異字体
 New+="鑚亘挿装";
 Old+="鑽亙插裝";
 NewM+="壷";  //"床函"削除
 OldM+="壺";  //"牀凾"削除
// 古く見せる
 New+="付";
 Old+="附";
 NewM+="帳";
 OldM+="帖";
 if(opt==1){//「旧⇒新」変換のみ
  NewM+="一二";
  OldM+="壱弐";
 }
// pending
 New+="褒芦浸購闘";	//座　削除（實際の文章で坐（動詞）より座（名詞）の方が多いため）
 Old+="襃蘆滲贖鬪";	//坐　削除
 NewM+="遥撹";	//崎　削除
 OldM+="遙攪";	//嵜　削除
 New+=NewM;Old+=OldM;			 //【0.3.2 終】
//新旧無変換：四段未然形で活用させるだけ（は行除く）	 //【0.4】削除: 掴噛
 var Muhen="渡持減依誤唸送取死進切知却作以削入困散偏括頂咥啣至走遊映下限辿則立頼保育折突打上障起戻劣割破詰置浮空開霞";
 Muhen+="書掻描聞咲裂敷好透炊焚着就解説梳泣鳴貫履吐刷引挽吹噴蒔剥妬沸湧涌企測量諮謀居有固定腐極窮訛別在懸守凝萎凹苛";
 Muhen+="緩含及呑酌刻込恨混止縮傷凄積羨疎組憎啄弛凋跳沈痛摘悼踏染白富蔑歩亡滅列歪儚咬嗜孕揉眩睨竦阻包叫屈窪因";
 Muhen+="窄嫉蝕生産挑膿選撰移足由分採始張騒煽呷寄載掘斬痴放照降弱捲罵勝異決象怠去巡撮踊絞飾漬盛群登重曇拘捺待撲誇";
 Muhen+="篭返換代迫泊叩見釣縊寛貶";
 New+=Muhen;
 Old+=Muhen;				 //【0.4 終】
//「だ」行-新字：閉ぢる			 //【0.5】
 var da_gyo="閉綴恥愧羞怖攀捩捻出";
 New+=da_gyo;
 Old+=da_gyo;
//「わ」行-新字　上一：ゐ、ゐ、ゐる、ゐる、ゐれ、ゐよ　下二：ゑ、ゑ、う、うる、うれ、ゑよ
 var wa_gyo="用率据植飢餓";
 New+=wa_gyo;
 Old+=wa_gyo;				 //【0.5 終】
//「は」行-新旧字：言ふ、供ふ⇒供える		 【0.6】
 var ha_excp="覗";//同漢字で「は」行以外の活用があるもの
 var ha_gyo="与興争会従伝購謡囲恋随戦闘唱称払纏酔翻担労装";
 var ha_NO="合遭逢遇商糾洗扱抗言云謂厭弄伺失歌唄詠謳疑奪宜諾肯敬占卜負追覆被補行襲思想買飼叶適敵代構\通競嫌食喰狂";
 ha_NO+="加請乞逆誘遵攫浚撓終吸救掬沿添副損揃違賜給誓供具備使遣蹲繕集償衒問訪整調弔伴囚綯倣習匂臭賑縫拭願狙宣呪窺覗";
 ha_NO+="這祓掃拾振奮揮篩震舞紛賄惑迷向貰養笑訴喪候憂患雇憩結交祝潤唱濯匿培煩庇慕徨曰祓躇計語住巣論味希費慣";
 ha_NO+="漂";
 var he_NO="和誂愁抑押教衰控銜啣拵答應支堪耐蓄貯喩譬仕番捉捕迎考鍛抱凌涼力甘賛";
//「応」を「應」に訂正／【v3.2 追加】敵代
 ha_gyo+=ha_NO;
 New+=ha_NO+he_NO;
 Old+=ha_NO+he_NO;			 //【0.6 終】
//「や」行-新字　上一：い、い、いる、いる、いれ、いよ　上二：い、い、ゆ、ゆる、ゆれ、いよ
//               下一：え、え、え、える、えれ、えよ  　下二：え、え、ゆ、ゆる、ゆれ、えよ
 var ya_gyo="老悔報消見観越超増覚消映栄絶燃萌癒冴饐萎煮生冷殖吼吠咆聳";

 if(debug){console.log(da_gyo+"\n\n"+wa_gyo+"\n\n"+ha_gyo)}
 var K1S = "　".charAt(0); // 8140
 var K1E = "滌".charAt(0); // 9FFC
 var K2S = "漾".charAt(0); // E040
 var K2E = "黑".charAt(0); // FC4B（FCFCの代わり）
 var Hira="かきくけこさしすせそたちつてとはひふへほ";
 var HiraD="がぎぐげござじずぜぞだぢづでどばびぶべぼ";
 var bz="あ".length;				 //【0.10】
 var res = "";
 var pt,j,chr,chrB,chrN,chrNN,chrNN2,tmp0,tmpD;
 var tmp=""
 var bzZ=1;
 var IU="я";//「云」代用			//【0.10 終　　變數定義　終】
 if(bz==2){ //for NN2.02-NC4.05		//【Maruya.1 全角二字ブラウザ對應の一部】
  var sep=unescape("%01"); // "%00"では一部ブラウザで不正動作
  for(j=0;j<Old.length;j++){tmp+=Old.substring(j,j+bz)+sep;j++};
  Old=tmp;tmp='';
  for(j=0;j<New.length;j++){tmp+=New.substring(j,j+bz)+sep;j++};
  New=tmp;tmp='';
 }
 if(Old.length-New.length!=0||debug){	//【Maruya.2 文字對應表のデバグ】
  console.log("Old="+Old.length+" New="+New.length+" 文字数不一致！"+"\n\n"+New);
  console.log("Old="+Old.length+" New="+New.length+" 文字数不一致！"+"\n\n"+Old);
 }
 str=yuusen(opt,str);			//【Maruya.3】
 for(j=0;j<str.length;j++){		//【Maruya.4】
  if((chr=str.charAt(j))==sep){res+=chr}
  else{ 				// 【4.1a】
   if(bz==2&&(((chr>=K1S)&&(K1E>=chr))||((chr>=K2S)&&(K2E>=chr)))){chr+=str.charAt(1+j++)}
   if(opt==1&&"ゝヽゞヾ".indexOf(chr)>-1){		//【4.1a.2】
    chrB=res.substring(res.length-bz,res.length);
    if((tmp=Hira.indexOf(chrB))>-1){tmp0=chrB;tmpD=HiraD.substring(tmp,tmp+bz);}
    else if((tmp=HiraD.indexOf(chrB))>-1){tmp0=Hira.substring(tmp,tmp+bz);tmpD=chrB;}
    else{tmp0=tmpD=chrB}
    if("ゝヽ".indexOf(chr)>-1){res+=tmp0}else{res+=tmpD}
// console.log(chr+"|"+chrB+"|"+tmp+"|"+tmp0+"|"+tmpD+"|"+res)
   }
   else if(chr.length/bz>=1&&"をおいゐゆ".indexOf(chr)==-1){	//【4.1a.2a】
    if((pt=Old.indexOf(chr))>-1){				//【4.1a.2a.1】
     if(opt==1||opt==3){chr=New.substring(pt,pt+bz);res+=chr;}
     else{res+=chr;chr=New.substring(pt,pt+bz);}
    }
    else if((pt=New.indexOf(chr))>-1&&(opt==0||opt==2)){res+=Old.substring(pt,pt+bz)}
    else{res+=chr}					//【4.1a.2a.1b終】
    chrB=str.substring(j+1-2*bz,j+1-bz);
    chrN=str.substring(j+1,j+1+bz);
    chrNN=str.substring(j+1+bz,j+1+2*bz);
    chrNN2=str.substring(j+1+bz,j+1+3*bz);
    if(opt==1&&New.indexOf(chr)>-1&&NewM.indexOf(chr)==-1){	//【4.1a.2a.3】
     if(chrNN=="う"&&"かがさたなはばまら".indexOf(chrN)>-1){	//【4.1a.2a.3.1】
      if(chrN=="か"){res+="こう";j+=2*bz;}
      else if(chrN=="が"){res+="ごう";j+=2*bz;}
      else if(chrN=="さ"){res+="そう";j+=2*bz;}
      else if(chrN=="た"){res+="とう";j+=2*bz;}
      else if(chrN=="な"&&chr=="死"){res+="のう";j+=2*bz;}
      else if(chrN=="は"){res+="おう";j+=2*bz;}
      else if(chrN=="ば"){res+="ぼう";j+=2*bz;}
      else if(chrN=="ま"){res+="もう";j+=2*bz;}
      else if(chrN=="ら"){res+="ろう";j+=2*bz;}
     }						//【4.1a.2a.3.1 終】
     else if(chrN=="つ"&&("たてと".indexOf(chrNN)>-1||chrNN2=="ちま")){res+="っ";j+=bz;}
     else if(Muhen.indexOf(chr)>-1){continue}
     else if(chrN=="は"&&"合".indexOf(chr)>-1&&ha_gyo.indexOf(chr)>-1&&"ぁ"<chrB&&chrB<"ヶ"&&"せざずつなぬばるれん".indexOf(chrNN)>-1){res+="わ";j+=bz;}
     else if(chrN=="は"&&ha_gyo.indexOf(chr)>-1&&"しせざずつなぬばるれん".indexOf(chrNN)>-1){res+="わ";j+=bz;}
     else if(chrN=="ひ"&&ha_gyo.indexOf(chr)>-1){		//【4.1a.2a.3.1e】
      if(chrNN=="や"&&str.substring(j+1+2*bz,j+1+3*bz)=="う"){res+="いよう";j+=3*bz;}
      else{res+="い";j+=bz;}
     }
     else if(chrN=="ふ"&&ha_gyo.indexOf(chr)>-1){res+="う";j+=bz;}
     else if(chrN=="へ"&&ha_gyo.indexOf(chr)>-1&&"　。、,」』）がさざずたてとどなばぬまやよるられを方出事".indexOf(chrNN)>-1){res+="え";j+=bz;}
     else if(chrN=="へ"&&he_NO.indexOf(chr)>-1&&("がてでにもりを".indexOf(chrB)>-1||"、かがさざすそずたてでとどなにぬねのはばまみもやよるられろを方出事".indexOf(chrNN.substring(bz,2*bz))>-1)){res+="え";j+=bz;}
     else if(chrN=="ゑ"&&wa_gyo.indexOf(chr)>-1){res+="え";j+=bz;}
     else if(chrN=="ぢ"&&da_gyo.indexOf(chr)>-1){res+="じ";j+=bz;}
     else if(chrN=="づ"&&da_gyo.indexOf(chr)>-1){res+="ず";j+=bz;}
     else if(str.substring(j+1+bz,j+1+3*bz)=="やう"&&"きぎしじちにびみり".indexOf(chrN)>-1){res+=chrN+"よう";j+=3*bz;}					//【4.1a.2a.3.1l】
//     console.log(chr+"|"+chrB+"|"+chrN+"|"+chrNN+"|"+res)
    }						//【4.1a.2a.3終】
    else if(opt==0&&New.indexOf(chr)>-1&&NewM.indexOf(chr)==-1){//新→正【4.1a.2a.3a】
     if(chrNN=="う"&&"こごそとのおぼもろ".indexOf(chrN)>-1){
      if(chrN+chrNN=="こう"){res+="かう";j+=2*bz;}
      else if(chrN=="ご"){res+="がう";j+=2*bz;}
      else if(chrN=="そ"){res+="さう";j+=2*bz;}
      else if(chrN=="と"){res+="たう";j+=2*bz;}
      else if(chrN=="の"&&chr=="死"){res+="なう";j+=2*bz;}
      else if(chrN=="お"){res+="はう";j+=2*bz;}
      else if(chrN=="ぼ"){res+="ばう";j+=2*bz;}
      else if(chrN=="も"){res+="まう";j+=2*bz;}
      else if(chrN=="ろ"){res+="らう";j+=2*bz;}
     }
     else if(Muhen.indexOf(chr)>-1){continue}
     else if(chrN=="わ"&&ha_gyo.indexOf(chr)>-1){res+="は";j+=bz;}
     else if(chrN=="い"&&ya_gyo.indexOf(chr)>-1){res+="い";j+=bz;}
     else if(chrN=="い"&&wa_gyo.indexOf(chr)>-1){res+="ゐ";j+=bz;}
     else if(chrN=="い"&&ha_gyo.indexOf(chr)>-1){
      if(chrNN=="て"&&ha_excp.indexOf(chr)>-1){res+="いて";j+=2*bz;}
      else if(chrNN=="よ"&&str.substring(j+1+2*bz,j+1+3*bz)=="う"){res+="ひやう";j+=3*bz;}
      else{res+="ひ";j+=bz;}
     }
     else if(chrN=="う"&&ha_gyo.indexOf(chr)>-1&&("たて".indexOf(chrNN)==-1||chrNN2=="ため")){res+="ふ";j+=bz;}
     else if(chrN=="え"&&ya_gyo.indexOf(chr)>-1){res+="え";j+=bz;}
     else if(chrN=="え"&&wa_gyo.indexOf(chr)>-1){res+="ゑ";j+=bz;}
     else if(chrN=="え"&&(ha_gyo+he_NO).indexOf(chr)>-1){res+="へ";j+=bz;}
     else if(chrN=="じ"&&da_gyo.indexOf(chr)>-1){res+="ぢ";j+=bz;}
     else if(chrN=="ず"&&da_gyo.indexOf(chr)>-1){res+="づ";j+=bz;}
     else if(chrNN2=="よう"&&"きぎしじちにびみり".indexOf(chrN)>-1){res+=chrN+"やう";j+=3*bz;}
// console.log(chr+"|"+chrN+"|"+chrNN);
    }						//【4.1a.2a.3a 終】
   }						//【4.1a.2a 終】
   else if(opt==1&&"をゐいゆ".indexOf(chr)>-1){//正→新		//【4.1a.2b】
    chrB=str.substring(j+1-2*bz,j+1-bz);
    chrN=str.substring(j+1,j+1+bz);
    if("ゝヽゞヾ".indexOf(chrNN=str.substring(j+1+bz,j+1+2*bz))>-1){res+=chr}	//【4.1a.2b.1】
    else if(chr=="を"){							//【4.1a.2b.1a】
     if(chrN=="つ"&&("たてと".indexOf(chrNN)>-1||chrNN2=="ちま")&&"がてはにも".indexOf(chrB)>-1){res+="おっ"+chrNN;j+=2*bz;}
     else if(chrN+chrNN=="らう"&&"がてはにも".indexOf(chrB)>-1){res+="おろう";j+=2*bz;}
     else if("らりるれ".indexOf(chrN)>-1&&"がてはにも".indexOf(chrB)>-1){res+="お"+chrN;j+=bz;}
     else{res+=chr}
    }
    else if(chr=="い"){//「いふ→云う」：正⇒新 誤変換対策			【4.1a.2b.1b】
     if("うかがてでとどなにのはもを部分　。.、, \r\n「『（(".indexOf(chrB)>-1){
      chrNN2=str.substring(j+1+bz,j+1+3*bz);
      if(chrN=="は"&&chrB!="な"){res+="云わ";j+=bz;}
      else if(chrN+chrNN2=="ひやう"){res+="云いよう";j+=3*bz;}
      else if(chrN=="ひ"){res+="云い";j+=bz;}
      else if(chrN=="ふ"){res+="云う";j+=bz;}
      else if(chrN=="へ"){res+="云え";j+=bz;}
      else if(chrN=="つ"&&("たてと".indexOf(chrNN)>-1||chrNN2=="ちま")){res+="云っ"+chrNN;j+=2*bz;}
      else if(chrN+chrNN=="わう"){res+="云おう";j+=2*bz;}
      else{res+=chr}
     }
     else if("へは".indexOf(chrN)>-1&&"ずるなばまよれ".indexOf(chrNN)>-1){
      if(chrN=="は"&&"いな".indexOf(chrB)==-1){res+="云わ"+chrNN;j+=2*bz;}
      else if(chrN=="へ"){res+="云え"+chrNN;j+=2*bz;}
      else{res+=chr}
     }
     else if(str.substring(j+1,j+1+2*bz)=="ひま"){res+="云いま";j+=2*bz;}
     else if(str.substring(j+1,j+1+3*bz)=="ふこと"){res+="云うこと";j+=3*bz;}
     else{res+=chr}
    }								//【4.1a.2b.1b 終】
    else if(chr=="ゆ"){							//【4.1a.2b.1c】
     if("うかがてでとどなにのはもを部分　。.、, \r\n「『（(".indexOf(chrB)>-1){
      chrNN2=str.substring(j+1+bz,j+1+3*bz);
      if(chrN=="は"&&chrB!="な"){res+="ゆわ";j+=bz;}
      else if(chrN+chrNN2=="ひやう"){res+="ゆいよう";j+=3*bz;}
      else if(chrN=="ひ"){res+="ゆい";j+=bz;}
      else if(chrN=="ふ"){res+="ゆう";j+=bz;}
      else if(chrN=="へ"){res+="ゆえ";j+=bz;}
      else if(chrN=="つ"&&("たてと".indexOf(chrNN)>-1||chrNN2=="ちま")){res+="ゆっ"+chrNN;j+=2*bz;}
      else if(chrN+chrNN=="わう"){res+="ゆおう";j+=2*bz;}
      else{res+=chr}
     }
     else if("へは".indexOf(chrN)>-1&&"ずるなばまよれ".indexOf(chrNN)>-1){
      if(chrN=="は"&&chrB!="な"){res+="ゆわ"+chrNN;j+=2*bz;}
      else if(chrN=="へ"){res+="ゆえ"+chrNN;j+=2*bz;}
      else{res+=chr}
     }
     else if(str.substring(j+1,j+1+2*bz)=="ひま"){res+="ゆいま";j+=2*bz;}
     else if(str.substring(j+1,j+1+3*bz)=="ふこと"){res+="ゆうこと";j+=3*bz;}
     else{res+=chr}
    }								//【4.1a.2b.1c 終】
    else if(chr=="ば"&&chrN+chrNN=="まう"){res+="ばもう";j+=2*bz;}
    else if(chr=="や"&&chrN+chrNN=="らう"){res+="やろう";j+=2*bz;}
    else{res+=chr}
   }								//【4.1a.2b 終】
   else if(opt==0&&"おいゆ".indexOf(chr)>-1){//新→正				//【4.1a.2c】
    chrB=str.substring(j+1-2*bz,j+1-bz);
    chrN=str.substring(j+1,j+1+bz);
    if("ゝヽゞヾ".indexOf(chrNN=str.substring(j+1+bz,j+1+2*bz))>-1){res+=chr}
    else if(chr=="お"){
     if(chrN=="っ"&&"たて".indexOf(chrNN)>-1&&"がてはにも".indexOf(chrB)>-1){res+="をつ"+chrNN;j+=2*bz;}
     else if(chrN+chrNN=="ろう"&&"がてはにも".indexOf(chrB)>-1){res+="をらう";j+=2*bz;}
//次行「俺」の誤變換を防ぐ爲chrNのマッチから「れ」を削り次次行に分割		【要經過觀察】
     else if("らりる".indexOf(chrN)>-1&&"がてはにも".indexOf(chrB)>-1){res+="を"+chrN;j+=bz;}
     else if(chrN=="れ"&&"がても".indexOf(chrB)>-1){res+="を"+chrN;j+=bz;}
     else{res+=chr}
    }
    else if(chr=="い"){//いう→云ふ：新⇒正					【4.1a.2c.1b】
     if("うかがてでとどなにのはもを部分　。.、, \r\n「『（(".indexOf(chrB)>-1){	//【4.1a.2c.1b.1】
      chrNN2=str.substring(j+1+bz,j+1+3*bz);
      if(chrN=="わ"&&chrB!="な"&&chrNN2!="ゆる"){res+=IU+"は";j+=bz;}
      else if(chrN+chrNN2=="いよう"){res+=IU+"ひやう";j+=3*bz;}
      else if(chrN=="い"&&"ます|ませ|まし|なが|かけ|".indexOf(chrNN2)>-1){res+=IU+"ひ";j+=bz;}//「好い」との混同あり
      else if(chrN=="い"&&("草捨損立付尽直逃触分寄訳渡".indexOf(chrN)>-1||"|ぐさ|すて|そこ|そび|たて|つけ|つく|なお|のが|ふら|ぶん|よる|わけ|わた".indexOf(chrNN2)>-1)){res+="いひ";j+=bz;}//「好い」との混同あり
      else if(chrN=="う"&&chrB!="な"){res+=IU+"ふ";j+=bz;}
      else if(chrN=="え"){res+=IU+"へ";j+=bz;}
      else if(chrN=="っ"&&chrNN2!="たい"&&("たてと".indexOf(chrNN)>-1||chrNN2=="ちま")&&"なにて".indexOf(chrB)==-1){res+=IU+"っ"+chrNN;j+=2*bz;}
      else if(chrN+chrNN=="おう"){res+=IU+"はう";j+=2*bz;}
      else if("がてでせとにはも部".indexOf(chrB)>-1){
       if("るたて".indexOf(chrN)>-1||chrN+chrNN=="られ"){res+="ゐ"+chrN;j+=bz;}
       else if("ます|まし|ませ|なか|ない|なく|なけ|させ|れば|れど|れず".indexOf(chrN+chrNN)>-1){res+="ゐ"+chrN+chrNN;j+=2*bz;}
       else if(chrN+chrNN=="よう"){res+="ゐよう";j+=2*bz;}
       else{res+=chr}
//  console.log(chr+"|"+chrN+chrNN+"|"+res)
      }
      else{res+=chr}
     }								//【4.1a.2c.1b.1 終】
     else if("えわ".indexOf(chrN)>-1&&"ずるなばまよれ".indexOf(chrNN)>-1){		//【4.1a.2c.1b.1a】
      if(chrN=="わ"){res+=IU+"は"+chrNN;j+=2*bz;}
      else if(chrN=="え"){res+=IU+"へ"+chrNN;j+=2*bz;}
      else if("てでがはもにせ".indexOf(chrB)>-1){
       if("るたて".indexOf(chrN)>-1||chrN+chrNN=="られ"){res+="ゐ"+chrN;j+=bz;}
       else if("ます|まし|ませ|なか|ない|なく|なけ|させ|れば|れど|れず".indexOf(chrN+chrNN)>-1){res+="ゐ"+chrN+chrNN;j+=2*bz;}
       else if(chrN+chrNN=="よう"){res+="ゐよう";j+=2*bz;}
       else{res+=chr}
      }
      else{res+=chr}
     }							//【4.1a.2c.1b.1a 終】
     else if(str.substring(j+1,j+1+2*bz)=="いま"){res+=IU+"ひま";j+=2*bz;}
     else if(str.substring(j+1,j+1+3*bz)=="うこと"){res+=IU+"ふこと";j+=3*bz;}
     else if("がてでせとにはも部".indexOf(chrB)>-1){
      if("るたて".indexOf(chrN)>-1||chrN+chrNN=="られ"){res+="ゐ"+chrN;j+=bz;}
      else if("ます|まし|ませ|なか|ない|なく|なけ|させ|れば|れど|れず".indexOf(chrN+chrNN)>-1){res+="ゐ"+chrN+chrNN;j+=2*bz;}
      else if(chrN+chrNN=="よう"){res+="ゐよう";j+=2*bz;}
      else{res+=chr}
     }
     else{res+=chr}						//【4.1a.2c.1b.1e】
    }							//【4.1a.2c.1b 終】
    else if(chr=="ゆ"){						//【4.1a.2c.1c】
     if("うかがてでとどなにのはもを部分　。.、, \r\n「『（(".indexOf(chrB)>-1){
      chrNN2=str.substring(j+1+bz,j+1+3*bz);
      if(chrN=="わ"){res+="ゆは";j+=bz;}
      else if(chrN+chrNN2=="いよう"){res+=IU+"ひやう";j+=3*bz;}//「好い」との混同あり
      else if(chrN=="い"){res+="ゆひ";j+=bz;}
      else if(chrN=="う"){res+="ゆふ";j+=bz;}
      else if(chrN+chrNN=="えに"){res+="ゆゑに";j+=2*bz;}
      else if(chrN=="え"){res+="ゆへ";j+=bz;}
      else if(chrN=="っ"&&("たてと".indexOf(chrNN)>-1||chrNN2=="ちま")){res+="ゆっ"+chrNN;j+=2*bz;}
      else if(chrN+chrNN=="おう"){res+="ゆはう";j+=2*bz;}
      else{res+=chr}
     }
     else if("えわ".indexOf(chrN)>-1&&"ずるなばまよれ".indexOf(chrNN)>-1){
      if(chrN=="わ"){res+="ゆは"+chrNN;j+=2*bz;}
      else if(chrN=="え"){res+="ゆへ"+chrNN;j+=2*bz;}
      else{res+=chr}
     }
     else if("たれ".indexOf(chrB)>-1&&chrN=="え"){res+="ゆゑ";j+=bz;}
     else if(chrN+chrNN=="えに"){res+="ゆゑに";j+=2*bz;}
     else if(chrN+chrNN=="いま"){res+="ゆひま";j+=2*bz;}
     else if(str.substring(j+1,j+1+3*bz)=="うこと"){res+="ゆふこと";j+=3*bz;}
     else{res+=chr}
    }							//【4.1a.2c.1c 終】
    else if(chr=="ば"&&chrN+chrNN=="もう"){res+="ばまう";j+=2*bz;}
    else if(chr=="や"&&chrN+chrNN=="ろう"){res+="やらう";j+=2*bz;}
    else{res+=chr}
   }							//【4.1a.2c 終】
   else{res+=chr}
  }							//【4.1a 終】
 }							//【4 終】
 str='';
 if(opt==0){res=hira_kan(res,HP);res=sentence0(res);}			//【6】
 else if(opt==1){res=sentence1(res)}				//【6a】
 else if(opt==2){res=hira_dai(res)}				//【6b】
 if(HP<1){res=s(res,IU,"い")}else{res=s(res,IU,"云")}			//【6c】
 if(debugT){var now1=new Date();now1=now1.getTime();now1-=now0;now1=Math.round(now1/100)/10;res=opt+"→"+now1+" 秒\n"+res;}
 return res.substring(1,res.length-1);
}						//【Maruya 終】
function yuusen(opt,str){				//【yuusen 新→正で最初に變換するもの】
 str=ha4(str,opt);//は行四段
 str=adj(str,opt);//形容詞
 str=_d4('R',opt,str,"入らっしゃ","入らつしや");
 str=_d4('R',opt,str,"いらっしゃ","いらつしや");
 str=_d4('R',opt,str,"おっしゃ","おつしや");
 str=_adj(opt,str,'ういういし','うひうひし');
 str=_s(str,"いったん","いつたん","　。.、,\n \r\n「『（");
 str=_ha4(opt,str,"行な");
 str=_ha4(opt,str,"食ら");
 str=_ha4(opt,str,"喰ら");
 str=_ha4(opt,str,"損な");
 str=_ha4(opt,str,"逆ら");
 str=_ha4(opt,str,"計ら");
 str=_ha4(opt,str,"語ら");
 str=_d2(opt,str,"捕らえ","捕らへ");
 str=_ha4(opt,str,"祓ら");
 str=_d2(opt,str,"捕らまえ","捕らまへ");
 str=_d2(opt,str,"捕まえ","捕まへ");
 str=_ha4(opt,str,"住ま");
 str=_ha4(opt,str,"賑わ","賑は");
 str=_ha4(opt,str,"味わ","味は");
 str=_ha4(opt,str,"向か");
 str=_ha4(opt,str,"振る");
 str=_ha4(opt,str,"巣く");
 str=_ha4(opt,str,"安ら");
 str=_d4('s',opt,str,"持合わ","持合は");
 str=_d4('r',opt,str,"呼ばわ","呼ばは");
 str=_d4('s',opt,str,"露わ","露は");
 str=_d4('r',opt,str,"重な");
 str=_d4('r',opt,str,"関わ","關は");
 if(opt==0){str=_d4('r',opt,str,"關わ","關は")}else{str=_d4('r',opt,str,"関わ","関は")}
 str=_d4('r',opt,str,"係わ","係は");
 str=_d4('r',opt,str,"拘わ","拘は");
 str=_d4('r',opt,str,"携わ","携は");
 str=_d2(opt,str,"携え","携へ");
 str=_d4('r',opt,str,"変わ","變は");
 if(opt==0){str=_d4('r',opt,str,"變わ","變は")}else{str=_d4('r',opt,str,"変わ","変は")}
 str=_d2(opt,str,"変え","變へ");
 if(opt==0){str=_d2(opt,str,"變え","變へ")}else{str=_d2(opt,str,"変え","変へ")}
 str=_d4('r',opt,str,"替わ","替は");
 str=_d2(opt,str,"替え","替へ");
 str=_d4('r',opt,str,"代わ","代は");
 str=_d2(opt,str,"代え","代へ");
 str=_d2(opt,str,"換え","換へ");
 str=_d2(opt,str,"咥え","咥へ");
 str=_d2(opt,str,"返え","返へ");
 str=_d2(opt,str,"例え","譬へ");
 str=_d2(opt,str,"数え","數へ");
 str=_d2(opt,str,"応え","應へ");//【v3.2 追加】
 str=_d2(opt,str,"教え","敎へ");//【v4.1 追加】
 if(opt==0){str=_d2(opt,str,"數え","數へ")}else{str=_d2(opt,str,"数え","数へ")}
 str=_d2(opt,str,"囚え","囚へ");//【v3.2 追加】
 str=_d2(opt,str,"敢え","敢へ");
// str=_d2(opt,str,"強い","強ひ");		//「強い」の方が頻度が高いので封印
 str=_d4('s',opt,str,"表わ","表は");
 str=_d2(opt,str,"表われ","表はれ");
 str=_d4('s',opt,str,"著わ","著は");
 str=_d2(opt,str,"著われ","著はれ");
 str=_d4('s',opt,str,"現わ","現は");
 str=_d2(opt,str,"現われ","現はれ");
 str=_d4('s',opt,str,"顕わ","顯は");
 if(opt==0){str=_d4('s',opt,str,"顯わ","顯は")}else{str=_d4('s',opt,str,"顕わ","顕は")}
 str=_d2(opt,str,"顕われ","顯はれ");
 if(opt==0){str=_d2(opt,str,"顯われ","顯はれ")}else{str=_d2(opt,str,"顕われ","顕はれ")}
 str=_d4('s',opt,str,"回わ","囘は");
 if(opt==0){str=_d4('s',opt,str,"囘わ","囘は")}else{str=_d4('s',opt,str,"回わ","回は")}
 str=_d4('s',opt,str,"廻わ","蛔は");
 if(opt==0){str=_d4('s',opt,str,"蛔わ","蛔は")}else{str=_d4('s',opt,str,"廻わ","廻は")}
 str=_d4('r',opt,str,"断わ","斷は");
 if(opt==0){str=_d4('r',opt,str,"斷わ","斷は")}else{str=_d4('r',opt,str,"断わ","断は")}
 str=_d4('r',opt,str,"誂らえ","誂らへ");
 str=_d4('r',opt,str,"誂え","誂へ");
 str=_ha4(opt,str,"ちま");
 str=_d4('r',opt,str,"教わ","敎は");
 str=_d4('r',opt,str,"纏わ","纏は");
 
 if(opt==1){str=_d2(opt,str,"用ゐ","用ひ")}//芥川の誤用対策
 return str;
}						//【yuusen終】
function you_yau(str,opt){
 if(opt==0){
  str=_s(str,"よう","やう","かくぐさすたつなぬのぶむるんうふ");
  str=s(str,"同じよう","同じやう");
  str=s(str,"おなじよう","おなじやう");
  str=ex_s(str,"いよう","いやう","おく老悔報");//ヤ行動詞「老悔報」以外の形容詞
  str=s(str,"しきよう","しきやう");//形容詞シク活用後
  str=_s(str,"きよう","きやう","な無");//無きよう
  str=s_(str,"よう","やう","ものはなだ");//連用形・連体形+「様」
  str=s(str,"ようには","やうには");//連用形+「様」
  str=s_(str,"ようがあ","やうがあ","りるれろ");//連用形+「様」
  str=s(str,"ようがな","やうがな","いくけ");//連用形+「様」
  str=s(str,"ょうがあ","やうがあ","りるれろ");//連用形+「様」：しょうがない
  str=s(str,"ょうがな","やうがな","いくけ");//連用形+「様」
  str=s(str,"ようによって","やうによって");//連用形+「様」
  str=s(str,"の見よう","の見やう","がでを");//連用形+「様」
  str=s(str,"のみよう","のみやう","がでを");//連用形+「様」
 }
 else{
  str=_s(str,"やう","よう","かくぐさすたつなぬのぶむるんふ");
  str=s(str,"同じやう","同じよう");
  str=s(str,"おなじやう","おなじよう");
  str=ex_s(str,"いやう","いよう","おく老悔報");//ヤ行動詞「老悔報」以外の形容詞
  str=s(str,"しきやう","しきよう");//形容詞シク活用後
  str=_s(str,"きやう","きよう","な無");//無きよう
  str=s_(str,"やう","よう","ものはなだ");//連用形・連体形+「様」
  str=s(str,"やうには","ようには");//連用形+「様」
  str=s(str,"やうがあ","ようがあ");//連用形+「様」
  str=s(str,"やうがな","ようがな");//連用形+「様」
  str=s(str,"やうによって","やうによって");//連用形+「様」
  str=s(str,"の見やう","の見よう","がでを");//連用形+「様」
  str=s(str,"のみやう","のみよう","がでを");//連用形+「様」
 }
 return str;
}						//【you_yau終】

function sentence1(str){
// str=s(str,"いふ","いう");
 str=s_(str,"仕舞","しま","わいうえおっ");
 str=s(str,"まふ","まう");//「舞ふ」
 str=s(str,"つひ","つい");//「つひに」の

 str=you_yau(str,1);//やう→よう
 str=d2(str,1);//下二段
 str=d4(str,1);//四段未然

//方
 str=_s(str,"はう","ほう","のた");
 str=s_(str,"はう","ほう","がでにへも");

//ふ→う【sentence1.3】
 str=s(str,"ふくろふ","ふくろう");
 str=s(str,"けふ","きょう");
 str=s(str,"きのふ","きのう");
 str=s(str,"つふ","つう");
 str=s(str,"てふてふ","ちょうちょう");
 str=s(str,"かげろふ","かげろう");
 str=s(str,"ゆふがた","ゆうがた");
 str=s(str,"向かふ","向こう");

//ほ→お【sentence1.4】
 str=_or_(str,"なほ","なお","がはも、。\n \r\n","、，");
 str=s(str,"どほり","どおり");
 str=s(str,"とほり","とおり");
 str=s(str,"おほつぴら","おおっぴら");
 str=s(str,"おほかた","おおかた");
 str=s(str,"おほごしよ","おおごしょ");
 str=s(str,"おほげさ","おおげさ");
 str=s_(str,"おほおざつぱ","おおざっぱ","だにととかなでか");
 str=s_(str,"おほすぢ","おおすじ","にでは");
 str=s(str,"おほでを","おおでを");
 str=s(str,"おほて","おほて");
 str=s_(str,"おほはば","おおはば","だに");
 str=s_(str,"おほやけ","おおやけ","だに");
 str=s(str,"ひとしほ","ひとしお");

//へ→え【sentence1.5】
 str=s(str,"さへ","さえ");
 str=s(str,"さえてい","さへてい");//修正「冴えている」
 str=_d4('r',0,str,"さえ渡","さへ渡");//修正「冴え渡る」
 str=_d4('r',0,str,"さえわた","さへわた");//修正「冴え渡る」
 str=_d2(0,str,"さえ","さへ");//修正「冴える」
 str=_s(str,"まへ","まえ","おのらり");//前
 str=s_(str,"まへ","まえ","かとでにのはも、，\r\n \n");//前
 str=_s(str,"うへ","うえ","のるた。.、,\n \r\n");
 str=s_(str,"うへ","うえ","かではもにを\r\n \r",1);
 str=s(str,"たとへ","たとえ");
 str=s(str,"例へば","例えば");
 str=s(str,"いけにへ","いけにえ");
 str=s(str,"とこしへ","とこしえ");
 str=s(str,"ひとへに","ひとえに");
 str=s(str,"いにしへ","いにしえ");
 str=s(str,"そなへ","そなえ");
 str=s(str,"ひきかへ","ひきかえ");
 str=s(str,"とりかへ","とりかえ");

// str=s(str,"へれ","えれ");

//を→お【sentence1.6】
 str=s(str,"をうをう","おうおう");
 str=s(str,"あうぎ","おうぎ");
 str=s(str,"かをり","かおり");
 str=s(str,"みさを","みさお");
 str=s(str,"をさな","おさな");
 str=s(str,"をととひ","おととい");
 str=s(str,"をととし","おととし");
 str=s_(str,"をと","おと","こめ");
 str=s(str,"をんな","おんな");
 str=s(str,"をなご","おなご");
 str=s(str,"たをやか","たおやか");
 str=s(str,"をを","をお");
 str=s(str,"をろち","おろち");

//ぢ→じ【sentence1.7】
 str=s(str,"あぢさゐ","あじさい");
 str=s(str,"あぢ","あじ");
 str=s_(str,"いぢ","いじ","けめ");
 str=s(str,"くぢら","くじら");
 str=s(str,"げぢげぢ","げじげじ");
 str=s(str,"しめぢ","しめじ");
 str=s_(str,"ぢいさ","じいさ","まん");
 str=s(str,"ぢいちやん","じいちゃん");
 str=s(str,"ぢぢ","じじ");
 str=s_(str,"をぢ","おじ","さすしがはも");
 str=s(str,"おやぢ","おやじ");
 str=s_(str,"ぢみ","じみ","たて");
 str=s(str,"なめくぢ","なめくじ");
 str=s(str,"もぢもぢ","もじもじ");
 str=s(str,"もみぢ","もみじ");
 str=s(str,"わらぢ","わらじ");
 str=s(str,"のはぢ","のはじ");
 str=s_(str,"はぢ","はじ","とだでもを");
 str=s(str,"ぢつと","じっと");

//づ→ず【sentence1.8】
 str=s(str,"いたづら","いたずら");
 str=s_(str,"いづ","いず","れこみ");
 str=s_(str,"うづ","うず","まめもら");
 str=s(str,"おのづ","おのず");
 str=s(str,"なかんづく","なかんずく");
 str=s(str,"よろづ","よろず");
 str=s(str,"わづか","わずか");
 str=s(str,"まづ","まず");
 str=s(str,"はづれ","はずれ");
 str=_s(str,"づから","ずから","みて");
 str=s(str,"ゆうづう","ゆうずう");
 str=s(str,"づきづき","ずきずき");

//は→わ【sentence1.9】
 str=s(str,"しあはせ","しあわせ");
 str=s(str,"すなはち","すなわち");
 str=s(str,"たはごと","たわごと");
 str=s_(str,"たは","たわ","事言");
 str=s(str,"いはく","いわく");
 str=s_(str,"かはい","かわい","さそ");
 str=s(str,"きはめ","きわめ");
 str=s(str,"さはり","さわり");
 str=s(str,"いはば","いわば");
// str=s(str,"いはん","いわん");
// str=s(str,"いはな","いわな");
 str=s(str,"いはれ","いわれ");
 str=s(str,"さはやか","さわやか");
 str=s(str,"たけなは","たけなわ");
 str=s(str,"たはけ","たわけ");
 str=s(str,"なりはひ","なりわい");
 str=s(str,"にはかに","にわかに");
 str=s(str,"にはとり","にわとり");
 str=s(str,"くはだて","くわだて");
 str=s(str,"かはや","かわや");
 str=s(str,"かはいさう","かわいそう");
 str=s(str,"かはうそ","かわうそ");
 str=s(str,"かはづ","かわず");
 str=s(str,"つはもの","つわもの");

 str=s(str,"いはゆる","いわゆる");


//ひ→い【sentence1.10】
 str=s_(str,"あひ","あい","だま変済成乗");
 str=_s(str,"あひ","あい","ばぐろ山見");
 str=s_(str,"おひ","おい","返掛風越込先茂出立散付抜払目め");
 str=s(str,"たたずまひ","たたずまい");
 str=_s(str,"ひ","い","互類幸香災");
 str=s(str,"たがひ","たがい");
 str=s(str,"たぐひ","たぐい");
 str=s(str,"たとひ","たとい");
 str=s(str,"勢ひ","勢い"); 
 str=s(str,"いきおひ","いきおい"); 
 str=s(str,"おひおひ","おいおい");
 str=s(str,"諍ひ","諍い");
 str=s(str,"いさかひ","いさかい");
 str=s(str,"づかひ","づかい");
 str=s_(str,"くひ","くい","止込");
 str=s_(str,"はひ","はい","回廻出昇上登");
 str=s(str,"さいはひ","さいわい");
 str=s(str,"がよひ","がよい");
 str=s(str,"おひさき","おいさき");
 str=s(str,"うぐひす","うぐいす");
 str=s(str,"うれひ","うれい");
 str=s(str,"めまひ","めまい"); //【小飛社により追加】
 str=s(str,"目まひ","目まい"); //【小飛社により追加】

 str=j_small(str);		//【sentence1.11】

 str=s(str,"づつ","ずつ");

 str=s(str,"ゐ","い");
 str=s(str,"ゑ","え");
 str=s(str,"ヰ","イ");
 str=s(str,"ヱ","エ");

// 字音等↓【sentence1.12】
// str=s(str,"わう","おう");//味わうで誤変換
 str=s(str,"ひじやうに","ひじょうに");
 str=s(str,"ちやうだい","ちょうだい");
 str=_s(str,"れあ","りゃ","こそあど");
 str=_s(str,"りあ","りゃ","こそあど");
// str=s(str,"りう","りゅう");//「余りうまくいかない」で誤変換
// str=s(str,"しう","しゅう");//「少しうごかして」で誤変換
 str=ex_s(str,"かう","こう","つ");///「使う」
 str=s(str,"さう","そう");
// str=s(str,"たう","とう");//「踏まへたうへで」で誤変換
 str=s(str,"がたう","がとう");//修正
 str=s(str,"ちやう","ちょう");
// str=s(str,"あよう","あやう");//修正
 str=s(str,"きう","きゅう");
 str=s(str,"きふ","きゅう");
 str=s(str,"ぎう","ぎゅう");
 str=_s(str,"せう","しょう","でま");
 str=_d4('r',1,str,"じゃ","ぢや");
 str=s(str,"ぢや","じゃ");
 str=s(str,"じや","じゃ");
 str=s(str,"ざう","ぞう");
 str=s(str,"じゆ","じゅ");
// str=s(str,"じよ","じょ");同じように
 str=s(str,"じやうよ","じょう");
 str=s(str,"ぜう","じょう");
 str=s(str,"ぢやう","じょう");
 str=s(str,"ぢう","じゅう");
 str=s(str,"だう","どう");
 str=s(str,"はふはふ","ほうほう");
// str=s(str,"はふ","ほう");
 str=_s_(str,"らう","ろう","あただかな","がにとつ。.、,）」』\n \r\n　");
//【sentence1.12 終】

//【sentence1.13】
 str=s(str,"出来","でき");
 str=s_(str,"出て来","でてき","てたま");
 str=s_(str,"出て来","でてこ","なずよ");
 str=s_(str,"居","お","りっ");str=s_(str,"居","い","らまるなはたて");
// if(str.indexOf("居り")>-1||str.indexOf("居っ")>-1){str=s_(str,"居","お","らりるっ");str=s_(str,"居","い","まなはたて");}
// else{str=s_(str,"居","お","りっ");str=s_(str,"居","い","まるなはたて");}
 str=s(str,"呉れ","くれ");
 str=s(str,"積り","つもり");

//漢語→ひらがな【sentence1.14】
 str=s(str,"蝋燭","ろうそく");

//修正【sentence1.15】
 str=s(str,"象嵌","象眼");
 str=s(str,"慰借","慰謝");

 str=s(str,"吾々","我々");		//【sentence1.16】
 str=s(str,"言を俟","言を待");
 str=s(str,"出たら目","でたらめ");
 str=s(str,"出鱈目","でたらめ");
 str=s(str,"御洒落","おしゃれ");
 str=s(str,"洒落","しゃれ");
 str=s(str,"硝子","ガラス");
 str=s(str,"罎","ビン");
 str=s(str,"瓶","ビン");
 str=s(str,"卓子","テーブル");
 str=s(str,"呎","フィート");
 str=s(str,"林檎","りんご");
 str=s(str,"蝦蟇口","がま口");

 str=s(str,"矢鱈","やたら");		//【sentence1.17】
 str=_d2(1,str,"そびえ","聳え");
 str=_d4('m',1,str,"たたず","佇");
 str=_d2(1,str,"たしなめ","窘め");
 str=_d2(1,str,"しかめ","顰め");
 str=s_(str,"顰め","しかめ","顔面");

 str=s(str,"支那","中国");		//【sentence1.18】
 str=s(str,"拉甸","ラテン");
 str=s(str,"欧羅巴","ヨーロッパ");
 str=s(str,"亜米利加","アメリカ");
 str=s(str,"露西亜","ロシア");
 str=s(str,"倫敦","ロンドン");
 str=s(str,"巴里","パリ");
 str=s(str,"独逸","ドイツ");
 str=s(str,"伯林","ベルリン");
 str=s(str,"伊太利亜","イタリア");
 str=s(str,"伊太利","イタリア");
 str=s(str,"仏蘭西","フランス");
 str=s(str,"西班牙","スペイン");
 str=s(str,"瑞西","スイス");
 str=s(str,"羅馬","ローマ");
 str=s(str,"英吉利","イギリス");
 str=s(str,"印度","インド");
 str=s(str,"和蘭","オランダ");
 str=s(str,"希臘","ギリシャ");

 str=s(str,"ヶ所","箇所");		//【sentence1.19】
 str=s(str,"依怙","えこ");
 str=s(str,"贔屓","ひいき");
 str=_d4('r',1,str,"つま","詰ま");
 str=_d4('r',1,str,"つま","詰");
 str=_d4('r',1,str,"はめ","嵌め");
 str=_d4('r',1,str,"はま","嵌ま");
 str=_d4('r',1,str,"終","了");
 str=_d4('r',1,str,"終わ","了は");
 str=_adj(1,str,'ひど','非道');
 str=_adj(1,str,'ひど','酷');
 str=_adj(1,str,'た','度');
 str=_d4('r',1,str,'もったいぶ','勿体ぶ');

 str=s(str,"潰滅","壊滅");		//【sentence1.20】
 str=s(str,"潰乱","壊乱");
 str=s(str,"決潰","決壊");
 str=s(str,"全潰","全壊");
 str=s(str,"倒潰","倒壊");
 str=s(str,"崩潰","崩壊");
 str=s(str,"昏迷","混迷");
 str=s(str,"食甚","食尽");
 str=s(str,"銓衡","選考");
 str=s(str,"杜絶","途絶");
 str=s(str,"蕃族","蛮族");
 str=s(str,"蕃殖","繁殖");
 str=s(str,"補装","舖装");
 str=s(str,"研磨","研摩");
 str=s(str,"磨滅","摩滅");
 str=s(str,"断乎","断固");
 str=s(str,"抽籖","抽選");

 str=s_(str,"副","沿","っわいえう");		//【sentence1.21】
 str=s(str,"尤も","最も");
 str=s(str,"若は","若しくは");
 str=s(str,"譬え","例え");
 str=s(str,"喩え","例え");
 str=s(str,"例之","例え"); 
 str=s(str,"縦令","例え")
 str=s(str,"仮令","例え")
 str=s(str,"譬喩","比喩");
 str=s(str,"工合","具合"); 
 str=s_(str,"戴","頂","かきくけこい");

 str=s(str,"疳違","勘違");//ぼっちゃん		//【sentence1.22】
 str=s_(str,"腥","生","臭");


 str=s(str,"屹度","きっと");			//【sentence1.23】
 str=s(str,"迚も","とても");
 str=s(str,"又","また");
 str=s(str,"只今","ただいま");
 str=s(str,"只","ただ");
 str=s(str,"唯今","ただいま");
 str=s(str,"唯々","ただただ");
 str=exs_(str,"唯","ただ","一物我識心美");
 str=s(str,"此処","ここ");
 str=s(str,"此れ","これ");
 str=s_(str,"此","これ","がではにもを");
 str=s(str,"此の","この");
 str=s(str,"此","この");
 str=s(str,"之れ","これ");
 str=s_(str,"之","これ","がでとはにもを");
 str=s(str,"夫れ","それ");
 str=s(str,"夫々","それぞれ");
 str=_s_(str,"夫","それ","はが","かでも");
 str=_s(str,"夫","それ","。．、，　「『（\n \r\n");
 str=exs_(str,"丈","だけ","夫室人母六量部の");
 str=s(str,"其処","そこ");
 str=s(str,"其れ","それ");
 str=s(str,"其の","その");
 str=s(str,"其位","その位");
 str=s(str,"其他","その他");
 str=s(str,"其","その");
 str=s(str,"是れ","これ");
 str=s(str,"是迄","これ迄");
 str=s(str,"是位","これ位");
 str=s(str,"是許","こればかり");
 str=s(str,"是切り","これきり");
 str=exs_(str,"是","これ","是々非正認以用");
 str=s(str,"斯う","こう");
 str=s(str,"斯様","この様");
 str=s(str,"斯の","この");
 str=s(str,"成程","なるほど");
 str=s(str,"成る程","なるほど");
 str=_d4('r',1,str,"とかな","とか成");
 str=_d4('r',1,str,"とな","と成");
 str=_d4('r',1,str,"にな","に成");
 str=_d4('r',1,str,"にもな","にも成");
 str=s(str,"看做","みな");
 str=s(str,"恰好","格好");
 str=s(str,"格好いい","かっこいい");
 str=s(str,"好い","いい");
 str=s(str,"格好","かっこう");
 str=s(str,"恰も","あたかも");
 str=s(str,"却って","かえって");
 str=s(str,"扨て","さて");
 str=s(str,"扨","さて");
 str=s(str,"偖て","さて");
 str=s(str,"偖","さて");
 str=s(str,"若し","もし");
 str=s_(str,"然","しか","しもる");
 str=s(str,"而も","しかも");
 str=ex_s(str,"併し","しかし","合");
 str=s(str,"乍ら","ながら");
 str=s(str,"乍","ながら");
 str=s(str,"先づ","まず");
 str=s(str,"矢張り","やはり");
 str=s(str,"矢つ張り","やっぱり");
 str=s(str,"矢張","やはり");
// str=s(str,"詰まり","つまり");
// str=s(str,"詰り","つまり");
 str=s(str,"御出でに","おいでに");
 str=s(str,"凡そ","およそ");
 str=s(str,"遂に","ついに");
 str=s(str,"抑も","そもそも");
 str=s(str,"以て","もって");
 str=s(str,"殊に","ことに");
 str=s(str,"因に","ちなみに");
 str=s(str,"因みに","ちなみに");
 str=s(str,"最早","もはや");
 str=s(str,"余程","よほど");
 str=s(str,"余つ程","よっほど");
 str=s(str,"丁度","ちょうど");
 str=s(str,"恰度","ちょうど");
 str=s(str,"幾ら","いくら");
 str=s(str,"所詮","しょせん");
 str=s(str,"專ら","もっぱら");
 str=s(str,"殆ど","ほとんど");
 str=s(str,"頗る","すこぶる");
 str=s(str,"甚だ","はなはだ");
 str=s(str,"聊か","いささか");
 str=exs_(str,"聊","いささか","爾頼浪斉");
 str=s(str,"些か","いささか");
 str=exs_(str,"些","いささか","些々細事少末");
 str=s(str,"少許","少しばかり");
 str=s(str,"許り","ばかり");
 str=s(str,"況や","いわんや");
 str=s(str,"所謂","いわゆる");
 str=s(str,"所以","ゆえん");
 str=s(str,"尚更","なおさら");
 str=s(str,"尚ほ","なお");
 str=exs_(str,"尚","なお","更衣古志歯主書早徳武文方友論");//
 str=s(str,"猶ほ","なお");
 str=s(str,"猶更","なおさら");
 str=exs_(str,"猶","なお","予疑子然父太運");//
 str=s(str,"仮令","たとい");
 str=s(str,"雖ども","いえども");
 str=s(str,"雖も","いえども");
 str=s(str,"亦","また");
 str=s(str,"序に","ついでに");
 str=s(str,"序でに","ついでに");
 str=s(str,"序でながら","ついでながら");
 str=s(str,"何故","なぜ");
 str=s(str,"如何なる","いかなる");
 str=s(str,"如何に","いかに");
 str=s(str,"如何だ","いかんだ");
 str=s(str,"如何でせう","いかがでせう");
 str=s(str,"は如何で","いかがで");
 str=_s(str,"如何で","いかがで","がはも\n \r\n",1);
 str=s(str,"如何で","いかんで");
 str=s(str,"如何と","いかんと");
 str=s(str,"屡々","しばしば");
 str=s(str,"屡","しばしば");
 str=s(str,"頻りに","しきりに");
 str=s(str,"頻りと","しきりと");
 str=s(str,"暫く","しばらく");
 str=s(str,"愈々","いよいよ");
 str=exs_(str,"愈","いよいよ","々");
 str=s(str,"偶々","たまたま");
 str=s(str,"偶に","たまに");
 str=s(str,"既に","すでに");
 str=s(str,"悉く","ことごとく");
 str=s(str,"兎に角","とにかく");
 str=_adj(1,str,"おこがまし","烏滸がまし");
 str=s(str,"齎","もたら");
 str=s(str,"在る","ある");
 str=s(str,"或る","ある");
 str=s(str,"或は","あるいは");
 str=s(str,"或","ある");
 str=s(str,"寧ろ","むしろ");
 str=s(str,"罷り","まかり");
 str=s(str,"予め","あらかじめ");
 str=s(str,"拘らず","かかわらず");
 str=s(str,"如く","ごとく");
 str=s(str,"如き","ごとき");
 str=ex_s(str,"如し","ごとし","欠");
 str=s(str,"就いて","ついて");
 str=s(str,"就て","ついて");
 str=s(str,"に於て","において");
 str=s(str,"に於る","における");
 str=s(str,"に於いて","において");
 str=s(str,"に於ける","における");
 str=s(str,"以って","もって");
 str=s(str,"依って","よって");
 str=s_(str,"依","よ","られる");
 str=s(str,"由って","よって");
 str=s_(str,"由","よ","られる");
 str=s(str,"拠って","よって");
 str=s_(str,"拠","よ","られる");
 str=s(str,"筈","はず");
 str=s(str,"一寸","ちょっと");
 str=s(str,"蔑ろ","ないがしろ");
 str=s(str,"侭","まま");
 str=s(str,"敢へ","あえ");
 str=s(str,"仰つしやつ","おっしゃっ");
 str=s(str,"仰つしや","おっしゃ");
 str=s(str,"仰しやつ","おっしゃっ");
 str=s(str,"仰しや","おっしゃ");
 str=s(str,"有らゆる","あらゆる");
 str=s(str,"有ゆる","あらゆる");
 str=s(str,"全う","まっとう");
 str=s(str,"剰へ","あまっさえ");
 str=s_(str,"か知ら","かしら","。、？?");
 str=s(str,"勿論","もちろん");
 str=s(str,"可也","かなり");
 str=s(str,"可成","かなり");
 str=s(str,"成る可く","なるべく");
 str=s(str,"不相変","相変わらず");
 str=s(str,"忽ち","たちまち");
 str=s_(str,"咄嗟","とっさ","にの");
 str=s_(str,"俄か","にわか","にの");
 str=s(str,"抔と","などと");
 str=exs_(str,"嘸","さぞ","然");

 str=s_(str,"無","な","いかきくけし");			//【sentence1.24】
 str=s(str,"云々","うんぬん");
 str=s(str,"云","い");
 str=s(str,"云事","いう事");

 return str;
}				//【sentence1 終】
function j_small(str){
//促音・拗音のみ（字音無変化）
 str=s_(str,"つちゃつ","っちゃっ","たちてと");
 str=s_(str,"ちやつ","ちゃっ","かきこたちてとぱぷぺぽ");
 str=_s(str,"つちや","っちゃ","く");
 str=s_(str,"つちゃ","っちゃ","わいうえお");
 str=_s(str,"ちや","ちゃ","くごしむめ");
 str=s_(str,"ちや","ちゃ","おちりん、，。．");
 str=s(str,"ぐちやぐちや","ぐちゃぐちゃ");
// str=_s(str,"つっちゃっかり","つつちゃっかり","いしみり");//修正 「といいつつちゃかり」
 str=s(str,"なきや","なきゃ");
 str=_s(str,"しや","しゃ","むく");
 str=ex_s(str,"しやれ","しゃれ","よ");//「よしやれるのなら」
 str=_s(str,"れあ","りゃ","あけこそ");
 str=_s(str,"りや","りゃ","あけこそ");

 str=_s_(str,"ゆつ","ゅっ","きぎちひび","うん");
 str=_s_(str,"ゆ","ゅ","きぎちひび","うん");

// str=s(str,"云っち","","");
 str=s(str,"よぼつ","ょぼっ");
 str=s(str,"よぽつ","ょぽっ");
 str=s(str,"ちよびつと","ちょびっと");
 str=s(str,"ちよこつと","ちょこっと");
 str=_s(str,"つちよ","っちょ","あいぎおかけさしそはほま");
 str=s_(str,"ちよ","ちょ","いこびろち");
 str=s(str,"いつしよ","いっしょ");
 str=s(str,"一しよ","いっしょ");
 str=s_(str,"しよ","しょ","。．、，」』）)！!？?\n \r\n　");
 str=_or_(str,"よつ","ょっ","きぎちひ","たちと");//「によって」
 str=_s(str,"よん","ょん","きしちにひみり");

 str=_d4('r',1,str,"乗っか","乗つか");
 str=_adj(1,str,"かっこい","かつこい");
 str=_s_(str,"つ","っ","追お引ひ突つ取と吹ふく","掛懸か張切き組く込こ払走ぱ飛付つ");
 str=_s_(str,"つっ","つつ","いおくせはや","かきくけこ");// 「いつつこうが」「ひっつく」注意
 str=s_(str,"くっか","くつか","わいうえお");//「～なくつかう」注意
 str=s_(str,"いくっ","いくつ","かもにのでねだ");//「いくつか」注意
 str=_s_(str,"っつ","つつ","おくふ","かきくけこ");//「ふつつか」 注意
 str=_s_(str,"つつ","っつ","おくせつはひや","かきくけこい");
 str=s(str,"っつけんどん","つっけんどん");//「つっけんどん」
 str=_s_(str,"あつ","あっ","。．、，！!？?『「（","。．、，！!？?）」』\n \r\n　");
 str=_s_(str,"うつ","うっ","。．、，！!？?『「（","。．、，！!？?）」』\n \r\n　");
 str=_s_(str,"えつ","えっ","。．、，！!？?『「（","。．、，！!？?）」』\n \r\n　");
 str=_s_(str,"おつ","おっ","。．、，！!？?『「（","。．、，！!？?）」』\n \r\n　");
 str=s(str,"きつかけ","きっかけ");
 str=_s_(str,"つか","っか","うがきしすずてどにば","りし");
 str=_s(str,"つか","っか","せひ");
 str=s_(str,"やつかい","やっかい","だな");
 str=_s_(str,"つき","っき","かくぐすずてはひぽぼめれ","りし");
 str=s(str,"おつくう","おっくう");
 str=s(str,"おつかさん","おっかさん");
 str=s(str,"けつこう","けっこう");
 str=s(str,"につくき","にっくき");
 str=_s_(str,"つく","っく","かがぎこごさざしじすずそとどばぱひびふぶぼぽむゆ","りし");
 str=s_(str,"ぶつ","ぶっ","壊こち");
 str=_s_(str,"つこ","っこ","ずにのふばべほぼも","りし");
 str=s(str,"つこない","っこない");
 str=ex_s(str,"さつき","さっき","がの");
 str=_s_(str,"つさ","っさ","あがぐどふもゆ","りし");
 str=_s_(str,"つし","っし","がぎずどのばびみ","りし");
 str=_s_(str,"つす","っす","うくぐぶむゆ","りし");
 str=_s_(str,"つそ","っそ","げこごのひめ","りし");
 str=_s(str,"いつそのこと","いっそのこと","。、． \n　\r\n");
 str=s_(str,"まつ","まっ","先直暗黒白赤青昼向");
 str=s_(str,"まつさ","まっさ","おきら");
 str=s(str,"さつそく","さっそく");
 str=s_(str,"つた","った","。．、，　\n \r\nかがきけこさそとなにねのまみらりろわ");
 str=_s(str,"つた","った","あいかがくさただとなばまもやゆよわらり");
 str=s(str,"でつち上げ","でっち上げ");
 str=s(str,"でつちあげ","でっちあげ");
 str=_s(str,"つち","っち","あこそどぼぽ");
 str=s(str,"うつてつけ","うってつけ");
 str=_s(str,"つて","って","あいかがきぎくぐこさしそただちてとどなはばぱべぼぽぶまもやよらるれわん、，");
 str=_s(str,"かって","かつて","がはも\n \r\n",1);//補正
 str=s(str,"をはかつて","をはかって");//補正
 str=_s(str,"つと","っと","きぐざじずそぞぱほや");
 str=s(str,"ちつとも","ちっとも");
 str=s(str,"もちつと","もちっと");
 str=_s(str,"もつと","もっと","がはもら\n \r\n",1);
 str=s(str,"もつとも","もっとも");
 str=s_(str,"つ","っ","ぱぴぷぺぽ腹子");
 str=_s(str,"つ","っ","真す");
 str=_s(str,"しつ","しっ","ばぱびぴ");
 str=s(str,"下さつ","下さっ");
 str=s(str,"しみつたれ","しみったれ");
 str=s(str,"さつさと","さっさと");

 return str;
}				//【j_small 終】
function sentence0(str){
 var bz="あ".length;
 str=exs_(str,"яったん","いったん","でだ");//修正		【sentence0.1】
 str=s_(str,"ゐたってゐ","いたってゐ","るれなずまよ");//修正
 str=s_(str,"っとゐ","っとい","たて");//修正
 str=s_(str,"はゐて","はいて","捨す");//修正
 str=s(str,"結構ひ","結構い");//修正
 str=s_(str,"頂","戴","かきくけこい");		//【sentence0.2】
 str=s(str,"言を待","言を俟");
 str=s(str,"でたらめ","出鱈目");
// str=s(str,"最も","尤も");	2.2停止
// str=s(str,"已む","止む");	2.2停止
 str=s(str,"比喩","譬喩");
// str=s(str,"具合","工合");	2.2停止

 str=s(str,"關連","關聯");			//【sentence0.3】
 str=s(str,"總連","總聯");
 str=s(str,"連關","聯關");
 str=s(str,"連句","聯句");
 str=s(str,"連係","聯繋");	//連係→連繋→聯繋を此行で直接聯繋とする樣に修正
 str=s(str,"連繋","聯繋");
 str=s(str,"連結","聯結");
 str=s(str,"連碁","聯碁");
 str=s(str,"連合","聯合");
 str=s(str,"連珠","聯珠");
 str=s(str,"連詞","聯詞");
 str=s(str,"連奏","聯奏");
 str=s(str,"連想","聯想");
 str=s(str,"連隊","聯隊");
 str=s(str,"連彈","聯彈");
 str=s(str,"連邦","聯邦");
 str=s(str,"連盟","聯盟");
 str=s(str,"連絡","聯絡");
 str=s(str,"連立","聯立");
 str=s(str,"丁重","鄭重");
 str=s(str,"一丁","一挺");
 str=s(str,"衣装","衣裳");
 str=s(str,"装丁","裝幀");	//装幀になつてたので修正
 str=s(str,"符丁","符牒");
 str=s(str,"包丁","疱丁");
 str=s(str,"丁寧","叮嚀");
 str=s(str,"企畫","企劃");
 str=s(str,"區畫","區劃");
 str=s(str,"計畫","計劃");
 str=s(str,"畫數","劃數");
 str=s(str,"畫期的","劃期的");
 str=s(str,"畫然","劃然");
 str=s(str,"英才","穎才");
 str=s(str,"知恵","智慧");
 str=s(str,"無知","無智");
 str=s(str,"英知","叡智");
 str=s(str,"機知","機智");
 str=s(str,"知識","智識");
 str=s(str,"知能\a".substring(0,2*bz),"智能\a".substring(0,2*bz));
 str=s(str,"知謀","智謀");
 str=s(str,"理知","理智");
 str=s(str,"憶説","臆説");
 str=s(str,"憶測","臆測");
 str=s(str,"恩義","恩誼");
 str=s(str,"囘送","廻送");
 str=s(str,"囘蟲","蛔蟲");
 str=s(str,"囘轉","廻轉");
 str=s(str,"轉倒","顛倒");
 str=s(str,"轉覆","顛覆");
 str=s(str,"七轉八倒","七顛八倒");
 str=s(str,"囘復","恢復");
 str=s(str,"囘廊","廻廊");
 str=s(str,"戒告","誡告");
 str=s(str,"教戒","敎晦");
 str=s(str,"訓戒","訓誡");
 str=s(str,"皆既食","皆既蝕");
 str=s(str,"日食","日蝕");
 str=s(str,"月食","月蝕");
 str=s(str,"侵食","侵蝕");
 str=s(str,"滲食","滲蝕");
 str=s(str,"腐食","腐蝕");
 str=s(str,"外郭","外廓");
 str=s(str,"輪郭","輪廓");
 str=s(str,"障害","障礙");
 str=s(str,"干害","旱害");
 str=s(str,"干天","旱天");
 str=s(str,"肝心","肝腎");
 str=s(str,"希元素","稀元素");
 str=s(str,"希釋","稀釋");
 str=s(str,"希少","稀少");
 str=s(str,"希代","稀代");
 str=s(str,"希薄","稀薄");
 str=s(str,"古希","古稀");
 str=s_(str,"希","稀","だに");
 str=s(str,"氣炎","氣焔");
 str=s(str,"記章","徽章");
 str=s(str,"援護","掩護");
 str=s(str,"義援","義捐");
 str=s(str,"技量","技倆");
 str=s(str,"遺跡","遺蹟");
 str=s(str,"奇跡","奇蹟");
 str=s(str,"奇辯","詭辯");
 str=s(str,"舊跡","舊蹟");
 str=s(str,"史跡","史蹟");
 str=s(str,"眞跡","眞蹟");
 str=s(str,"筆跡","筆蹟");
 str=s(str,"古跡","古蹟");
 str=s(str,"手跡","手蹟");
 str=s(str,"漁勞","漁撈");
 str=s(str,"供應","饗應");
 str=s(str,"凶惡","兇惡");
 str=s(str,"凶漢","兇漢");
 str=s(str,"凶噐","兇噐");
 str=s(str,"凶行","兇行");
 str=s(str,"凶變","兇變");
 str=s(str,"凶暴\a".substring(0,2*bz),"兇暴\a".substring(0,2*bz));
 str=s(str,"元凶","元兇");
 str=s(str,"強固","鞏固");
 str=s(str,"興奮","亢奮");
 str=s(str,"掘削","掘鑿");
 str=s(str,"薫製","燻製");
 str=s(str,"係留","繋留");
 str=s(str,"乾留","乾溜");
 str=s(str,"蒸留","蒸溜");
 str=s(str,"決起","蹶起");
 str=s(str,"決別","訣別");
 str=s(str,"研摩","研磨");
 str=s(str,"摩滅","磨滅");
 str=s(str,"嚴然","儼然");
 str=s(str,"弦樂","絃樂");
 str=s(str,"三弦","三絃");
 str=s(str,"枯渇","涸渇");
 str=s(str,"雇用","雇傭");
 str=s(str,"交歡","交驩");
 str=s(str,"交差","交叉");
 str=s(str,"雜踏","雜沓");
 str=s(str,"贊辭","讃辭");
 str=s(str,"贊歎","讃嘆");
 str=s(str,"贊美","讃美");
 str=s(str,"稱贊","稱讚");
 str=s(str,"賞贊","賞讚");
 str=s(str,"絶贊","絶讚");
 str=s(str,"驛辯","驛辨");
 str=s(str,"勘辯","勘辨");
 str=s(str,"辯慶","辨慶");
 str=s(str,"辯告","辨告");
 str=s(str,"辯濟","辨濟");
 str=s(str,"辯識","辨識");
 str=s(str,"辯償","辨償");
 str=s(str,"辯證","辨證");
 str=s(str,"辯舌","辨舌");
 str=s(str,"辯當","辨當");
 str=s(str,"安全辯","安全瓣");
 str=s(str,"花辯","花瓣");
 str=s(str,"止辯","止瓣");
 str=s(str,"五辯","五瓣");
 str=s(str,"辯膜","瓣膜");
 str=s(str,"辯鰓","瓣鰓");
 str=s(str,"辯韓","弁韓");
 str=s(str,"辯辰","弁辰");
 str=s(str,"辯髦","弁髦");
 str=s(str,"暗唱","諳誦");
 str=s(str,"吟唱","吟誦");
 str=s(str,"暗夜","闇夜");
 str=s(str,"意向","意嚮");
 str=s(str,"慰謝","慰藉");
 str=s(str,"陰影","陰翳");
 str=s(str,"火炎","火焔");
// str=s(str,"氣焔","氣焔");	2.2 無意味行を削除
 str=s(str,"壞滅","潰滅");
 str=s(str,"壞亂","潰亂");
 str=s(str,"激高","激昂");//v3.2 追加
 str=s(str,"決壞","決潰");
 str=s(str,"全壞","全潰");
 str=s(str,"倒壞","倒潰");
 str=s(str,"崩壞","崩潰");
 str=s(str,"快活","快濶");
 str=s(str,"活發","活潑");	//2.2 溌から修正
 str=s(str,"溌剌","潑溂");
 str=s(str,"潑剌","潑溂");
 str=s(str,"溌溂","潑溂");	//以上3行追加
 str=s(str,"發酵","醱酵");
 str=s(str,"反發","反撥");
 str=s(str,"亂發","濫發");
 str=s(str,"間缺","間歇");
 str=s(str,"關數","函數");//v2.2 凾から修正
 str=s(str,"奇形","畸形");
 str=s(str,"奇談","綺談");
 str=s(str,"奇譚","綺譚");
 str=s(str,"飢餓","饑餓");
 str=s(str,"飢饉","饑饉");
 str=s(str,"糾彈","糺彈");
 str=s(str,"糾明","糺明");
 str=s(str,"恐々","兢々");
 str=s(str,"更生","甦生");//v4.1 追加
 str=s(str,"廣壯","宏壯");
 str=s(str,"廣大","宏大");
 str=s(str,"廣範","廣汎");
 str=s(str,"廣報","弘報");
 str=s(str,"廣野","曠野");
 str=s(str,"控除","扣除");
 str=s(str,"講和","媾和");
 str=s(str,"鑛業","礦業");
 str=s(str,"鑛石","礦石");
 str=s(str,"炭鑛","炭礦");
 str=s(str,"香典","香奠");
 str=s(str,"高騰","昂騰");
 str=s(str,"高揚","昂揚");
 str=s(str,"格鬪","挌鬪");
 str=s(str,"骨格","骨骼");
 str=s(str,"根底","根柢");
 str=s(str,"混交","混淆");
 str=s(str,"混迷","昏迷");
 str=s(str,"散水","撒水");
 str=s(str,"散布","撒布");
 str=s(str,"刺激","刺戟");
 str=s(str,"死體","屍體");	//元版は"屍躰"、異體字なので改正
 str=s(str,"試練","試煉");
 str=s(str,"修練","修煉");
 str=s(str,"洗練","洗煉");
 str=s(str,"練炭","煉炭");
 str=s(str,"練乳","煉乳");
 str=s(str,"練瓦","煉瓦");
 str=s(str,"射幸心","射倖心");
 str=s(str,"薄幸","薄倖");
 str=s(str,"車兩","車輛");
 str=s(str,"兩生","兩棲");
 str=s(str,"生息","棲息");
 str=s(str,"集荷","蒐荷");
 str=s(str,"集落","聚落");
 str=s(str,"集録","輯録");
 str=s(str,"特集","特輯");
 str=s(str,"編集","編輯");
 str=_s(str,"編","篇","短長名佳初続前後全正一二三四五六七八九十〇１２３４５６７８９０");
 str=s(str,"書簡","書翰");
 str=s(str,"敍情","抒情");
 str=s(str,"消却","銷却");
 str=s(str,"消沈","銷沈");
 str=s(str,"焦燥","焦躁");
 str=s(str,"象眼","象嵌");
 str=s(str,"障礙","障碍");
 str=s(str,"障壁","牆壁");
 str=s(str,"妨害","妨碍");
 str=s(str,"情義","情誼");
 str=s(str,"恩誼","恩誼");
 str=s(str,"食盡","蝕甚");
 str=s(str,"伸長","伸暢");
 str=s(str,"攻略","攻掠");	//【追加】
 str=s(str,"侵略","侵掠");
 str=s(str,"奪略","奪掠");
 str=s(str,"略取","掠取");
 str=s(str,"略奪","掠奪");
 str=s(str,"針術","鍼術");
 str=s(str,"尋問","訊問");
 str=s(str,"酢酸","醋酸");
 str=s(str,"衰退","衰頽");
 str=s(str,"退色","褪色");
 str=s(str,"退勢","頽勢");
 str=s(str,"退廢","頽廢");
 str=s(str,"制御","制禦");
 str=s(str,"防御","防禦");
 str=s(str,"先鋭","尖鋭");
 str=s(str,"先端","尖端");
 str=s(str,"專斷","擅斷");
 str=s(str,"扇情","煽情");
 str=s(str,"扇動","煽動");
 str=s(str,"洗淨","洗滌");
 str=s(str,"船倉","船艙");
 str=s(str,"選考","銓衡");
 str=s(str,"阻止","沮止");
 str=s(str,"阻喪","沮喪");
 str=s(str,"掃滅","剿滅");
 str=s(str,"下克上","下剋上");
 str=s(str,"相克","相剋");
 str=s(str,"總合","綜合");
 str=s(str,"總菜","惣菜");
 str=s(str,"族生","蔟生");
 str=s(str,"臺風","颱風");
 str=s(str,"暖房","煖房");
 str=s(str,"暖爐","煖爐");
 str=s(str,"注解","註解");
 str=s(str,"注釋","註釋");
 str=s(str,"脚注","脚註");
 str=s(str,"沈殿","沈澱");
 str=s(str,"停泊","碇泊");
 str=s(str,"抵觸\a".substring(0,2*bz),"觝觸\a".substring(0,2*bz));
 str=s(str,"途絶","杜絶");
 str=s(str,"踏襲","蹈襲");
 str=s(str,"破棄","破毀");
 str=s(str,"棄損","毀損");
 str=s(str,"破碎","破摧");
 str=s(str,"反旗","叛旗");
 str=s(str,"反逆","叛逆");
 str=s(str,"反抗","叛抗");
 str=s(str,"反骨","叛骨");
 str=s(str,"反亂","叛亂");
 str=s(str,"謀反","謀叛");
 str=s(str,"離反","離叛");
 str=s(str,"蠻族","蕃族");
 str=s(str,"繁殖","蕃殖");
 str=s(str,"飛語","蜚語");
 str=s(str,"腐亂","腐爛");
 str=s(str,"風刺","諷刺");
 str=s(str,"風諭","諷喩");
 str=s(str,"邊境","邊疆");
 str=s(str,"保育","哺育");
 str=s(str,"保母","保姆");
 str=s(str,"補佐","鋪佐");
 str=s(str,"補導","輔導");
 str=s(str,"舖装","鋪装");
 str=s(str,"包帶","繃帶");
 str=s(str,"放棄","抛棄");
 str=s(str,"放物","抛物");
 str=s(str,"暴\露","曝露");
 str=s(str,"膨大","厖大");
 str=s(str,"膨張","膨脹");
 str=s(str,"綿花","棉花");
 str=s(str,"模擬","摸擬");
 str=s(str,"模索","摸索");
 str=s(str,"模造","摸造");
 str=s(str,"模倣","摸倣");
 str=s(str,"盲動","妄動");
 str=s(str,"野卑","野鄙");
 str=s(str,"溶解","熔解");
 str=s(str,"溶岩","熔岩");
 str=s(str,"溶鑛","鎔鑛");
 str=s(str,"溶接","熔接");
 str=s(str,"亂獲","濫獲");
 str=s(str,"亂造","濫造");
 str=s(str,"亂讀","濫讀");
 str=s(str,"亂伐","濫伐");
 str=s(str,"亂用","濫用");
 str=s(str,"灣曲","彎曲");
 str=s(str,"灣入","彎入");
 str=s(str,"選文","撰文");
 str=s(str,"選集","撰集");
 str=s(str,"選著","撰著");
 str=s(str,"選述","撰述");
 str=s(str,"選者","撰者");
 str=s(str,"私選","私撰");
 str=s(str,"自選","自撰");
 str=s(str,"精選","精撰");
 str=s(str,"新選","新撰");
 str=s(str,"杜選","杜撰");
// str=s(str,"意圖","意図");	2.2 削除
 str=s(str,"斷固","斷乎");
 str=s(str,"抽選","抽籤");
 str=s(str,"防壓","防遏");
// str=s(str,"","");
// str=s(str,"","");
// str=s(str,"","");
// str=s(str,"","");
// str=s(str,"","");
// str=s(str,"","");
// str=s(str,"","");
 str=d4(str,0);//四段未然		【sentence0.4】
 str=d2(str,0);//下二段
 str=you_yau(str,0);//よう→やう

//方				【sentence0.5】
 str=_s(str,"ほう","はう","のた");
 str=s_(str,"ほう","はう","がでにへも");

//音便↓				【sentence0.6】
 str=s(str,"ちょうだい","ちやうだい");
 str=s(str,"さくじょ","さくぢよ");
 str=s(str,"じょせい","ぢよせい");
 str=s(str,"おじょう","おぢやう");
 str=s(str,"じょうだん","じようだん");
 str=s(str,"じょう","じやう");
 str=s(str,"そう","さう");
 str=s(str,"ぞう","ざう");
 str=s(str,"じゃま","じやま");
 str=_d4('r',0,str,"じゃ","ぢや");
 str=s(str,"じゃ","ぢや");
// str=s(str,"どう","だう");
// str=s(str,"おう","わう");
 str=s(str,"りゃ","れあ");
 str=s(str,"りゅう","りう");
 str=s(str,"しゅう","しう");
// str=s(str,"とう","たう");
 str=s(str,"がとう","がたう");//修正
 str=ex_s(str,"こう","かう","っり");//「けっこう」「りこう」
 str=_s(str,"しょう","せう","でま");
 str=_s(str,"ろう","らう","ただかあな","がにとつ。.、,）」』\n \r\n　");
 str=s(str,"ちょうさ","ちようさ");
 str=s(str,"ちょうじ","ちようじ");

//う→ふ				【sentence0.7】
 str=s(str,"おうぎ","あふぎ");
 str=s(str,"ふくろう","ふくろふ");
 str=s(str,"きょう","けふ");
 str=s(str,"きのう","きのふ");
// str=s(str,"つう","つふ"); //「普通」と競合、用途不明（必要なら復活させ次行で修正）
// str=s(str,"ふつふ","ふつう");
 str=s(str,"ちょうちょう","てふてふ");
 str=s(str,"かげろう","かげろふ");
 str=s(str,"ゆうがた","ゆふがた");
 str=s(str,"向こう","向かふ");

//お⇒ほ				【sentence0.8】
 str=_s(str,"なお","なほ","がはも\n \r\n",1);
 str=_s(str,"おり","ほり","とど");
 str=s_(str,"おおっぴら","おほつぴら","だに");
 str=s(str,"おおかた","おほかた");
 str=s(str,"おおごしょ","おほごしょ");
 str=s(str,"おおげさ","おほげさ");
 str=s_(str,"おおざっぱ","おほざっぱ","だにととかなでか");
 str=s_(str,"おおすじ","おほすぢ","にでは");
 str=s(str,"おおでを","おほでを");
 str=s(str,"おおて","おほて");
 str=s_(str,"おおはば","おほはば","だに");
 str=s_(str,"おおやけ","おほやけ","だにと");
 str=s(str,"ひとしお","ひとしほ");
 

//え→へ				【sentence0.9】
 str=s(str,"さえ","さへ");
 str=s(str,"さへてい","さえてい");//修正「冴えている」
 str=_d4('r',0,str,"さへ渡","さえ渡");//修正「冴え渡る」
 str=_d4('r',0,str,"さへわた","さえわた");//修正「冴え渡る」
 str=_d2(0,str,"さへ","さえ",1,"がはのも");//修正「冴える」
 str=_s(str,"まえ","まへ","おのらり");//前
 str=s_(str,"まえ","まへ","かとでにのはも、，\r\n \n");//前
 str=_s(str,"うえ","うへ","のるた。.、,\n \r\n");
 str=s_(str,"うえ","うへ","かではもにを、，\r\n \n",1);
 str=s(str,"たとえ","たとへ");
 str=s(str,"例えば","例へば");
 str=s(str,"いけにえ","いけにへ");
 str=s(str,"とこしえ","とこしへ");
 str=s(str,"ひとえに","ひとへに");
 str=s(str,"いにしえ","いにしへ");
 str=s(str,"そなえ","そなへ");
 str=s(str,"ひきかえ","ひきかへ");
 str=s(str,"とりかえ","とりかへ");

//お→を				【sentence0.10】
 str=s(str,"おうおう","をうをう");
 str=s(str,"おけら","をけら");
 str=s(str,"かおり","かをり");
 str=s(str,"みさお","みさを");
 str=s(str,"おさな","をさな");
 str=s(str,"おととい","をととひ");
 str=s(str,"おととし","をととし");
 str=s_(str,"おと","をと","こめ");
 str=s(str,"おんな","をんな");
 str=s(str,"おなご","をなご");
 str=s(str,"たおやか","たをやか");
 str=s(str,"おろち","をろち");

//じ→ぢ				【sentence0.11】
 str=s(str,"あじさい","あぢさゐ");
 str=s(str,"あじ","あぢ");
 str=s_(str,"いじ","いぢ","けめ");
 str=s(str,"くじら","くぢら");
 str=s(str,"げじげじ","げぢげぢ");
 str=s(str,"しめじ","しめぢ");
 str=s(str,"じいさ","ぢいさ","まん");
 str=s(str,"じいちゃん","ぢいちやん");
 str=s(str,"じじい","ぢぢい");
 str=exs_(str,"じじ","ぢぢ","つんゃゅょ");
 str=s(str,"おやじ","おやぢ");
 str=s_(str,"おじ","をぢ","さすしがはも");
 str=s_(str,"じみ","ぢみ","たて");
 str=s(str,"なめくじ","なめくぢ");
 str=s(str,"もじもじ","もぢもぢ");
 str=s(str,"もみじ","もみぢ");
 str=s(str,"わらじ","わらぢ");
 str=s(str,"のはじ","のはぢ");
 str=s_(str,"はじ","はぢ","とだでもを");
 str=s(str,"じっと","ぢつと");

//ず→づ				【sentence0.12】
 str=s(str,"いたずら","いたづら");
 str=s_(str,"いず","いづ","れこみ");
 str=s_(str,"うず","うづ","まめもら");
 str=s(str,"おのず","おのづ");
 str=s(str,"なかんずく","なかんづく");
 str=s(str,"よろず","よろづ");
 str=s(str,"わずか","わづか");
 str=ex_s(str,"まず","まづ","進す拝が励げ育く睨ら組込混こ荒さ積摘詰つ富と飲呑の踏ふば揉も病止や読詠よ");
 str=s(str,"先ず","先づ");
 str=s(str,"はずれ","はづれ");
 str=_s(str,"ずから","づから","みて");
 str=s(str,"ずつ","づつ");
 str=s(str,"きづつ","きずつ");//訂正 傷付く
 str=s(str,"ゆうずう","ゆうづう");
 

//わ→は				【sentence0.13】
 str=s(str,"しあわせ","しあはせ");
 str=s(str,"すなわち","すなはち");
 str=s(str,"たわごと","たはごと");
 str=s_(str,"たわ","たは","事言");
 str=s(str,"いわく","いはく");
 str=s_(str,"かわい","かはい","さそ");
 str=s(str,"きわめ","きはめ");
 str=s(str,"さわり","さはり");
 str=s(str,"いわば","いはば");
// str=s(str,"いわず","いはず");
// str=s(str,"いわぬ","いはぬ");
 str=s(str,"いわん","いはん");
// str=s(str,"いわな","いはな");
 str=s(str,"さわやか","さはやか");
 str=s(str,"たけなわ","たけなは");
// str=s(str,"たわけ","たはけ"); //【小飛社により編輯】「た訣」と競合のためコメントアウト
 str=s(str,"なりわい","なりはひ");
 str=s(str,"にわかに","にはかに");
 str=s(str,"にわとり","にはとり");
 str=s(str,"くわだて","くはだて");
 str=s(str,"かわや","かはや");
 str=s(str,"かわいそう","かはいさう");
 str=s(str,"かわうそ","かはうそ");
 str=s(str,"かわず","かはづ");
 str=s(str,"つわもの","つはもの");
 
//い→ゐ				【sentence0.14】
 str=s(str,"あい色","あゐ色");
 str=s(str,"いなか","ゐなか");
 str=s(str,"かもい","かもゐ");
 str=s(str,"いたたまれ","ゐたたまれ");
 str=_s(str,"ゐただ","いただ","てで");//訂正 頂く
 str=_s(str,"らい","らゐ","くぐ");
 str=s(str,"しばい","しばゐ");
 str=_s_(str,"せい","せゐ","のた","かでだとなに");

//い→ひ				【sentence0.15】
 str=s_(str,"あい","あひ","だま變濟成乘");
 str=_s(str,"あい","あひ","ばぐろ山見");
 str=s_(str,"あひまい","あいまい","なにだでかとか");//修正
 str=s(str,"たたずまい","たたずまひ");
 str=s_(str,"おい","おひ","返掛風越込先茂出立散付抜払目め");
 str=_s(str,"い","ひ","互類幸香災");
 str=s(str,"たがい","たがひ");
 str=s(str,"たぐい","たぐひ");
 str=exs_(str,"たとい","たとひ","いひ");//「したといいます」」 
 str=s(str,"勢い","勢ひ"); 
 str=s(str,"いきおい","いきおひ"); 
 str=s(str,"おいおい","おひおひ");
 str=s(str,"諍い","諍ひ");
 str=s(str,"いさかい","いさかひ");
 str=s(str,"づかい","づかひ");
 str=s(str,"くい止","くひ止");
 str=s(str,"くい込","くひ込");
 str=s_(str,"はい","はひ","囘廻出昇上登");
 str=s(str,"さいわい","さいはひ");
// str=s(str,"がよい","がよひ");//「～が良い」で誤変換
 str=s(str,"おいさき","おひさき");
 str=s(str,"うぐいす","うぐひす");
 str=s(str,"うれい","うれひ");
 str=s(str,"めまい","めまひ"); //【小飛社により追加】
 str=s(str,"目まい","目まひ"); //【小飛社により追加】

//え→ゑ				【sentence0.16】
 str=s(str,"えくぼ","ゑくぼ");
 str=s(str,"えぐい","ゑぐい");
 str=s(str,"えびす","ゑびす");
 str=s(str,"こずえ","こずゑ");
 str=_s(str,"こえ","こゑ","のない");//の声
 str=s(str,"ゆえ","ゆゑ");

//送り仮名統一			【sentence0.17】
 str=s(str,"因みに","因に");

 str=hira_dai(str);
 return str;
}				//【sentence0 終】
function hira_dai(str){
 str=s(str,"ゃ","や");
 str=s(str,"ゅ","ゆ");
 str=s(str,"ょ","よ");
 str=s(str,"ぁ","あ");
 str=s(str,"ぃ","い");
 str=s(str,"ぅ","う");
 str=s(str,"ぇ","え");
 str=s(str,"ぉ","お");
 str=s(str,"っ","つ");
 return str;
}				//【hira_dai 終】
function hira_kan(str,opt){
if(opt>4){
 str=_adj(0,str,'た','度');
 str=_s(str,"こと","事","たるうい");
 str=s(str,"てくれ","て呉れ");
 str=s(str,"ておくれ","てお呉れ");
 str=s(str,"をくれ","を呉れ");
 str=s(strz,"つもり","積り");
 str=_s(str,"いい","好い","のがも");
 str=s(str,"ながら","乍ら");
 str=s(str,"ここ","此處");
 str=s(str,"そこ","其処");
 str=s(str,"それ","其れ");
 str=s(str,"その","其の");
 str=s(str,"これ","此れ");
 str=s(str,"この","此の");
 str=s(str,"これ迄","是迄");
 str=s(str,"これ位","是位");
 str=s(str,"こればかり","是許");
 str=s(str,"これきり","是切り");
 str=s(str,"これっきり","是切り");
 str=s(str,"少しばかり","少許");
 str=s(str,"ばかり","許り");
 str=s(str,"かなり","可也");
 str=s(str,"おしゃれ","御洒落");
 str=s(str,"しゃれ","洒落");
 str=s(str,"ガラス","硝子");
 str=s(str,"ビン","罎");
 str=s(str,"テーブル","卓子");
 str=s(str,"フィート","呎");
 str=s(str,"りんご","林檎");
 str=s(str,"がま口","蝦蟇口");
 str=_s(str,"とても","迚も","。.、,は「『（");
 str=ex_s(str,"きっと","屹度","ばやゃご");

 str=s(str,"中國","支那");
 str=s(str,"ラテン","拉甸");
 str=s(str,"ヨーロッパ","歐羅巴");
 str=s(str,"アメリカ","亞米利加");
 str=s(str,"ロシア","露西亞");
 str=s(str,"ロンドン","倫敦");
 str=s(str,"パリ","巴里");
 str=s(str,"ドイツ","獨逸");
 str=s(str,"ベルリン","伯林");
 str=s(str,"イタリア","伊太利");
 str=s(str,"フランス","佛蘭西");
 str=s(str,"スペイン","西班牙");
 str=s(str,"スイス","瑞西");
 str=s(str,"ローマ","羅馬");
 str=s(str,"イギリス","英吉利");
 str=s(str,"インド","印度");
 str=s(str,"オランダ","和蘭");
 str=s(str,"ギリシャ","希臘");
}

if(opt>2){
 str=s_(str,"でき","出來","ずるなぬまて");
 str=s(str,"できよう","出來よう");
 str=s(str,"できれば","出來れば");
 str=s(str,"でてき","出て來");
 str=s(str,"でてく","出て來");
 str=s(str,"でてこ","出て來");
 str=_d4('r',0,str,"とかな","とか成");
 str=_d4('r',0,str,"とな","と成");
 str=_d4('r',0,str,"にな","に成");
 str=_d4('r',0,str,"にもな","にも成");
}
if(opt<=1){
 str=s(str,"いわゆる","いはゆる");
 str=s(str,"ゆえん","ゆゑん");
 str=s(str,"なおさら","なほさら");
 str=s(str,"いわんや","いはんや");
 str=s(str,"あえて","あへて");
 str=s(str,"とりあえず","とりあへず");
}else{
 str=s(str,"いわゆる","所謂");
 str=s(str,"こう云","斯う云");
 str=s(str,"ゆえん","所以");
 str=s(str,"なおさら","尚更");
 str=s(str,"いわんや","況や");
 str=s(str,"あえて","敢へて");
 str=s(str,"あへて","敢へて");
 str=s(str,"とりあえず","とり敢へず");
 str=s(str,"とりあへず","とり敢へず");
}
if(opt>1){
 str=s(str,"あまっさえ","剰へ");
 str=s(str,"あまつさえ","剰へ");
 str=s(str,"あたかも","恰も");
 str=s(str,"あらかじめ","豫め");
 str=s(str,"ありがた","有難");
 str=s(str,"ある程度","或程度");
 str=exs_(str,"いくら","幾ら","い");
 str=s(str,"いささか","聊か");
 str=s_(str,"いまま","い儘","、,。.\n \r\n　に");
 str=s(str,"いよいよ","愈々");
 str=s(str,"うんぬん","云々");
 str=s(str,"おいでに","御出でに");
 str=s(str,"およそ","凡そ");
 str=s(str,"かえって","却って");
 str=_adj(0,str,"おこがまし","烏滸がまし");
 str=_s(str,"ことに","殊に","がはも\n \r\n",1);
 str=s(str,"ことごとく","悉く");
 str=s(str,"この樣","斯樣");
 str=s(str,"さらに","更に");
 str=s(str,"しばしば","屡々");
 str=s(str,"しきりに","頻りに");
 str=s(str,"しきりと","頻りと");
 str=s(str,"しばらく","暫く");
 str=s(str,"しょせん","所詮");
 str=s(str,"すこぶる","頗る");
 str=s(str,"すでに","既に");
 str=s(str,"ただいま","唯今");
 str=s(str,"ただただ","唯々");
 str=s(str,"たまたま","偶々");
 str=s(str,"たまに","偶に");
 str=s(str,"たまま","た儘");
 str=s(str,"ちょうど","丁度");
 str=s(str,"とにかく","兔に角");
 str=_d4('s',0,str,"とみな","と看做");
 str=s(str,"ないがしろ","蔑ろ");
 str=s(str,"について","に就いて");
 str=s(str,"ついては","就いては");
 str=s(str,"において","に於て");
 str=s(str,"における","に於る");
 str=s(str,"ちょっと","一寸");
 str=s(str,"はことに","は殊に");
 str=_s_(str,"はず","筈","うくぐすずつづぬふぶむゆのなるない","かがはでだなに");
 str=s(str,"ほとんど","殆ど");
 str=s(str,"はなはだ","甚だ");
 str=s(str,"まかり","罷り");
 str=_s(str,"もし","若し","がはも\n \r\n",1);
 str=s(str,"もはや","最早");
 str=s(str,"もたら","齎");
 str=s(str,"もちろん","勿論");
 str=_s_(str,"もって","以て","を。.、,\n \r\n　（「『");
 str=s(str,"もっぱら","專ら");
 str=s(str,"やはり","矢張り");
 str=s(str,"よほど","餘程");
 str=s(str,"よっほど","餘程");
 str=s(str,"まっとう","全う");
 str=s(str,"えこひいき","依怙贔屓");
 str=s(str,"ひいき","贔屓");
 str=s(str,"たちまち","忽ち");
 str=s_(str,"とっさ","咄嗟","にの");
 str=s_(str,"にわか","俄か","にの");

}
else{
 str=s(str,"あまっさえ","あまつさへ");
 str=s(str,"あまつさえ","あまつさへ");
 str=_adj(0,str,"おこがまし","をこがまし");
 str=s(str,"ちょうど","ちやうど");
}
if(opt>3){
 str=s(str,"確か","慥か");
 str=s(str,"あるいは","或は");
 str=s(str,"いかなる","如何なる");
 str=s(str,"いかに","如何に");
 str=s_(str,"いかん","如何","にだでと");
 str=s(str,"いかがで","如何で");
 str=s(str,"のごとく","の如く");
 str=s(str,"ごとき","如き");
 str=s(str,"ごとし","如し");
 str=_s(str,"さて","扨て","がはも\n \r\n",1);
 str=s_(str,"しか","然","しも");
 str=s(str,"しかるに","然るに");
 str=s(str,"そもそも","抑も");
 str=s(str,"ちなみに","因に");
 str=s(str,"ついでに","序に");
 str=s(str,"ついに","遂に");
// str=s(str,"つまり","詰り");
// str=s(str,"詰まり","詰り");
 str=s(str,"なぜ","何故");
 str=s(str,"むしろ","寧ろ");
 str=s(str,"もっとも","尤も");
 str=_d4('r',0,str,"つま","詰");
 str=_adj(0,str,'ひど','酷');

 str=s(str,"やたら","矢鱈");
 str=_d2(0,str,"そびえ","聳え");
 str=_d4('m',0,str,"たたず","佇");
 str=_d2(0,str,"たしなめ","窘め");
}
else{
 str=s(str,"ついに","つひに");
}
 return str;
}				//【hira_kan 終】
function _s(str,org,dist,spec,opt){
 if(spec==null){spec=''}		//【_s.0 變數設定】
 if(opt!=null&&opt==1){
  spec+="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
  spec+="　！”＃＄％＆’（）＊＋，－．／０１２３４５６７８９：；＜＝＞？";
  spec+= "＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［￥］＾＿";
  spec+= "‘ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝～";
  spec+= "。「」、・ "
//console.log(spec);
 }
 var j=pt=0;
 var bef,dum;
 var bz="あ".length;
 var res = "";
 while((pt=str.indexOf(org))>-1){		//【_s.1】
//  if(str==''){break}// for NN2
  if((dum=str.substring(pt-bz,pt))==''){dum=res.substring(res.length-bz,res.length)};
  bef=str.substring(0,pt);
  str=str.substring(pt+org.length,str.length);
  if(!dum||spec.indexOf(dum)==-1){res+=bef+org}
  else{res+=bef+dist};
//  console.log(spec.indexOf(dum)+"|"+pt+"|"+org+"|"+dist+"|bef:"+bef+"|"+str+"|"+res)
 }
 return res+str;
}				//【_s 終】
function s_(str,org,dist,pos){
 if(pos==null){pos=''}
 var j=pt=0;
 var bef,dum;
 var bz="あ".length;
 var res="";
 while((pt=str.indexOf(org))>-1){		//【s_.1】
//  if(str==''){break}// for NN2
  dum=str.substring(pt+org.length,pt+org.length+bz);
  bef=str.substring(0,pt);
  str=str.substring(pt+org.length,str.length);
  if(!dum||pos.indexOf(dum)==-1){res+=bef+org}
  else{res+=bef+dist};
//  console.log(pt+"|"+org+"|"+dist+"|bef:"+bef+"|"+str+"|"+res)
 }
 return res+str;
}				//【s_ 終】
function _s_(str,org,dist,pre,pos){
 if(pre==null){pre=''}
 if(pos==null){pos=''}
 var j=pt=0;
 var bef,dpre,dpos;
 var bz="あ".length;
 var res="";
 while((pt=str.indexOf(org))>-1){		//【_s_.1】
//  if(str==''){break}// for NN2
  dpos=str.substring(pt+org.length,pt+org.length+bz);
  if((dpre=str.substring(pt-bz,pt))==''){dpre=res.substring(res.length-bz,res.length)};
  bef=str.substring(0,pt);
  str=str.substring(pt+org.length,str.length);
  if(!dpre||!dpos||(pre.indexOf(dpre)==-1||pos.indexOf(dpos)==-1)){res+=bef+org}
  else{res+=bef+dist};
//  console.log(pt+"|"+org+"|"+dist+"|"+dpre+"|"+dpos+"|bef:"+pre+"|pos:"+pos+"|"+str+"|"+res)
 }
 return res+str;
}				//【_s_ 終】
function _or_(str,org,dist,pre,pos){
 if(pre==null){pre=''}
 if(pos==null){pos=''}
 var j=pt=0;
 var bef,dpre,dpos;
 var bz="あ".length;
 var res="";
 while((pt=str.indexOf(org))>-1){		//【_or_.1】
//  if(str==''){break}// for NN2
  dpos=str.substring(pt+org.length,pt+org.length+bz);
  if((dpre=str.substring(pt-bz,pt))==''){dpre=res.substring(res.length-bz,res.length)};
  bef=str.substring(0,pt);
  str=str.substring(pt+org.length,str.length);
  if(!dpre||!dpos||(pre.indexOf(dpre)==-1&&pos.indexOf(dpos)==-1)){res+=bef+org}
  else{res+=bef+dist};
//  console.log(pt+"|"+org+"|"+dist+"|"+dpre+"|"+dpos+"|bef:"+pre+"|pos:"+pos+"|"+str+"|"+res)
 }
 return res+str;
}				//【_or_ 終】
function s(str,org,dist){
 var j=pt=0;
 var bef;
 var res = "";
 while((pt=str.indexOf(org))>-1){
//  if(str=="")break;// for NN2 重要!!
  bef=str.substring(0,pt);
  str=str.substring(pt+org.length,str.length);
  res+=bef+dist;
 }
 return res+str;
}				//【s 終】
function ex_s(str,org,dist,excp){
 if(excp==null){excp=''}
 var j=pt=0;
 var bef,dum;
 var bz="あ".length;
 var res = "";
 while((pt=str.indexOf(org))>-1){
//  if(str=="")break;// for NN2 重要!!
  dum=str.substring(pt-bz,pt);
  bef=str.substring(0,pt);
  str=str.substring(pt+org.length,str.length);
  if(dum&&excp.indexOf(dum)>-1){res+=bef+org}
  else{res+=bef+dist};
//  console.log(org+"|"+dist+"|"+excp+"|"+dum+"|"+res)
 }
 return res+str;
}				//【ex_s 終】
function exs_(str,org,dist,excp){
 if(excp==null){excp=''}
 var j=pt=0;
 var bz="あ".length;
 var bef;
 var res = "";
 while((pt=str.indexOf(org))>-1){
//  if(str=="")break;// for NN2 重要!!
  bef=str.substring(0,pt);
  if(excp.indexOf(str.substring(pt+org.length,pt+org.length+bz))==-1){res+=bef+dist}
  else{res+=bef+org}
  str=str.substring(pt+org.length,str.length);
 }
 return res+str;
 return res+str;
}				//【exs_ 終】
function ha4(str,opt){//は行四段 opt=0:現⇒正 opt=1:正⇒現
 if(opt==0){str=_ha4(opt,str,"食ら","喰ら")}else{str=_ha4(opt,str,"食ら")};
 str=_ha4(opt,str,"くいあ","くひあ");//食い合う
 str=_ha4(opt,str,"く","く",1,"もを");//も食う
 str=_ha4(opt,str,"あ","あ",1,"がにでともみれしきり");//が会う
 str=_ha4(opt,str,"あしら");
 str=_ha4(opt,str,"あじわ","あぢは");
 str=_ha4(opt,str,"あがな");
 str=_ha4(opt,str,"あげつら");
 str=_ha4(opt,str,"あてが");
 str=_ha4(opt,str,"あざな");
 str=_ha4(opt,str,"あら");
 str=_ha4(opt,str,"いざな");
 str=_ha4(opt,str,"うかが");
 str=_ha4(opt,str,"うしな");
 str=_ha4(opt,str,"うた");
 str=_ha4(opt,str,"うたが");
 str=_ha4(opt,str,"うるお","うるほ");
 str=_ha4(opt,str,"うれ");
 str=_ha4(opt,str,"おこな");
 str=_d4('s',opt,str,"たお","たふ");//「おそう」の前
 str=_ha4(opt,str,"おそ");
 str=_ha4(opt,str,"おお","おほ");
 if(opt==0){str=s(str,"おほひ","おほい")};//おおう の後
 str=_ha4(opt,str,"おも");
 str=_ha4(opt,str,"かかずら","かかづら");
 str=_ha4(opt,str,"かくま");
 str=_ha4(opt,str,"かな","かな",1,"がはも");//が叶う
 str=_ha4(opt,str,"かば");
 str=_ha4(opt,str,"かま");
 if(opt==0){str=s_(str,"かよう","かやう","なに")}else{str=s(str,"かやう","かよう","なに")};//かよう の前
 str=_ha4(opt,str,"かよ");
 str=_ha4(opt,str,"からか");
 str=_ha4(opt,str,"きら");
 str=_ha4(opt,str,"さすら");
 str=_ha4(opt,str,"さまよ");
 str=_ha4(opt,str,"さら");
 str=_ha4(opt,str,"したが");
 str=_ha4(opt,str,"しま","しま","そ");//「いそしもう」誤変換対策
 if(opt==0){str=_s(str,"しまひと","しまいと","と、")};//「～しようとしまいと」誤変換
 str=_ha4(opt,str,"じま","ぢま");//「で仕舞う」の音便
 str=_ha4(opt,str,"すく");
 str=_ha4(opt,str,"そこな");
 str=_ha4(opt,str,"そろ");
 str=_ha4(opt,str,"ためら");
 str=_ha4(opt,str,"ちが");
 if(opt==0){str=_s_(str,"ちがひ","ちがい","た","たるなまれっ")};//修正「～子供たちがいる」}
 str=_ha4(opt,str,"ちゃ","ちや");
 if(opt==0){str=s_(str,"ちやひ","ちやい","けや")};//修正「～ちゃいけない」「～ちゃいや」}
 str=_ha4(opt,str,"じゃ","ぢや");
 str=_ha4(opt,str,"つか","つか","け");//「けっこう」
 str=_ha4(opt,str,"つが");
 str=_d2(opt,str,"うったえ","うつたへ");
 str=_d2(opt,str,"たえ","たへ");
 str=_ha4(opt,str,"つた","つた","い");//「いつたはうが」
 if(opt==1){str=s(str,"つたわず","つたはず")};//～ったはず
 str=_ha4(opt,str,"つちか");
 str=_ha4(opt,str,"つらま");
 str=_ha4(opt,str,"をてら");//「～をてらう」
 str=_ha4(opt,str,"ととの");
 str=_ha4(opt,str,"ともな");
 str=s(str,"こともなひ","こともない");//修正 事もない
 str=_ha4(opt,str,"なら","なら",1,"がのをにとらりでは");//「それならいっしょ」
 str=_ha4(opt,str,"にお","にほ");
 str=s_(str,"にほひ","におい","でて");//修正 においで、において
 str=_ha4(opt,str,"にぎわ","にぎは");
 str=_ha4(opt,str,"にな","にな","こ");
 str=ex_s(str,"になひ","にない","をがでも");//修正「～に無い」
 str=_ha4(opt,str,"ぬぐ");
 str=_ha4(opt,str,"ねが");
 str=_ha4(opt,str,"ねぎら");
 str=_ha4(opt,str,"ねら");
 str=_ha4(opt,str,"たま");
 str=_ha4(opt,str,"のろ");
 str=_ha4(opt,str,"はから");
 str=_ha4(opt,str,"はら","はら",1,"がにはへを");//が払う
 str=_ha4(opt,str,"ばら");
 str=_ha4(opt,str,"ぱら");
 str=_ha4(opt,str,"ひろ");
 str=_ha4(opt,str,"ふる");
 str=_ha4(opt,str,"へつら");
 str=_ha4(opt,str,"まかな");
 str=_ha4(opt,str,"まが");
 str=_ha4(opt,str,"まじな");
 str=_ha4(opt,str,"まと");
 str=_ha4(opt,str,"まど");
 str=_ha4(opt,str,"ものい","ものい");
 str=_ha4(opt,str,"まよ");
 str=_ha4(opt,str,"むか");
// str=_ha4(opt,str,"むく");
 str=_ha4(opt,str,"もら");
 str=_ha4(opt,str,"やしな");
 str=_ha4(opt,str,"やすら");
 str=_ha4(opt,str,"やと");
 str=_ha4(opt,str,"よそお","よそほ");
 str=_ha4(opt,str,"わずら","わづら");
 str=_ha4(opt,str,"わら");
 return str;
}				//【ha4 終】
function _ha4(opt,str,tgt,tgt1,excp,pre){
 if(tgt1==null||tgt1==''){tgt1=tgt}
 if(excp==null){excp=''}
 var bz="あ".length;
 var res="";
 var pt=0;
 var chrB="　";
 var chr,chrN,chrNN,chrNN2;
 if(opt==0){			//【_ha4.1 opt=0:現⇒正】
  for(j=0;j<str.length;j++){
   if((j=str.indexOf(tgt,pt))==-1){break}
   chrN=str.substring(tgt.length+j,tgt.length+j+bz);
   if(excp!=1&&excp.indexOf(chrB=str.substring(j+1-2*bz,j+1-bz))==-1||(excp==1&&pre.indexOf(chrB=str.substring(j+1-2*bz,j+1-bz))>-1)){
    chrNN=str.substring(tgt.length+j+bz,tgt.length+j+2*bz);
    chrNN2=str.substring(tgt.length+j+bz,tgt.length+j+3*bz);
    if(chrN=="わ"){res+=str.substring(pt,j)+tgt1+"は"}
    else if(chrN+chrNN=="おう"){res+=str.substring(pt,j)+tgt1+"はう";j+=bz;}
    else if(chrN=="い"&&chrNN2=="よう"){res+=str.substring(pt,j)+tgt1+"ひやう";j+=2*bz;}
    else if(chrN=="い"&&"なずて".indexOf(chrNN)==-1){res+=str.substring(pt,j)+tgt1+"ひ"}
    else if(chrN=="う"&&("たて".indexOf(chrNN)==-1||chrNN2=="ため")){res+=str.substring(pt,j)+tgt1+"ふ"}
    else if(chrN=="え"&&"に".indexOf(chrNN)==-1){res+=str.substring(pt,j)+tgt1+"へ"}
    else{res+=str.substring(pt,j)+tgt+chrN}
   }else{res+=str.substring(pt,j)+tgt+chrN}
//  ;if(!window.confirm(pt+"|"+j+" |"+tgt+"|"+chrB+"|"+chrN+"|"+chrNN+"|"+res)){break}
   j+=tgt.length+bz;
   pt=j;
  }
  return res+str.substring(pt,str.length);
 }
 else{				//【_ha4.2 opt=1:正⇒現】
  for(j=0;j<str.length;j++){
   if((j=str.indexOf(tgt1,pt))==-1){break}
   chrN=str.substring(tgt1.length+j,tgt1.length+j+bz);
   if(excp!=1&&excp.indexOf(chrB=str.substring(j+1-2*bz,j+1-bz))==-1||(excp==1&&pre.indexOf(chrB=str.substring(j+1-2*bz,j+1-bz))>-1)){
    chrNN2=str.substring(tgt.length+j+bz,tgt.length+j+3*bz);
    chrNN=str.substring(tgt1.length+j+bz,tgt1.length+j+2*bz);
    if(chrN=="は"&&"あせずつなぬねばるれん".indexOf(chrNN)>-1){res+=str.substring(pt,j)+tgt+"わ"}
    else if(chrN+chrNN=="はう"){res+=str.substring(pt,j)+tgt+"おう";j+=bz;}
    else if(chrN+chrNN2=="ひやう"){res+=str.substring(pt,j)+tgt+"いよう";j+=2*bz;}
    else if(chrN=="ひ"&&"なず".indexOf(chrNN)==-1){res+=str.substring(pt,j)+tgt+"い"}
    else if(chrN=="ふ"){res+=str.substring(pt,j)+tgt+"う";}
    else if(chrN=="へ"&&"」）！　。、，がさざずたてどなばぬまやよるられを方出事\r".indexOf(chrNN)>-1){res+=str.substring(pt,j)+tgt+"え"}
    else if("つっ".indexOf(chrN)>-1&&"たちてと".indexOf(chrNN)>-1){res+=str.substring(pt,j)+tgt+chrN}
    else{res+=str.substring(pt,j)+tgt1+chrN}
   }else{res+=str.substring(pt,j)+tgt1+chrN}
//  if(!window.confirm(pt+"|"+j+" |"+tgt+"|"+tgt1+"|"+chrB+"|"+chrN+"|"+chrNN+"|"+chrNN2+"|"+res)){break}
   j+=tgt1.length+bz;
   pt=j;
  }
  return res+str.substring(pt,str.length);
 }
}				//【_ha4 終】
function d2(str,opt){//下二段
 str=_d2(opt,str,"こらえ","こらへ");
 str=_d2(opt,str,"あつらえ","あつらへ");
 str=_d2(opt,str,"うえ","うゑ");
 str=_d2(opt,str,"おえ","をへ");
 str=_d2(opt,str,"おさえ","をさへ");
 str=_d2(opt,str,"おさめ","をさめ");
 str=_d2(opt,str,"おしえ","をしえ");
 str=_d4('k',opt,str,"おじけず","おぢけづ");//おじける の前
 str=_d2(opt,str,"おじけ","おぢけ");
 str=_d2(opt,str,"おとずれ","おとづれ");
 str=_d2(opt,str,"おとろえ","おとろへ");
 str=_d2(opt,str,"かえ","かへ");
 str=_d2(opt,str,"がえ","がへ");
 str=_d2(opt,str,"くわえ","くはへ");
 str=_d2(opt,str,"くわだて","くはだて");
 str=_d2(opt,str,"こしらえ","こしらへ");
 str=_d2(opt,str,"こわれ","こはれ");
 str=_d2(opt,str,"さずけ","さづけ");
 str=_d2(opt,str,"しい","しひ",1,"。．、，　 \r\nがにもを")
 if(opt==0){str=s_(str,"しひれ","しいれ","るずなよれたま")}//修正「仕入れる」
 str=_d2(opt,str,"すえ","すゑ");
 str=_d2(opt,str,"ずけ","づけ","つ");
 str=_d2(opt,str,"そなえ","そなへ");
 str=_d2(opt,str,"たずね","たづね");
 str=_d2(opt,str,"とじ","とぢ","こ");//「ことじたいが」
 str=_d2(opt,str,"とらえ","とらへ");
 str=_d2(opt,str,"とらわれ","とらはれ");
 str=_d2(opt,str,"とりかえ","とりかへ");
 str=_d2(opt,str,"なめず","なめづ");
 str=_d2(opt,str,"はず","はづ",1,"がはもの");
 str=_d2(opt,str,"はずれ","はづれ");
 str=_d2(opt,str,"はじ","はぢ");
 str=_d2(opt,str,"ひきかえ","ひきかへ");
 str=_d2(opt,str,"ひきい","ひきゐ");
 str=_d2(opt,str,"もうけ","まうけ");
 str=_d2(opt,str,"まじえ","まじへ");
 str=_d2(opt,str,"もらえ","もらへ");
 str=_d2(opt,str,"もちい","もちゐ");
 str=_d2(opt,str,"ゆわえ","ゆはへ");
 return str;
}				//【d2 終】
function _d2(opt,str,tgt,tgt1,excp,pre){//excpは例外
 var t=new Array();
 if(tgt1==null||tgt1==''){tgt1=tgt}
 if(excp==null){excp=''}
 t[opt]=tgt1;t[Math.abs(opt-1)]=tgt;	//【現⇒正と正⇒現の分岐　_ha4もかうした方が簡潔では】
 var bz="あ".length;
 var res = "";
 var pt=0;
 var chr,chrB,chrN,chrNN;
 
  for(j=0;j<str.length;j++){			//【_d2.1】
   if((j=str.indexOf(t[1],pt))==-1){break}
   chrB=str.substring(j-bz,j);
   chrN=str.substring(t[1].length+j,t[1].length+j+bz);
   chrNN=str.substring(t[1].length+j+bz,t[1].length+j+2*bz);
   if(excp==1&&pre.indexOf(chrB)>-1&&"ずたてなぬばまるれろよん。.、, \n　\r\n".indexOf(chrN)>-1){res+=str.substring(pt,j)+t[0]+chrN}
   else if(excp!=1&&("ずたてなぬるれろよん。.、, 難\n　\r\n".indexOf(chrN)>-1||"ます|ませ|まし|まい|がた".indexOf(chrN+chrNN)>-1)&&excp.indexOf(chrB)==-1){res+=str.substring(pt,j)+t[0]+chrN}
   else{res+=str.substring(pt,j)+t[1]+chrN}
//  if(!window.confirm("0)"+pt+"|"+j+" |"+tgt+"|"+tgt1+"|"+chrN+"|"+chrNN+"|"+res)){break}
   j+=t[1].length+bz;
   pt=j;
  }					//【_d2.1終】
  return res+str.substring(pt,str.length);
}					//【_d2 終】
function d4(str,opt){ //四段未然 opt=0:現⇒正 opt=1:正⇒現
 str=_d4('r',opt,str,"おもね","阿");
 str=_d4('r',opt,str,"てこず","梃子摺");
 str=_d4('r',opt,str,"てこず","手子摺");
 str=_d4('r',opt,str,"よばわ","よばは");
 str=_d4('r',opt,str,"あいかわ","あひかは");
 str=_d4('m',opt,str,"あいす","あひす");
 str=_d4('g',opt,str,"あお","あふ");//仰ぐ
 str=exs_(str,"あふい","あをい","ただでて");//あおい⇒あをい
 str=_d4('g',opt,str,"あおむ","あふむ");//仰向く
 str=_d4('r',opt,str,"あお","あふ");//煽る･呷る
 str=_d4('r',opt,str,"あずか","あづか");
 str=_d4('r',opt,str,"あずけ","あづけ");
 str=_d4('b',opt,str,"あそ");
 str=_d4('r',opt,str,"あやつ");
 str=_d4('r',opt,str,"あらわ","あらは");
 str=_d4('s',opt,str,"あらわ","あらは");
 str=_d4('r',opt,str,"いきどお","いきどほ");
 str=_d4('r',opt,str,"いじ","いぢ");
 str=_d4('r',opt,str,"いじく","いぢく");
 str=_d4('r',opt,str,"いたわ","いたは");
 if(opt==1){str=s(str,"いたはりに","ゐたわりに")}//訂正
 str=_d4('r',opt,str,"いつわ","いつは");
 str=_d4('k',opt,str,"うず","うづ");
 str=_d4('k',opt,str,"うなず","うなづ");
 str=_d4('s',opt,str,"うるお","うるほ");
 str=_d4('k',opt,str,"えが","ゑが");
 str=_d4('r',opt,str,"えぐ","ゑぐ");
 str=_d4('m',opt,str,"をおし","をおし");//「～を惜しむ」
 str=_d4('m',opt,str,"うら");
 str=_d4('s',opt,str,"おか","をか");
 str=_d4('m',opt,str,"おが","をが");
 str=_d4('r',opt,str,"おわ","をは",1,"がはてでも");//が終る
 str=_d4('r',opt,str,"おど","をど");
 str=_d4('k',opt,str,"おのの","をのの");
 str=_d4('k',opt,str,"をお","をを");//を折る
// str=_d2(opt,str,"おれ","をれ");//が折れる【小飛社により編輯】「俺」と競合のためコメントアウト←效いてをらず
 str=_d4('r',opt,str,"こお","こほ");
 str=_d4('r',opt,str,"かけず","かけづ");
 str=_d4('s',opt,str,"かよわ","かよは");
 str=_d4('r',opt,str,"かえ","かへ");
 str=_d4('r',opt,str,"がえ","がへ");
 str=_d4('s',opt,str,"かえ","かへ");
 str=_d4('s',opt,str,"がえ","がへ");
 str=_d4('k',opt,str,"かたず","かたづ");
 str=_d4('k',opt,str,"かしず","かしづ");
 str=_d4('r',opt,str,"かぶ");
 str=_d4('s',opt,str,"かどわか","かどはか");
 str=_d4('r',opt,str,"かわ","かは");
 str=_d4('s',opt,str,"かわ","かは");
 if(opt==0){str=s(str,"ずきずき","づきづき")}else{str=s(str,"づきづき","ずきずき")};//きずくの前
 str=_d4('k',opt,str,"きずつ");
 str=_d4('k',opt,str,"きづ","きづ","づ");
 str=_d4('r',opt,str,"くい");
 str=_d4('r',opt,str,"くば");
 str=_d4('r',opt,str,"りくね");//曲がりくねる
 str=_d4('s',opt,str,"くりかえ","くりかへ");
 str=_d4('r',opt,str,"くわわ","くはは");
 str=_d4('s',opt,str,"くわ","くは");
 str=_d4('r',opt,str,"けず","けづ");
 str=_d4('r',opt,str,"こだわ","こだは");
 str=_d4('s',opt,str,"こわ","こは");
 str=_d4('r',opt,str,"さずか","さづか");
 str=_d4('g',opt,str,"さわ");
 str=_d4('m',opt,str,"しず","しづ");
 str=_d4('m',opt,str,"しゃが","しやが","か");//「おどかしやがって」
 str=_d4('r',opt,str,"しゃぶ","しやぶ");
 str=_d4('r',opt,str,"しゃべ","しやべ");
 str=_d4('g',opt,str,"そよ");
 str=_d4('g',opt,str,"たじろ","たぢろ");
 str=_d4('r',opt,str,"たずさわ","たづさは");
 str=_d4('r',opt,str,"たずさえ","たづさへ");
 str=_d4('m',opt,str,"たたず");
 str=_d4('m',opt,str,"たのし");
 str=_d4('r',opt,str,"たまわ","たまは");
 str=_d4('s',opt,str,"ついや","つひや");
 str=_d4('m',opt,str,"つか");
 str=_d4('r',opt,str,"と","と",1,"をでに");//を取る
 str=_d4('r',opt,str,"をとお","をとほ");//を通る
 str=_d4('s',opt,str,"どお","どほ");
 str=_d4('r',opt,str,"なお","なほ");
 str=_d4('s',opt,str,"なお","なほ");
 str=_d4('m',opt,str,"なご");
 str=_d4('m',opt,str,"なじ");
 str=_d4('m',opt,str,"なず","なづ");
 str=_d4('r',opt,str,"がはゐ","がはひ");//が入る　修正
 str=_d4('r',opt,str,"もはゐ","もはひ");//も入る
 str=_d4('r',opt,str,"にはゐ","にはひ","ず");//に入る「ずにはゐられない」
 str=_d4('r',opt,str,"へはゐ","へはひ","と");//へ入る「たとえはいらない」
// str=_d4('r',opt,str,"はい","はひ");//入る
 str=_d4('s',opt,str,"にぎわ","にぎは");
 str=_d4('r',opt,str,"ねじ","ねぢ");
 str=_d4('r',opt,str,"ねじ曲が","ねぢ曲が");
 str=_d2(opt,str,"ねじ曲げ","ねぢ曲げ");
 str=_d4('r',opt,str,"の","の","を");//乗る
 str=_d4('r',opt,str,"はいあが","はひあが");
 str=_d4('r',opt,str,"はいつくば","はひつくば");
 str=_d4('r',opt,str,"はいのぼ","はひのぼ");
 str=_d4('r',opt,str,"はいまわ","はひまは");
 str=_d4('m',opt,str,"はず","はづ");
 str=_d4('s',opt,str,"はず","はづ");
 str=_d4('r',opt,str,"まわ","まは");
 str=_d4('s',opt,str,"まわ","まは");
 str=_d4('m',opt,str,"はげ");
 str=_d4('g',opt,str,"はしゃ","はしや");
 str=_d4('r',opt,str,"はびこ");
 str=_d4('k',opt,str,"ひざまず","ひざまづ");
 str=_d4('r',opt,str,"ひるがえ","ひるがへ");
 str=_d4('s',opt,str,"ひるがえ","ひるがへ");
 str=_d4('r',opt,str,"ふさが");
 str=_d4('r',opt,str,"ほう","はふ");
 str=_d4('s',opt,str,"ほったらか","ほつたらか");
 str=_d4('m',opt,str,"ほほえ","ほほゑ");
 str=_d4('r',opt,str,"まい","まゐ");
 str=_d4('s',opt,str,"まぎらわ","まぎらは");
 str=_d4('r',opt,str,"まじわ","まじは");
 str=_d4('r',opt,str,"じ","じ",1,"ま交混雑");
 str=_d4('r',opt,str,"まつわ","まつは");
 str=_d4('s',opt,str,"もう","まう","す");
 str=_d4('r',opt,str,"もじ","もぢ");
 str=_d4('s',opt,str,"もよお","もよほ");
 str=_d4('r',opt,str,"てや","てや",1,"いきぎしじてでっひ");
 str=_d4('r',opt,str,"でや","でや",1,"ん");
 str=_d4('r',opt,str,"ゆず","ゆづ");
 str=_d4('r',opt,str,"よこたわ","よこたは");
 str=_d4('r',opt,str,"よじ","よぢ");
// str=_d4('m',opt,str,"ば");
// str=_d4('r',opt,str,"や");//最後に置く
 return str;
}					//【d4 終】
function _d4(k,opt,str,tgt,tgt1,excp,excp1){
 if(tgt1==null||tgt1==''){tgt1=tgt}
 if(excp==null){excp=''}
 if(excp1==null){excp1=excp}
 var bz="あ".length;
 var res = "";
 var pt=0;
 var chr,chrB,chrN,chrNN,chrNN2;
 var kn=new Array();
 var ko=new Array();
 kn['k']=ko['k']="かきくけこ";//イ音便
 kn['g']=ko['g']="がぎぐげご";//イ音便
 kn['s']=ko['s']="さしすせそ";
 kn['z']=ko['z']="ざじずぜぞ";
 kn['t']=ko['t']="たちつてと";
 kn['n']=ko['n']="なにぬねの";
 kn['b']=ko['b']="ばびぶべぼ";//ン音便
 kn['m']=ko['m']="まみむめも";//ン音便
 kn['r']=ko['r']="らりるれろ";//イ音便なし
 kn['R']=ko['R']="らりるれろ";//イ音便
 
 if(opt==1){				//【_d4.1 現⇒正】
  for(j=0;j<str.length;j++){
   if((j=str.indexOf(tgt1,pt))==-1){break}
   chrB=str.substring(j-bz,j);
   chrN=str.substring(tgt1.length+j,tgt1.length+j+bz);
   if(!excp||(excp1&&excp!=1&&excp1.indexOf(str.substring(j-bz,j))==-1)||(excp==1&&excp1.indexOf(chrB)>-1)){
    chrNN=str.substring(tgt1.length+j+bz,tgt1.length+j+2*bz);
    chrNN2=str.substring(tgt1.length+j+bz,tgt.length+j+3*bz);
    if("kgsztdbmrR".indexOf(k)>-1&&chrN+chrNN==ko[k].substring(0,bz)+"う"){res+=str.substring(pt,j)+tgt+kn[k].substring(4*bz,5*bz)+"う";j+=bz;}
    else if("kgsztdnbmrR".indexOf(k)>-1&&chrN+chrNN2==ko[k].substring(bz,2*bz)+"やう"){res+=str.substring(pt,j)+tgt+kn[k].substring(bz,2*bz)+"よう";j+=2*bz;}
    else if(k=='n'&&chrN+chrNN=="なう"&&chr=="し"){res+=str.substring(pt,j)+tgt+"のう";j+=bz;}
    else if(tgt1.indexOf("成")>-1&&chrN=="つ"&&"たちてと".indexOf(chrNN)>-1){res+=str.substring(pt,j)+tgt+"っ"}
    else if(chrN==ko[k].substring(0,bz)&&"ない|なく|なけ|せる|せれ|せよ|ねば|ねど|".indexOf(chrNN2)>-1){res+=str.substring(pt,j)+tgt+chrN+chrNN2;j+=2*bz}
    else if(chrN==ko[k].substring(0,bz)&&"れぬずん".indexOf(chrNN)>-1){res+=str.substring(pt,j)+tgt+chrN}
    else if(chrN==ko[k].substring(bz,2*bz)||chrN==ko[k].substring(2*bz,3*bz)||(chrN==ko[k].substring(3*bz,4*bz)&&"ずたばとどれるなよまぬ。.、,」』）".indexOf(chrNN)>-1)){res+=str.substring(pt,j)+tgt+chrN}
    else if("nbm".indexOf(k)>-1&&chrN=="ん"&&"だで".indexOf(chrNN)>-1){res+=str.substring(pt,j)+tgt+chrN}
    else if("kg".indexOf(k)>-1&&chrN=="い"&&("だたてでと".indexOf(chrNN)>-1||"ちま|ぢま".indexOf(chrNN2)>-1)){res+=str.substring(pt,j)+tgt+chrN}
    else if("R".indexOf(k)>-1&&chrN=="い"&&("とな。．、，」』）)！!".indexOf(chrNN)>-1||"ます|まし|ませ".indexOf(chrNN2)>-1)){res+=str.substring(pt,j)+tgt+chrN}
    else if("trR".indexOf(k)>-1&&chrN=="つ"&&("たてと".indexOf(chrNN)>-1||chrNN2=="ちま")){res+=str.substring(pt,j)+tgt+"っ"}
    else{res+=str.substring(pt,j)+tgt1+chrN}
   }
   else{res+=str.substring(pt,j)+tgt1+chrN}
//   if(!window.confirm(pt+"|"+j+" |"+tgt+"|"+tgt1+"|"+chrN+"|"+chrNN+"|"+chrNN2+"|"+res)){break}
   j+=tgt1.length+bz;
   pt=j;
  }
  return res+str.substring(pt,str.length);
 }					　//【_d4.1 終】
 else{					　//【_d4.2 正⇒現】
  for(j=0;j<str.length;j++){
   if((j=str.indexOf(tgt,pt))==-1){break}
   chrB=str.substring(j-bz,j);
   chrN=str.substring(tgt.length+j,tgt.length+j+bz);
   if(!excp||(excp&&excp!=1&&excp.indexOf(str.substring(j-bz,j))==-1)||(excp==1&&excp1.indexOf(chrB)>-1)){
    chrNN=str.substring(tgt.length+j+bz,tgt.length+j+2*bz);
    chrNN2=str.substring(tgt.length+j+bz,tgt.length+j+3*bz);
    if("kgsztdbmyrRw".indexOf(k)>-1&&chrN+chrNN==kn[k].substring(4*bz,5*bz)+"う"){res+=str.substring(pt,j)+tgt1+ko[k].substring(0,bz)+"う";j+=bz;}
    else if("kgsztdnbmyrRw".indexOf(k)>-1&&chrN+chrNN2==kn[k].substring(bz,2*bz)+"よう"){res+=str.substring(pt,j)+tgt1+ko[k].substring(bz,2*bz)+"やう";j+=2*bz;}
    else if(k=='n'&&chrN+chrNN=="のう"&&chr=="し"){res+=str.substring(pt,j)+tgt1+"なう";j+=bz;}
    else if((chrN==kn[k].substring(0,bz)&&"なぬねせれずん".indexOf(chrNN)>-1)||chrN==kn[k].substring(bz,2*bz)||chrN==kn[k].substring(2*bz,3*bz)||(chrN==kn[k].substring(3*bz,4*bz)&&"ずたばとどれるなよまぬ。.、,」』）".indexOf(chrNN)>-1)){res+=str.substring(pt,j)+tgt1+chrN}
    else if("nbm".indexOf(k)>-1&&chrN=="ん"&&"だで".indexOf(chrNN)>-1){res+=str.substring(pt,j)+tgt1+chrN}
    else if("kg".indexOf(k)>-1&&chrN=="い"&&("だたてでと".indexOf(chrNN)>-1||"ちま|ぢま".indexOf(chrNN2)>-1)){res+=str.substring(pt,j)+tgt1+chrN}
    else if("R".indexOf(k)>-1&&chrN=="い"&&("とな。．、，」』）)！!".indexOf(chrNN)>-1||"ます|まし|ませ".indexOf(chrNN2)>-1)){res+=str.substring(pt,j)+tgt+chrN}
    else if("trR".indexOf(k)>-1&&chrN=="っ"&&("たてと".indexOf(chrNN)>-1||chrNN2=="ちま")){res+=str.substring(pt,j)+tgt1+chrN}
    else{res+=str.substring(pt,j)+tgt+chrN}
   }
   else{res+=str.substring(pt,j)+tgt+chrN}
//   if(!window.confirm(pt+"|"+j+"|"+tgt+"|"+tgt1+"|"+kn[k]+"|"+chrN+"|"+chrNN+"|"+res)){break}
   j+=tgt.length+bz;
   pt=j;
  }
  return res+str.substring(pt,str.length);
 }					　//【_d4.2 終】
}					　//【_d4 終】
function adj(str,opt){
 str=_adj(opt,str,'あやう','あやふ');
 str=_adj(opt,str,'いたわし','いたはし');
 str=_adj(opt,str,'いとおし','いとほし');
 str=_adj(opt,str,'いとわし','いとはし');
 str=_adj(opt,str,'愛おし','愛ほし');
 str=_adj(opt,str,'うるわし','うるはし');
 str=_adj(opt,str,'おおき','おほき');
 str=_adj(opt,str,'おお','おほ');
 str=_adj(opt,str,'おかし','をかし');
 str=_adj(opt,str,'おさな','をさな');
 str=_adj(opt,str,'おし','をし');
 str=_adj(opt,str,'かいがいし','かひがひし');
 str=_adj(opt,str,'かぐわし','かぐはし');
 str=_adj(opt,str,'かわいらし','かはいらし');
 str=_adj(opt,str,'かわい','かはい');
 str=_adj(opt,str,'くるおし','くるほし');
 str=_adj(opt,str,'くわし','くはし');
 str=_adj(opt,str,'狂おし','狂ほし');
 str=_adj(opt,str,'けがらわし','けがらはし');
 str=_adj(opt,str,'けわし','けはし');
 str=_adj(opt,str,'こわ','こは');
 str=_adj(opt,str,'ずうずうし','づうづうし');
 str=_adj(opt,str,'じれった','じれつた');
 str=_adj(opt,str,'せわし','せはし');
 str=_adj(opt,str,'紛らわし','紛らはし');
 str=_adj(opt,str,'ちいさ','ちひさ');
 str=_adj(opt,str,'ずら','づら');
 str=_adj(opt,str,'ちがいな','ちがひな');
 str=_adj(opt,str,'とうと','たふと');
 str=_adj(opt,str,'とお','とほ',"\n \r\n　はらも。.、,「『（");//「とおいて」誤変換
 str=_adj(opt,str,'どお','どほ');
 str=_adj(opt,str,'はずかし','はづかし');
 str=_adj(opt,str,'ふさわし','ふさはし');
 str=_adj(opt,str,'みずみずし','みづみづし');
 str=_adj(opt,str,'むずかし','むづかし');
 str=_adj(opt,str,'めずらし','めづらし');
 str=_adj(opt,str,'やわらか','やはらか');
 return str;
}				//【adj 終】
function _adj(opt,str,tgt,tgt1,pre){
 if(tgt1==null||tgt1==''){tgt1=tgt}
 if(pre==null){pre=''}
 var bz="あ".length;
 var res = "";
 var j=pt=0;
 var chr,chrB,chrN,chrNN,chrN3;
 if(opt==0){			//【_adj.1 現⇒正】
  for(j=0;j<str.length;j++){
   if((j=str.indexOf(tgt,pt))==-1){break}
   chrB=str.substring(j-bz,j);
   chrN=str.substring(tgt.length+j,tgt.length+j+bz);
   if(pre&&pre.indexOf(chrB)==-1){res+=str.substring(pt,j)+tgt+chrN}
   else{
    chrNN=str.substring(tgt.length+j+bz,tgt.length+j+2*bz);
    chrN3=str.substring(tgt.length+j,tgt.length+j+3*bz);
    if(chrN=="い"){res+=str.substring(pt,j)+tgt1+"い"}
    else if(chrN3=="かろう"){res+=str.substring(pt,j)+tgt1+"からう";j+=2*bz;}
    else if(chrN=="く"){res+=str.substring(pt,j)+tgt1+"く"}
    else if(chrN=="う"&&"ご御".indexOf(chrNN)>-1){res+=str.substring(pt,j)+tgt1+"う"}
    else if(chrN+chrNN=="ゅう"&&"ご御".indexOf(chrNN)>-1){res+=str.substring(pt,j)+tgt1+"う";j+=bz;}
    else if(chrN+chrNN=="かっ"){res+=str.substring(pt,j)+tgt1+"かつ";j+=bz;}
    else if(chrN=="き"){res+=str.substring(pt,j)+tgt1+"き"}
    else if(chrN+chrNN=="けれ"){res+=str.substring(pt,j)+tgt1+"けれ";j+=bz;}
    else if(chrN+chrNN=="かれ"){res+=str.substring(pt,j)+tgt1+"かれ";j+=bz;}
    else{res+=str.substring(pt,j)+tgt+chrN}
   }
//  if(!window.confirm("opt:"+opt+"|pt:"+pt+"|j:"+j+" |"+tgt+"|"+tgt1+"|"+chrN+"|"+chrNN+"|"+chrN3+"|"+res)){break}
   j+=tgt.length+bz;
   pt=j;
  }
  return res+str.substring(pt,str.length);
 }
 else{				//【_adj.2 正⇒現】
  for(j=0;j<str.length;j++){
   if((j=str.indexOf(tgt1,pt))==-1){break}
   chrB=str.substring(j-bz,j);
   chrN=str.substring(tgt1.length+j,tgt1.length+j+bz);
   if(pre&&pre.indexOf(chrB)==-1){res+=str.substring(pt,j)+tgt1+chrN}
   else{
    chrNN=str.substring(tgt1.length+j+bz,tgt1.length+j+2*bz);
    chrN3=str.substring(tgt1.length+j,tgt1.length+j+3*bz);
    if(chrN=="い"){res+=str.substring(pt,j)+tgt+"い"}
    else if(chrN3=="からう"){res+=str.substring(pt,j)+tgt+"かろう";j+=2*bz}
    else if(chrN=="く"){res+=str.substring(pt,j)+tgt+"く"}
    else if(chrN=="う"&&"ご御".indexOf(chrNN)>-1){res+=str.substring(pt,j)+tgt+"ゅう"}
    else if(chrN=="う"){res+=str.substring(pt,j)+tgt+"う"}
    else if(chrN+chrNN=="かつ"){res+=str.substring(pt,j)+tgt+"かっ";j+=bz;}
    else if(chrN=="き"){res+=str.substring(pt,j)+tgt+"き"}
    else if(chrN+chrNN=="けれ"){res+=str.substring(pt,j)+tgt+"けれ";j+=bz;}
    else if(chrN+chrNN=="かれ"){res+=str.substring(pt,j)+tgt+"かれ";j+=bz;}
    else{res+=str.substring(pt,j)+tgt1+chrN}
   }
//  ;if(!window.confirm("opt:"+opt+"|pt:"+pt+"|j:"+j+" |"+tgt+"|"+tgt1+"|"+chrN+"|"+chrNN+"|"+res)){break}
   j+=tgt1.length+bz;
   pt=j;
  }
  return res+str.substring(pt,str.length);
 }
 return str;
}			//【_adj 終】
