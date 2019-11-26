//
//  AlvideoViewControlView.m
//  TestYIYAYIYA
//
//  Created by 黄慧敏 on 2018/12/20.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "AlvideoViewControlView.h"

static const CGFloat ALYControlViewTopViewHeight    = 48;   //topView 高度
static const CGFloat ALYControlViewBottomViewHeight = 48;   //bottomView 高度
static const CGFloat ALYControlViewLockButtonLeft   = 20;   //lockButton 左侧距离父视图距离
static const CGFloat ALYControlViewLockButtonHeight = 40;   //lockButton 高度


@interface AlvideoViewControlView()<AlBottomViewDelegate,AliyunPVTopViewDelegate>
@property (nonatomic, strong) AliyunPlayerViewTopView *topView;             //topView
@property (nonatomic, strong) AlvideoViewBottomView *bottomView;       //bottomView
//@property (nonatomic, strong) AliyunPlayerViewGestureView *guestureView;    //手势view

@property (nonatomic, assign) BOOL isHiddenView;                    //是否需要隐藏topView、bottomView
@end
@implementation AlvideoViewControlView

- (AliyunPlayerViewTopView *)topView{
  if (!_topView) {
    _topView = [[AliyunPlayerViewTopView alloc] init];
  }
  return _topView;
}

- (AlvideoViewBottomView *)bottomView{
  if (!_bottomView) {
    _bottomView = [[AlvideoViewBottomView alloc] init];
  }
  return _bottomView;
}

#pragma mark - init
- (instancetype)init {
  return  [self initWithFrame:CGRectZero];
}

- (instancetype)initWithFrame:(CGRect)frame{
  if (self = [super initWithFrame:frame]) {
    
    self.isHiddenView = NO;
    
    self.topView.delegate = self;
    [self addSubview:self.topView];
    
    self.bottomView.delegate = self;
    [self addSubview:self.bottomView];
  }
  return self;
}

- (void)layoutSubviews{
  [super layoutSubviews];
  float width = self.bounds.size.width;
  float height = self.bounds.size.height;
  float topBarHeight = ALYControlViewTopViewHeight;
  float bottomBarHeight = ALYControlViewBottomViewHeight;
  float bottomBarY = height - bottomBarHeight;
  self.topView.frame = CGRectMake(0, 0, width, topBarHeight);
  self.bottomView.frame = CGRectMake(0, bottomBarY, width, bottomBarHeight);
}

- (void)setLoadTimeProgress:(float)loadTimeProgress{
  _loadTimeProgress = loadTimeProgress;
  self.bottomView.loadTimeProgress = loadTimeProgress;
}

- (void)setTitle:(NSString *)title{
  _title = title;
  [self.topView setTopTitle:title];
}

- (void)setIsProtrait:(BOOL)isProtrait{
  _isProtrait =isProtrait;
  [self.topView setIsProtrait:isProtrait];
}

#pragma mark - AliyunPVTopViewDelegate
- (void)onBackViewClickWithAliyunPVTopView:(AliyunPlayerViewTopView *)topView{
  if (self.delegate && [self.delegate respondsToSelector:@selector(onClickedfullScreenButtonWithAliyunControlView:)]) {
    [self.delegate onClickedfullScreenButtonWithAliyunControlView:self];
  }
}

#pragma mark - bottomView代理回调
- (void)onClickedPlayButtonWithAliyunPVBottomView:(AlvideoViewBottomView *)bottomView { 
  [NSObject cancelPreviousPerformRequestsWithTarget:self selector:@selector(delayHideControlLayer) object:nil];
  [self performSelector:@selector(delayHideControlLayer) withObject:nil afterDelay:5];
  if (self.delegate && [self.delegate respondsToSelector:@selector(onClickedPlayButtonWithAliyunControlView:)]) {
    [self.delegate onClickedPlayButtonWithAliyunControlView:self];
  }
}
- (void)onClickedfullScreenButtonWithAliyunPVBottomView:(AlvideoViewBottomView *)bottomView {
//  [self.listView removeFromSuperview];
  if (self.delegate && [self.delegate respondsToSelector:@selector(onClickedfullScreenButtonWithAliyunControlView:)]) {
    [self.delegate onClickedfullScreenButtonWithAliyunControlView:self];
  }
}
- (void)aliyunVodBottomView:(AlvideoViewBottomView *)bottomView dragProgressSliderValue:(float)progressValue event:(UIControlEvents)event{
  switch (event) {
    case UIControlEventTouchDown:
    {
      //slider 手势按下时，不做隐藏操作
      self.isHiddenView = NO;
      [NSObject cancelPreviousPerformRequestsWithTarget:self selector:@selector(delayHideControlLayer) object:nil];
    }
      break;
    case UIControlEventValueChanged:
    {
      
    }
      break;
    case UIControlEventTouchUpInside:
    {
      //slider滑动结束后，
      self.isHiddenView = YES;
      [self performSelector:@selector(delayHideControlLayer) withObject:nil afterDelay:5];
    }
      break;
    default:
      break;
  }
  
  if (self.delegate && [self.delegate respondsToSelector:@selector(aliyunControlView:dragProgressSliderValue:event:)]) {
    [self.delegate aliyunControlView:self dragProgressSliderValue:progressValue event:event];
  }
}

- (void)delayHideControlLayer{
  [self hiddenView];
}
/*
 * 功能 ：隐藏topView、bottomView
 */
- (void)hiddenView{
  self.isHiddenView = YES;
//  self.topView.hidden = YES;
//  self.bottomView.hidden = YES;
  [NSObject cancelPreviousPerformRequestsWithTarget:self selector:@selector(delayHideControlLayer) object:nil];
}

/*
 * 功能 ：展示topView、bottomView
 */
- (void)showView{
  self.isHiddenView = NO;
  self.topView.hidden = NO;
  self.bottomView.hidden = NO;
  [self performSelector:@selector(delayHideControlLayer) withObject:nil afterDelay:5];
}

#pragma mark - public method
- (void)updateViewWithPlayerState:(AliyunVodPlayerState)state isScreenLocked:(BOOL)isScreenLocked fixedPortrait:(BOOL)fixedPortrait{
//  if (state == AliyunVodPlayerStateIdle || state == AliyunVodPlayerStateLoading) {
//    [self.guestureView setEnableGesture:NO];
//  }else{
//    [self.guestureView setEnableGesture:YES];
//  }
  
//  if (isScreenLocked || fixedPortrait) {
//    [self.guestureView setEnableGesture:NO];
//  }
  
  [self.bottomView updateViewWithPlayerState: state];
}

/*
 * 功能 ：更新进度条
 */
- (void)updateProgressWithCurrentTime:(NSTimeInterval)currentTime durationTime : (NSTimeInterval)durationTime{
  self.currentTime = currentTime;
  self.duration = durationTime;
  [self.bottomView updateProgressWithCurrentTime:currentTime durationTime:durationTime];
}

- (void)updateCurrentTime:(NSTimeInterval)currentTime durationTime:(NSTimeInterval)durationTime{
  self.currentTime = currentTime;
  self.duration = durationTime;
  [self.bottomView updateCurrentTime:currentTime durationTime:durationTime];
}

@end

