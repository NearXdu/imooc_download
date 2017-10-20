// ==UserScript==
// @name        慕课网 下载视频
// @namespace   https://github.com/Ahaochan/Tampermonkey
// @version     0.1.3
// @description 获取链接，数据来源：http://www.imooc.com/course/ajaxmediainfo/?mid=285&mode=flash。使用方法：进入任意课程点击下载即可。如http://www.imooc.com/learn/285
// @author      Ahaochan
// @match       *://*.imooc.com/learn/*
// @grant       none
// @require     http://code.jquery.com/jquery-1.11.0.min.js 
// ==/UserScript==
//$(document).ready(function(){
//导出设置

var Destm = function(e, t) {
	function r(e, t) {
		var r = "";
		if ("object" == typeof e) for (var n in e) r += String.fromCharCode(e[n]);
		e = r || e;
		for (var i, o, a = new Uint8Array(e.length), s = t.length, n = 0; n < e.length; n++) o = n % s,
		    i = e[n],
			    i = i.toString().charCodeAt(0),
			      a[n] = i ^ t.charCodeAt(o);
		return a;
	}
	function n(e) {
		var t = "";
		if ("object" == typeof e) for (var r in e) t += String.fromCharCode(e[r]);
		e = t || e;
		var n = new Uint8Array(e.length);
		for (r = 0; r < e.length; r++) n[r] = e[r].toString().charCodeAt(0);
		var i, o, r = 0;
		for (r = 0; r < n.length; r++) i = n[r] % 3,
		    0 != i && r + i < n.length && (o = n[r + 1], n[r + 1] = n[r + i], n[r + i] = o, r = r + i + 1);
		return n;
	}
	function i(e) {
		var t = "";
		if ("object" == typeof e) for (var r in e) t += String.fromCharCode(e[r]);
		e = t || e;
		var n = new Uint8Array(e.length);
		for (r = 0; r < e.length; r++) n[r] = e[r].toString().charCodeAt(0);
		var r = 0,
			i = 0,
			  o = 0,
			  a = 0;
		for (r = 0; r < n.length; r++) o = n[r] % 2,
		    o && r++,
			    a++;
		var s = new Uint8Array(a);
		for (r = 0; r < n.length; r++) o = n[r] % 2,
		    o ? s[i++] = n[r++] : s[i++] = n[r];
		return s;
	}
	function o(e, t) {
		var r = 0,
		    n = 0,
		    i = 0,
		    o = 0,
		    a = "";
		if ("object" == typeof e) for (var r in e) a += String.fromCharCode(e[r]);
		e = a || e;
		var s = new Uint8Array(e.length);
		for (r = 0; r < e.length; r++) s[r] = e[r].toString().charCodeAt(0);
		for (r = 0; r < e.length; r++) if (o = s[r] % 5, 0 != o && 1 != o && r + o < s.length && (i = s[r + 1], n = r + 2, s[r + 1] = s[r + o], s[o + r] = i, r = r + o + 1, r - 2 > n)) for (; n < r - 2; n++) s[n] = s[n] ^ t.charCodeAt(n % t.length);
		for (r = 0; r < e.length; r++) s[r] = s[r] ^ t.charCodeAt(r % t.length);
		return s;
	}
	function a(e) {
		var t, r, n, i, o, a, s;
		for (a = e.length, o = 0, s = ""; o < a;) {
			do t = f[255 & e.charCodeAt(o++)];
			while (o < a && t == -1);
			if (t == -1) break;
			do r = f[255 & e.charCodeAt(o++)];
			while (o < a && r == -1);
			if (r == -1) break;
			s += String.fromCharCode(t << 2 | (48 & r) >> 4);
			do {
				if (n = 255 & e.charCodeAt(o++), 61 == n) return s;
				n = f[n]
			} while ( o < a && n == - 1 );
			if (n == -1) break;
			s += String.fromCharCode((15 & r) << 4 | (60 & n) >> 2);
			do {
				if (i = 255 & e.charCodeAt(o++), 61 == i) return s;
				i = f[i]
			} while ( o < a && i == - 1 );
			if (i == -1) break;
			s += String.fromCharCode((3 & n) << 6 | i)
		}
		return s
	}
	for (var s = {
		data: {
			info: e
		}
	},
	l = {
		q: r,
	    h: n,
	    m: i,
	    k: o
	},
	u = s.data.info, c = u.substring(u.length - 4).split(""), d = 0; d < c.length; d++) c[d] = c[d].toString().charCodeAt(0) % 4;
	c.reverse();
	for (var h = [], d = 0; d < c.length; d++) h.push(u.substring(c[d] + 1, c[d] + 2)),
	    u = u.substring(0, c[d] + 1) + u.substring(c[d] + 2);
	s.data.encrypt_table = h,
		s.data.key_table = [];
	for (var d in s.data.encrypt_table)"q" != s.data.encrypt_table[d] && "k" != s.data.encrypt_table[d] || (s.data.key_table.push(u.substring(u.length - 12)), u = u.substring(0, u.length - 12));
	s.data.key_table.reverse(),
		s.data.info = u;
	var f = new Array(( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), 62, ( - 1), ( - 1), ( - 1), 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, ( - 1), ( - 1), ( - 1), ( - 1), ( - 1));
	s.data.info = a(s.data.info);
	for (var d in s.data.encrypt_table) {
		var p = s.data.encrypt_table[d];
		if ("q" == p || "k" == p) {
			var v = s.data.key_table.pop();
			s.data.info = l[s.data.encrypt_table[d]](s.data.info, v)
		} else s.data.info = l[s.data.encrypt_table[d]](s.data.info)
	}
	if (t) return s.data.info;
	var g = "";
	for (d = 0; d < s.data.info.length; d++) g += String.fromCharCode(s.data.info[d]);
	return g;
};

