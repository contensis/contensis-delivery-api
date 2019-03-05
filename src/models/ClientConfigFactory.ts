import { Config } from './Config';
export interface ClientConfigFactory {
	new(value: Config, previous: Config): Config;
}
