# Summary
Google Cloud Secret Manager module for Nest.js
# Installation
```bash
$ yarn add nestjs-gcloud-secret-manager
```
# Examples
## Setup
```typescript
import { Module } from '@nestjs/common';
import { SecretManagerModule } from 'nestjs-gcloud-secret-manager';

@Module({
  imports: [
    /**
     * secrets are loaded to `SecretManagerService` when SecretManagerModule bootstrapped
     */
    SecretManagerModule.forRoot({
      parent,
      credentials
    })
  ],
})
export class AppModule {}
```
## using secret manager service
```typescript
import { Injectable } from '@nestjs/common';
import { SecretManagerService } from 'nestjs-gcloud-secret-manager';

@Injectable()
export class AppService {
    constructor(private readonly secretManagerService: SecretManagerService) {}
    async getSecret() {
        this.secretManagerService.get(SECRET_NAME);
    }
}
```
## using secret manager client
Functions such as creation have not yet been implemented.
If you want to extend the functionality, use client as it is.
```typescript
import { Inject } from '@nestjs/common';
import { CLIENT_INSTANCE, SecretManagerClient } from 'nestjs-gcloud-secret-manager';

export class AppService {
  constructor(@Inject(CLIENT_INSTANCE) private readonly client: SecretManagerClient) {}
}
```
