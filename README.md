# Summary
Google Cloud Secret Manager module for Nest.js
# Installation
```bash
$ yarn add nestjs-secret-manager
```
# Example
## Setup
```typescript
import { Module } from '@nestjs/common';
import { SecretManagerModule } from 'nestjs-gcloud-secret-manager';

@Module({
  imports: [
    SecretManagerModule.forRoot({
      parent,
      credentials
    })
  ],
})
export class AppModule {}
```
## use case
```typescript
import { Injectable } from '@nestjs/common';
import { SecretManagerService } from 'nestjs-gcloud-secret-manager';

@Injectable()
export class AppService {
    constructor(private readonly secretManagerService: SecretManagerService) {}
    async getSecret() {
        await this.secretManagerService.getSecret(SECRET_NAME);
    }
}
```