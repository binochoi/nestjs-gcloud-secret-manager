import { SecretManagerClient } from './types/index';
import { Inject } from '@nestjs/common/decorators';
import { CLIENT_INSTANCE, SECRETS_PARENT } from './secret-manager.constants';
import { Injectable } from '@nestjs/common';
@Injectable()
export class SecretManagerService {
    private readonly _secrets: Map<string, string> = new Map()
    constructor(
        @Inject(CLIENT_INSTANCE) private readonly client: SecretManagerClient,
        @Inject(SECRETS_PARENT) private readonly parent: string
    ) {}
    async getSecret(secretName: string, version: 'latest' | number = 'latest') {
        const secretCache = this._secrets.get(secretName);
        if(secretCache) {
            return secretCache;
        }
        const secretFullName = `projects/${this.parent}/secrets/${secretName}/versions/${version}`;
        const [ secret ] = await this.client.accessSecretVersion({ name: secretFullName });
        
        const secretValue = secret.payload?.data?.toString();
        if(secretValue) {
            this._secrets.set(secretName, secretValue);
        }
        return secretValue;
    }
}