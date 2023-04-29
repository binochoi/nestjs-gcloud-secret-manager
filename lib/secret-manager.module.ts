import { ModuleAsyncOptions } from './types/index';
import { Global, Module, DynamicModule } from '@nestjs/common';
import { v1 as secretManager } from "@google-cloud/secret-manager";
import { SecretManagerService } from './secret-manager.service';
import { CLIENT_INSTANCE, MODULE_OPTIONS, SECRETS_PARENT } from './secret-manager.constants';
import { ModuleOptions } from './types';

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
                {
                    inject: [MODULE_OPTIONS],
                    provide: SECRETS_PARENT,
                    useFactory: ({ parent }: ModuleOptions) => parent,
                },
                ...publicProviders,
                {
                    inject: [SecretManagerService],
                    useFactory: async (secretManagerService: SecretManagerService) => {
                        await secretManagerService.getAllLatestSecrets();
                    },
                    provide: 'init'
                }
            ],
            exports: [...publicProviders]
        }
    }
}