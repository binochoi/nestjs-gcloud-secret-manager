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
        /**
         * it will set latest secrets to dotenv file
         * if u want to use with other config modules
         */
        setEnvAuto: true,
        envFilePath: '.env', // default
        /**
         * secrets to loaded and writed to env file
         */
        secrets: ['FIRST_SECRET', 'SECOND_SECRET:latest'],
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
        await this.secretManagerService.get(SECRET_NAME);
    }
    async createSecret() {
        await this.secretManagerService.create(SECRET_NAME);
    }
}
```