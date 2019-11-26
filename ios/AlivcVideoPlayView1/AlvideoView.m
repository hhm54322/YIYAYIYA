//
//  AlvideoView.m
//  TestYIYAYIYA
//
//  Created by 黄慧敏 on 2018/11/29.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "AlvideoView.h"
#import "AppDelegate.h"
#import "MyNavigationController.h"
#import "AlvideoViewControlView.h"
//loading
#import "AlilyunViewLoadingView.h"

static const CGFloat AlilyunViewLoadingViewWidth  = 130;
static const CGFloat AlilyunViewLoadingViewHeight = 120;

@interface AlvideoView ()<AliyunVodPlayerDelegate,AlControlViewDelegate>

@property (nonatomic, strong) AliyunVodPlayer *aliPlayer;               //点播播放器
@property (nonatomic, strong) AlvideoViewControlView *controlView;      //控制器
@property (nonatomic, assign) CGRect videoFrame;
@property (nonatomic, assign) AliyunVodPlayerState currentPlayStatus; //记录播放器的状态
@property (nonatomic, strong) AlilyunViewLoadingView *loadingView;         //loading

@property (nonatomic, assign) NSTimeInterval currentDuration;           //记录播放时长
@property (nonatomic, weak  ) NSTimer *timer;                           //计时器
@property (nonatomic, assign) float saveCurrentTime;                    //保存重试之前的播放时间
@property (nonatomic, assign) BOOL mProgressCanUpdate;                  //进度条是否更新，默认是NO
@property (nonatomic, assign) BOOL isProtrait;                          //是否是竖屏
@property (nonatomic, assign) CGRect saveFrame;                         //记录竖屏时尺寸,横屏时为全屏状态。

@end

@implementation AlvideoView

