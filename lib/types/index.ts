import { ClassProvider, ValueProvider, FactoryProvider, ExistingProvider } from '@nestjs/common/interfaces';
import type { ClientOptions } from 'google-gax/build/src/clientInterface';
import { v1 as secretManager } from "@google-cloud/secret-manager";
export type SecretManagerClient = secretManager.SecretManagerServiceClient;
interface DefaultOptions {
    /** parent of secrets */
    parent: number;
}
export type ModuleOptions = DefaultOptions & ClientOptions;

export type AsyncProvider<T> =
  | Omit<ClassProvider<T>, 'provide'>
  | Omit<ValueProvider<T>, 'provide'>
  | Omit<FactoryProvider<T>, 'provide'>
  | Omit<ExistingProvider<T>, 'provide'>;
export type ModuleAsyncOptions<T> = AsyncProvider<T>;
