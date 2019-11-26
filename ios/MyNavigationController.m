//
//  Alvideo.m
//  TestYIYAYIYA
//
//  Created by 黄慧敏 on 2018/11/29.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "MyNavigationController.h"

@implementation MyNavigationController{
  BOOL _isFull;
}

-(instancetype)init:(UIViewController *)view
{
  self = [super initWithRootViewController:view];
  _isFull = false;
  return self;
}
-(void)setFull:(BOOL)isFull{
  NSLog(@"setFull");
  if(isFull == _isFull){
    return;
  }
  _isFull = isFull;
  if(_isFull){
    NSNumber *value = [NSNumber numberWithInt:UIInterfaceOrientationLandscapeRight];
    [[UIDevice currentDevice] setValue:value forKey:@"orientation"];
  }else{
    NSNumber *value = [NSNumber numberWithInt:UIInterfaceOrientationPortrait];
    [[UIDevice currentDevice] setValue:value forKey:@"orientation"];
  }
}
-(BOOL)shouldAutorotate{
  return YES;
}
- (UIInterfaceOrientationMask)supportedInterfaceOrientations
{
  if(_isFull){
    return UIInterfaceOrientationMaskLandscapeRight;
  }else{
    return UIInterfaceOrientationMaskPortrait;
  }
}
//-(void)viewWillTransitionToSize:(CGSize)size withTransitionCoordinator:(id<UIViewControllerTransitionCoordinator>)coordinator
//{
//  [super viewWillTransitionToSize:size withTransitionCoordinator:coordinator];
//  
//  [CATransaction begin];
//  
//  [CATransaction setDisableActions:YES];
//  
//  [coordinator animateAlongsideTransition:^(id<UIViewControllerTransitionCoordinatorContext> _Nonnull context) {
//  } completion:^(id<UIViewControllerTransitionCoordinatorContext> _Nonnull context) {
//    [CATransaction commit];
//  }];
//  
//}
@end
