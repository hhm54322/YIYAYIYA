//
//  AliUtil.m
//  TestYIYAYIYA
//
//  Created by 黄慧敏 on 2018/12/24.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "AliUtil.h"


@implementation AliUtil

+ (BOOL)isInterfaceOrientationPortrait {
  UIInterfaceOrientation o = [[UIApplication sharedApplication] statusBarOrientation];
  return o == UIInterfaceOrientationPortrait;
}

+ (NSString *)timeformatFromSeconds:(NSInteger)seconds {
  //format of hour
  NSString *str_hour = [NSString stringWithFormat:@"%02ld", (long) seconds / 3600];
  //format of minute
  NSString *str_minute = [NSString stringWithFormat:@"%02ld", (long) (seconds % 3600) / 60];
  //format of second
  NSString *str_second = [NSString stringWithFormat:@"%02ld", (long) seconds % 60];
  //format of time
  NSString *format_time = nil;
  if (seconds / 3600 <= 0) {
    format_time = [NSString stringWithFormat:@"00:%@:%@", str_minute, str_second];
  } else {
    format_time = [NSString stringWithFormat:@"%@:%@:%@", str_hour, str_minute, str_second];
  }
  return format_time;
}

@end
