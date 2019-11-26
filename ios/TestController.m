//
//  TestController.m
//  RNAddNative
//
//  Created by Shaoting Zhou on 2017/2/22.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "TestController.h"
//#import "AlvideoView.h"


@implementation TestController

- (void)viewDidLoad {
  [super viewDidLoad];
  self.navigationItem.title = @"我是原生页面哟~";
  self.view.backgroundColor = [UIColor redColor];
  
//  AlvideoView *video = [[AlvideoView alloc] initWithFrame:CGRectMake(0,200,400,250)];
//  [self.view addSubview:video];
}

-(void)viewWillAppear:(BOOL)animated{
  [super viewWillAppear:animated];
  [self.navigationController setNavigationBarHidden:NO animated:YES];
}

-(void)viewWillDisappear:(BOOL)animated{
  [super viewWillAppear:animated];
  [self.navigationController setNavigationBarHidden:YES animated:YES];
  
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
