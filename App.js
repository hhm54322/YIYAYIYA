'use strict';
import React, { 
  Component,
} from 'react';
import {
  StackNavigator,
  SwitchNavigator
}from "react-navigation";
import NavigationService from './utils/NavigationService';

import AutomaticLogin from './view/login/AutomaticLogin';
import Login from './view/login/LoginView';
import MainView from './view/main/MainView';
import TextBodyView from './view/textbody/TextBodyView';
import ReleaseView from './view/release/ReleaseView';
import PrivilegeView from './view/privilege/PrivilegeView';
import PersonInfoView from './view/personInfo/PersonInfoView';
import BabyModalView from './view/babyModal/BabyModalView';
import BabyInfoView from './view/babyInfo/BabyInfoView';
import AddBabyView from './view/addBaby/AddBabyView';
import BabyInfoReviseView from './view/babyInfoRevise/BabyInfoReviseView';
import FamilyReviseView from './view/familyRevise/FamilyReviseView';
import JoinFamilyView from './view/joinFamily/JoinFamilyView';
import JoinFamilyNextView from './view/joinFamily/JoinFamilyNextView';
import SettingView from './view/setting/SettingView';
import SettingPlayVideoModalView from './view/setting/SettingPlayVideoModalView';
import AboutUsView from './view/aboutUs/AboutUsView';
import InformationView from './view/information/InformationView';
import AddressListView from './view/addressList/AddressListView';
import FeedbackView from './view/feedback/FeedbackView';
import BabyMainView from './view/babyMain/BabyMainView';
import ChooseEpisodeView from './view/chooseEpisode/ChooseEpisodeView';
import PlaybackRecordView from './view/playbackRecord/PlaybackRecordView';
import SceneTypeView from './view/sceneType/SceneTypeView';
import SongView from './view/song/SongView';
import LinkView from './view/link/LinkView';

import Page1 from './view/page/Page1'
import Page2 from './view/page/Page2'

//家长模式路由
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
  LinkView:{
        screen:LinkView,
    }
},{
    //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
    navigationOptions: {
        gesturesEnabled: false
    }
});

//宝宝模式路由
const BabyStackNavigator = StackNavigator({
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
  PlaybackRecordView:{
        screen:PlaybackRecordView,
        navigationOptions: ({navigation}) => ({ 
            header: null,
        })
  },
  SceneTypeView:{
        screen:SceneTypeView,
        navigationOptions: ({navigation}) => ({ 
            header: null,
        })
  },
  SongView:{
        screen:SongView,
        navigationOptions: ({navigation}) => ({ 
            header: null,
        })
  },
}, {
    initialRouteName: 'BabyMainView', // 默认显示界面
    navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
        gesturesEnabled: false
    }, 
    mode: 'modal',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
});

const SimpleApp = StackNavigator({
//   Page2:{
//     screen:Page2,
//     navigationOptions: ({navigation}) => ({ 
//       header: null,
//     })
//   },
  AutomaticLogin:{
    screen:AutomaticLogin,
    navigationOptions: ({navigation}) => ({ 
      header: null,
    })
  },
  Login:{//登陆界面
    screen:Login,
    navigationOptions: ({navigation}) => ({ 
      header: null,
    })
  },
  Main:{
    screen:AppStackNavigator,
    navigationOptions: ({navigation}) => ({ 
      header: null,
    })
  },
  BabyMain:{
    screen:BabyStackNavigator,
    navigationOptions: ({navigation}) => ({ 
      header: null,
    })
  }
},{
    //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
    navigationOptions: {
        gesturesEnabled: false
    }
});

export default class App extends Component {
  render(){
    return <SimpleApp ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
    }}/>;
  }
}
