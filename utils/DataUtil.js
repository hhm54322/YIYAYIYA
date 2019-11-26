'use strict';

import StorageHelper from './StorageHelper';

//获取所有的缓存数据
class DataUtil{
    static instence = null;
    constructor() {
        //账户信息
        this.accontData = null;
        this.infoData = null;
    }
    //设置账户信息
    setAccont(responseJson){
        this.accontData = responseJson;
        StorageHelper.save('pStruct',responseJson);
    }
    //获取账户信息
    getAccont(){
        return this.accontData;
    }
    //设置用户信息
    setInfo(responseJson){
        if(responseJson.birthdate != null && responseJson.birthdate != ''){
            responseJson.birthdate = responseJson.birthdate.substring(0,10);
        }
        this.infoData = responseJson;
    }
    //获取用户信息
    getInfo(){
        return this.infoData;
    }
    static getinstance(){
        if(this.instence === null){
            this.instence = new DataUtil();
        }
        return this.instence;
    }
}
export default DataUtil;






