import { ModuleOptions, SecretManagerClient } from './types/index';
import { Inject } from '@nestjs/common/decorators';
import { CLIENT_INSTANCE, MODULE_OPTIONS } from './secret-manager.constants';
import { Injectable } from '@nestjs/common';
@Injectable()
export class SecretLoaderService {
    constructor(
        @Inject(CLIENT_INSTANCE) private readonly client: SecretManagerClient,
        @Inject(MODULE_OPTIONS) private readonly config: ModuleOptions
    ) {}
    async getAllLatestSecrets() {
        const _secrets: Map<string, string> = new Map();
        const [secrets] = await this.client.listSecrets({
            parent: 'projects/' + this.config.projectId,
        });
        await Promise.all(
            secrets
                .map(({ name }) => name?.split('/').slice(-1)[0])
                .filter((name): name is string => name !== undefined)
                .map(async (name) => {
                    const secret = await this.getSecret(name);
                    if(secret) {
                        return _secrets.set(name, secret);
                    }
                })
        )
        return _secrets;
    }
    /**
     * @param secretName
     *  `project/projectName/secrets/${secretName}/versions/version`
     * @param version
     *  `project/projectName/secrets/secretName/versions/${version}`
     */
    private async getSecret(secretName: string, version: 'latest' | number = 'latest') {
        const secretFullName = `projects/${this.config.projectId}/secrets/${secretName}/versions/${version}`;
        const [ secret ] = await this.client.accessSecretVersion({ name: secretFullName });
        
        const secretValue = secret.payload?.data?.toString();
        if(secretValue === undefined) {
            throw new Error('there is empty secret.');
        }
        return secretValue;
    }
}