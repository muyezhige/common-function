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
