//
//  AliyunPlayerView.h
//  TestYIYAYIYA
//
//  Created by HMW on 2019/2/23.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTComponent.h>
#import <AliyunVodPlayerSDK/AliyunVodPlayerSDK.h>

@interface AliyunPlayerView : UIView <AliyunVodPlayerDelegate>

@property (nonatomic, strong) AliyunVodPlayer *aliPlayer;

@property (nonatomic, copy) RCTBubblingEventBlock onEventCallback;
@property (nonatomic, copy) RCTBubblingEventBlock onGetAliyunMediaInfo;
@property (nonatomic, copy) RCTBubblingEventBlock onPlayingCallback;
@property (nonatomic, copy) RCTBubblingEventBlock onPlayEndCallback;
@property (nonatomic, copy) RCTBubblingEventBlock onPlayerEventEndLoading;
@property (nonatomic, copy) RCTBubblingEventBlock onPlayerEventSeekDone;
@property (nonatomic, copy) RCTBubblingEventBlock onSwitchToQuality;
@property (nonatomic, copy) RCTBubblingEventBlock onPlayBackErrorModel;


@end
