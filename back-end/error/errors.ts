export class ClassesError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ClassesError';
    }
}

export class ForbiddenError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ForbiddenError';
    }
}