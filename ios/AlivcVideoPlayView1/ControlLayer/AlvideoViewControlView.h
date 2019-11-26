//
//  AlvideoViewControlView.h
//  TestYIYAYIYA
//
//  Created by 黄慧敏 on 2018/12/20.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AliyunPlayerViewTopView.h"
#import "AlvideoViewBottomView.h"
//#import "AliyunPlayerViewGestureView.h"


@class AlvideoViewControlView;
@protocol AlControlViewDelegate <NSObject>
/*
 * 功能 ： 点击下载按钮
 * 参数 ： controlView 对象本身
 */
- (void)onDownloadButtonClickWithAliyunControlView:(AlvideoViewControlView *)controlView;

/*
 * 功能 ： 点击返回按钮
 * 参数 ： controlView 对象本身
 */
- (void)onBackViewClickWithAliyunControlView:(AlvideoViewControlView*)controlView;

/*
 * 功能 ： 展示倍速播放界面
 * 参数 ： controlView 对象本身
 */
- (void)onSpeedViewClickedWithAliyunControlView:(AlvideoViewControlView*)controlView;

/*
 * 功能 ： 播放按钮
 * 参数 ： controlView 对象本身
 */
- (void)onClickedPlayButtonWithAliyunControlView:(AlvideoViewControlView*)controlView;

/*
 * 功能 ： 全屏
 * 参数 ： controlView 对象本身
 */
- (void)onClickedfullScreenButtonWithAliyunControlView:(AlvideoViewControlView*)controlView;

/*
 * 功能 ： 锁屏
 * 参数 ： controlView 对象本身
 */
- (void)onLockButtonClickedWithAliyunControlView:(AlvideoViewControlView*)controlView;
/*
 * 功能 ： 拖动进度条
 * 参数 ： controlView 对象本身
 progressValue slide滑动长度
 event 手势事件，点击-移动-离开
 */
- (void)aliyunControlView:(AlvideoViewControlView*)controlView dragProgressSliderValue:(float)progressValue event:(UIControlEvents)event;

/*
 * 功能 ： 清晰度切换
 * 参数 ： index 选择的清晰度
 */
- (void)aliyunControlView:(AlvideoViewControlView*)controlView qualityListViewOnItemClick:(int)index;


@end

@interface AlvideoViewControlView : UIView

@property (nonatomic, weak  ) id<AlControlViewDelegate>delegate;
@property (nonatomic, assign) AliyunVodPlayerState state;           //播放器播放状态
@property (nonatomic, assign) float loadTimeProgress;               //缓存进度
@property (nonatomic, assign) BOOL isProtrait;                      //竖屏判断
@property (nonatomic, copy) NSString *title;                        //设置标题
@property (nonatomic, assign) NSTimeInterval currentTime;
@property (nonatomic, assign) NSTimeInterval duration;

/*
 * 功能 ：更新播放器状态
 */
- (void)updateViewWithPlayerState:(AliyunVodPlayerState)state isScreenLocked:(BOOL)isScreenLocked fixedPortrait:(BOOL)fixedPortrait;

/*
 * 功能 ：更新进度条
 */
- (void)updateProgressWithCurrentTime:(NSTimeInterval)currentTime durationTime : (NSTimeInterval)durationTime;

/*
 * 功能 ：更新当前时间
 */
- (void)updateCurrentTime:(NSTimeInterval)currentTime durationTime : (NSTimeInterval)durationTime;

@end
