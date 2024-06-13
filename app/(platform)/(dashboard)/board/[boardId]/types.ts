export interface Label {
    label__text: string;
    label__color: string;
}

export interface Comment {
    idMember__email: string;
    idMember__name: string;
    text: string;
}

export interface Member {
    member__name: string;
    member__email: string;
}

export interface KanbanItem {
    id: number;
    title: string;
    textDescription: string | null;
    creator: string;
    creator_email: string;
    order: number;
    labels: Label[];
    members: Member[];
}

export interface CompleteKanbanItem {
    id: number;
    title: string;
    idMemberCreator: number;
    textDescription: string;
    column: number;
    labels: Label[];
    members: Member[];
    comments: Comment[];
}

export interface KanbanColumn {
    id: number;
    name: string;
    idKanban: number;
    order: number;
    items: KanbanItem[];
}