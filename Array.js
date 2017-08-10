    /*数组去重
    *@param sourceArr: 源数组
    *@param arr : 返回去重后的数组
    */
    function unique (sourceArr){
        var arr  = [];
        for(var i = 0, len = sourceArr.length; i < len; i++){
            if($.inArray( sourceArr[i], arr) == -1){
                arr.push( sourceArr[i] );
            }
        }
        return arr;
    }
