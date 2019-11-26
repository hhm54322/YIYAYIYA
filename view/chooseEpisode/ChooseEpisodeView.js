'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    ImageBackground,
    ScrollView,

} from 'react-native';

import SceneUtils from '../../utils/SceneUtils';
import MyVideo from '../../component/MyBabyVideo'
import NetService from '../../utils/NetService';

export default class ChooseEpisodeView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex:this.props.navigation.state.params.episode,
            videoInfo:null,
            isFullScreen:true
        };
        this.myVideo = null;
        this.data = this.props.navigation.state.params.data;
        this.scrollView = null;
    }

    //生命周期函数，render之后被调用
    componentDidMount(){
        this.sendBabyVideoInfo(this.state.selectedIndex);
    }
    //生命周期函数，render之前被调用
    componentWillMount(){
    }
    //生命周期函数，卸载时调用
    componentWillUnmount(){

    }
    //返回按钮点击事件
    onTouchBack(){
        this.props.navigation.goBack();
    }
    //更多按钮点击事件
    onTouchMore(){
        console.log('onTouchMore');
    }
    //集数选择
    onTouchEpisode(episode){
        if(episode != this.state.selectedIndex){
            this.setState({
                selectedIndex:episode
            })
            this.sendBabyVideoInfo(episode);
        }
    }
    //是否视频最大化
    onFullScreen(b){
        this.setState({
            isFullScreen:b,
        })
    }
    //获取视频详细信息
    sendBabyVideoInfo(episode){
        if(this.myVideo) this.myVideo.removeTimeout();
        if(this.scrollView){
            if(episode >= this.data.infoVos.length - 2){
                setTimeout(() => {
                    this.scrollView.scrollToEnd();
                }, 10);
            }else{
                this.scrollView.scrollTo(SceneUtils.autoWidth(114) * episode);
            }
        }
        NetService.sendBabyVideoInfo(this.data.infoVos[episode].id,(responseJson)=>{
            this.setState({
                videoInfo:responseJson,
            })
            this.myVideo.setFullTimeout();
            this.myVideo.setVideoData(false,responseJson.duration,responseJson.title,responseJson.playInfoVos[0].playURL);
        });
    }
    //显示顶部状态栏
    showTopView(){
        return(
            <ImageBackground source = {require('../../images/rectangle3.png')} style={styles.topView}>
                <View style={styles.topLeftView}>
                    <TouchableWithoutFeedback
                        onPress ={()=>{
                            this.onTouchBack();
                        }}>
                        <Image source = {require('../../images/back2.png')} style = {styles.backImg}/>
                    </TouchableWithoutFeedback>
                    <Text style={styles.titleLeftText}>{this.data.title}</Text>
                </View>
                {/* <TouchableWithoutFeedback
                    onPress ={()=>{
                        this.onTouchMore();
                    }}>
                        <Image source = {require('./img/more.png')} style = {styles.moreImg}/>
                </TouchableWithoutFeedback> */}
            </ImageBackground>
        )
    }
    //显示播放器容器
    showVideoView(){
        if(this.state.videoInfo == null) return;
        let videoData = this.state.videoInfo;
        return(
            <ImageBackground source = {require('./img/rectangle2.png')} style={this.state.isFullScreen ? styles.videoPanelFullView : styles.videoPanelView}>
                <View style = {this.state.isFullScreen ? styles.videoBgFullView : styles.videoBgView}>
                    <MyVideo ref= {ref=>{this.myVideo = ref}}
                        source={videoData.playInfoVos[0].playURL}
                        style={styles.videoStyle}
                        title={videoData.title}
                        totalTime={videoData.duration}
                        isFullScreen={this.state.isFullScreen}
                        onFullScreen={(b) => this.onFullScreen(b)}
                    />
                </View>
            </ImageBackground>
        )
    }
    //显示选集列表
    showEpisodeListView(){
        return(
            <View style={styles.episodePanelView}>
                <ScrollView ref={ref=>{this.scrollView = ref}} 
                    showsVerticalScrollIndicator = {false}
                    onScrollBeginDrag={()=>{
                        this.myVideo.removeTimeout();
                    }}
                    onScrollEndDrag={()=>{
                        this.myVideo.setFullTimeout();
                    }}
                    >
                    {this.renderScrollChildView()}
                </ScrollView>
            </View>
        )
    }
    //选集列表子元素
    renderScrollChildView(){
        var allChild = [];
        var length = this.data.infoVos.length;
        for(var i = 0;i < length;i++){
            let videoData = this.data.infoVos[i];
            allChild.push(
                <TouchableWithoutFeedback 
                    key={i} 
                    onPress={
                        this.onTouchEpisode.bind(this, i)
                    }>
                    <View style={styles.scrollChildView}>
                        <ImageBackground source = {i == this.state.selectedIndex ? require('./img/rectangle1.png') : require('./img/rectangle4.png')} style={styles.episodeBgImg}>
                            <Image source = {{uri:videoData.cover}} style = {styles.episodeImg}/>  
                            <Text style={styles.episodeText}>{i < 9 ? '0' + (i+1) + ' ' + videoData.title : (i+1) + ' ' + videoData.title}</Text>
                            {videoData.onlyVip == 0 ? null : <ImageBackground source = {require('../../images/graph2.png')} style = {styles.episodeVipIcon}>
                                                <Text style={styles.episodeVipText}>VIP</Text>
                                            </ImageBackground>}
                        </ImageBackground>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
        return allChild;
    }
    render() {
        return (
            <View style={styles.container}>
                {this.showTopView()}
                {this.showEpisodeListView()}
                {this.showVideoView()}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        width:SceneUtils.screenWidth,
        height:SceneUtils.screenHeight,
        backgroundColor:'#f5f7fa'
    },
    topView:{
        position:'absolute',
        left:-(SceneUtils.screenHeight - SceneUtils.autoWidth(50)) / 2,
        top:(SceneUtils.screenHeight - SceneUtils.autoWidth(50)) / 2,
        width:SceneUtils.screenHeight,
        height:SceneUtils.autoWidth(50),
        flexDirection:'row',
        alignItems:'center',
        transform: [{rotate:'-90deg'}]
    },
    topLeftView:{
        flexDirection:'row',
        marginLeft:SceneUtils.autoHeight(15),
        height:SceneUtils.autoWidth(38),
        alignItems:'center',
    },
    backImg:{
        width:SceneUtils.autoWidth(38),
        height:SceneUtils.autoWidth(38),
    },
    titleLeftText:{
        marginLeft:SceneUtils.autoWidth(4),
        fontSize:SceneUtils.setSpText(16),
        fontFamily: 'HYZhengYuan',
        color:'#333333',
    },
    moreImg:{
        position:'absolute',
        top:SceneUtils.autoWidth(8),
        left:SceneUtils.autoHeight(445.5),
        width:SceneUtils.autoWidth(38),
        height:SceneUtils.autoWidth(38),
    },
    videoPanelView:{
        position:'absolute',
        left:-SceneUtils.autoWidth(472) / 2 + SceneUtils.autoWidth(268.5) / 2 + SceneUtils.autoWidth(78.5),
        top:SceneUtils.screenHeight - SceneUtils.autoWidth(268.5) - (SceneUtils.autoWidth(472) / 2 - SceneUtils.autoWidth(268.5) / 2) - SceneUtils.autoHeight(11.5),
        width:SceneUtils.autoWidth(472),
        height:SceneUtils.autoWidth(268.5),
        justifyContent:'center',
        alignItems:'center',
        transform: [{rotate:'-90deg'}]
    },
    videoPanelFullView:{
        position:'absolute',
        left:-(SceneUtils.screenHeight / 2 - SceneUtils.screenWidth / 2),
        top:SceneUtils.screenHeight / 2 - SceneUtils.screenWidth / 2,
        width:SceneUtils.screenHeight,
        height:SceneUtils.screenWidth,
        transform: [{rotate:'-90deg'}]
    },
    videoBgView:{
        width:SceneUtils.autoWidth(436),
        height:SceneUtils.autoWidth(245),
        alignItems:'center',
        borderRadius:SceneUtils.autoWidth(26),
        overflow:'hidden'
    },
    videoBgFullView:{
        position:'absolute',
        top:0,
        left:0,
        width:SceneUtils.screenHeight,
        height:SceneUtils.screenWidth,
        alignItems:'center',
    },
    videoStyle:{
        width:SceneUtils.autoWidth(436),
        height:SceneUtils.autoWidth(245),
    },
    episodePanelView:{
        position:'absolute',
        top:-SceneUtils.autoWidth(296.5) / 2 + SceneUtils.autoWidth(149) / 2 + SceneUtils.autoWidth(11.5),
        left:SceneUtils.autoWidth(296.5) / 2 - SceneUtils.autoWidth(149) / 2 + SceneUtils.autoWidth(78.5),
        width:SceneUtils.autoWidth(149),
        height:SceneUtils.autoWidth(296.5),
        transform: [{rotate:'-90deg'}]
    },
    scrollChildView:{
        marginBottom:SceneUtils.autoWidth(13),
        width:SceneUtils.autoWidth(149),
        height:SceneUtils.autoWidth(101)
    },
    episodeBgImg:{
        width:SceneUtils.autoWidth(149),
        height:SceneUtils.autoWidth(101)
    },
    episodeImg:{
        width:SceneUtils.autoWidth(121),
        height:SceneUtils.autoWidth(67.5),
        alignSelf:'center',
        marginTop:SceneUtils.autoWidth(8.5),
        borderRadius:SceneUtils.autoWidth(11.5),
    },
    episodeText:{
        fontSize:SceneUtils.setSpText(11),
        fontFamily: 'HYZhengYuan',
        color:'#333333',
        marginTop:SceneUtils.autoWidth(3),
        marginLeft:SceneUtils.autoWidth(14)
    },
    episodeVipIcon:{
        position:'absolute',
        width:SceneUtils.autoWidth(47.5),
        height:SceneUtils.autoWidth(19),
        top:SceneUtils.autoWidth(3.5),
        left:SceneUtils.autoWidth(74.5 + 60.5 - 47.5),
        justifyContent:'center',
        alignItems:'center'
    },
    episodeVipText:{
        fontSize:SceneUtils.setSpText(13),
        fontFamily: 'HYZhengYuan',
        color:'#f5f7fa'
    }
});