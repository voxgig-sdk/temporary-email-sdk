import { TemporaryEmailEntityBase } from '../TemporaryEmailEntityBase';
import type { TemporaryEmailSDK } from '../TemporaryEmailSDK';
import type { Control } from '../types';
import type { Inbox, InboxLoadMatch } from '../TemporaryEmailTypes';
declare class InboxEntity extends TemporaryEmailEntityBase<Inbox> {
    constructor(client: TemporaryEmailSDK, entopts: any);
    make(this: InboxEntity): InboxEntity;
    load(this: any, reqmatch?: InboxLoadMatch, ctrl?: Control): Promise<InboxEntity>;
}
export { InboxEntity };
