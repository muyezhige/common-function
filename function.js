// 获取查询字符串中指定参数
function getQueryString(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var context = "";
    if (r) {
        context = r[2];
    }
    reg = null;
    r = null;
    return context || '';
}

// 判断是否移动设备
function isMobileDevice() {
	var ua = navigator.userAgent.toLowerCase();
	return !!/(iphone|ios|android|mini|mobile|mobi|nokia|symbian|ipod|ipad|ws\s+phone|mqqbrowser|wp7|wp8|ucbrowser7|ucweb|360\s+aphone\s+browser)/i.test(ua);
}

// 判断是否IOS
function isIosDevice() {
    var u = navigator.userAgent.toLowerCase();
    var ios = !!u.match(/\(i[^;]+;( U;)? cpu.+mac os x/); //ios终端
    var iPhone = u.indexOf('iphone') > -1 || u.indexOf('Mac') > -1;
    var iPad = u.indexOf('ipad') > -1; //是否iPad
    return !!(ios || iPad || iPhone);
}

// 判断是否Android
function isAndroidDevice() {
    var u = navigator.userAgent.toLowerCase();
    var android = u.indexOf('android') > -1 || u.indexOf('Linux') > -1;
    return android;
}

// 判断是否微信 
function isWeixin() {
    var ua = navigator.userAgent.toLowerCase();
    return "micromessenger" == ua.match(/MicroMessenger/i);
}

/**
 * 将秒格式化为 yyyy-mm-dd hh24:mi:ss
 */
function formateDateTime(seconds) {
    var date = new Date();
    if (!isNaN(seconds)) {
        date = new Date(parseInt(seconds, 10) * 1000);
    }
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

/**
 * 将秒格式化为 ‘d天’
 * @return string 格式化之后的字符串
 */
function formateTime(s) {
    var t = '';
    if (s > -1) {
        var hour = Math.floor(s / 3600);
        var min = Math.floor(s / 60) % 60;
        var sec = s % 60;
        var day = parseInt(hour / 24);
        if (day > 0) {
            hour = hour - 24 * day;
            t = day + "天 ";
        }

        if (hour < 10) {
            t += "0";
        }
        t += hour + ":";
        if (min < 10) {
            t += "0";
        }
        t += min + ":";
        if (sec < 10) {
            t += "0";
        }
        t += sec;
    }
    return t;
}

//返回当前日期对应的月日
function getNowYMD(){
    var dt = this.getNow();

    return [dt.getFullYear(), (dt.getMonth()+1), dt.getDate()];
}

//返回当前日期对应的星期
function getNowWeek(w2txt){
    var dt = this.getNow(),
    w = dt.getDay();
    w2txt = w2txt || ['日', '一', '二', '三', '四', '五', '六'];
    return w2txt[w];
}

//返回当前日期的月份对应的最大天数
function getNowMonthMaxDate(){
    
    var dt = this.getNow(),
        y = dt.getFullYear(),
        m = (dt.getMonth()+1),
        days;
        
        switch(m){
            case 2:
                if(this.isRunYear(y)){
                    days = 29;
                }else{
                    days = 28;
                }
                break;
            case 1:
            case 3:
            case 5:
            case 7: 
            case 8: 
            case 10:
            case 12:
                days = 31;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                days = 30;
                break;
        }
        
        return days;
}

//是否闰年
function isRunYear(y){
    if((y % 4 == 0 && y % 100 !=0) || (y % 400 == 0)){
        return 1;
    }
    return 0;
}

var Tools = {
    /*事件绑定
    @param node : 代理父节点
    @param arr  : [['click', '.className', funs]];
    */
    addEvent: function(node, arr) {
        if (!node[0] || !arr) return;
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[0] === undefined) break;
            var a = arr[i][0],
                b = arr[i][1],
                c = arr[i][2];

            node.off(a, b, c);
            node.on(a, b, c);
        }
    },

    /*数组去重
    @param sourceArr: 源数组
    @param arr : 返回去重后的数组
    */
    unique: function(sourceArr){
        var arr  = [];

        for(var i = 0, len = sourceArr.length; i < len; i++){
            if($.inArray( sourceArr[i], arr) == -1){
                arr.push( sourceArr[i] );
            }
        }
        return arr;
    },

    /*去除对象中返回undefined的字段*/
    getObj: function(obj){
        for(var o in obj){
            if(String(obj[o]) == "undefined"){
                delete obj[o];
            }
        }
        return obj;
    },

    // 打点统计
    Log: function(){
        var re = /([http|https]:\/\/[a-zA-Z0-9\_\.]+\.so\.com)/gi,
            url = window.location.href;

        if (url && !re.test(url) && window.navigator.appName) {
            var srcImg = "//s.360.cn/so/zz.gif",
                zzid = document.getElementById('sozz'),
                sid = zzid.src.split("?")[1],
                token = createToken(sid),
                t = new Image();

            url   && (srcImg += "?url=" + encodeURIComponent(url));
            sid   && (srcImg += "&sid=" + sid);
            token && (srcImg += "&token=" + token);
            if(sid){
                t.src = srcImg;
            }
        }

        // 创建一个token值, 秘钥(md5)与url的打乱组合。
        function createToken(sid){
            var _href = location.href,
                hostArr = _href.split("").reverse(),
                sidArr = sid.split(""),
                arr = [];

            for(var i=0, len=16; i<len; i++) {
                arr.push(sidArr[i] + (hostArr[i] || ''));
            }

            return arr.join("");
        }
    },

    /*location.search 将序列化的字符串转化成对象。
    @param [s] : location.search
    */
    parseQuery: function(s) {
        if (s) {
            var pos = s.indexOf('?');
            if (pos != -1) {
                s = s.substr(pos + 1);
            }
        }
        s = s || location.search.substr(1);

        var arr = s.split('&'),
            ret = {};
        for (var i = arr.length - 1, keyValue, key, value; i >= 0; i--) {
            keyValue = arr[i].split('=');
            key = keyValue[0];
            value = keyValue[1];
            // 输入非法的参数，如 abc%，会导致异常： Uncaught URIError: URI malformed
            try {
                key = decodeURIComponent(key);
                value = decodeURIComponent(value.replace(/\+/g, ' '));
            } catch (e) {}

            ret[key] = value;
        }

        return ret;
    },

     /*
        获取字符的长度
        汉字或全角字符，代表2个字符数。
    */
    getLength:function(str){
        var $len = 0,
            re = /[\u4e00-\u9fa5]/g;

        for(var i = 0, len = str.length; i < len; i++){
            var item = str[i];

            if(re.test(item) || item.charCodeAt(0) > 255){
                $len += 2;
            }else{
                $len ++;
            }
        }
        return $len;
    },

    // 获取光标的位置, ctrl文本框元素。
    getCursortPosition: function(ctrl){
        var CaretPos = 0;
        // 非IE浏览器和ie9以上支持。
        if(ctrl.selectionStart){
            CaretPos = ctrl.selectionStart;
        }else if (document.selection){ // 仅IE支持
            ctrl.focus ();
            var Sel = document.selection.createRange();
            Sel.moveStart ('character', -ctrl.value.length);
            CaretPos = Sel.text.length;
        }
        return CaretPos;
    },

    // 设置光标位置
    setCaretPosition: function(ctrl, pos){
    // 非IE浏览器和ie9以上支持。
        if(ctrl.setSelectionRange){
            ctrl.focus();
            ctrl.setSelectionRange(pos,pos);
        }else if (ctrl.createTextRange){ // 仅IE支持
            var range = ctrl.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }
};

//html转义
function escapeHTML(str){
	var escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    },
    escapeRe = /&(?![\w#]+;)|[<>"']/g,
    escapeFn = function (s) {
        return escapeMap[s];
    };
    return String(str || '').replace(escapeRe, escapeFn);
}

// 设置cookie
function cookie(key, value, options) {
    var days, time, result, decode;
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = options || {};
        if (value === null || value === undefined) options.expires = -1;
        if (typeof options.expires === 'number') {
            days = (options.expires * 24 * 60 * 60 * 1000);
            time = options.expires = new Date();

            time.setTime(time.getTime() + days);
        }
        // 精确时间
        else if (typeof options.expiresExact) {
            options.expires = options.expiresExact;
        }
        value = String(value);
        options.path = options.path || '/';
        options.domain = options.domain || '';
        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toGMTString() : '',
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }
    options = value || {};
    decode = options.raw ? function (s) { return s } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
}
// 调用 让token 过期。
cookie('token','' ,{ expires : -1, domain : '.huajiao.com'});
