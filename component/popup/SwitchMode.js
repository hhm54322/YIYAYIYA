'use strict';
import React from 'react';
import RootSibling from 'react-native-root-siblings';
import SwitchModeContainer from './SwitchModeContainer';
import StorageHelper from '../../utils/StorageHelper';


//切换密码弹窗 直接掉用show方法然后传入字符串即可
let rootSibling = null;

function destroy() {
    if (rootSibling) {
        rootSibling.destroy();
        rootSibling = null;
    }
}

export default class SwitchMode {
    //showType:0 家长模式跳转宝宝模式，1:宝宝模式视频超时播放，2:宝宝模式跳转家长模式，3:设置界面修改密码
    static show(showType,callback) {
        StorageHelper.get('babyPassword',(mod)=>{
            if(showType == 0 && mod && mod.password != ''){
                callback();
            }else{
                if(!rootSibling){
                    rootSibling = new RootSibling(
                        <SwitchModeContainer
                            password={mod}
                            showType={showType}
                            destroy={(type) =>{
                                if(type == 1 && callback){
                                    callback();
                                }
                                destroy();
                            }}
                        />);
                }
            }
        })
    }
}