'use strict';
class DateUtil{
    /**
     * 例如:2017-06-28 10:48:46转成date类,
     * 可把- replace成/
     * @param dateString
     * @return Date
     */
    static parserDateString(dateString){
      if(dateString){
        let regEx = new RegExp("\\-","gi");
        let validDateStr=dateString.replace(regEx,"/");
        let milliseconds=Date.parse(validDateStr);
        return new Date(milliseconds);
      }
    }
   
    // timestamp时间戳 formater时间格式
    static formatDate(timestamp, formater) {
      let date = new Date();
      date.setTime(parseInt(timestamp));
      formater = (formater != null)? formater : 'yyyy-MM-dd hh:mm';
      Date.prototype.Format = function (fmt) {
        var o = {
          "M+": this.getMonth() + 1, //月
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          "S": this.getMilliseconds() //毫秒
        };
   
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
            (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
        return fmt;
      }
      return date.Format(formater);
    }

    //获取当前日期  格式如 2018-12-15
    static getCurrentDate(){
        var currDate = new Date()
        var year = currDate.getFullYear()
        var month = (currDate.getMonth()+1).toString()
        month = month.padStart(2,'0')
        var dateDay = currDate.getDate().toString()
        dateDay = dateDay.padStart(2,'0')
        let time = year+'-'+month+'-'+dateDay
        return time;
    }
    //组装日期数据
    static createDateData(){
        let date = [];
        var currDate = new Date()
        var year = currDate.getFullYear()
        var month = currDate.getMonth()+1
        for(let i=1970;i<=year;i++){
            let month = [];
            for(let j = 1;j<13;j++){
                let day = [];
                if(j === 2){
                    for(let k=1;k<29;k++){
                        day.push(k+'日');
                    }
                    //Leap day for years that are divisible by 4, such as 2000, 2004
                    if(i%4 === 0){
                        day.push(29+'日');
                    }
                }
                else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                    for(let k=1;k<32;k++){
                        day.push(k+'日');
                    }
                }
                else{
                    for(let k=1;k<31;k++){
                        day.push(k+'日');
                    }
                }
                let _month = {};
                _month[j+'月'] = day;
                month.push(_month);
            }
            let _date = {};
            _date[i+'年'] = month;
            date.push(_date);
        }
        return date;
    }
    
    static phoneNumCheck(phoneNum){
        var partten = /^1[3,5,8]\d{9}$/;
        if(partten.test(phoneNum)){
            return true;
        }else{
            return false;
        }
    }
    //传入需要显示的字符串长度（汉字占2个字符，数字英文占一个字符）
    //，返回处理后的字符串（超出部分截掉并添加...）
    static getArticleText(str,needLen){
        var newStr = '';
        var len = 0;
        for(var i = 0;i<str.length;i++){
            var length = str.charCodeAt(i);
            if(length >= 0 && length <= 128){
                len+=1;
            }else{
                len+=2
            }
            newStr += str[i];
            if(len >= needLen){
                newStr += '...';
                break;
            }
        }
        return newStr;
    }
    static toChinesNum(num){
        let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"
        let unit = ["", "十", "百", "千", "万"];
        num = parseInt(num);
        let getWan = (temp) => {
            let strArr = temp.toString().split("").reverse();
            let newNum = "";
            for (var i = 0; i < strArr.length; i++) {
                newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
            }
            if(newNum == '一十'){
                newNum = '十';
            }
            return newNum;
        }
        let overWan = Math.floor(num / 10000);
        let noWan = num % 10000;
        if (noWan.toString().length < 4) noWan = "0" + noWan;
        return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
    }
    static formatTime(time) {
        let min = Math.floor(time / 60)
        let second = parseInt(time) - min * 60
        min = min >= 10 ? min : '0' + min
        second = second >= 10 ? second : '0' + second
        return min + ':' + second
    }
    //判断时间戳是否为当天
    static isToday(time){
        if(new Date(time).toDateString() === new Date().toDateString()){
            return true;
        }
        return false;
    }
}
export default DateUtil;