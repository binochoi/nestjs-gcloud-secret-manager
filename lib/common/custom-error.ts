export class CustomError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = 'nestjs-gcloud-secret-manager exception';
    }
}