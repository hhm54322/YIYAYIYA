'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Text,
    ScrollView
} from 'react-native';
import AlvideoView from '../../component/AlvideoView'
import SceneUtils from '../../utils/SceneUtils';
import Video from '../../component/MyVideo';

export default class Page2 extends Component{
    constructor(props) {
        super(props);
    }

    componentWillUnmount(){
    }
    //显示播放列表子容器
    renderVideoScrollViewChild(){
        var allChild = [];
        var length = 10;
        for(var i = 0;i < length;i++){
            allChild.push(
                <View key={i} style={i == 0 ? styles.videoScrollChildView : [styles.videoScrollChildView,{marginTop:SceneUtils.autoHeight(16)}]}>
                    
                </View>
            );
        }
        return allChild;
    }
    onTouchVideo(){
        this.refs.video.start();
    }
     //显示播放器
     showVideo(){
        return(
            <TouchableWithoutFeedback
                onPress ={()=>{
                    this.onTouchVideo();
                }}>
                <Video source={"http://videoplay.yiyayiyawow.com/b33be7d2e27641758e8a328d127606cc/559fa087f3b64dd5a81c5b0ba5c493a5-97984ec375e1366a99e50aee9e924fb5-ld.mp4"}
                    sWidth={SceneUtils.autoWidth(375)} 
                    sHeight={SceneUtils.autoHeight(200)}
                    index={0}
                    title={"我是小猪佩奇!"}
                    totalTime={100}
                />

                {/* <AlvideoView ref={'video'} style={[styles.alVideo,{top:SceneUtils.autoHeight(227)}]}
                    // url={"http://qiniu.xiguangtech.com/201812/54572776cb254be2aa5115d25465861e.mp4?from=app"}
                    url={"http://videoplay.yiyayiyawow.com/b33be7d2e27641758e8a328d127606cc/559fa087f3b64dd5a81c5b0ba5c493a5-97984ec375e1366a99e50aee9e924fb5-ld.mp4"}
                    title={"我是小猪佩奇!"}
                /> */}
            </TouchableWithoutFeedback>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>RN界面返回</Text>
                {this.showVideo()}
                {/* <View style={styles.videoScrollView}> */}
                    {/* <ScrollView
                        showsVerticalScrollIndicator = {false}
                        >
                        {this.renderVideoScrollViewChild()}
                        {this.showVideo()}
                    </ScrollView> */}
                {/* </View> */}
               
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'rgb(51,51,51)',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

    videoScrollView:{
        width:SceneUtils.screenWidth
    },
    videoScrollChildView:{
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(211),
        backgroundColor:"#ff0000"
    },
    alVideo:{
        position: 'absolute',
        width:SceneUtils.screenWidth,
        height:SceneUtils.autoHeight(211),
    }
});