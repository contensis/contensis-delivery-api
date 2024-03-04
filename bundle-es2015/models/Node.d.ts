import { VersionInfo } from 'contensis-core-api';
import { Entry } from './Entry';
export declare type NodeVersionInfo = Pick<VersionInfo, 'versionNo'>;
export interface Node {
    id: string;
    parentId?: string;
    projectId: string;
    slug: string;
    displayName: string;
    language: string;
    path: string;
    childCount: number;
    children?: Node[];
    entry?: Entry;
    isCanonical: boolean;
    version: NodeVersionInfo;
    includeInMenu: boolean;
    title: string;
    entryId?: string;
}