-(void)tapAction:(id)tap{
  self.onClickBanner(@{@"牛逼":@"收到回调了"});
}
-(void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event{
  
}

#pragma mark - 懒加载
- (AliyunVodPlayer *)aliPlayer{
  if (!_aliPlayer) {
    _aliPlayer = [[AliyunVodPlayer alloc] init];
  }
  return _aliPlayer;
}
- (AlvideoViewControlView *)controlView{
  if (!_controlView) {
    _controlView = [[AlvideoViewControlView alloc] init];
  }
  return _controlView;
}
- (AlilyunViewLoadingView *)loadingView{
  if (!_loadingView) {
    _loadingView = [[AlilyunViewLoadingView alloc] init];
  }
  return _loadingView;
}

-(instancetype)init
{
  self = [super init];
  if (self) {
    _mProgressCanUpdate = YES;
    [self initView];
  }
  return self;
}
- (void)setFrame:(CGRect)frame{
  [super setFrame:frame];
  //指记录竖屏时界面尺寸
//  if ([[UIApplication sharedApplication] statusBarOrientation] == UIInterfaceOrientationPortrait){
//    if (!self.fixedPortrait) {
//      self.saveFrame = frame;
//    }
//  }
}

-(void)initView{
  self.aliPlayer.delegate = self;
  [self addSubview:self.aliPlayer.playerView];
  
  self.controlView.delegate = self;
  [self.controlView updateViewWithPlayerState:self.aliPlayer.playerState isScreenLocked:self.isScreenLocked fixedPortrait:self.isProtrait];
  [self addSubview:self.controlView];
  [self addSubview:self.loadingView];
  
  self.aliPlayer.displayMode = AliyunVodPlayerDisplayModeFit;
  
  UITapGestureRecognizer *tapGesturRecognizer=[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(tapAction:)];
  [self.aliPlayer.playerView addGestureRecognizer:tapGesturRecognizer];
  // Do any additional setup after loading the view.
  
  NSURL *strUrl = [NSURL URLWithString:@"http://qiniu.xiguangtech.com/201812/54572776cb254be2aa5115d25465861e.mp4?from=app"];//网络视频，填写网络url地址
  NSURL *url = strUrl;
  self.controlView.title = @"我是小猪佩奇，这是我的弟弟。他叫乔治！";
  [self.aliPlayer prepareWithURL:url];
  [_loadingView show];
  
}

#pragma mark - layoutSubviews
- (void)layoutSubviews {
  [super layoutSubviews];
  float width = self.bounds.size.width;
  float height = self.bounds.size.height;
  
  if(!self.isProtrait){
    self.saveFrame = self.frame;
  }
  self.aliPlayer.playerView.frame = self.bounds;
  self.controlView.frame = self.bounds;
//  self.coverImageView.frame= self.bounds;
//  self.moreView.frame = self.bounds;
//  self.guideView.frame =  self.bounds;
//  self.popLayer.frame = self.bounds;
//  self.popLayer.center = CGPointMake(width/2, height/2);
//
  float x = (self.bounds.size.width -  AlilyunViewLoadingViewWidth)/2;
  float y = (self.bounds.size.height - AlilyunViewLoadingViewHeight)/2;
  self.loadingView.frame = CGRectMake(x, y, AlilyunViewLoadingViewWidth, AlilyunViewLoadingViewHeight);
}

-(void)update{
  NSLog(@"%s", "IOSvideoUpdate");
  
}

-(void)vodPlayer:(AliyunVodPlayer *)vodPlayer onEventCallback:(AliyunVodPlayerEvent)event{
  NSLog(@"播放器事件回调:事件%ld,播放器状态:%ld",(long)event,(long)vodPlayer.playerState);
  //接收onEventCallback回调时，根据当前播放器事件更新UI播放器UI数据
  [self updateVodPlayViewDataWithEvent:event vodPlayer:vodPlayer];
  if(event == AliyunVodPlayerEventPlay || event == AliyunVodPlayerEventPrepareDone){
    //让错误的提示消失
    [self.loadingView dismiss];
//    self.popLayer.hidden = YES;
  }
}
- (void)vodPlayer:(AliyunVodPlayer *)vodPlayer playBackErrorModel:(AliyunPlayerVideoErrorModel *)errorModel{
  //关闭loading动画
  [_loadingView dismiss];
  NSLog(@"%s", "播放出错时触发，通过errorModel可以查看错误码、错误信息、视频ID、视频地址和requestId。");
  NSLog(@"%@",errorModel);
}
- (void)vodPlayer:(AliyunVodPlayer*)vodPlayer newPlayerState:(AliyunVodPlayerState)newState{
  _currentPlayStatus = newState;
  NSString *playStatusString = @"other";
  if (newState == AliyunVodPlayerStatePause) {
    playStatusString = @"暂停";
  }
  if (newState == AliyunVodPlayerStatePlay) {
    playStatusString = @"播放";
  }
  NSLog(@"播放器状态更新：%@",playStatusString);
  //更新UI状态
  [self.controlView updateViewWithPlayerState:_currentPlayStatus isScreenLocked:self.isScreenLocked fixedPortrait:self.isProtrait];
}
- (void)vodPlayer:(AliyunVodPlayer*)vodPlayer willSwitchToQuality:(AliyunVodPlayerVideoQuality)quality videoDefinition:(NSString*)videoDefinition{
  NSLog(@"%s", "将要切换清晰度时触发");
}
- (void)vodPlayer:(AliyunVodPlayer *)vodPlayer didSwitchToQuality:(AliyunVodPlayerVideoQuality)quality videoDefinition:(NSString*)videoDefinition{
  NSLog(@"%s", "清晰度切换完成后触发");
}
- (void)vodPlayer:(AliyunVodPlayer*)vodPlayer failSwitchToQuality:(AliyunVodPlayerVideoQuality)quality videoDefinition:(NSString*)videoDefinition{
  NSLog(@"%s", "清晰度切换失败触发");
}
- (void)onCircleStartWithVodPlayer:(AliyunVodPlayer*)vodPlayer{
  NSLog(@"%s", "开启循环播放功能，开始循环播放时接收此事件。");
}
- (void)onTimeExpiredErrorWithVodPlayer:(AliyunVodPlayer *)vodPlayer{
  //关闭loading动画
  [_loadingView dismiss];
  NSLog(@"%s", "播放器鉴权数据过期回调，出现过期可重新prepare新的地址或进行UI上的错误提醒。");
}
/*
 *功能：播放过程中鉴权即将过期时提供的回调消息（过期前一分钟回调）
 *参数：videoid：过期时播放的videoId
 *参数：quality：过期时播放的清晰度，playauth播放方式和STS播放方式有效。
 *参数：videoDefinition：过期时播放的清晰度，MPS播放方式时有效。
 *备注：使用方法参考高级播放器-点播。
 */
- (void)vodPlayerPlaybackAddressExpiredWithVideoId:(NSString *)videoId quality:(AliyunVodPlayerVideoQuality)quality videoDefinition:(NSString*)videoDefinition{
  NSLog(@"%s", "鉴权有效期为2小时，在这个回调里面可以提前请求新的鉴权，stop上一次播放，prepare新的地址，seek到当前位置");
}

#pragma mark - public method
/*
 * 功能 ： 接收onEventCallback回调时，根据当前播放器事件更新UI播放器UI数据
 * 参数：
 */
- (void)updateVodPlayViewDataWithEvent:(AliyunVodPlayerEvent)event vodPlayer:(AliyunVodPlayer *)vodPlayer{
  NSLog(@"播放器状态:%ld",(long)vodPlayer.playerState);
  if(self.delegate && [self.delegate respondsToSelector:@selector(aliyunVodPlayerView:happen:)]){
    [self.delegate aliyunVodPlayerView:self happen:event];
  }
  [self.controlView updateViewWithPlayerState:vodPlayer.playerState isScreenLocked:self.isScreenLocked fixedPortrait:self.isProtrait];

  switch (event) {
    case AliyunVodPlayerEventPrepareDone:
    {
      //关闭loading动画
      [_loadingView dismiss];

      //保存获取的的播放器信息 ，需要优化。
      self.currentDuration = vodPlayer.duration;
    }
      break;
    case  AliyunVodPlayerEventFirstFrame:
    {
      //sdk内部无计时器，需要获取currenttime；注意 NSRunLoopCommonModes
      NSTimer * tempTimer = [NSTimer scheduledTimerWithTimeInterval:1 target:self selector:@selector(timerRun) userInfo:nil repeats:YES];
      [[NSRunLoop currentRunLoop] addTimer:tempTimer forMode:NSRunLoopCommonModes];
      self.timer = tempTimer;

//      [self.controlView setEnableGesture:YES];
//      if((int)self.aliPlayer.quality >= 0){
//        [self.controlView setCurrentQuality:self.aliPlayer.quality];
//      }else{
//        [self.controlView setCurrentDefinition:self.aliPlayer.videoDefinition];
//      }

      //开启常亮状态
      [[UIApplication sharedApplication] setIdleTimerDisabled:YES];
      //隐藏封面
//      if (self.coverImageView) {
//        self.coverImageView.hidden = YES;
//        NSLog(@"播放器:首帧加载完成封面隐藏");
//      }
    }
      break;
    case AliyunVodPlayerEventPlay:
      break;
    case AliyunVodPlayerEventPause:
    {
      //播放器暂停回调
      if (self.delegate && [self.delegate respondsToSelector:@selector(playerView:onPause:)]) {
        NSTimeInterval time = vodPlayer.currentTime;
        [self.delegate aliyunVodPlayerView:self onPause:time];
      }
    }
      break;
    case AliyunVodPlayerEventFinish:{
      //播放完成回调
//      if (self.delegate && [self.delegate respondsToSelector:@selector(onFinishWithAliyunVodPlayerView:)]) {
//        [self.delegate onFinishWithAliyunVodPlayerView:self];
//      }
//      [self unlockScreen];
    }
      break;
    case AliyunVodPlayerEventStop: {
      //stop 回调
      if (self.delegate && [self.delegate respondsToSelector:@selector(playerView:onStop:)]) {
        NSTimeInterval time = vodPlayer.currentTime;
        [self.delegate aliyunVodPlayerView:self onStop:time];
      }
      //取消常亮状态
      [[UIApplication sharedApplication] setIdleTimerDisabled:NO];
      //隐藏封面
//      if (self.coverImageView) {
//        self.coverImageView.hidden = YES;
//        NSLog(@"播放器:播放停止封面隐藏");
//      }
    }
      break;
    case AliyunVodPlayerEventSeekDone :{
      self.mProgressCanUpdate = YES;
      if (self.delegate && [self.delegate respondsToSelector:@selector(playerView:onSeekDone:)]) {
        [self.delegate aliyunVodPlayerView:self onSeekDone:vodPlayer.currentTime];
      }
    }
      break;
    case AliyunVodPlayerEventBeginLoading: {
      //展示loading动画
      [_loadingView show];
    }
      break;
    case AliyunVodPlayerEventEndLoading: {
      //关闭loading动画
      [_loadingView dismiss];
      self.mProgressCanUpdate = YES;
    }
      break;
    default:
      break;
  }
}

#pragma mark - timerRun
- (void)timerRun{
  if (self.aliPlayer && self.mProgressCanUpdate) {
    NSTimeInterval loadTime = self.aliPlayer.loadedTime;
    float changeLoadTime = (self.currentDuration == 0) ?: (loadTime / self.currentDuration);
    NSTimeInterval currentTime = self.aliPlayer.currentTime;
    NSTimeInterval durationTime = self.aliPlayer.duration;
    AliyunVodPlayerState state = (AliyunVodPlayerState)self.aliPlayer.playerState;
    self.controlView.state = state;
    self.controlView.loadTimeProgress = changeLoadTime;
    if (self.aliPlayer.currentTime > 0) {
      self.saveCurrentTime = self.aliPlayer.currentTime;
    }

    NSLog(@"播放时间记录:%0.2f",self.saveCurrentTime);
    if (state == AliyunVodPlayerStatePlay || state == AliyunVodPlayerStatePause) {
      [self.controlView updateProgressWithCurrentTime:currentTime durationTime:durationTime];
    }
  }
}


#pragma mark - controlView代理回调
- (void)onClickedPlayButtonWithAliyunControlView:(AlvideoViewControlView *)controlView{
  AliyunVodPlayerState state = [self playerViewState];
  if (state == AliyunVodPlayerStatePlay){
    [self pause];
  }else if (state == AliyunVodPlayerStatePrepared){
    [self start];
  }else if(state == AliyunVodPlayerStatePause){
    [self resume];
  }
}
- (void)onClickedfullScreenButtonWithAliyunControlView:(AlvideoViewControlView *)controlView{
//  if(self.fixedPortrait){
  
//    controlView.lockButton.hidden = self.isProtrait;
    
    if(!self.isProtrait){
      self.frame = CGRectMake(0, 0, [[UIScreen mainScreen] bounds].size.height, [[UIScreen mainScreen] bounds].size.width);
      self.isProtrait = YES;
      dispatch_async(dispatch_get_main_queue(), ^{
        AppDelegate *app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
        MyNavigationController *rootview = (MyNavigationController *)app.window.rootViewController;
        [rootview setFull:YES];
      });
    }else{
      self.frame = self.saveFrame;
      self.isProtrait = NO;
      dispatch_async(dispatch_get_main_queue(), ^{
        AppDelegate *app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
        MyNavigationController *rootview = (MyNavigationController *)app.window.rootViewController;
        [rootview setFull:NO];
      });
    }
  self.controlView.isProtrait = self.isProtrait;
//    if (self.delegate &&[self.delegate respondsToSelector:@selector(aliyunVodPlayerView:fullScreen:)]) {
//      [self.delegate aliyunVodPlayerView:self fullScreen:self.isProtrait];
//    }
//  }else{
//    if(self.isScreenLocked){
//      return;
//    }
//  }
  
  controlView.isProtrait = self.isProtrait;
  [self setNeedsLayout];
}
- (void)aliyunControlView:(AlvideoViewControlView *)controlView dragProgressSliderValue:(float)progressValue event:(UIControlEvents)event{
  switch (event) {
    case UIControlEventTouchDown:
    {
      self.mProgressCanUpdate = NO;
    }
      break;
    case UIControlEventValueChanged:
    {
      self.mProgressCanUpdate = NO;
      //更新UI上的当前时间
      [self.controlView updateCurrentTime:progressValue*self.aliPlayer.duration durationTime:self.aliPlayer.duration];
    }
      break;
    case UIControlEventTouchUpInside:
    {
      
      [self.aliPlayer seekToTime:progressValue*self.aliPlayer.duration];
      NSLog(@"t播放器测试：TouchUpInside 跳转到%.1f",progressValue*self.aliPlayer.duration);
      AliyunVodPlayerState state = [self playerViewState];
      if (state == AliyunVodPlayerStatePause) {
        [self.aliPlayer resume];
      }
      dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(3 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        //在播放器回调的方法里，防止sdk异常不进行seekdone的回调，在3秒后增加处理，防止ui一直异常
        self.mProgressCanUpdate = YES;
      });
    }
      break;
    case UIControlEventTouchUpOutside:{
      
      [self.aliPlayer seekToTime:progressValue*self.aliPlayer.duration];
      NSLog(@"t播放器测试：TouchUpOutside 跳转到%.1f",progressValue*self.aliPlayer.duration);
      AliyunVodPlayerState state = [self playerViewState];
      if (state == AliyunVodPlayerStatePause) {
        [self.aliPlayer resume];
      }
      dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(3 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        //在播放器回调的方法里，防止sdk异常不进行seekdone的回调，在3秒后增加处理，防止ui一直异常
        self.mProgressCanUpdate = YES;
      });
    }
      break;
      //点击事件
    case UIControlEventTouchDownRepeat:{
      
      [self.aliPlayer seekToTime:progressValue*self.aliPlayer.duration];
      NSLog(@"t播放器测试：DownRepeat跳转到%.1f",progressValue*self.aliPlayer.duration);
      dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(3 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        //在播放器回调的方法里，防止sdk异常不进行seekdone的回调，在3秒后增加处理，防止ui一直异常
        self.mProgressCanUpdate = YES;
      });
    }
      break;
      
    default:
      self.mProgressCanUpdate = YES;
      break;
  }
}
#pragma mark - 播放器当前状态
- (AliyunVodPlayerState)playerViewState {
  return _currentPlayStatus;
}

