import type { ClientOptions } from 'google-gax/build/src/clientInterface';
import { v1 as secretManager } from "@google-cloud/secret-manager";
interface DefaultOptions {
    /** parent of secrets */
    parent: number;
    setEnvAuto?: boolean;
    envFilePath?: string;
    secrets?: string[];
}
export type RootOption = DefaultOptions & ClientOptions;
export type SecretManagerClient = secretManager.SecretManagerServiceClient;