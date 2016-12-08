/**
 * 获取查询字符串中指定参数
 * @return string
 * @param key
 */
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
};

// 判断是否Android
function isAndroidDevice() {
    var u = navigator.userAgent.toLowerCase();
    var android = u.indexOf('android') > -1 || u.indexOf('Linux') > -1;
    return android;
};

// 判断是否微信 
function isWeixin() {
    var ua = navigator.userAgent.toLowerCase();
    return "micromessenger" == ua.match(/MicroMessenger/i);
};

/**
 * 将秒格式化为 yyyy-mm-dd hh24:mi:ss
 * @return string
 * @param seconds
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
};

/**
 * 将秒格式化为 ‘d天 hh24:mi:ss’
 * @return string 格式化之后的字符串
 * @param s
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