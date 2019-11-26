'use strict';

import DataUtil from './DataUtil';
import NetUtil from './NetUtil';
import md5 from "react-native-md5";
//网络服务    
//接口统一管理
let NetService = {
    //获取验证码
    sendCode(phoneNum,callback){
        let url = '/yiya/account/services/sms_code_generating';
        let params = {};
        let params1 = {'cellPhoneNumber':phoneNum,'countryCode':'86'};
        NetUtil.post(url,params,params1,['application/json','application/json'],(responseJson) =>{
            if(callback){
                callback(responseJson);
            }
        });
    },
    //注册
    sendRegister(phoneNum,code,callback){
        let md5Code = md5.hex_md5(code);
        md5Code = md5.hex_md5(md5Code);
        let url = '/yiya/account/services/registration';
        let params = {};
        let params1 = {'cellPhoneNumber':phoneNum,'countryCode':'86','smsCode':md5Code};
        NetUtil.post(url,params,params1,['application/json','application/json'],(responseJson) =>{
            if(callback){
                callback(responseJson);
            }
        });
    },
    //获取token
    sendToken(phoneNum,code,callback){
        let md5Code = md5.hex_md5(code);
        md5Code = md5.hex_md5(md5Code);
        let url = '/yiya/oauth/token';
        let params = {'client_id':'app','client_secret':'w2V6DbA5o9VRT0BWFrRGm7kzYnatwYNO'
        ,'grant_type':'password','password':md5Code,'username':'86' + phoneNum};
        NetUtil.get(url,params,['application/json','application/json'],(responseJson) =>{
            if(callback){
                let nowTime = new Date().getTime() / 1000;
                responseJson.expires_in = parseInt(responseJson.expires_in) + parseInt(nowTime);
                DataUtil.getinstance().setAccont(responseJson);
                callback(responseJson);
            }
        });
    },
    //刷新token
    sendRefreshToken(callback){
        let token = DataUtil.getinstance().getAccont().refresh_token;
        let url = '/yiya/oauth/token';
        let params = {'client_id':'app','client_secret':'w2V6DbA5o9VRT0BWFrRGm7kzYnatwYNO'
        ,'grant_type':'refresh_token','refresh_token':token+'123'};
        NetUtil.get(url,params,['application/json','application/json'],(responseJson) =>{
            if(callback){
                let nowTime = new Date().getTime() / 1000;
                responseJson.expires_in = parseInt(responseJson.expires_in) + parseInt(nowTime);
                DataUtil.getinstance().setAccont(responseJson);
                callback(responseJson);
            }
        });
    },
    //获取账户资料
    sendInfo(callback){
        let token = DataUtil.getinstance().getAccont().access_token;
        let url = '/yiya/account/info';
        let params = {'access_token':token};
        NetUtil.get(url,params,['application/json',
        'application/json'], (responseJson) =>{
            if(callback){
                DataUtil.getinstance().setInfo(responseJson);
                callback(responseJson);
            }
        });
    },
    //修改用户资料
    sendReviseInfo(params1,callback){
        let token = DataUtil.getinstance().getAccont().access_token;
        let url = '/yiya/account/info';
        let params = {'access_token':token};
        console.log(params1);
        NetUtil.put(url,params,params1,['application/json',
        'application/json'], (responseJson) =>{
            if(callback){
                DataUtil.getinstance().setInfo(responseJson);
                callback(responseJson);
            }
        });
    },
    //反馈意见
    sendFeedback(params1,callback){
        let token = DataUtil.getinstance().getAccont().access_token;
        let url = '/yiya/message/feedback';
        let params = {'access_token':token};
        NetUtil.post(url,params,params1,['application/json','application/json'],(responseJson) =>{
            if(callback){
                callback(responseJson);
            }
        });
    },
    //生活资讯视频分类列表
    sendContentVideoTypeList(callback){
        let token = DataUtil.getinstance().getAccont().access_token;
        let url = '/yiya/content/videos/position';
        let params = {'access_token':token};
        NetUtil.get(url,params,['application/json','application/json'],(responseJson) =>{
            if(callback){
                callback(responseJson);
            }
        });
    },
    //生活资讯视频列表
    sendContentVideoList(type,callback){
        let token = DataUtil.getinstance().getAccont().access_token;
        let url = '/yiya/content/videos';
        let params = {'access_token':token,'positionId':type,'offset':10};
        NetUtil.get(url,params,['application/json','application/json'],(responseJson) =>{
            if(callback){
                callback(responseJson);
            }
        });
    },
    //宝宝首页视频列表
    sendBabyMainVideoList(callback){
        let token = DataUtil.getinstance().getAccont().access_token;
        let url = '/yiya/media/video/home/main';
        let params = {'access_token':token};
        NetUtil.get(url,params,['application/json','application/json'],(responseJson) =>{
            if(callback){
                callback(responseJson);
            }
        });
    },
    //获取宝宝视频详情
    sendBabyVideoInfo(id,callback){
        let token = DataUtil.getinstance().getAccont().access_token;
        let url = '/yiya/media/video/info/' + id;
        let params = {'access_token':token};
        NetUtil.get(url,params,['application/json','application/json'],(responseJson) =>{
            if(callback){
                callback(responseJson);
            }
        });
    },
    //获取播放记录
    sendPlaybackRecord(beginId,offset,callback){
        let token = DataUtil.getinstance().getAccont().access_token;
        let url = '/yiya/media/playRecord/';
        let params = {'access_token':token,'beginId':beginId,'offset':offset};
        NetUtil.get(url,params,['application/json','application/json'],(responseJson) =>{
            if(callback){
                callback(responseJson);
            }
        });
    },
    //删除播放记录
    sendDelPlaybackRecord(id,callback){
        let token = DataUtil.getinstance().getAccont().access_token;
        let url = '/yiya/media/playRecord/' + id;
        let params = {'access_token':token};
        NetUtil.delete(url,params,{},['application/json','application/json'],(responseJson) =>{
            if(callback){
                callback(responseJson);
            }
        });
    },
    //删除所有播放记录
    sendDelAllPlaybackRecord(callback){
        let token = DataUtil.getinstance().getAccont().access_token;
        let url = '/yiya/media/playRecord';
        let params = {'access_token':token};
        NetUtil.delete(url,params,{},['application/json','application/json'],(responseJson) =>{
            if(callback){
                callback(responseJson);
            }
        });
    },
    //获取宝宝视频分类列表
    sendBabyVideoTypeList(callback){
        let token = DataUtil.getinstance().getAccont().access_token;
        let url = '/yiya/media/video/category/main';
        let params = {'access_token':token};
        NetUtil.get(url,params,['application/json','application/json'],(responseJson) =>{
            if(callback){
                callback(responseJson);
            }
        });
    },
    //宝宝视频列表
    sendBabyVideoList(type,beginId,offset,callback){
        let token = DataUtil.getinstance().getAccont().access_token;
        let url = '/yiya/media/video/category/main/'+type+'/info';
        let params = {'access_token':token,'beginId':beginId,'offset':offset};
        NetUtil.get(url,params,['application/json','application/json'],(responseJson) =>{
            if(callback){
                callback(responseJson);
            }
        });
    },
    //获取宝宝音频分类列表
    sendBabySongTypeList(callback){
        let token = DataUtil.getinstance().getAccont().access_token;
        let url = '/yiya/media/audio/main';
        let params = {'access_token':token};
        NetUtil.get(url,params,['application/json','application/json'],(responseJson) =>{
            if(callback){
                callback(responseJson);
            }
        });
    },
    //宝宝音频列表
    sendBabySongList(type,beginId,offset,callback){
        let token = DataUtil.getinstance().getAccont().access_token;
        let url = '/yiya/media/audio/main/'+type+'/info';
        let params = {'access_token':token,'beginId':beginId,'offset':offset};
        NetUtil.get(url,params,['application/json','application/json'],(responseJson) =>{
            if(callback){
                callback(responseJson);
            }
        });
    },
    //宝宝音频详情
    sendBabySongInfo(id,callback){
        let token = DataUtil.getinstance().getAccont().access_token;
        let url = '/yiya/media/audio/info/' + id;
        let params = {'access_token':token};
        NetUtil.get(url,params,['application/json','application/json'],(responseJson) =>{
            if(callback){
                callback(responseJson);
            }
        });
    },
    //宝宝模式验证码
    sendBabyCode(callback){
        let token = DataUtil.getinstance().getAccont().access_token;
        let url = '/yiya/account/info/baby_password_sms_code';
        let params = {'access_token':token};
        NetUtil.post(url,params,{},['application/json','application/json'],(responseJson) =>{
            if(callback){
                callback(responseJson);
            }
        });
    },
    //宝宝模式密码更新
    sendSwitchBabyMode(password,callback){
        let token = DataUtil.getinstance().getAccont().access_token;
        let url = '/yiya/account/info/baby_password';
        let params = {'access_token':token};
        let params1 = {'babyPassword':password};
        NetUtil.put(url,params,params1,['application/json',
        'application/json'], (responseJson) =>{
            if(callback){
                callback(responseJson);
            }
        });
    },
    //集合列表
    sendCollectionList(callback){
        let token = DataUtil.getinstance().getAccont().access_token;
        let url = '/yiya/content/aggregate';
        let params = {'access_token':token};
        NetUtil.get(url,params,['application/json','application/json'],(responseJson) =>{
            if(callback){
                callback(responseJson);
            }
        });
    },
    //活动列表
    sendNewsList(callback){
        let token = DataUtil.getinstance().getAccont().access_token;
        let url = '/yiya/content/activity';
        let params = {'access_token':token};
        NetUtil.get(url,params,['application/json','application/json'],(responseJson) =>{
            if(callback){
                callback(responseJson);
            }
        });
    }
}
export default NetService;
