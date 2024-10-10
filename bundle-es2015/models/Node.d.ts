import { VersionInfo } from 'contensis-core-api';
import { Entry as LooseEntry, StrictEntry } from './Entry';
export declare type NodeVersionInfo = Pick<VersionInfo, 'versionNo'>;
export interface Node<TEntry extends StrictEntry = LooseEntry> {
    id: string;
    parentId?: string;
    projectId: string;
    slug: string;
    displayName: string;
    language: string;
    path: string;
    childCount: number;
    children?: Node[];
    entry?: TEntry;
    isCanonical: boolean;
    version: NodeVersionInfo;
    includeInMenu: boolean;
}
