export interface Email {
    address: string;
    created_at?: string;
    expires_at?: string;
}
export interface EmailLoadMatch {
    address?: string;
    created_at?: string;
    expires_at?: string;
}
export interface Inbox {
    address?: string;
    id?: string;
    messages?: any[];
}
export interface InboxLoadMatch {
    id: string;
}
export interface Message {
    attachments?: any[];
    body?: string;
    from?: string;
    html_body?: string;
    id?: string;
    received_at?: string;
    subject?: string;
    to?: string;
}
export interface MessageLoadMatch {
    id: string;
}
