//
//  AlvideoViewBottomView.h
//  TestYIYAYIYA
//
//  Created by 黄慧敏 on 2018/12/20.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AliyunPlayerViewProgressView.h"
#import <AliyunVodPlayerSDK/AliyunVodPlayerVideo.h>

static const CGFloat ALYPVBottomViewMargin                  = 8;                            //间隙
static const CGFloat ALYPVBottomViewFullScreenButtonWidth   = 48;                           //全屏按钮宽度
static const CGFloat ALYPVBottomViewQualityButtonWidth      = 48 + ALYPVBottomViewMargin*2; // 清晰度按钮宽度

@class AlvideoViewBottomView;
@protocol AlBottomViewDelegate <NSObject>

/*
 * 功能 ：进度条滑动 偏移量
 * 参数 ：bottomView 对象本身
 progressValue 偏移量
 event 手势事件，点击-移动-离开
 */
- (void)aliyunVodBottomView:(AlvideoViewBottomView *)bottomView dragProgressSliderValue:(float)progressValue event:(UIControlEvents)event;

/*
 * 功能 ：点击播放，返回代理
 * 参数 ：bottomView 对象本身
 */
- (void)onClickedPlayButtonWithAliyunPVBottomView:(AlvideoViewBottomView *)bottomView;


/*
 * 功能 ：点击全屏按钮
 * 参数 ：bottomView 对象本身
 */
- (void)onClickedfullScreenButtonWithAliyunPVBottomView:(AlvideoViewBottomView *)bottomView;

/*
 * 功能 ：点击清晰度按钮
 * 参数 ：bottomView 对象本身
 qulityButton 清晰度按钮
 */
- (void)aliyunPVBottomView:(AlvideoViewBottomView *)bottomView qulityButton:(UIButton *)qulityButton;


@end

@interface AlvideoViewBottomView : UIView

@property (nonatomic, weak  ) id<AlBottomViewDelegate>delegate;

@property (nonatomic, assign) float progress;                       //滑动progressValue值
@property (nonatomic, assign) float loadTimeProgress;               //缓存progressValue
@property (nonatomic, assign) BOOL isPortrait;                      //竖屏判断

/*
 * 功能 ：根据播放器状态，改变状态
 * 参数 ：state 播放器状态
 */
- (void)updateViewWithPlayerState:(AliyunVodPlayerState)state;

/*
 * 功能 ：更新进度条与时间
 * 参数 ：currentTime 当前播放时间
 durationTime 播放总时长
 */
- (void)updateProgressWithCurrentTime:(float)currentTime durationTime:(float)durationTime;

/*
 * 功能 ：更新当前显示时间
 * 参数 ：currentTime 当前播放时间
 durationTime 播放总时长
 */
- (void)updateCurrentTime:(float)currentTime durationTime:(float)durationTime;

@end
