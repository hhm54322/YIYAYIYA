//
//  AlvideoViewBottomView.m
//  TestYIYAYIYA
//
//  Created by 黄慧敏 on 2018/12/20.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "AlvideoViewBottomView.h"
#import "AliUtil.h"


static const CGFloat ALYPVBottomViewPlayButtonWidth         = 52;                         //播放按钮宽度
static const CGFloat ALYPVBottonViewFullScreenTimeWidth     = 80 + 40;                    //全屏时间宽度
static const CGFloat ALYPVBottomViewTextSizeFont            = 12.0f;                      //字体字号
static NSString * const ALYPVBottomViewDefaultTime          = @"00:00:00";                //默认时间样式

@interface AlvideoViewBottomView()<AliyunVodProgressViewDelegate>
@property (nonatomic, strong) UIButton *playButton;                 //播放按钮
@property (nonatomic, strong) UILabel *leftTimeLabel;               //左侧时间
@property (nonatomic, strong) UILabel *rightTimeLabel;              //右侧时间
//@property (nonatomic, strong) UILabel *fullScreenTimeLabel;         //全屏时时间
@property (nonatomic, strong) UIButton *fullScreenButton;           //全屏按钮
@property (nonatomic, strong) AliyunPlayerViewProgressView *progressView;  //进度条
@end

@implementation AlvideoViewBottomView


- (UIButton *)playButton{
  if (!_playButton) {
    _playButton = [[UIButton alloc] init];
    [_playButton setImage:[UIImage imageNamed:@"avcPlayIcon"] forState:UIControlStateNormal];
    [_playButton setImage:[UIImage imageNamed:@"avcPause"] forState:UIControlStateSelected];
    [_playButton addTarget:self action:@selector(playButtonClicked:) forControlEvents:UIControlEventTouchUpInside];
  }
  return _playButton;
}
- (UIButton *)fullScreenButton{
  if (!_fullScreenButton) {
    _fullScreenButton = [[UIButton alloc] init];
    [_fullScreenButton setImage:[UIImage imageNamed:@"avcFullScreen"] forState:UIControlStateSelected];
    [_fullScreenButton setImage:[UIImage imageNamed:@"avcFullScreen"] forState:UIControlStateNormal];
    [_fullScreenButton setTag:1004];
    [_fullScreenButton addTarget:self action:@selector(fullScreenButtonClicked:) forControlEvents:UIControlEventTouchUpInside];
  }
  return _fullScreenButton;
}

- (UILabel *)leftTimeLabel{
  if (!_leftTimeLabel) {
    _leftTimeLabel = [[UILabel alloc] init];
    _leftTimeLabel.textAlignment = NSTextAlignmentLeft;
    [_leftTimeLabel setFont:[UIFont systemFontOfSize:ALYPVBottomViewTextSizeFont]];
    [_leftTimeLabel setTextColor:kALYPVColorTextNomal];
    _leftTimeLabel.text = ALYPVBottomViewDefaultTime;
  }
  return _leftTimeLabel;
}

- (UILabel *)rightTimeLabel{
  if (!_rightTimeLabel) {
    _rightTimeLabel = [[UILabel alloc] init];
    _rightTimeLabel.textAlignment = NSTextAlignmentRight;
    [_rightTimeLabel setFont:[UIFont systemFontOfSize:ALYPVBottomViewTextSizeFont]];
    [_rightTimeLabel setTextColor:kALYPVColorTextNomal];
    _rightTimeLabel.text = ALYPVBottomViewDefaultTime;
  }
  return _rightTimeLabel;
}

//- (UILabel *)fullScreenTimeLabel{
//  if (!_fullScreenTimeLabel) {
//    _fullScreenTimeLabel = [[UILabel alloc] init];
//    _fullScreenTimeLabel.textAlignment = NSTextAlignmentCenter;
//    [_fullScreenTimeLabel setFont:[UIFont systemFontOfSize:ALYPVBottomViewTextSizeFont]];
//    NSString *curTimeStr = @"00:00:00";
//    NSString *totalTimeStr = @"00:00:00";
//    NSString *time = [NSString stringWithFormat:@"%@/%@", curTimeStr, totalTimeStr];
//    NSMutableAttributedString *str = [[NSMutableAttributedString alloc] initWithString:time];
//    [str addAttribute:NSForegroundColorAttributeName value:kALYPVColorTextNomal range:NSMakeRange(0, curTimeStr.length)];
//    [str addAttribute:NSForegroundColorAttributeName value:kALYPVColorTextGray range:NSMakeRange(curTimeStr.length, curTimeStr.length + 1)];
//    [_fullScreenTimeLabel setAttributedText:str];
//  }
//  return _fullScreenTimeLabel;
//}

