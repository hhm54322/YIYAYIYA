'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  NativeModules,
  InteractionManager
} from 'react-native';

import PropTypes from 'prop-types';
import AlvideoView from './AlvideoView';
import Slider from './Slider';
import SceneUtils from '../utils/SceneUtils';
import StorageHelper from '../utils/StorageHelper';
import SwitchMode from './popup/SwitchMode';
import DateUtil from '../utils/DateUtil';

var Push = NativeModules.PushNative;

//视频相关  具体实现不知道问你上司
export default class MyBabyVideo extends Component {
    static propTypes = {
        source:PropTypes.string,
        style:PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        title:PropTypes.string,
        totalTime:PropTypes.number,
    }
    static defaultProps = {
        source: '',
        title:'',
        totalTime:0,
    };
    constructor(props) {
        super(props);
        this.state = {
            width:0,
            height:0,
            volume:1,
            paused:false,
            isFullScreen:this.props.isFullScreen,
            sliderValue:0,
            bufferValue:0,
            totalTime:this.props.totalTime,
            title:this.props.title,
            source:this.props.source,
        };
        this.slider = null;
        this.timer = null;
        this.interval = null;
        this.lookTime = 0;
        this.endTimeData = null;
        this.playTimeData = null;
        this.isCheckBanTime = true;
    }

