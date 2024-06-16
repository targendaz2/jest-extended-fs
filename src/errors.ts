export class ValueError extends Error {
    constructor(message?: string, options?: ErrorOptions) {
        super(message, options);
        this.name = 'ValueError';
    }
}
