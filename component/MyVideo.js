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

var Push = NativeModules.PushNative;

//视频相关  具体实现不知道问你上司
export default class MyVideo extends Component {
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
            isShowBtn:false,
            isFullScreen:false,
            sliderValue:0,
            bufferValue:0,
            totalTime:this.props.totalTime,
            title:this.props.title,
            source:this.props.source,
            index:this.props.index,
        };
        this.slider = null;
    }
    //生命周期函数，卸载时调用
    componentWillUnmount(){
        this.refs.myVideo.del();
        this.timer && clearTimeout(this.timer);
    }
    formatTime(time) {
        let min = Math.floor(time / 60);
        let second = time - min * 60;
        min = min >= 10 ? min : '0' + min;
        second = second >= 10 ? second : '0' + second;
        return min + ':' + second;
    }
    _onLoad(event){
        console.log('_onLoad');
        this.setShowBtnTimeout();
    }
    _onProgress = (event)=>{
        var currentTime = parseInt(event.currentTime);
        var loadedTime = parseInt(event.loadedTime);
        
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
            this.setState({
                paused:false,
                isShowBtn:false,
            })
        }
    }
    pauseVideo(){
        if(!this.state.paused){
            this.refs.myVideo.pause();
            this.setState({
                paused:true
            })
        }
    }
    setShowBtnTimeout(){
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(
            () => {
                this.setState({
                    isShowBtn: false,
                })
            },
            5000
        );
    }
    setCenterBtn(){
        if(this.state.paused){
            return(
                <TouchableOpacity
                    activeOpacity={1}
                    style={{alignSelf: 'center'}}
                    onPress={() => {
                        this.playVideo();
                    }
                }>
                    <Image source = {require('./img/play.png')} style = 
                    {{width:this.state.height/3,height:this.state.height/3}}/>
                </TouchableOpacity>
            )
        }else{
            return(
                <TouchableOpacity
                    activeOpacity={1}
                    style={{alignSelf: 'center'}}
                    onPress={() => {
                        this.setShowBtnTimeout();
                        this.pauseVideo();
                    }
                }>
                    <Image source = {require('./img/pause.png')} style = 
                    {{width:this.state.height/3,height:this.state.height/3}}/>
                </TouchableOpacity>
            )
        }
    }
    setTitle(){
        if(this.state.isFullScreen){
            return(
                <View style={styles.titleView}>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{alignSelf: 'center'}}
                            onPress={() => {
                                this.props.onFullScreen(false);
                                InteractionManager.runAfterInteractions(()=> {
                                    Push.RNLockToLandscape('unFull');
                                });
                                this.setState({
                                    isFullScreen:false,
                                })
                            }
                        }>
                            <Image source = {require('../images/back.png')} style={styles.unFullScreenImage}/>
                        </TouchableOpacity>
                        <Text style={styles.titleText}>{this.state.title}</Text>
                    </View>
                </View>
            )
        }else{
            return(
                <View style={{height:50}}>
                    <Text style={styles.titleText}>{this.state.title}</Text>
                </View>
            )
        }
    }
    setDownView = ()=>{
        return(
            <View style={[styles.downView,{justifyContent:'space-around'}]}>
                {this.setSoundBtn()}
                <Text style={styles.downCurrentTimeText}>{this.formatTime(this.state.sliderValue)}</Text>
                <Slider
                    ref = {ref =>this.slider = ref}
                    value={this.state.sliderValue}
                    buffer={this.state.bufferValue}
                    style={{ width: this.state.isFullScreen ?this.state.width * 0.65:this.state.width * 0.47}}

                    thumbStyle={styles.sliderBall}
                    minimumValue={0}
                    maximumValue={this.state.totalTime}
                    step={1}
                    minimumTrackTintColor='#00C5CD'
                    maximumTrackTintColor='black'
                    bufferTrackTintColor='gray'
                    onValueChange={(value) => {
                        this.timer && clearTimeout(this.timer);
                    }}
                    onSlidingComplete={(value) => {
                        this.refs.myVideo.seek(value);
                        this.setState({
                            sliderValue:value
                        })
                    }}
                />
                <Text style={styles.downCurrentTimeText}>{this.formatTime(this.state.totalTime)}</Text>
                {this.setFullScreenBtn()}
            </View>
        )
    }
    setBgOnPress = ()=>{
        if(this.state.isShowBtn){
            return(
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.bgView}
                    onPress={() => {
                        if(this.state.isShowBtn){
                            this.setState({
                                isShowBtn:false,
                            })
                        }else{
                            this.setShowBtnTimeout()
                            this.setState({
                                isShowBtn:true,
                            })
                        }
                    }
                }>
                    <Image source = {require('./img/playBg.png')} style = 
                        {{position: 'absolute',width:this.state.width,height:this.state.height}}/>
                    {this.setTitle()}
                    {this.setCenterBtn()}
                    {this.setDownView()}
                </TouchableOpacity>
            );
        }else{
            return(
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.bgView}
                    onPress={() => {
                        if(this.state.isShowBtn){
                            this.setState({
                                isShowBtn:false,
                            })
                        }else{
                            this.setShowBtnTimeout()
                            this.setState({
                                isShowBtn:true,
                            })
                        }
                    }
                }>
                </TouchableOpacity>
            );
        }
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
                {{width:this.state.height * 0.1,height:this.state.height * 0.1*0.71}}/>
            </TouchableOpacity>
        )
    }
    setFullScreenBtn(){
        if(this.state.isFullScreen){
            return null;
        }
        return(
            <TouchableOpacity
                activeOpacity={1}
                style={{alignSelf: 'center',marginRight:10}}
                onPress={() => {
                    this.props.onFullScreen(true);
                    InteractionManager.runAfterInteractions(()=> {
                        Push.RNLockToLandscape('full');
                    });
                    this.setState({
                        isFullScreen:true,
                    })
                }
            }>
                <Image source = {require('./img/enlarge.png')} style = 
                {{width:this.state.height * 0.1,height:this.state.height * 0.1}}/>
            </TouchableOpacity>
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
    _onRequestClose(){
        console.log('_onRequestClose');
    }
    render() {
        return (
            <View ref='view' style={this.state.isFullScreen ? styles.fullStyle : 
                {width:this.props.sWidth,height:this.props.sHeight,
                transform: [
                    { translateX: 0 },
                    { translateY: this.state.index * SceneUtils.autoHeight(227) }
                ],
                position: 'absolute',
                }} onLayout={({nativeEvent:e})=>this.layout(e)}>
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

    setVideoData(_paused,_totalTime,_title,_source,_index){
        this.setState({
            paused:_paused,
            sliderValue:0,
            bufferValue:0,
            totalTime:_totalTime,
            title:_title,
            source:_source,
            index:_index
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
    titleView:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    titleText:{
        marginTop:10,
        marginLeft:5,
        color:'white',
    },
    downView:{
        flexDirection:'row',
        alignItems:'center',
        height:50,
    },
    downTotalTimeView:{
        flexDirection:'row',
    },
    downCurrentTimeText:{
        width:40,
        fontSize:12,
        color:'white',
        marginLeft:5,
    },
    sliderBall:{
        width: 10,
        height: 10,
        backgroundColor: 'white',
        borderRadius: 10 / 2,
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
