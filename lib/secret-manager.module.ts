import { ModuleAsyncOptions } from './types/index';
import { Global, Module, DynamicModule } from '@nestjs/common';
import { v1 as secretManager } from "@google-cloud/secret-manager";
import { SecretManagerService } from './secret-manager.service';
import { CLIENT_INSTANCE, MODULE_OPTIONS, ASYNC_SECRETS } from './secret-manager.constants';
import { ModuleOptions } from './types';
import { SecretLoaderService } from './_secret-loader.service';

@Global()
@Module({})
export class SecretManagerModule {
    static forRoot(options: ModuleOptions): DynamicModule {
        return SecretManagerModule.forRootAsync({ useValue: options });
    }
    static forRootAsync(asyncOptions: ModuleAsyncOptions<ModuleOptions>): DynamicModule {
        const publicProviders = [
            {
                inject: [MODULE_OPTIONS],
                provide: CLIENT_INSTANCE,
                useFactory: (moduleOptions: ModuleOptions) => new secretManager.SecretManagerServiceClient(moduleOptions),
            },
            SecretManagerService
        ]
        return {
            module: SecretManagerModule,
            global: true,
            providers: [
                {
                    provide: MODULE_OPTIONS,
                    ...asyncOptions,
                },
                SecretLoaderService,
                {
                    inject: [SecretLoaderService],
                    useFactory: async (storage: SecretLoaderService) => await storage.getAllLatestSecrets(),
                    provide: ASYNC_SECRETS
                },
                ...publicProviders,
            ],
            exports: [...publicProviders]
        }
    }
}