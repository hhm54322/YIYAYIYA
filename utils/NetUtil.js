'use strict';
// import Spinner from 'react-native-loading-spinner-overlay';
// import LoadingView from './LoadingView'
import {Error} from './Error';
import DataUtil from './DataUtil';
import NavigationService from "./NavigationService";

class NetUtil{
    static urlH = 'http://106.14.121.217:13001';
    static repeatData = {};

    
    static async get(url,params,headers,callback){
        url = NetUtil.urlH+url;
        url = NetUtil.getUrlByparams(url,params);
        console.log(url);
        NetUtil.repeatData = {type:'GET',url:url,params:{},headers:headers,callback:callback};
        //fetch请求
        try {
            let res = await fetch(url,{
                method: 'GET',
                headers:{
                    'Content-Type' : headers[0],
                    'Accept' : headers[1],
                },
            });
            NetUtil.responseMsg(res,callback);
        }catch (error) {
            //请求出错
            console.log(error.name +'  :  '+error.message);
        }
    }

    static async post(url,params,params1,headers,callback){
        //fetch请求
        url = NetUtil.urlH+url;
        url = NetUtil.getUrlByparams(url,params);
        console.log(url);
        NetUtil.repeatData = {type:'POST',url:url,params:params1,headers:headers,callback:callback};
        try {
            let res = await fetch(url,{
                method: 'POST',
                headers:{
                    'Content-Type' : headers[0],
                    'Accept' : headers[1],
                },
                body:JSON.stringify(params1),
            });
            NetUtil.responseMsg(res,callback);
        } catch (error) {
            //请求出错
            console.log(error.name +'  :  '+error.message);
        }
    }

    static async patch(url,params,params1,headers,callback){
        //fetch请求
        url = NetUtil.urlH+url;
        url = NetUtil.getUrlByparams(url,params);
        console.log(url);
        NetUtil.repeatData = {type:'PATCH',url:url,params:params1,headers:headers,callback:callback};
        try {
            let res = await fetch(url,{
                method: 'PATCH',
                headers:{
                    'Content-Type' : headers[0],
                    'Accept' : headers[1],
                },
                body:JSON.stringify(params1),
            })
            NetUtil.responseMsg(res,callback);
        } catch (error) {
            //请求出错
            console.log(error.name +'  :  '+error.message);
        }

    }
    static async put(url,params,params1,headers,callback){
        url = NetUtil.urlH+url;
        url = NetUtil.getUrlByparams(url,params);
        console.log(url);
        NetUtil.repeatData = {type:'PUT',url:url,params:params1,headers:headers,callback:callback};
        try {
            //fetch请求
            let res = await fetch(url,{
                method: 'PUT',
                headers:{
                    'Content-Type' : headers[0],
                    'Accept' : headers[1],
                },
                body:JSON.stringify(params1)
            })
            NetUtil.responseMsg(res,callback);
        } catch (error) {
            console.log(error.name +'  :  '+error.message);
        }
    }
    static async delete(url,params,params1,headers,callback){
        url = NetUtil.urlH+url;
        url = NetUtil.getUrlByparams(url,params);
        console.log(url);
        NetUtil.repeatData = {type:'DELETE',url:url,params:params1,headers:headers,callback:callback};
        try {
            //fetch请求
            let res = await fetch(url,{
                method: 'DELETE',
                headers:{
                    'Content-Type' : headers[0],
                    'Accept' : headers[1],
                },
                body:JSON.stringify(params1)
            })
            NetUtil.responseMsg(res,callback);
        } catch (error) {
            console.log(error.name +'  :  '+error.message);
        }
    }
    static getUrlByparams = (url,params)=>{
        if (params && JSON.stringify(params)!== '{}') {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
            console.log(paramsArray);
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&');
            } else{
                url += '&' + paramsArray.join('&');
            }
        }
        return url;
    }
    static async responseMsg(res,callback){
        console.log(res);
        if(res.ok === true){
            let responseJson = {}
            if(res._bodyText !== ''){
                responseJson = await res.json();
            }
            if(callback){
                callback(responseJson);
            }
        }else{
            if(res.status == 401){
                NetUtil.refreshToken();
            }else if(res.status == 400){
                if(JSON.parse(res._bodyText).error == 'invalid_grant'){
                    NavigationService.navigate('Login');
                }else{
                    Error.errorfloat(res);
                }
            }else{
                Error.errorfloat(res);
            }
        }
    }
    static async refreshToken(){
        let token = DataUtil.getinstance().getAccont().refresh_token;
        let url = NetUtil.urlH+'/yiya/oauth/token';
        let params = {'client_id':'app','client_secret':'w2V6DbA5o9VRT0BWFrRGm7kzYnatwYNO'
        ,'grant_type':'refresh_token','refresh_token':token};
        url = NetUtil.getUrlByparams(url,params);
        console.log(url);
        try {
            let res = await fetch(url,{
                method: 'GET',
                headers:{
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json',
                },
            });
            NetUtil.responseMsg(res,(responseJson)=>{
                let nowTime = new Date().getTime() / 1000;
                responseJson.expires_in = parseInt(responseJson.expires_in) + parseInt(nowTime);
                DataUtil.getinstance().setAccont(responseJson);
                NetUtil.sendMsgRepeat();
            });
        }catch (error) {
            //请求出错
            console.log(error.name +'  :  '+error.message);
        }

    }
    static async sendMsgRepeat(){
        let repeatData = NetUtil.repeatData;
        let _urlArr = repeatData.url.split('access_token=');
        let _urlLeft = _urlArr[0];
        let _urlRight = _urlArr[1];
        if(_urlRight.length > 36){
            let oldToken = _urlRight.substring(0,35);
            _urlRight.replace(oldToken,DataUtil.getinstance().getAccont().access_token);
        }else{
            _urlRight = DataUtil.getinstance().getAccont().access_token;
        }
        repeatData.url = _urlLeft +'access_token=' + _urlRight;

        try {
            let res = await fetch(repeatData.url,{
                method: 'GET',
                headers:{
                    'Content-Type' : repeatData.headers[0],
                    'Accept' : repeatData.headers[1],
                },
            })
            NetUtil.responseMsg(res,repeatData.callback);
        } catch (error) {
            console.log(error.name +'  :  '+error.message);
        }
    }
}
export default NetUtil;