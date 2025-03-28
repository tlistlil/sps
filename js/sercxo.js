//捷鍵からURLを生成して移動する函數
// valoro	inputのvalue値
// opt		falseならば同タブで移動、trueならば新タブを開く
// 被呼出	fn/supro.php, lingvo/kv_uni.php
let sercx=(valoro,opt)=>{
	valoro=valoro.replace(/\s+/g,	' ').replace(/^ /,""); //空白正規化
	let spaco=valoro.indexOf(' ');
	let sxlosil=vort=URL='';//sx 引擎指定鍵 vort 檢索語 URL 遷移地址
	if(spaco==-1)sxlosil=valoro;
	else{
		sxlosil	=valoro.substr(0,spaco);
		vort	=valoro.substr(spaco+1);
	}
	sxlosil=sxlosil.toLowerCase();
	//假名輸入->Latn
	const Latn='qwertyuiopasdfghjklzxcvbnm';
	const Hira='たていすかんなにらせちとしはきくまのりつさそひこみも';
	let kapo=sxlosil.charCodeAt(0);
	if(kapo>0x3043 && kapo<0x3094){//い～ん
		let lon=Latn.length;let regHira='';
		for(i=0;i<lon;i++){
			regHira=new RegExp(Hira.charAt(i),'g');
			sxlosil=sxlosil.replace(regHira,Latn.charAt(i));
		}
	}
	vort=vort.replace(/\+/g, "%2B");
	const h='http://',s='https://',sw='https://www.',d='dictionary',w='wikipedia',wikt='wiktionary',tr='translate',l='../lingvo/',lab='../labo/',gpost='&newwindow=0';//Google opt
//分岐處理本體
	switch (sxlosil) {
case "ain":URL=`${s}ainugo.nam.go.jp/search/word?word=${vort}&typeDict=on&dictCd[]=田村&dictCd[]=萱野&dictCd[]=知里`;break;
case "am" :URL=`${s}${d}.abyssinica.com/${vort}`;break;
case "bd" :URL=`${s}baike.baidu.com/search/none?word=${vort}`;break;
case "bo" :URL=`${h}${d}.christian-steinert.de/#%7B%22activeTerm%22%3A%22${vort}%22%2C%22currentListTerm%22%3A%22${vort}%22%7D`;break;
case "bov":URL=`${s}star.aa-ken.jp/vdic/dic`;break;
case "cb" :URL=`${s}${d}.cambridge.org/${d}/english-chinese-traditional/${vort}`;break;
case "cj"  :URL=`${s}en.${wikt}.org/wiki/${vort}#Han_character`;break;
case "cn" :URL=`${h}ci.nii.ac.jp/search?q=${vort}&range=0&count=20&sortorder=1&type=0`;break;
case "ct" :URL=`${s}ctext.org/pre-qin-and-han/zh?searchu=${vort}`;break;
case "dpp":URL=`${s}dopeoplesay.com/q/${vort}`;break;
case "de" :URL=`${h}www.dict.cc/?s=${vort}`;break;
case "ec" :URL=`${h}oxford${d}.so8848.com/search?word=${vort}`;break;
case "ee" :URL=`${h}www.etymonline.com/search?q=${vort}`;break;
case "el" :URL=`${h}logeion.uchicago.edu/${vort}`;break;
case "en" :URL=`${sw}${d}.com/browse/${vort}#british`;break;
case "enbo":URL=`${h}${d}.christian-steinert.de/#%7B%22activeTerm%22%3A%22"+vort+"%22%2C%22inputLang%22%3A%22en%22%2C%22currentListTerm%22%3A%22${vort}%22%7D`;break;
case "eng":URL=`${h}${d}.goo.ne.jp/srch/en/${vort}/m0u/`;break;
case "enhy":URL=hy(vort,'EN_HY');break;
case "enw" :URL=`${s}ejje.weblio.jp/sentence/content/${vort}`;break;
case "eo"  :URL=`${s}${tr}.google.ru/?hl=ru#en/eo/${vort}`;break;
case "es"  :URL=`${s}www.spanishdict.com/${tr}/${vort}`;break;
case "eses":URL=`${s}dle.rae.es/${vort}`;break;
case "esja":URL=`${sw}nichiza.com/rui/rui.php`;break;
case "et"  :URL=`${sw}thesaurus.com/browse/${vort}`;break;
case "fa"  :URL=`${s}farsi123.com/?word=${vort}`;break;
case "fast":URL=`${s}fastdic.com/word/${vort}`;break;
case "fav"	:URL=`${l}fa_v_tablo.php`;break;
case "fr"	:URL=`${h}www.wordreference.com/fren/${vort}`;break;
case "frhy"	:URL=hy(vort,'FR_HY');break;
case "frja"	:URL=`${h}frjp.boots.jp`;break;
case "fs"	:URL=`${h}cblle.tufs.ac.jp/dic/ru/v_search_list.php?serchTxt=${vort}&searchWayID=4`;break;
case "frsyn":URL=`${sw}larousse.fr/dictionnaires/synonymes/${vort}`;break;
case "fv"	:URL=`${h}www.les-verbes.com/conjuguer.php?verbe=${vort}&submit.x=0&submit.y=0`;break;
case "fy"	:URL=`${s}fanyi.baidu.com/mtpe-individual/multimodal#/`;break;
case "g"	:URL=google(vort);break;
case "ga"  :URL=`${sw}teanglann.ie/ga/fuaim/${vort}`;break;
case "he"	:URL=`${sw}morfix.co.il/${vort}`;break;
case "hj"	:URL=`${h}hanja.naver.com/search?query=${vort}`;break;
case "hk"	:URL=`${s}horicun.moo.jp/contents/haiku2/search.html?word_search=${vort}`;break;
case "hy"	:URL=hy(vort);break;
case "hyen"	:URL=hy(vort,'HY_EN');break;
case "hyfr"	:URL=hy(vort);break;
case "hz"	:URL=`${sw}zdic.net/hant/${vort.charAt(0)}`;break;
case "ipa":case"ipat":URL=`${h}ipa.typeit.org/full/`;break;
case "ipaw":URL=`${s}en.${w}.org/wiki/International_Phonetic_Alphabet#Pulmonic_consonants`;break;
case "ka"  :URL=`${sw}ganmarteba.ge/word/${vort}`;break;
case "kj"  :URL=`${s}mojidata.ryusei.dev/search?query=${vort}`;break;
case "kk"  :URL=`${h}www.milord-club.com/Kokin/uta${vort}.htm`;break;
case "ko"  :URL=`${s}ja.dict.naver.com/search.nhn?range=all&q=${vort}`;break;
case "kogo":URL=`${s}kobun.weblio.jp/content_find/prefix/0/${vort}`;break;
case "koko":URL=`${s}ko.dict.naver.com#/search?query=${vort}`;break;
case "la"  :URL=`${h}logeion.uchicago.edu/${vort}`;break;
case "lernu":URL=`${s}lernu.net/vortaro`;break;
case "mi": URL=`${h}maori${d}.co.nz/search?idiom=&phrase=&proverb=&loan=&histLoanWords=&keywords=${vort}`;break;
case "mj": URL=`${sw}google.co.jp/maps/search/${vort}?hl=jp`;break;
case "mm": URL=`${sw}google.ru/maps/search/${vort}?hl=az`;break;
case "moe":URL=`${sw}moedict.tw/${vort}`;break;
case "mura":URL=`${h}www.chikyukotobamura.org/muse/writing_systems.html`;break;
case "nci" :URL=`${s}nahuatl.wired-humanities.org/searchview/s1-all-fields?search_api_views_fulltext=${vort}`;break;
case "no" :URL=`${s}ru.numberempire.com/${vort}`;break;
case "noto":URL='../noto/';break;
case "oj" :URL=`${s}oncoj.orinst.ox.ac.uk/cgi-bin/oncoj_${d}.sh?search=${vort}&part=f&mode=typeset`;break;
case "osm":URL=`${sw}openstreetmap.org/search?query=${vort}`;break;
case "pi":URL=`${h}www.manduuka.net/pali/w/p_allut8.cgi?word=${vort}`;break;
case "pt":URL=`${s}${d}.cambridge.org/${d}/portuguese-english/${vort}`;break;
case "py":URL=`${h}www.ctrans.org/search.php?word=${vort}`;break;
case "ru":URL=`${h}yakuru.net/search.aspx?w=${vort}`;break;
case "sa":URL=`${h}www.manduuka.net/sanskrit/w/dic.cgi?word=${vort}`;break;
case "sw": URL =`${s}swahili-${d}.com/swahili-english/${vort}_${vort}`;break;
case "te": URL=`${sw}nisanyansozluk.com/kelime/${vort}`;break;
case "th":URL=`${h}www.thai-language.com/dict`;break;
case "tr": URL=`${s}${tr}.google.ru/?hl=ru#${vort}`;break;
case "ub":URL=`${sw}urban${d}.com/define.php?term=${vort}`;break;
case "ud":URL=`${s}ru.${wikt}.org/wiki/${vort}#Морфологические_и_синтаксические_свойства`;break;
case "uz":URL=`${s}ctild.sitehost.iu.edu/Main/Uzbek-EnglishDictionary`;break;
case "uzko":URL="https://dict.naver.com/uzkodict/#/search?query=" + vort;break;
case "w"   :URL=`${s}ja.${w}.org/wiki/${vort}`;break;
case "we"  :URL=`${s}en.${w}.org/wiki/${vort}`;break;
case "weo" :URL=`${s}eo.${w}.org/wiki/${vort}`;break;
case "wf"	:URL=`${s}fr.${w}.org/wiki/${vort}`;break;
case "wr"	:URL=`${s}ru.${w}.org/wiki/${vort}`;break;
case "wt"	:URL=`${s}en.${wikt}.org/wiki/${vort}`;break;
case "wtga"	:URL=`${s}en.${wikt}.org/wiki/${vort}#Irish`;break;
case "wtru"	:URL=`${s}ru.${wikt}.org/wiki/${vort}`;break;
case "wtud"	:URL=`${s}ru.${wikt}.org/wiki/${vort}#Морфологические_и_синтаксические_свойства`;break;
case "wz"	:URL=`${s}zh.${w}.org/wiki/${vort}`;break;
case "yt"	:URL=`${s}${tr}.yandex.ru/?lang=${vort}`;break;
case "yue"	:URL=`${h}cantonese.org/search.php?q=${vort}`;break;
case "zh"	:URL=`${s}cjjc.weblio.jp/content/${vort}`;break;
case "zh1"	:URL=`${h}hcs.aichi-u.ac.jp/php/search.php`;break;
case "zye"	:URL=`${s}magnezone462.github.io/Zyevio-Qhan-La-Pryenxuankhri/`;break;
case "в"	:URL=`${s}ru.${w}.org/wiki/${vort}`;break;
case "вс"	:URL=`${s}ru.${wikt}.org/wiki/${vort}`;break;
case "всуд"	:URL=`${s}ru.${wikt}.org/wiki/${vort}#%D0%9C%D0%BE%D1%80%D1%84%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5_%D0%B8_%D1%81%D0%B8%D0%BD%D1%82%D0%B0%D0%BA%D1%81%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5_%D1%81%D0%B2%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%B0`;break;
case "пв"	:URL=`${s}${tr}.google.ru/?hl=ru#ru/en/${vort}`;break;
case "рутт"	:URL=`${s}tatpoisk.net/dict/${vort}`;break;
case "уд"	:URL=`${s}ru.${wikt}.org/wiki/${vort}#%D0%9C%D0%BE%D1%80%D1%84%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5_%D0%B8_%D1%81%D0%B8%D0%BD%D1%82%D0%B0%D0%BA%D1%81%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5_%D1%81%D0%B2%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%B0`;break;
case "фс"	:URL=`${h}cblle.tufs.ac.jp/dic/ru/v_search_list.php?serchTxt=${vort}&searchWayID=4`;break;
case "я"	:URL=`${s}yandex.ru/search/?text=${vort}`;break;
default:valoro=valoro.replace(/\+/g, '%2B');URL=google(valoro);break;
	}
	//log(`val ${valoro} spac ${spaco} sxl ${sxlosil} vort ${vort}`);//檢査
	if(opt)window.location.href=URL;// 檢索實行
	else window.open(URL);
}
let htmq=(vort='',subd='htmls',id='content_left')=>{
	if(!vort)vort="index";
	return `https://www.htmq.com/${subd}/${vort}.shtml#${id}`;
}
let hy=(vort='',subd='HY_FR')=>{
	return `http://www.nayiri.com/search?l=ru&dt=${subd}&query=${vort}`;
}
let google=(vort='',klavo='',CTL='ru')=>{
	let nfpr=0;
	if(vort.match(/[\'\"]/))nfpr=1;
	if(klavo.match(/[\'\"]/))nfpr=1;
	nfpr=nfpr?'&nfpr=1':'';
	return `https://www.google.${CTL}/search?q=${klavo}${vort}${nfpr}&newwindow=0&udm=14`;
}
