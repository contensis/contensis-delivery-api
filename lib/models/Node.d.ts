import { Entry } from './Entry';
export interface Node {
    id: string;
    projectId: string;
    title: string;
    slug: string;
    path: string;
    parentId?: string;
    language: string;
    entryId?: string;
    entry?: Entry;
    childCount: number;
    includeInMenu: boolean;
}
