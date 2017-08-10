
// 判断是否移动设备
function isMobileDevice() {
	var ua = navigator.userAgent.toLowerCase();
	return !!/(iphone|ios|android|mini|mobile|mobi|nokia|symbian|ipod|ipad|ws\s+phone|mqqbrowser|wp7|wp8|ucbrowser7|ucweb|360\s+aphone\s+browser)/i.test(ua);
}

// 判断是否IOS（1）
function isIos() {
    return /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
}

// 判断是否IOS（2）
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
