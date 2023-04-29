import { Inject } from '@nestjs/common/decorators';
import { ASYNC_SECRETS } from './secret-manager.constants';
import { Injectable } from '@nestjs/common';
@Injectable()
export class SecretManagerService {
    constructor(
        @Inject(ASYNC_SECRETS) private readonly _secrets: Map<string, string>,
    ) {}
    get(secretName: string) {
        return this._secrets.get(secretName) || '';
    }
}