- (void)playButtonClicked:(UIButton *)sender{
  if (self.delegate && [self.delegate respondsToSelector:@selector(onClickedPlayButtonWithAliyunPVBottomView:)]) {
    [self.delegate onClickedPlayButtonWithAliyunPVBottomView:self];
  }
}
- (void)fullScreenButtonClicked:(UIButton *)sender{
  if (self.delegate && [self.delegate respondsToSelector:@selector(onClickedfullScreenButtonWithAliyunPVBottomView:)]) {
    [self.delegate onClickedfullScreenButtonWithAliyunPVBottomView:self];
  }
}
- (AliyunPlayerViewProgressView *)progressView{
  if (!_progressView){
    _progressView = [[AliyunPlayerViewProgressView alloc] init];
  }
  return _progressView;
}

#pragma mark - init
- (instancetype)init{
  return  [self initWithFrame:CGRectZero];
}

- (instancetype)initWithFrame:(CGRect)frame{
  if (self = [super initWithFrame:frame]) {
    [self initView];
  }
  return self;
}

- (void)initView{
  [self addSubview:self.playButton];
  [self addSubview:self.fullScreenButton];
  [self addSubview:self.leftTimeLabel];
  [self addSubview:self.rightTimeLabel];
//  [self addSubview:self.fullScreenTimeLabel];
//  [self addSubview:self.qualityButton];
  self.progressView.delegate = self;
  [self addSubview:self.progressView];
}
- (void)layoutSubviews{
  [super layoutSubviews];
  float width = self.bounds.size.width;
  float height = self.bounds.size.height;
  self.playButton.frame = CGRectMake(0, 0,ALYPVBottomViewPlayButtonWidth, height);
  self.fullScreenButton.frame = CGRectMake(width - ALYPVBottomViewFullScreenButtonWidth, 0,ALYPVBottomViewFullScreenButtonWidth, height);
  
  
  self.progressView.frame = CGRectMake(ALYPVBottomViewPlayButtonWidth, 0,
                                       width - (ALYPVBottomViewPlayButtonWidth + ALYPVBottomViewFullScreenButtonWidth),
                                       height);
  CGRect progressFrame = self.progressView.frame;
  self.leftTimeLabel.frame = CGRectMake(progressFrame.origin.x, height/2, progressFrame.size.width/2, height/2);
  self.rightTimeLabel.frame = CGRectMake(progressFrame.origin.x + progressFrame.size.width/2,height/2, progressFrame.size.width/2, height/2);
  
  if (self.isPortrait) {
    self.fullScreenButton.selected = YES;
//    self.leftTimeLabel.hidden = NO;
//    self.rightTimeLabel.hidden = NO;
//    self.fullScreenTimeLabel.hidden = YES;
    
//    self.progressView.frame = CGRectMake(ALYPVBottomViewPlayButtonWidth, height,
//                                         width - (ALYPVBottomViewPlayButtonWidth + ALYPVBottomViewFullScreenButtonWidth),
//                                         height);
//
//    CGRect progressFrame = self.progressView.frame;
//
//    self.leftTimeLabel.frame = CGRectMake(progressFrame.origin.x, height/2, progressFrame.size.width/2, height/2);
//    self.rightTimeLabel.frame = CGRectMake(progressFrame.origin.x + progressFrame.size.width/2,height/2, progressFrame.size.width/2, height/2);
    return;
  }
  
  if([AliUtil isInterfaceOrientationPortrait]){
    self.fullScreenButton.selected = NO;
    
//    self.leftTimeLabel.hidden = NO;
//    self.rightTimeLabel.hidden = NO;
//    self.fullScreenTimeLabel.hidden = YES;
    
//    self.progressView.frame = CGRectMake(ALYPVBottomViewPlayButtonWidth, 0,
//                                         width - (ALYPVBottomViewPlayButtonWidth + ALYPVBottomViewFullScreenButtonWidth),
//                                         height);
//    CGRect progressFrame = self.progressView.frame;
//    self.leftTimeLabel.frame = CGRectMake(progressFrame.origin.x, height/2, progressFrame.size.width/2, height/2);
//    self.rightTimeLabel.frame = CGRectMake(progressFrame.origin.x + progressFrame.size.width/2,height/2, progressFrame.size.width/2, height/2);
  }else{
    self.fullScreenButton.selected = YES;
//    self.leftTimeLabel.hidden = YES;
//    self.rightTimeLabel.hidden = YES;
//    self.fullScreenTimeLabel.hidden = NO;
//    self.fullScreenTimeLabel.frame = CGRectMake(ALYPVBottomViewPlayButtonWidth, 0,ALYPVBottonViewFullScreenTimeWidth, height);
    
//    self.progressView.frame = CGRectMake(ALYPVBottomViewPlayButtonWidth + ALYPVBottonViewFullScreenTimeWidth + ALYPVBottomViewMargin, 0, width - (ALYPVBottomViewPlayButtonWidth + ALYPVBottonViewFullScreenTimeWidth + 2 * ALYPVBottomViewMargin  + ALYPVBottomViewFullScreenButtonWidth), height);
  }
}

