export enum ACTION {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE'
}

// Enum para ENTITY_TYPE
export enum ENTITY_TYPE {
    BOARD = 'BOARD',
    LIST = 'LIST',
    CARD = 'CARD'
}

// Interface para User
export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    organizations: Organization[];
}

// Interface para Organization
export interface Organization {
    id: string;
    name: string;
    image?: string;
    slug: string;
    userId: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}

// Interface para Board
export interface Board {
    id: string;
    orgId: string;
    title: string;
    imageId: string;
    imageThunbUrl: string;
    imageFullUrl: string;
    imageUserName: string;
    imageLinkHTML: string;
    lists: List[];
    createdAt: Date;
    updatedAt: Date;
}

// Interface para List
export interface List {
    id: string;
    title: string;
    order: number;
    boardId: string;
    board: Board;
    cards: Card[];
    createdAt: Date;
    updatedAt: Date;
}

// Interface para Card
export interface Card {
    id: string;
    title: string;
    order: number;
    description?: string;
    listId: string;
    list: List;
    createdAt: Date;
    updatedAt: Date;
}

// Interface para AuditLog
export interface AuditLog {
    id: string;
    orgId: string;
    action: ACTION;
    entityId: string;
    entityType: ENTITY_TYPE;
    entityTitle: string;
    userId: string;
    userImage: string;
    userName: string;
    createdAt: Date;
    updatedAt: Date;
}

// Interface para OrgLimit
export interface OrgLimit {
    id: string;
    orgId: string;
    count: number;
    createdAt: Date;
    updatedAt: Date;
}

// Interface para OrgSubscription
export interface OrgSubscription {
    id: string;
    orgId: string;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    stripePriceId?: string;
    stripeCurrentPeriodEnd?: Date;
}