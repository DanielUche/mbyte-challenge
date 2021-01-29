

export class BadRequestException extends Error {
  public statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 400;
    this.message = message || 'Field Validation error';
  }
}

export class NotFoundException extends Error {
  public statusCode: number;
  constructor(msg: string | null = null) {
    super();
    this.statusCode = 404;
    this.message = msg || 'The resource you are looking for was not found.';
  }
}

class RecordExistException extends Error {
  public statusCode: number;
  constructor(msg: string | null = null) {
    super();
    this.statusCode = 400;
    this.message = msg || 'Record already exist';
  }
}

export class InternalServerException extends Error {
  public statusCode: number;
  constructor(message: string) {
    super();
    this.statusCode = 500;
    this.message = message;
  }
}
