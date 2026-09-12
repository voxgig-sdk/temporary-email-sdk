import { TemporaryEmailEntityBase } from '../TemporaryEmailEntityBase';
import type { TemporaryEmailSDK } from '../TemporaryEmailSDK';
import type { Control } from '../types';
import type { Message, MessageLoadMatch } from '../TemporaryEmailTypes';
declare class MessageEntity extends TemporaryEmailEntityBase<Message> {
    constructor(client: TemporaryEmailSDK, entopts: any);
    make(this: MessageEntity): MessageEntity;
    load(this: any, reqmatch?: MessageLoadMatch, ctrl?: Control): Promise<MessageEntity>;
}
export { MessageEntity };