    //生命周期函数，render之前被调用
    componentWillMount(){
        StorageHelper.get('videoTime',(mod)=>{
            if(mod == null || !mod.switchOn){
                this.endTimeData = null;
            }else{
                let start = new Date(new Date().toLocaleDateString()).getTime() / 1000;
                this.endTimeData = {onceTime:mod.onceTime * 600,totalTime:mod.totalTime * 600,banStartTime:start + mod.banTime[0] * 1800,banEndTime:start + mod.banTime[1] * 1800}
            }
        });
        StorageHelper.get('videoPlayTime',(mod)=>{
            this.playTimeData = mod;
            if(this.playTimeData == null || !DateUtil.isToday(this.playTimeData.dateTime * 1000)){
                let nowTime = new Date().getTime() / 1000;
                this.playTimeData = {dateTime:parseInt(nowTime),playOnceTime:0,playTotalTime:0};
            }
        })
    }
    //生命周期函数，render之后被调用
    componentDidMount(){
        this.interval = setInterval(() =>{
            if(!this.state.paused){
                this.lookTime++;
                this.checkTime();
            }
        },1000)
    }
    //生命周期函数，卸载时调用
    componentWillUnmount(){
        this.refs.myVideo.del();
        this.timer && clearTimeout(this.timer);
        this.interval&&clearInterval(this.interval);
        if(this.endTimeData){
            if(this.endTimeData.onceTime > 0){
                this.playTimeData.playOnceTime += this.lookTime;
            }
            if(this.endTimeData.totalTime > 0){
                this.playTimeData.playTotalTime += this.lookTime;
            }
            StorageHelper.save('videoPlayTime',this.playTimeData);
        }
    }
    //清除定时器
    removeTimeout(){
        this.timer && clearTimeout(this.timer);
    }
    //添加最大化定时器
    setFullTimeout(){
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(
            () => {
                this.setFull();
            },
            5000
        );
    }
    //视频最大化
    setFull(){
        this.timer && clearTimeout(this.timer);
        this.props.onFullScreen(true);
        this.setState({
            isFullScreen:true
        })
    }
    //视频还原
    setUnFull(){
        this.timer && clearTimeout(this.timer);
        if(!this.state.paused){
            this.setFullTimeout();
        }
        this.props.onFullScreen(false);
        this.setState({
            isFullScreen:false
        })
    }
    //检查是否超过禁止观看时间
    checkTime(){
        if(this.endTimeData){
            let nowTime = new Date().getTime() / 1000;
            if(!DateUtil.isToday(nowTime * 1000)){
                this.endTimeData.banStartTime += 86400;
                this.endTimeData.banEndTime += 86400;
                this.playTimeData = {dateTime:parseInt(nowTime),playOnceTime:0,playTotalTime:0};
            }
            if(this.isCheckBanTime && (nowTime > this.endTimeData.banStartTime || nowTime < this.endTimeData.banEndTime)){
                this.showPassword(0);//在禁止观看时间段内
            }else if(this.endTimeData.onceTime > 0 && this.playTimeData.playOnceTime + this.lookTime > this.endTimeData.onceTime){
                this.showPassword(1);//超过单次观看时长
            }else if(this.endTimeData.totalTime > 0 && this.playTimeData.playTotalTime + this.lookTime > this.endTimeData.totalTime){
                this.showPassword(2);//超过每天观看时长
            }
        }
    }
    //显示需要输入密码
    showPassword(type){
        this.pauseVideo();
        SwitchMode.show(1,()=>{
            if(type == 0){
                this.isCheckBanTime = false;
            }else if(type == 1){
                this.playTimeData.playTotalTime += this.lookTime;
                this.playTimeData.playOnceTime = 0;
                this.lookTime = 0;
            }else{
                this.playTimeData.playTotalTime = 0;
                this.playTimeData.playOnceTime = 0;
                this.lookTime = 0;
            }
            this.playVideo();
        })
    }
    formatTime(time) {
        let min = Math.floor(time / 60)
        let second = parseInt(time) - min * 60
        min = min >= 10 ? min : '0' + min
        second = second >= 10 ? second : '0' + second
        return min + ':' + second
    }
    _onLoad(event){
        console.log('_onLoad');
    }
    _onProgress = (event)=>{
        var currentTime = parseInt(event.currentTime)
        var loadedTime = parseInt(event.loadedTime)
        
        if(currentTime <= this.state.totalTime){
            this.setState({
                sliderValue:currentTime,
                bufferValue:loadedTime,
            })
        }else{
            this.timer && clearTimeout(this.timer);
            this.setState({
                paused:true,
            })
        }
    }
    _onEnd(event){
        this.props.onEnd(false);
    }
    onTouchSoundBtn(){
        if(this.state.volume == 0){
            this.setState({
                volume:1,
            })
            this.refs.myVideo.muteMode(false);
        }else{
            this.setState({
                volume:0,
            })
            this.refs.myVideo.muteMode(true);
        }
    }
    playVideo(){
        if(this.state.paused){
            this.refs.myVideo.resume();
            this.timer && clearTimeout(this.timer);
            this.setFullTimeout();
            this.setState({
                paused:false,
            })
        }
    }
    pauseVideo(){
        if(!this.state.paused){
            this.refs.myVideo.pause();
            this.timer && clearTimeout(this.timer);
            this.setState({
                paused:true
            })
        }
    }
    setTitle(){
        if(!this.state.isFullScreen){
            return(
                <View style={{height:50}}>
                    <Text style={styles.titleText}>{this.state.title}</Text>
                </View>
            )
        }
    }
    setDownView = ()=>{
        if(this.state.isFullScreen) return;
        return(
            <View style={styles.downView}>
                {this.setStartOrPauseBtn()}
                {this.setSliderView()}
                {this.setSoundBtn()}
                {this.setTotalAndCurrentTime()}
            </View>
        )
    }
    setBgOnPress = ()=>{
        if(!this.state.isFullScreen){
            return(
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.bgView}
                    onPress={() => {
                        this.setFull();
                    }
                }>
                    <Image source = {require('./img/playBg.png')} style = 
                        {{position: 'absolute',width:this.state.width,height:this.state.height}}/>
                    {this.setTitle()}
                    {this.setDownView()}
                </TouchableOpacity>
            );
        }else{
            return(
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.bgView}
                    onPress={() => {
                        this.setUnFull();
                    }
                }>
                </TouchableOpacity>
            )
        }
    }
    setStartOrPauseBtn(){
        if(this.state.paused){
            return(
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        this.playVideo();
                    }
                }>
                    <Image source = {require('./img/playBaby.png')} style={styles.leftBtnImg}/>
                </TouchableOpacity>
            )
        }else{
            return(
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        this.pauseVideo();
                    }
                }>
                    <Image source = {require('./img/pauseBaby.png')} style={styles.leftBtnImg}/>
                </TouchableOpacity>
            )
        }
    }
    setSliderView(){
        return(
            <Slider
                ref = {ref =>this.slider = ref}
                mode='column'
                value={this.state.sliderValue}
                buffer={this.state.bufferValue}
                style={{alignSelf:'center',
                    width:this.state.width - SceneUtils.autoHeight(128),
                    marginLeft:SceneUtils.autoHeight(13)
                }}
                thumbImage={require('./img/dotBaby.png')}
                thumbStyle={styles.sliderBall}
                minimumValue={0}
                maximumValue={this.state.totalTime}
                step={1}
                minimumTrackTintColor='#00C5CD'
                maximumTrackTintColor='black'
                bufferTrackTintColor='gray'
                onValueChange={(value) => {
                    
                }}
                onSlidingComplete={(value) => {
                    this.refs.myVideo.seek(value);
                    this.setState({
                        sliderValue:value
                    })
                }}
            />
        )
    }
    setSoundBtn(){
        return(
            <TouchableOpacity
                activeOpacity={1}
                style={{alignSelf: 'center',marginLeft:10}}
                onPress={() => {
                    this.onTouchSoundBtn();
                }
            }>
                <Image source = {this.state.volume == 0 ? require('./img/silence.png') : require('./img/sound3.png')} style = 
                {{width:SceneUtils.autoWidth(38),height:SceneUtils.autoWidth(38)}}/>
            </TouchableOpacity>
        )
    }
    setTotalAndCurrentTime(){
        return(
            <Text style={styles.timeText}>{this.formatTime(this.state.sliderValue)}/{this.formatTime(this.state.totalTime)}</Text>  
        )
    }
    layout(e){
        let width = e.layout.width;
        if (!width || width === this.state.width)
            return;
        this.setState({
            width: width,
            height: e.layout.height
        }) 
    }
    render() {
        return (
            <View ref='view' style={this.state.isFullScreen ? styles.fullStyle : this.props.style} 
                onLayout={({nativeEvent:e})=>this.layout(e)}>
                <AlvideoView
                    ref='myVideo'
                    style={styles.fullScreen}
                    url={ this.state.source}
                    onPlayingCallback={(e) => this._onProgress(e.nativeEvent)}
                    onEnd={(e) => this._onEnd(e)} 
                />
                {this.setBgOnPress()}
            </View>
        );
    }

    setVideoData(_paused,_totalTime,_title,_source){
        this.setFullTimeout();
        this.setState({
            paused:_paused,
            sliderValue:0,
            bufferValue:0,
            totalTime:_totalTime,
            title:_title,
            source:_source,
        })
    }
    
}
const styles = StyleSheet.create({
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor:'black'
    },
    fullStyle:{
        position: 'absolute',
        width:SceneUtils.screenHeight,
        height:SceneUtils.screenWidth,
    },
    uiView:{
        position: 'absolute',
        justifyContent: 'space-between',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    bgView:{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent:'space-between',
        backgroundColor:'rgba(255,255,255,0.0)',
    },
    fullBgView:{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        // backgroundColor:'rgba(255,255,255,0.0)',
        backgroundColor:'#ff0000'
    },
    titleView:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    titleText:{
        marginTop:10,
        marginLeft:15,
        color:'white',
        fontSize:SceneUtils.setSpText(14),
        fontFamily: 'HYZhengYuan',
    },
    downView:{
        flexDirection:'row',
        alignItems:'center',
        height:SceneUtils.autoWidth(38),
        marginBottom:SceneUtils.autoWidth(12)
    },
    leftBtnImg:{
        marginLeft:SceneUtils.autoHeight(13),
        width:SceneUtils.autoWidth(38),
        height:SceneUtils.autoWidth(38),
    },
    timeText:{
        position: 'absolute',
        fontSize:SceneUtils.setSpText(12),
        fontFamily: 'HYZhengYuan',
        color:'white',
        top:SceneUtils.autoWidth(25),
        right:SceneUtils.autoHeight(64),
    },
    sliderBall:{
        width: SceneUtils.autoWidth(20),
        height: SceneUtils.autoWidth(20),
    },
    unFullScreenImage:{
        width:30,
        height:30,
        resizeMode:'contain',
        marginLeft:10,
    },
    fullScreenSetImage:{
        width:40,
        height:20,
        resizeMode:'contain',
        marginRight:10,
    }
});
