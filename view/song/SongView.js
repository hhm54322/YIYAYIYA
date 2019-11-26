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
    Animated,
    Easing 
} from 'react-native';

import SceneUtils from '../../utils/SceneUtils';
import Slider from '../../component/Slider';
import Video from 'react-native-video';
import NetService from '../../utils/NetService';
import DateUtil from '../../utils/DateUtil';

export default class SongView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedTypeIndex:0,
            selectedIndexSong:-1,
            sliderValue:0,
            songState:false,//是否暂停
            songList:[],
            songInfo:null,
            imgRotate:new Animated.Value(0), 
        };
        this.slider = null;
        this.songTypeList = [];
        this.animationIsPlaying = false;
        this.myAnimate = Animated.timing(this.state.imgRotate, {
            toValue: 1,
            duration: 8000,
            easing: Easing.inOut(Easing.linear),
        });
    }

    //生命周期函数，render之后被调用
    componentDidMount(){
        NetService.sendBabySongTypeList((responseJson)=>{
            this.songTypeList = responseJson;
            this.sendSongList(this.state.selectedTypeIndex);
        });
    }
    //生命周期函数，render之前被调用
    componentWillMount(){

    }
    //生命周期函数，卸载时调用
    componentWillUnmount(){

    }
    componentDidUpdate(){
        if(this.state.songInfo != null){
            if(!this.state.songState){
                if(!this.animationIsPlaying){
                    this.animationIsPlaying = true;
                    this.stop();
                }
            }else{
                if(this.animationIsPlaying){
                    this.animationIsPlaying = false;
                    this.stop();
                }
            }
        }
    }
    //返回按钮点击事件
    onTouchBack(){
        this.props.navigation.goBack();
    }
    //分类按钮点击事件
    onTouchType(index){
        if(this.state.selectedTypeIndex != index){
            this.setState({
                selectedTypeIndex:index,
                selectedIndexSong:-1
            })
            this.sendSongList(index);
        }
    }
    //进度条滚动
    setSliderValue(value){
        if(this.state.songInfo != null){
            this.refs.songVideo.seek(value);
            this.setState({
                sliderValue: value
            })
        }
    }
    //暂停按钮点击事件
    onTouchPause(){
        this.setState({
            songState:true
        })
    }
    //播放按钮点击事件
    onTouchPlay(){
        this.setState({
            songState:false
        })
    }
    //上一首按钮点击事件
    onTouchBefore(){
        if(this.state.selectedIndexSong - 1 >= 0){
            this.onTouchPlaySong(this.state.selectedIndexSong-1);
        }
    }
    //下一首按钮点击事件
    onTouchAfter(){
        if(this.state.selectedIndexSong+1 < this.state.songList.length){
            this.onTouchPlaySong(this.state.selectedIndexSong+1);
        }
    }
    //播放进度  显示时间
    _onProgress = (e)=>{
        let currentTime = parseInt(e.currentTime)
        this.setState({
            sliderValue:currentTime
        })
    }
    //音频播放结束
    _onEnd(event){
        this.setState({
            songState:true
        })
    }
    //音频点击事件
    onTouchPlaySong(index){
        if(this.state.selectedIndexSong != index){
            this.setState({
                selectedIndexSong:index
            })
            this.sendSongInfo(index);
        }
    }
    //获取音频列表
    sendSongList(index){
        NetService.sendBabySongList(this.songTypeList[index].id,0,20,(responseJson)=>{
            // this.songTypeList[this.state.selectedTypeIndex].infoVos = responseJson;
            this.setState({
                songList:responseJson
            })
        });
    }
    //获取音频详情
    sendSongInfo(index){
        NetService.sendBabySongInfo(this.state.songList[index].id,(responseJson)=>{
            this.setState({
                songInfo:responseJson
            })
        });
    }
    //转动动画
    imgMoving(){
        if (this.animationIsPlaying) {
            this.state.imgRotate.setValue(0);
            this.myAnimate.start(() => {
                this.imgMoving()
            })
        }
    };
    //停止或继续
    stop(){
        if (this.animationIsPlaying) {
            this.myAnimate.start(() => {
                this.myAnimate = Animated.timing(this.state.imgRotate, {
                    toValue: 1,
                    duration: 8000,
                    easing: Easing.inOut(Easing.linear),
                });
                this.imgMoving()
            })
        } else {
            this.state.imgRotate.stopAnimation((oneTimeRotate) => {
                //计算角度比例
                this.myAnimate = Animated.timing(this.state.imgRotate, {
                    toValue: 1,
                    duration: (1-oneTimeRotate) * 8000,
                    easing: Easing.inOut(Easing.linear),
                });
            });
        }
    };
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
                    <View style={styles.topTabbarView}>
                        <ScrollView
                            horizontal = {true}
                            showsHorizontalScrollIndicator = {false}
                            >
                            {this.renderTabbarScrollViewChild()}
                        </ScrollView>
                    </View>
                </View>
            </ImageBackground>
        )
    }
    //显示分类列表子容器
    renderTabbarScrollViewChild(){
        var allChild = [];
        var length = this.songTypeList.length;
        for(var i = 0;i < length;i++){
            let typeData = this.songTypeList[i];
            allChild.push(
                <TouchableWithoutFeedback
                    key={i} 
                    onPress={
                        this.onTouchType.bind(this, i)
                    }>
                    <View style={styles.tabbarScrollChildView}>
                        <Text style={this.state.selectedTypeIndex == i ? styles.topTabbarTextSelected : styles.topTabbarTextUnSelected}>{typeData.title}</Text>
                    </View>
                </TouchableWithoutFeedback>
            );
        }
        return allChild;
    }
    //显示除顶部栏外的内容
    showOtherView(){
        return(
            <View style={styles.otherView}>
                {this.showLeftView()}
                {this.showCenterView()}
                {this.showRightView()}
            </View>
        )
    }
    //显示左边当前播放音频
    showLeftView(){
        let songData = this.state.songInfo;
        //映射 0-1的值 映射 成 0 - 360 度  
        const spin = this.state.imgRotate.interpolate({
            inputRange: [0, 1],//输入值
            outputRange: ['0deg', '360deg'] //输出值
        });
        return(
            <View style={styles.leftView}>
                <ImageBackground source = {require('./img/graph4.png')} style={styles.playSongBg}>
                    <Animated.Image style={[styles.playSongImg,{transform:[{rotate: spin }]}]} source={songData == null || songData.coverURL == null || songData.coverURL == '' ? require('./img/graph5.png') : {uri:songData.coverURL}}/>
                </ImageBackground>
                <Image source = {require('./img/graph1.png')} style = {styles.leftViewBgImg}/>
                <Text style={styles.songNameTextCur}>{songData == null ? '' : songData.title}</Text>
                <View style={styles.sliderPanelView}>
                    <Text style={styles.songTimeText}>{songData == null ? '00:00' : DateUtil.formatTime(this.state.sliderValue)}</Text>
                    <Slider
                        ref = {ref =>this.slider = ref}
                        mode='column'
                        value={this.state.sliderValue}
                        buffer={0}
                        disabled={this.state.songInfo == null}
                        thumbImage={require('../../component/img/dot.png')}
                        style={styles.sliderView}
                        thumbStyle={styles.sliderBall}
                        minimumValue={0}
                        maximumValue={songData == null ? 100 : songData.duration}
                        step={1}
                        minimumTrackTintColor='#9EDAC7'
                        maximumTrackTintColor='#ABBAD5'
                        onValueChange={(value) => {
                            // this.setSliderValue(value);
                        }}
                        onSlidingComplete={(value) => {
                            this.setSliderValue(value);
                        }}
                    />
                    <Text style={styles.songTimeText}>{songData == null ? '00:00' : DateUtil.formatTime(songData.duration)}</Text>
                </View>
                <View style={styles.songBtnView}>
                    <TouchableWithoutFeedback
                        onPress ={()=>{
                            this.onTouchBefore();
                        }}>
                        <Image source = {require('./img/before.png')} style = {styles.songBtnImg}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress ={()=>{
                            this.state.songState ? this.onTouchPlay() : this.onTouchPause();
                        }}>
                        <Image source = {this.state.songState ? require('./img/play.png') : require('./img/pause.png')} style = {styles.songBtnImg}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress ={()=>{
                            this.onTouchAfter();
                        }}>
                        <Image source = {require('./img/after.png')} style = {styles.songBtnImg}/>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
    //显示中间隔断
    showCenterView(){
        return(
            <Image source = {require('./img/graph3.png')} style = {styles.centerView}/>
        )
    }
    //显示右边音频列表
    showRightView(){
        return(
            <View style={styles.rightView}>
                <ScrollView showsVerticalScrollIndicator = {false}>
                    {this.renderScrollChildView()}
                </ScrollView>
            </View>
        )
    }
    //音频列表子元素
    renderScrollChildView(){
        var allChild = [];
        var length = this.state.songList.length;
        for(var i = 0;i < length;i++){
            let songData = this.state.songList[i];
            allChild.push(
                <TouchableWithoutFeedback 
                    key={i} 
                    onPress={
                        this.onTouchPlaySong.bind(this, i)
                    }>
                    <View style={styles.songView}>
                        <View style={styles.songNameView}>
                            <Text style={this.state.selectedIndexSong == i ? styles.songNameTextSelected : styles.songNameTextUnSelected} numberOfLines={1}>{songData.title}</Text>
                        </View>
                        <Image source = {this.state.selectedIndexSong == i ? require('./img/sound.png') : require('./img/graph2.png')} style = {styles.songStateImg}/>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
        return allChild;
    }
    //设置音频播放器
    setSongVideo(){
        if(this.state.songInfo == null) return;
        return(
            <Video ref='songVideo'
              source={{ uri: this.state.songInfo.playInfoVos[0].playURL}}
              paused={this.state.songState}
              onProgress={(e) => this._onProgress(e)}   //  进度控制，每250ms调用一次，以获取视频播放的进度
              onEnd={(e) => this._onEnd(e)}
            />
        )
    }
    render() {
        return (
            <View style={styles.container}>
                {this.showTopView()}
                {this.showOtherView()}
                {this.setSongVideo()}
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
    topTabbarView:{
        marginLeft:SceneUtils.autoHeight(34),
        width:SceneUtils.screenHeight - SceneUtils.autoHeight(99),
    },
    tabbarScrollChildView:{
        width:SceneUtils.autoWidth(88),
        justifyContent:'center',
        alignItems:'center',
    },
    topTabbarTextSelected:{
        fontSize:SceneUtils.setSpText(15),
        fontFamily: 'HYZhengYuan',
        color:'#f5f7fa'
    },
    topTabbarTextUnSelected:{
        fontSize:SceneUtils.setSpText(15),
        fontFamily: 'HYZhengYuan',
        color:'#333333'
    },
    backImg:{
        width:SceneUtils.autoWidth(38),
        height:SceneUtils.autoWidth(38),
    },
    otherView:{
        position:'absolute',
        left:-(SceneUtils.screenHeight - SceneUtils.autoWidth(325)) / 2 + SceneUtils.autoWidth(50),
        top:(SceneUtils.screenHeight - SceneUtils.autoWidth(325)) / 2,
        width:SceneUtils.screenHeight,
        height:SceneUtils.autoWidth(325),
        flexDirection:'row',
        transform: [{rotate:'-90deg'}],
    },
    leftView:{
        marginLeft:SceneUtils.autoHeight(15),
        marginTop:SceneUtils.autoWidth(16),
        width:SceneUtils.autoHeight(341),
        height:SceneUtils.autoWidth(300.5),
        alignItems:'center',
    },
    centerView:{
        width:SceneUtils.autoWidth(26.5),
        height:SceneUtils.autoWidth(325),
    },
    rightView:{
        marginTop:SceneUtils.autoWidth(16),
        width:SceneUtils.autoHeight(284.5),
        height:SceneUtils.autoWidth(309),
        alignItems:'center',
    },
    songView:{
        marginTop:SceneUtils.autoWidth(16),
        width:SceneUtils.autoHeight(240.5),
        height:SceneUtils.autoWidth(43),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderRadius:SceneUtils.autoWidth(10),
        borderWidth: SceneUtils.autoHeight(1),
        borderColor:'#5bdeb4',
    },
    songNameView:{
        width:SceneUtils.autoHeight(191),
        height:SceneUtils.autoWidth(43),
        justifyContent:'center',
        alignItems:'center'
    },
    songNameTextSelected:{
        width:SceneUtils.autoHeight(180),
        fontSize:SceneUtils.setSpText(18),
        fontFamily: 'HYZhengYuan',
        textAlign:'center',
        color:'#5bdeb4'
    },
    songNameTextUnSelected:{
        width:SceneUtils.autoHeight(180),
        fontSize:SceneUtils.setSpText(18),
        fontFamily: 'HYZhengYuan',
        textAlign:'center',
        color:'#333333'
    },
    songStateImg:{
        marginRight:SceneUtils.autoHeight(13),
        width:SceneUtils.autoWidth(24),
        height:SceneUtils.autoWidth(24),
    },
    playSongBg:{
        width:SceneUtils.autoWidth(181),
        height:SceneUtils.autoWidth(181),
        justifyContent:'center',
        alignItems:'center'
    },
    playSongImg:{
        width:SceneUtils.autoWidth(181),
        height:SceneUtils.autoWidth(181),
    },
    leftViewBgImg:{
        position:'absolute',
        width:SceneUtils.autoWidth(372),
        height:SceneUtils.autoWidth(118),
        top:SceneUtils.autoWidth(80)
    },
    songNameTextCur:{
        fontSize:SceneUtils.setSpText(14),
        height:SceneUtils.autoHeight(16),
        fontFamily: 'HYZhengYuan',
        color:'#5bdeb4',
        marginTop:SceneUtils.autoWidth(16),
    },
    sliderPanelView:{
        flexDirection:'row',
        alignItems:'center'
    },
    sliderView:{
        marginLeft:SceneUtils.autoWidth(12),
        marginRight:SceneUtils.autoWidth(12),
        width:SceneUtils.autoWidth(211),
    },
    sliderBall:{
        width: SceneUtils.autoWidth(20),
        height: SceneUtils.autoWidth(20),
    },
    songTimeText:{
        fontSize:SceneUtils.setSpText(12),
        fontFamily: 'HYZhengYuan',
        color:'#333333'
    },
    songBtnView:{
        width:SceneUtils.autoWidth(211),
        height:SceneUtils.autoWidth(44),
        flexDirection:'row',
        justifyContent:'space-between'
    },
    songBtnImg:{
        width:SceneUtils.autoWidth(44),
        height:SceneUtils.autoWidth(44)
    }
});