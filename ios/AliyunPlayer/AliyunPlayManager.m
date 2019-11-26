//
//  AliyunPlayManager.m
//  TestYIYAYIYA
//
//  Created by HMW on 2019/2/24.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "AliyunPlayManager.h"

#if __has_include(<React/RCTBridge.h>)
#import <React/RCTBridge.h>
#elif __has_include(“RCTBridge.h”)
#import “RCTBridge.h”
#else
#import “React/RCTBridge.h” // Required when used as a Pod in a Swift project
#endif

@implementation AliyunPlayManager

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

RCT_EXPORT_VIEW_PROPERTY(prepareAsyncParams, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(muteMode, BOOL)
RCT_EXPORT_VIEW_PROPERTY(quality, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(volume, float)
RCT_EXPORT_VIEW_PROPERTY(brightness, float)

RCT_EXPORT_VIEW_PROPERTY(onGetAliyunMediaInfo, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onEventCallback, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPlayingCallback, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPlayerEventEndLoading, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPlayerEventSeekDone, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPlayEndCallback, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPlayBackErrorModel, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSwitchToQuality, RCTBubblingEventBlock)

RCT_EXPORT_VIEW_PROPERTY(url,NSString*)



- (UIView *)view
{
  AliyunPlayerView *playerView = [AliyunPlayerView new];
  self.playerView = playerView;
  return playerView;
}

#pragma mark - 开始播放
RCT_EXPORT_METHOD(start) {
  [self.playerView.aliPlayer start];
}
#pragma mark - 恢复播放，在调用暂停播放之后调用
RCT_EXPORT_METHOD(resume) {
  [self.playerView.aliPlayer resume];
}
#pragma mark - 暂停播放
RCT_EXPORT_METHOD(pause) {
  [self.playerView.aliPlayer pause];
}
#pragma mark - 停止播放，在开始播放之后调用
RCT_EXPORT_METHOD(stop) {
  [self.playerView.aliPlayer stop];
}
#pragma mark - 跳转到指定时间点的视频画面，时间单位为秒
RCT_EXPORT_METHOD(seekToTime:(double)time) {
  [self.playerView.aliPlayer seekToTime: time];
}
#pragma mark - 获取播放器当前状态
RCT_EXPORT_METHOD(playerState) {
  
}
#pragma mark - 倍数播放支持0.5~2倍的设置，支持音频变速不变调
RCT_EXPORT_METHOD(playSpeed:(float)speed) {
  self.playerView.aliPlayer.playSpeed = speed;
}
#pragma mark - 重播，播放上一次的url
RCT_EXPORT_METHOD(replay) {
  [self.playerView.aliPlayer replay];
}
#pragma mark - 设置播放器音量（系统音量），值为0~1.0
RCT_EXPORT_METHOD(volume:(float)value) {
  [self.playerView.aliPlayer setVolume:value];
}
#pragma mark - 设置为静音
RCT_EXPORT_METHOD(muteMode:(BOOL)value) {
  [self.playerView.aliPlayer setMuteMode:value];
}
#pragma mark - 设置亮度（系统亮度），值为0~1.0
RCT_EXPORT_METHOD(brightness:(float)value) {
  [self.playerView.aliPlayer setBrightness:value];
}
#pragma mark - 销毁播放器
RCT_EXPORT_METHOD(del) {
  [self.view removeFromSuperview];
}

//getAliyunMediaInfo

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

@end
