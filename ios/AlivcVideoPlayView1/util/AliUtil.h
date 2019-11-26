//
//  AliUtil.h
//  TestYIYAYIYA
//
//  Created by 黄慧敏 on 2018/12/24.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#define kALYPVColorTextNomal                     [UIColor colorWithRed:(231 / 255.0) green:(231 / 255.0) blue:(231 / 255.0) alpha:1]

#define kALYPVColorTextGray                      [UIColor colorWithRed:(158 / 255.0) green:(158 / 255.0) blue:(158 / 255.0) alpha:1]

@interface AliUtil : NSObject

@property (nonatomic, assign) BOOL isProtrait;                      //竖屏判断

//是否手机状态条处于竖屏状态
+ (BOOL)isInterfaceOrientationPortrait;

//根据s-》hh:mm:ss
+ (NSString *)timeformatFromSeconds:(NSInteger)seconds;

@end