- (void)setProgress:(float)progress{
  _progress = progress;
  self.progressView.progress = progress;
}

- (void)setLoadTimeProgress:(float)loadTimeProgress{
  _loadTimeProgress = loadTimeProgress;
  self.progressView.loadTimeProgress = loadTimeProgress;
}

#pragma mark - progressDelegate
- (void)aliyunVodProgressView:(AliyunPlayerViewProgressView *)progressView dragProgressSliderValue:(float)value event:(UIControlEvents)event {
  if (self.delegate && [self.delegate respondsToSelector:@selector(aliyunVodBottomView:dragProgressSliderValue:event:)]) {
    [self.delegate aliyunVodBottomView:self dragProgressSliderValue:value event:event];
  }
}

#pragma mark -  public method
/*
 * 功能 ：更新进度条
 * 参数 ：currentTime 当前播放时间
 durationTime 播放总时长
 */
- (void)updateProgressWithCurrentTime:(float)currentTime durationTime:(float)durationTime{
  
  //左右全屏时间
  NSString *curTimeStr = [AliUtil timeformatFromSeconds:roundf(currentTime)];
  NSString *totalTimeStr = [AliUtil timeformatFromSeconds:roundf(durationTime)];
  self.rightTimeLabel.text = totalTimeStr;
  self.leftTimeLabel.text = curTimeStr;
//  NSString *time = [NSString stringWithFormat:@"%@/%@", curTimeStr, totalTimeStr];
//  NSMutableAttributedString *str = [[NSMutableAttributedString alloc] initWithString:time];
//  [str addAttribute:NSForegroundColorAttributeName value:kALYPVColorTextNomal range:NSMakeRange(0, curTimeStr.length)];
//  [str addAttribute:NSForegroundColorAttributeName value:kALYPVColorTextGray range:NSMakeRange(curTimeStr.length, curTimeStr.length + 1)];
//  self.fullScreenTimeLabel.attributedText = str;
  
  //进度条
  [self.progressView updateProgressWithCurrentTime:currentTime durationTime:durationTime];
}

- (void)updateCurrentTime:(float)currentTime durationTime:(float)durationTime{
  //左右全屏时间
  NSString *curTimeStr = [AliUtil timeformatFromSeconds:roundf(currentTime)];
  NSString *totalTimeStr = [AliUtil timeformatFromSeconds:roundf(durationTime)];
  self.rightTimeLabel.text = totalTimeStr;
  self.leftTimeLabel.text = curTimeStr;
//  NSString *time = [NSString stringWithFormat:@"%@/%@", curTimeStr, totalTimeStr];
//  NSMutableAttributedString *str = [[NSMutableAttributedString alloc] initWithString:time];
//  [str addAttribute:NSForegroundColorAttributeName value:kALYPVColorTextNomal range:NSMakeRange(0, curTimeStr.length)];
//  [str addAttribute:NSForegroundColorAttributeName value:kALYPVColorTextGray range:NSMakeRange(curTimeStr.length, curTimeStr.length + 1)];
//  self.fullScreenTimeLabel.attributedText = str;
}

/*
 * 功能 ：根据播放器状态，改变状态
 * 参数 ：state 播放器状态
 */
- (void)updateViewWithPlayerState:(AliyunVodPlayerState)state {
  switch (state) {
    case AliyunVodPlayerStateIdle:
    {
      [self.playButton setSelected:NO];
//      [self.qualityButton setUserInteractionEnabled:NO];
      [self.progressView setUserInteractionEnabled:NO];
    }
      break;
    case AliyunVodPlayerStateError:
    {
      [self.playButton setSelected:NO];
    }
      break;
    case AliyunVodPlayerStatePrepared:
    {
      [self.playButton setSelected:NO];
//      [self.qualityButton setUserInteractionEnabled:YES];
      [self.progressView setUserInteractionEnabled:YES];
    }
      break;
    case AliyunVodPlayerStatePlay:
    {
      [self.playButton setSelected:YES];
//      [self.qualityButton  setUserInteractionEnabled:YES];
      [self.progressView setUserInteractionEnabled:YES];
    }
      break;
    case AliyunVodPlayerStatePause:
    {
      [self.playButton setSelected:NO];
      [self.progressView setUserInteractionEnabled:YES];
    }
      break;
    case AliyunVodPlayerStateStop:
    {
      [self.playButton setSelected:NO];
//      [self.qualityButton setUserInteractionEnabled:NO];
      [self.progressView setUserInteractionEnabled:NO];
      
    }
      break;
    case AliyunVodPlayerStateLoading:
    {
      [self.progressView setUserInteractionEnabled:YES];
    }
      break;
    case AliyunVodPlayerStateFinish:
    {
      [self.progressView setUserInteractionEnabled:NO];
    }
      break;
      
    default:
      break;
  }
}
@end

