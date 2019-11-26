//
//  ALPVCenterView.m
//

#import "AlilyunViewLoadingView.h"

static const CGFloat AlilyunViewLoadingViewLoadingViewWidth   = 28;   //loadingView 宽度
static const CGFloat AlilyunViewLoadingViewLoadingViewHeight  = 28;   //loadingView 高度
static const CGFloat AlilyunViewLoadingViewMargin         = 2;    //间隙

@interface AlilyunViewLoadingView ()
@property (nonatomic, strong) UIActivityIndicatorView *loadingView;

@end

@implementation AlilyunViewLoadingView

- (UIActivityIndicatorView *)loadingView{
    if (!_loadingView) {
        _loadingView = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhite];
    }
    return _loadingView;
}


#pragma mark - init
- (instancetype)init {
    return [self initWithFrame:CGRectZero];
}

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        [self setBackgroundColor:[UIColor clearColor]];
        [self setHidden:YES];
        [self addSubview:self.loadingView];
    }
    return self;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    float width = self.bounds.size.width;
    float margin = AlilyunViewLoadingViewMargin;
    float messageViewY = (width) / 2;
    float loadingWidth = AlilyunViewLoadingViewLoadingViewWidth;
    float loadingHeight = AlilyunViewLoadingViewLoadingViewHeight;
    self.loadingView.frame = CGRectMake((width - loadingWidth) / 2, messageViewY - loadingHeight - margin, loadingWidth, loadingWidth);
    [self.loadingView startAnimating];
}

#pragma mark - public method
- (void)show {
    if (![self isHidden]) {
        return;
    }
    [self.loadingView startAnimating];
    [self setHidden:NO];
}

- (void)dismiss {
    if ([self isHidden]) {
        return;
    }
    [self.loadingView startAnimating];
    [self setHidden:YES];
}

@end
