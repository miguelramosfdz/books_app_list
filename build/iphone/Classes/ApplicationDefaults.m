/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"G4zmzabsO1QrF93eQ2MviFFhsJ4EI3KR"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"tHKxgFSSyz70mAXCaf4PlXkM2XsotbYZ"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"CbFz4FOdn1O2JnG9IGRGPmRRVxp5s7uY"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"CpJdBK51FYCLc5wFGFMF1tP1FjykDneX"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"ciBRlk71ZGjqnYYKiSvsBwDBHyyBoMbu"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"ecv2saQR0esHxzfFzoSf7tvUmvjGE53r"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