#pragma mark - playManagerAction
- (void)start {
  [self.aliPlayer start];
  NSLog(@"播放器start");
}

- (void)pause{
  [self.aliPlayer pause];
  NSLog(@"播放器pause");
}

- (void)resume{
  [self.aliPlayer resume];
  if (self.delegate && [self.delegate respondsToSelector:@selector(aliyunVodPlayerView:onResume:)]) {
    NSTimeInterval time = self.aliPlayer.currentTime;
    [self.delegate aliyunVodPlayerView:self onResume:time];
  }
  NSLog(@"播放器resume");
}

- (void)stop {
  [self.aliPlayer stop];
  NSLog(@"播放器stop");
}

- (void)replay{
  [self.aliPlayer replay];
  NSLog(@"播放器replay");
}

- (void)reset{
  [self.aliPlayer reset];
  NSLog(@"播放器reset");
}
#pragma mark - 自动播放
- (void)setAutoPlay:(BOOL)autoPlay {
  [self.aliPlayer setAutoPlay:autoPlay];
}

- (void)releasePlayer {
//  [_reachability stopNotifier];
  [[NSNotificationCenter defaultCenter] removeObserver:self name:UIDeviceOrientationDidChangeNotification object:nil];
//  [[NSNotificationCenter defaultCenter] removeObserver:self name:AliyunPVReachabilityChangedNotification object:self.aliPlayer];
  if (self.timer) {
    [self.timer invalidate];
    self.timer = nil;
  }
  if (_aliPlayer) {
    [_aliPlayer releasePlayer];
    _aliPlayer = nil;
  }
//  //开启休眠
  [[UIApplication sharedApplication] setIdleTimerDisabled:NO];
}

- (void)removeFromSuperview{
  [super removeFromSuperview];
  [self.aliPlayer stop];
  NSLog(@"%s", "removeFromSuperview");
}
- (void)dealloc{
  NSLog(@"%s", "dealloc");
}

@end
