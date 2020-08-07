export class ServerError extends Error {
    constructor() {
        super('Internal server rrror')
        this.name = 'ServerError'
    }
}