//
//  AlvideoView.h
//  TestYIYAYIYA
//
//  Created by 黄慧敏 on 2018/11/29.
//  Copyright © 2018年 Facebook. All rights reserved.
//
#import <UIKit/UIKit.h>
#import <React/RCTComponent.h>
#import <AliyunVodPlayerSDK/AliyunVodPlayer.h>

@class AlvideoView;

//代理方法
@protocol AlvideoViewDelegate <NSObject>

//界面
/**
 * 功能：返回按钮事件
 * 参数：playerView ：AliyunVodPlayerView
 */
- (void)onBackViewClickWithAliyunVodPlayerView:(AlvideoView*)playerView;


/**
 * 功能：下载按钮事件
 * 参数：playerView ：AliyunVodPlayerView
 */
- (void)onDownloadButtonClickWithAliyunVodPlayerView:(AlvideoView*)playerView;

/**
 * 功能：所有事件发生的汇总
 * 参数：event ： 发生的事件
 */
- (void)aliyunVodPlayerView:(AlvideoView*)playerView happen:(AliyunVodPlayerEvent )event;

/**
 * 功能：暂停事件
 * 参数：currentPlayTime ： 暂停时播放时间
 */
- (void)aliyunVodPlayerView:(AlvideoView*)playerView onPause:(NSTimeInterval)currentPlayTime;

/**
 * 功能：继续事件
 * 参数：currentPlayTime ： 继续播放时播放时间。
 */
- (void)aliyunVodPlayerView:(AlvideoView*)playerView onResume:(NSTimeInterval)currentPlayTime;

/**
 * 功能：播放完成事件 ，请区别stop（停止播放）
 * 参数：playerView ： AliyunVodPlayerView
 */
- (void)onFinishWithAliyunVodPlayerView:(AlvideoView*)playerView;

/**
 * 功能：停止播放
 * 参数：currentPlayTime ： 播放停止时播放时间。
 */
- (void)aliyunVodPlayerView:(AlvideoView*)playerView onStop:(NSTimeInterval)currentPlayTime;

/**
 * 功能：拖动进度条结束事件
 * 参数：seekDoneTime ： seekDone时播放时间。
 */
- (void)aliyunVodPlayerView:(AlvideoView*)playerView onSeekDone:(NSTimeInterval)seekDoneTime;

/**
 * 功能：是否锁屏
 */
- (void)aliyunVodPlayerView:(AlvideoView*)playerView lockScreen:(BOOL)isLockScreen;

/**
 * 功能：切换后的清晰度
 * 参数：quality ：切换后的清晰度
 playerView ： AliyunVodPlayerView
 */
- (void)aliyunVodPlayerView:(AlvideoView*)playerView onVideoQualityChanged:(AliyunVodPlayerVideoQuality)quality;

/**
 * 功能：切换后的清晰度，清晰度非枚举类型，字符串，适应于媒体转码播放
 * 参数：videoDefinition ： 媒体处理，切换清晰度后清晰度
 playerView ：AliyunVodPlayerView
 */
- (void)aliyunVodPlayerView:(AlvideoView*)playerView onVideoDefinitionChanged:(NSString*)videoDefinition;

/**
 * 功能：返回调用全屏
 * 参数：isFullScreen ： 点击全屏按钮后，返回当前是否全屏状态
 */
- (void)aliyunVodPlayerView:(AlvideoView *)playerView fullScreen:(BOOL)isFullScreen;

/**
 * 功能：循环播放开始
 * 参数：playerView ：AliyunVodPlayerView
 */
- (void)onCircleStartWithVodPlayerView:(AlvideoView *)playerView;


- (void)onClickedAirPlayButtonWithVodPlayerView:(AlvideoView *)playerView;

- (void)onClickedBarrageBtnWithVodPlayerView:(AlvideoView *)playerView;

@end

@interface AlvideoView : UIView

/*
 功能：设置AlvideoViewDelegate代理
 */
@property (nonatomic, weak) id<AlvideoViewDelegate> delegate;

@property (nonatomic,copy) RCTDirectEventBlock onClickBanner;

/*
 *************************************************
 可参考UI播放器Demo中的使用！可参考UI播放器Demo中的使用！可参考UI播放器Demo中的使用！
 *************************************************
 
 isScreenLocked 会锁定，播放器界面尺寸。
 fixedPortrait yes：竖屏全屏；no：横屏全屏;
 isLockScreen对isLockPortrait无效。
 - (void)aliyunVodPlayerView:(AliyunVodPlayerView *)playerView lockScreen:(BOOL)isLockScreen此方法在isLockPortrait==yes时，返回的islockscreen总是yes；
 isLockScreen和isLockPortrait，因为播放器时UIView，是否旋转需要配合UIViewController来控制物理旋转。
 假设：支持竖屏全屏
 self.playerView.fixedPortrait = YES;
 self.playerView.isScreenLocked = NO;
 self.isLock = self.playerView.isScreenLocked||self.playerView.fixedPortrait?YES:NO;
 
 支持横屏全屏
 self.playerView.fixedPortrait = NO;
 self.playerView.isScreenLocked = NO;
 self.isLock = self.playerView.isScreenLocked||self.playerView.fixedPortrait?YES:NO;
 
 锁定屏幕
 self.playerView.fixedPortrait = NO;
 self.playerView.isScreenLocked = YES;
 self.isLock = self.playerView.isScreenLocked||self.playerView.fixedPortrait?YES:NO;
 
 self.isLock时来判定UIViewController 是否支持物理旋转。如果viewcontroller在navigationcontroller中，需要添加子类重写navigationgController中的 以下方法，根据实际情况做判定 。
 */
@property (nonatomic, assign)BOOL isScreenLocked;
@property (nonatomic, assign)BOOL fixedPortrait;

/**
 功能：设置是否自动播放
 参数：
 autoPlay：YES为自动播放
 */
- (void)setAutoPlay:(BOOL)autoPlay;

/**
 功能：开始播放视频
 备注：在prepareWithVid之后可以调用start进行播放。
 */
- (void)start;

/**
 功能：停止播放视频
 */
- (void)stop;

/**
 功能：暂停播放视频
 */
- (void)pause;

/**
 功能：继续播放视频，此功能应用于pause之后，与pause功能匹配使用
 */
- (void)resume;

/**
 功能：重播
 */
- (void)replay;

/**
 功能：停止播放销毁图层
 */
- (void)reset;

/**
 功能：释放播放器
 */
- (void)releasePlayer;

/*
 AliyunVodPlayerStateIdle = 0,           //空转，闲时，静态
 AliyunVodPlayerStateError,              //错误
 AliyunVodPlayerStatePrepared,           //已准备好
 AliyunVodPlayerStatePlay,               //播放
 AliyunVodPlayerStatePause,              //暂停
 AliyunVodPlayerStateStop,               //停止
 AliyunVodPlayerStateFinish,             //播放完成
 AliyunVodPlayerStateLoading             //加载中
 */
- (AliyunVodPlayerState)playerViewState;

- (void)update;

@end
