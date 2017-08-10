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

//时间戳(时长)，格式化几时几分几秒
function getDuration(ms){
    var aminute = 60,
        ahour   = aminute*60,
        aday   = ahour*24;

    // 毫秒转秒
    var sec = parseInt(ms/1000);
    // 秒转天数
    var day = parseInt(sec/aday);
    // 不到1天剩下的秒数
    sec = sec%aday;
    // 剩下的秒数转小时
    var hour = parseInt(sec/ahour);
    // 不到1小时剩下的秒数
    sec = sec%ahour;
    // 剩下的秒数转分钟
    var minute = parseInt(sec/aminute);
    // 不到1分钟剩下秒
    sec = sec%aminute;
    
    return {
        day: day,
        hour: hour,
        minute: minute,
        sec: sec
    };
}

/*
* 根据上面的getDuration函数，换算成粉丝时长
*/
function getdurationValue (ms) {
    var times = getDuration(ms),
    minute = times.minute,
    hour = times.hour,
    day = times.day;

    var score = "";
    if (day) {
        score = day + "天";
        if (hour) {
            score = day + "天" + hour + "小时";
        }
        if (day >= 2) {
             score = day + "天";
        }
    }else if(hour){
        score = hour + "小时";
        if (minute) {
           score = hour + "小时" + minute + "分钟"; 
        }
    }else if (minute){
        score = minute + "分钟";
    }else {
        score = "1分钟";
    }
    return score;
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
