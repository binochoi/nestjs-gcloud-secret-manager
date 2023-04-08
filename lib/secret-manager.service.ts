import { SecretManagerClient } from './types/index';
import { Inject } from '@nestjs/common/decorators';
import { CLIENT_INSTANCE, SECRETS_PARENT } from './secret-manager.constants';

const _secrets: Map<string, string> = new Map();
export class SecretManagerService {
    constructor(
        @Inject(CLIENT_INSTANCE) private readonly client: SecretManagerClient,
        @Inject(SECRETS_PARENT) private readonly parent: string
    ) {}
    async getSecret(secretName: string) {
        const secretCache = _secrets.get(secretName);
        if(secretCache) {
            return secretCache;
        }
        const secretFullName = `projects/${this.parent}/secrets/${secretName}/versions/` + 'latest';
        const [ secret ] = await this.client.accessSecretVersion({ name: secretFullName });
        
        const secretValue = secret.payload?.data?.toString();
        if(secretValue === undefined) {
            return secretValue;
        }
        _secrets.set(secretName, secretValue);
        return secretValue;
    }
}