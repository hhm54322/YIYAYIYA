//
//  AVCDownloadVideo.h
//  AliyunVideoClient_Entrance
//
//  Created by Zejian Cai on 2018/4/18.
//  Copyright © 2018年 Alibaba. All rights reserved.
//  视频下载模型



#import <Foundation/Foundation.h>
#import <AliyunVodPlayerSDK/AliyunVodDownLoadManager.h>
#import <UIKit/UIKit.h>


typedef NS_ENUM(NSInteger,AVCDownloadStatus){
  AVCDownloadStatusDownloading = 0,
  AVCDownloadStatusPause,
  AVCDownloadStatusWait,
  AVCDownloadStatusDone,
  AVCDownloadStatusFailure,
};

NS_ASSUME_NONNULL_BEGIN

@interface AVCDownloadVideo : NSObject

/**
 下载信息
 */
@property (nonatomic, strong, readonly) AliyunDownloadMediaInfo *mediaInfo;

/**
 下载状态
 */
@property (nonatomic, assign) AVCDownloadStatus downloadStatus;

/**
 封面图片
 */
@property (nonatomic, strong, nullable) UIImage *coverImage;

#pragma mark - 存储在本地属性
@property (nonatomic, strong, nullable) NSString *video_id; //视频id
@property (nonatomic, strong, nullable) NSNumber *video_quality;//视频的质量
@property (nonatomic, strong, nullable) NSString *video_format;//视频格式
@property (nonatomic, strong, nullable) NSNumber *video_status; //视频的下载状态
@property (nonatomic, strong, nullable) NSNumber *video_progress;  //视频的下载进度
@property (nonatomic, strong, nullable) NSNumber *video_size;  //视频的下载进度
@property (nonatomic, strong, nullable) NSString *video_title; //视频的标题
@property (nonatomic, strong, nullable) NSString *video_imageUrlString; //视频的封面图片
@property (nonatomic, strong, nullable) NSString *video_fileName;//视频的本地播放地址
@property (nonatomic, strong, nullable) NSData *video_imageData;//视频的图片数据

#pragma mark - 只读属性

/**
 状态图片

 @return 状态图片
 */
- (UIImage *__nullable)statusImage;


/**
 状态字符串

 @return 状态字符串
 */
- (NSString *__nullable)statusString;

/**
 标题

 @return 标题
 */
- (NSString *)title;

/**
 M为单位,下载的数据总量

 @return 500M
 */
- (NSString *)totalDataString;

/**
 下载进度 0-1

 @return 下载进度
 */
- (CGFloat )downloadProgress;

/**
 封面图片的url

 @return 封面图片的url
 */
- (NSString *)coverImageurlString;


/**
 Designated Method

 @param media 下载的媒体信息
 @return 实例对象
 */
- (instancetype)initWithMedia:(AliyunDownloadMediaInfo *)media;


/**
 刷新当前的下载状态

 @param media 下载的媒体信息
 @return 是否成功，如果跟原来的媒体信息一样 成功； 不一样：失败
 */
- (BOOL)refreshStatusWithMedia:(AliyunDownloadMediaInfo *)media;


/**
 用于存储视频的路径

 @return 存储视频的路径
 */
//+ (NSString *)savePath;

/**
 是否是相同的视频

 @param otherVideo otherVideo
 @return true:相同 false：不相同
 */
- (BOOL)isSameWithOtherVideo:(AVCDownloadVideo *)otherVideo;


/**
 是否是相同的视频

 @param mediaInfo sdk里的视频信息格式
 @return true:相同 false：不相同
 */
- (BOOL)isSameWithOtherMedia:(AliyunDownloadMediaInfo *)mediaInfo;




@end

NS_ASSUME_NONNULL_END
