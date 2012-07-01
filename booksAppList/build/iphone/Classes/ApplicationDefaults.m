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

    [_property setObject:[TiUtils stringValue:@"IfAjzqeKEBW8Q1ZahYClIl70RKsWcJHw"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"Xu6POsKPwRhEhvZKm35ztYcEMdTIFcIL"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"bBlvf6RYCDDyXNxi0XThdXbFhGmKGrUR"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"XZ6kbAWbdMw29qoZFhzuZx5QXmiIbG7i"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"i8XgpQp64TbVSYIdU8DFeYNWzPAesLjj"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"64dD0wXBHq4Hj3iIupJwCRby1UMp6Hzk"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
