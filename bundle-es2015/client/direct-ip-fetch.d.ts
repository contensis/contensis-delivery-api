type FetchFn = (input: RequestInfo, init?: RequestInit) => Promise<Response>;
export interface IpState {
    failures: number;
    failedAt: number | null;
}
export interface DirectIpState {
    ipStates: Map<string, IpState>;
    ipList: string[];
    hostname: string;
    agents: Map<string, any>;
    healthTimer: any;
    refCount: number;
    release: () => void;
}
export interface DirectIpFetchResult {
    fetch: FetchFn;
    state: DirectIpState | null;
}
export interface DirectIpDeps {
    httpsModule?: any;
    netModule?: any;
}
export declare function isHealthy(state: IpState, now?: number): boolean;
export declare function recordSuccess(): IpState;
export declare function recordFailure(state: IpState, now?: number): IpState;
export declare function isInfraFailure(status: number): boolean;
export declare function selectIp(ipList: string[], ipStates: Map<string, IpState>, excludeIp?: string, now?: number): string | null;
export declare function validateIps(rawIps: string[], netMod?: any): string[];
export declare function parseIpListEnvVar(envValue: string, rootUrl: string, netMod?: any): {
    hostname: string;
    ips: string[];
} | null;
export declare function createDirectIpFetch(innerFetch: FetchFn, ipListSource: string | string[], rootUrl: string, deps?: DirectIpDeps): DirectIpFetchResult;
export declare function _resetRegistries(): void;
export {};
