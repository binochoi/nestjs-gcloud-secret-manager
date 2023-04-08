import { Global, Module, DynamicModule } from '@nestjs/common';
import { v1 as secretManager } from "@google-cloud/secret-manager";
import { SecretManagerService } from './secret-manager.service';
import { CLIENT_INSTANCE, SECRETS_PARENT } from './secret-manager.constants';
import { RootOption } from './types';

@Global()
@Module({
    providers: [SecretManagerService],
    exports: [SecretManagerService],
})
export class SecretManagerModule {
    static forRoot(options: RootOption): DynamicModule {
        const client = new secretManager.SecretManagerServiceClient(options);
        return {
            module: SecretManagerModule,
            providers: [
                {
                    provide: CLIENT_INSTANCE,
                    useValue: client,
                },
                {
                    provide: SECRETS_PARENT,
                    useValue: options.parent
                }
            ]
        }
    }
}