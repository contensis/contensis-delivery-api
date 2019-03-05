import { ContensisClient } from './ContensisClient';
import { Config } from './Config';
export interface ClientStatic {
	defaultClientConfig: Config;
	create(config?: Config): ContensisClient;
	configure(config: Config);
}
