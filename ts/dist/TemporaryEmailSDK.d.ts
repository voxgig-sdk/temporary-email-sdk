import { EmailEntity } from './entity/EmailEntity';
import { InboxEntity } from './entity/InboxEntity';
import { MessageEntity } from './entity/MessageEntity';
export type * from './TemporaryEmailTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { TemporaryEmailEntityBase } from './TemporaryEmailEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class TemporaryEmailSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Email(entopts?: Record<string, any>): EmailEntity;
    Inbox(entopts?: Record<string, any>): InboxEntity;
    Message(entopts?: Record<string, any>): MessageEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): TemporaryEmailSDK;
    tester(testopts?: any, sdkopts?: any): TemporaryEmailSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof TemporaryEmailSDK;
export { stdutil, config, BaseFeature, TemporaryEmailEntityBase, TemporaryEmailSDK, SDK, };
