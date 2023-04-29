import { Inject } from '@nestjs/common/decorators';
import { ASYNC_SECRETS } from './secret-manager.constants';
import { Injectable } from '@nestjs/common';
import { CustomError } from './common/custom-error';

@Injectable()
export class SecretManagerService {
    constructor(
        @Inject(ASYNC_SECRETS) private readonly _secrets: Map<string, string>,
    ) {}
    get(secretName: string) {
        const secret = this._secrets.get(secretName);
        if(secret === undefined) {
            throw new CustomError(`secret name ${secretName} is not been called`);
        }
        return secret;
    }
}