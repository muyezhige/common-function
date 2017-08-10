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



// localStorage存储获取
var Cach = {
    save: function(key, value){
        // 属性值，可能是对象。
        if(typeof value === "object"){
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    },
    get: function(key){
        var val = localStorage.getItem(key) || "";
        var str;
        if(val){
            try{
                str = JSON.parse(val);
            }catch(e){
                str = val;
            }
        }else{
            str = val;
        }
        return str;
    }
};
