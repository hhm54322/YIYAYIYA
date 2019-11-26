//
//  Alvideo.m
//  TestYIYAYIYA
//
//  Created by 黄慧敏 on 2018/11/29.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "AlvideoViewManager.h"
#import "AliyunVodPlayerView.h"
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>

//@interface AlvideoViewManager ()<AliyunVodPlayerViewDelegate>
//
//@property (nonatomic, strong) AliyunVodPlayerView *alvideoView;
//
//@end

@implementation AlvideoViewManager

@synthesize bridge = _bridge;

//  标记宏（必要）
RCT_EXPORT_MODULE();

//传值
RCT_EXPORT_VIEW_PROPERTY(prepareAsyncParams, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(muteMode, BOOL)
RCT_EXPORT_VIEW_PROPERTY(quality, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(volume, float)
RCT_EXPORT_VIEW_PROPERTY(brightness, float)

RCT_EXPORT_VIEW_PROPERTY(onGetAliyunMediaInfo, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onEventCallback, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPlayingCallback, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPlayBackErrorModel, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSwitchToQuality, RCTBubblingEventBlock)

RCT_EXPORT_VIEW_PROPERTY(title,NSString*)
RCT_EXPORT_VIEW_PROPERTY(url,NSString*)

//点击回调
RCT_EXPORT_VIEW_PROPERTY(onClickBanner,RCTBubblingEventBlock)


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

RCT_EXPORT_METHOD(resume) {
  [self.playerView.aliPlayer resume];
}

RCT_EXPORT_METHOD(pause) {
  [self.playerView.aliPlayer pause];
}

RCT_EXPORT_METHOD(stop) {
  [self.playerView.aliPlayer stop];
}

RCT_EXPORT_METHOD(seekToTime:(double)time) {
  [self.playerView.aliPlayer seekToTime: time];
}

RCT_EXPORT_METHOD(playerState) {
  
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




//#import "AlvideoViewManager.h"
//#import "AliyunVodPlayerView.h"
//#import <React/RCTBridge.h>
//#import <React/RCTEventDispatcher.h>
//
//@interface AlvideoViewManager ()<AliyunVodPlayerViewDelegate>
//
//@property (nonatomic, strong) AliyunVodPlayerView *alvideoView;
//
//@end
//
//@implementation AlvideoViewManager
//
////  标记宏（必要）
//RCT_EXPORT_MODULE()
//
////传值
//RCT_EXPORT_VIEW_PROPERTY(title,NSString*)
//RCT_EXPORT_VIEW_PROPERTY(url,NSString*)
////RCT_EXPORT_VIEW_PROPERTY(width,CGFloat)
////RCT_EXPORT_VIEW_PROPERTY(height,CGFloat)
//
////点击回调
//RCT_EXPORT_VIEW_PROPERTY(onClickBanner,RCTBubblingEventBlock)
//
//
//- (UIView *)view
//{
//  //  实际组件的具体大小位置由js控制
//  if(!_alvideoView){
//    _alvideoView = [[AliyunVodPlayerView alloc] init];
//    //  初始化时将delegate指向了self
//    _alvideoView.delegate = self;
//  }else{
//    //    [_alvideoView update];
//  }
//  return _alvideoView;
//}
//
//@end

