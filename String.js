/*
* 将数据渲染到模板的简易方法。
*/
function formatData(obj, str) {
      var i;
      var val;
      var reg;
      for (i in obj) {
          val = obj[i];
          reg = new RegExp('{{' + i + '}}', 'gm');
          str = str.replace(reg, val);
      }
      return str;
}
var html = formatData({}, tpl);

/*
* location.search 将序列化的字符串转化成对象。
*/
function parseQuery (s) {
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
}

/*
*  获取字符的长度
*  汉字或全角字符，代表2个字符数。
*/
function getLength (str){
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
}


/*
*  对带有图片的字符串进行截断，超出部分后跟省略号。
*  total 中文字符 +2  英文或数字 +1
*  return {newString}
*/
function cutImgString (str, total) {
    var reg = new RegExp('(<img(.*?)>)','g');
    var chinaReg = /[\u4e00-\u9fa5]/g;
    var stamp = "{img}";
    var num = 0;
    var newString = '';
    var imgItem = str.match(reg);

    str = str.replace(reg, stamp);
    var strArray = str.split(stamp);

    // 总长度
    var totalNum = 0;
    if (imgItem) {
        totalNum += (imgItem.length*2);
    }
    var totalStr = str.replace(reg, "");
    for (var i = 0; i < totalStr.length; i++) {
        var item = totalStr[i];
        if(item.charCodeAt(0) > 255){
            totalNum += 2;
        }else{
            totalNum ++;
        }
    }

    for (var i = 0; i < strArray.length; i++) {
        if (num >= total) {
            break;
        }
        var len = strArray[i].length;
        if (!len) {
            var firstImg = imgItem && imgItem.shift();
            if (firstImg) {
                newString += firstImg;
                num += 2;
            }
            continue;
        }
        for (var j = 0; j < len; j++) {
            var item = strArray[i][j];
            if (num >= total) {
                break;
            }
            newString += item;

            if(item.charCodeAt(0) > 255){
                num += 2;
            }else{
                num ++;
            }

            if (num >= total) {
                break;
            }
            
            if (j == (len-1)) {
                var firstImg = imgItem && imgItem.shift();
                if (firstImg) {
                    newString += firstImg;
                    num += 2;
                }
            }
        }
    }
    if (num < totalNum) {
        newString += "…";
    }
    return newString;
}

      
