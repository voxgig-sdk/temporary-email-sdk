import { TemporaryEmailEntityBase } from '../TemporaryEmailEntityBase';
import type { TemporaryEmailSDK } from '../TemporaryEmailSDK';
import type { Control } from '../types';
import type { Email, EmailLoadMatch } from '../TemporaryEmailTypes';
declare class EmailEntity extends TemporaryEmailEntityBase<Email> {
    constructor(client: TemporaryEmailSDK, entopts: any);
    make(this: EmailEntity): EmailEntity;
    load(this: any, reqmatch?: EmailLoadMatch, ctrl?: Control): Promise<EmailEntity>;
}
export { EmailEntity };
