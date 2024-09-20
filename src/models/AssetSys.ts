import { BaseSys } from './BaseSys';

export interface AssetSys extends BaseSys<'asset'> {
    properties: {
        filename: string;
        fileSize: number;
        fileId: string;
        filePath: string;
        width?: number;
        height?: number;
    };
}
