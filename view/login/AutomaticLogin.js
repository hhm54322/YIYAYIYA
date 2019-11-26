'use strict';
import React, {Component} from 'react';
import {
    View,
} from 'react-native';

import StorageHelper from '../../utils/StorageHelper';
import DataUtil from '../../utils/DataUtil';
import NetService from '../../utils/NetService';



//初始化界面
export default class AutomaticLogin extends Component{
    constructor(props) {
        super(props);
    }
   
    componentWillUnmount(){
    }
    
    componentDidMount(){
        const { navigate } = this.props.navigation;
        StorageHelper.get('pStruct',(mod)=>{
            if(mod == null){
                navigate('Login');
            }else{
                DataUtil.getinstance().setAccont(mod);
                let currentTimestamp = new Date().getTime() / 1000;
                if(currentTimestamp < mod.expires_in){
                    //access_token未过期,获取账户资料
                    this.sendInfo();
                }else{
                    //access_token已过期,刷新access_token
                    NetService.sendRefreshToken((responseJson)=>{
                        this.sendInfo();
                    })
                }
            }
        });
    }
    //获取账户信息并跳转主页
    sendInfo(){
        const { navigate } = this.props.navigation;
        NetService.sendInfo((responseJson)=>{
            navigate('Main');
        });
    }

    render() {
        return (
            <View>
            </View>
        );
    }
}