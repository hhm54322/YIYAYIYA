'use strict';
import React, {Component} from 'react';
import {
    StackNavigator,
} from 'react-navigation';

import MainView from './MainView';
import TextBodyView from '../textbody/TextBodyView';
import ReleaseView from '../release/ReleaseView';
import PrivilegeView from '../privilege/PrivilegeView';
import PersonInfoView from '../personInfo/PersonInfoView';
import BabyModalView from '../babyModal/BabyModalView';
import BabyInfoView from '../babyInfo/BabyInfoView';
import AddBabyView from '../addBaby/AddBabyView';
import BabyInfoReviseView from '../babyInfoRevise/BabyInfoReviseView';
import FamilyReviseView from '../familyRevise/FamilyReviseView';
import JoinFamilyView from '../joinFamily/JoinFamilyView';
import JoinFamilyNextView from '../joinFamily/JoinFamilyNextView';
import SettingView from '../setting/SettingView';
import SettingPlayVideoModalView from '../setting/SettingPlayVideoModalView';
import AboutUsView from '../aboutUs/AboutUsView';
import InformationView from '../information/InformationView';
import AddressListView from '../addressList/AddressListView';
import FeedbackView from '../feedback/FeedbackView';
import BabyMainView from '../babyMain/BabyMainView';
import ChooseEpisodeView from '../chooseEpisode/ChooseEpisodeView';


//路由
const AppStackNavigator = StackNavigator({
    MainView:{
        screen:MainView,
        navigationOptions: ({navigation}) => ({ 
            header: null,
        })
    },
    TextBodyView:{
        screen:TextBodyView,
        navigationOptions: ({navigation}) => ({ 
            header: null,
        })
    },
    ReleaseView:{
        screen:ReleaseView,
        navigationOptions: ({navigation}) => ({ 
            header: null,
        })
    },
    PrivilegeView:{
        screen:PrivilegeView,
        navigationOptions: ({navigation}) => ({ 
            header: null,
        })
    },
    PersonInfoView:{
        screen:PersonInfoView,
        navigationOptions: ({navigation}) => ({ 
            header: null,
        })
    },
    BabyModalView:{
        screen:BabyModalView,
        navigationOptions: ({navigation}) => ({ 
            header: null,
        })
    },
    BabyInfoView:{
        screen:BabyInfoView,
        navigationOptions: ({navigation}) => ({ 
            header: null,
        })
    },
    AddBabyView:{
        screen:AddBabyView,
        navigationOptions: ({navigation}) => ({ 
            header: null,
        })
    },
    BabyInfoReviseView:{
        screen:BabyInfoReviseView,
        navigationOptions: ({navigation}) => ({ 
            header: null,
        })
    },
    FamilyReviseView:{
        screen:FamilyReviseView,
        navigationOptions: ({navigation}) => ({ 
            header: null,
        })
    },
    JoinFamilyView:{
        screen:JoinFamilyView,
        navigationOptions: ({navigation}) => ({ 
            header: null,
        })
    },
    JoinFamilyNextView:{
        screen:JoinFamilyNextView,
        navigationOptions: ({navigation}) => ({ 
            header: null,
        })
    },
    SettingView:{
        screen:SettingView,
        navigationOptions: ({navigation}) => ({ 
            header: null,
        })
    },
    SettingPlayVideoModalView:{
        screen:SettingPlayVideoModalView,
        navigationOptions: ({navigation}) => ({ 
            header: null,
        })
    },
    AboutUsView:{
        screen:AboutUsView,
        navigationOptions: ({navigation}) => ({ 
            header: null,
        })
    },
    InformationView:{
        screen:InformationView,
        navigationOptions: ({navigation}) => ({ 
            header: null,
        })
    },
    AddressListView:{
        screen:AddressListView,
        navigationOptions: ({navigation}) => ({ 
            header: null,
        })
    },
    FeedbackView:{
        screen:FeedbackView,
        navigationOptions: ({navigation}) => ({ 
            header: null,
        })
    },
    BabyMainView:{
        screen:BabyMainView,
        navigationOptions: ({navigation}) => ({ 
            header: null,
        })
    },
    ChooseEpisodeView:{
        screen:ChooseEpisodeView,
        navigationOptions: ({navigation}) => ({ 
            header: null,
        })
    },
    
}/*, {
    initialRouteName: 'MainView', // 默认显示界面
    navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
        header: null,
        cardStack: {
            gesturesEnabled: false
        }
    }, 
    mode: 'modal',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    onTransitionStart: ()=>{ console.log('导航栏切换开始'); },  // 回调
    onTransitionEnd: ()=>{ console.log('导航栏切换结束'); }  // 回调
}*/);

export default class MainNavigator extends Component{
    constructor(props) {
        super(props);
    }
    
    componentDidMount(){
    }
    componentWillUnmount(){
    }

    render(){
        return(
            <AppStackNavigator/>
        )
    }
};

