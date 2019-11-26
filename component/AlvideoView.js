'use strict';
import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {requireNativeComponent,NativeModules} from 'react-native';

var RNAlvideoView = requireNativeComponent('AliyunPlay',AlvideoView);
// const AliyunPlayer = requireNativeComponent('AliyunPlay', AliyunPlayView)
const {AliyunPlayManager} = NativeModules



export default class AlvideoView extends Component{
    static propTypes = {
        // width: PropTypes.number,
        // height: PropTypes.number,
        onGetAliyunMediaInfo: PropTypes.func,
        onEventCallback: PropTypes.func,
        onPlayingCallback: PropTypes.func,
        onPlayBackErrorModel: PropTypes.func,
        onSwitchToQuality: PropTypes.func,
    };
    /**
     *  功能：播放视频
     */
    start(){
        AliyunPlayManager.start();
    }
    /**
     *  功能：恢复播放，在调用暂停播放之后调用
     */
    resume(){
        AliyunPlayManager.resume();
    }
    /**
     *  功能：暂停播放视频
     */
    pause(){
        AliyunPlayManager.pause();
    }
    /**
     *  功能：停止播放视频
     */
    stop(){
        AliyunPlayManager.stop();
    }
    /**
     *  功能：跳转到指定时间点的视频画面，时间单位为秒
     */
    seek(value){
        AliyunPlayManager.seekToTime(value);
    }
    /**
     *  功能：倍数播放支持0.5~2倍的设置，支持音频变速不变调
     * @param speed
     */
    playSpeed(speed){
        AliyunPlayManager.playSpeed(speed);
    }

    /**
     *  功能：重播，播放上一次的url
     */
    replay(){
        AliyunPlayManager.replay();
    }
    /**
     *  功能：设置播放器音量（系统音量），值为0~1.0
     */
    volume(value){
        AliyunPlayManager.volume(value);
    }
    /**
     *  功能：设置为静音
     */
    muteMode(value){
        AliyunPlayManager.muteMode(value);
    }
    /**
     *  功能：设置亮度（系统亮度），值为0~1.0
     */
    brightness(value){
        AliyunPlayManager.brightness(value);
    }
    /**
     *  功能：销毁播放器
     */
    del(){
        AliyunPlayManager.del();
    }


    render(){
        return <RNAlvideoView {...this.props}/>;
        // return <AliyunPlayer ref={ref => this.aliyunPlay = ref}{...this.props} />
    }
}