var GetM3u8=function(name,url,videos) {
	$.getJSON(url, function(response) {
		console.log(url);
		var m3u8=Destm(response.data.info);
		var tmp=m3u8.trim().split('\n');
		var res=tmp[4];
		console.log(m3u8)
		var m3u8=[];
	for(var i=6;i<tmp.length;i+=2)
		m3u8.push(tmp[i]);

	var start=res.indexOf("course");
	var end=res.length-1;
	keyurl="/"+res.substring(start,end);
	GetKey(name,keyurl,m3u8,videos);
	});
};

var GetKey=function(name,keyurl,m3u8,videos) {
	$.getJSON(keyurl, function(response) {
		var key=Destm(response.data.info,1);
		console.log(response.data);
		videoes.push({
			name: name,
			key: key,
			m3u8: m3u8,
		});
		/*
		   var $link = $("<a href='"+response.data.result.mpath[clarityType]+"' class='downLink' style='position:absolute;right:100px;top:0;' target='_blank'>下载</a>");
		   $this.after($link);
		   $link.bind("DOMNodeInserted", function() {  $(this).find("i").remove();} );//移除子标签
		   */

		//添加全部下载链接
		if (videoes.length == total) {
			$("#downloadBox").append('共' + total + '个视频。已完成解析' + videoes.length + '个视频。<br/>');
			$("#downloadBox").append($("<textarea style='width:100%;border:2px solid red;padding:5px;height:100px;'>"+getTextLinks(clarityType,outTextType)+"</textarea>"));//全部链接
			videoes.sort(function(a,b){
				if(a.name>b.name)   return 1;
				else if(a.name<b.name) return -1;
				else return 0;
			});
		}
	});
};

var clarityType = 2;
var outTextType = "idm";
$("div.mod-tab-menu").after(
		$("<div id='downloadBox' class='course-brief'>"+
			"<div style='float:left;margin-right:70px;'>"+
			"<h4 style='font-weight:700;font-size: 16px;marginTop:10px'>下载清晰度 : </h4>"+
			"<label for='lowClarity'   >Low   </label><input type='radio' id='lowClarity'    name='clarity' value='0' />"+
			"<label for='middleClarity'>Middle</label><input type='radio' id='middleClarity' name='clarity' value='1' />"+
			"<label for='highClarity'  >High  </label><input type='radio' id='highClarity'   name='clarity' value='2' checked='checked' />"+
			"</div>"+
			"<div>"+
			"<h4 style='font-weight:700;font-size: 16px;marginTop:10px'>导出格式 : </h4>"+
			"<label for='rawOutText' >raw</label><input type='radio' id='rawOutText'  name='outText' value='raw'/>"+
			"<label for='idmOutText' >idm </label><input type='radio' id='idmOutText'  name='outText' value='idm' checked='checked' />"+
			"<label for='xmlOutText' >xml </label><input type='radio' id='xmlOutText'  name='outText' value='xml' />"+
			"<label for='jsomOutText'>json</label><input type='radio' id='jsomOutText' name='outText' value='json'/><br/>"+
			"</div>"+
			"</div>")
		);
$("input:radio").css("margin","auto 50px auto 3px");//设置单选框
$("input:radio[name=clarity]").change(function() { clarityType = this.value; $("#downloadBox textarea").text(getTextLinks(clarityType,outTextType)); });
$("input:radio[name=outText]").change(function() { outTextType = this.value; $("#downloadBox textarea").text(getTextLinks(clarityType,outTextType)); });
//导出设置

//获取下载链接
var videoes = [];
var selector = 'a.J-media-item';
var total = $(selector).length;
$(selector).each(function(index, element) {
	var $this = $(this);
	var href = this.href;
	var vid = href.substring(href.lastIndexOf('/') + 1, href.length);
	var name = this.innerText;
	var pattern = /\(\d{2}:\d{2}\)/;
	if (!pattern.test(name)) {
		total--;
		if (index == $(selector).length - 1 && !total) { console.log('没有视频可以下载！'); }
		return;
	}
	name = name.replace(/\(\d{2}:\d{2}\)/, '').replace(/\s/g, '');
	$.getJSON("/course/playlist/"+vid+"?t=m3u8&cdn=aliyun1", function(response) {
		var url=Destm(response.data.info);
		var res=url.trim().split('\n')[3];
		GetM3u8(name,res,videoes);
		//添加单个下载链接
	});
});
//获取下载链接

function getTextLinks(clarityType, outTextType){
	if(outTextType === "json")  return JSON.stringify(videoes);
	else {
		var str = "";
		for(var i in videoes) {

			str=JSON.stringify(videoes);
			//str += "filename="+videoes[i].name+"\nkey="+videoes[i].key+"\nm3u8=\n"+videoes[i].m3u8+"\n\n";

		}
		if(outTextType === "xml")   str = "<?xml version='1.0' encoding='utf-8' ?>\n<videoes>\n"+str+'</videoes>';
		return str;
	}
}


//});
