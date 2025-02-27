export class LoginModel {
    constructor(
      public Username: string = '',
      public Password: string = '',
      public ErrorMessage: string = ''
    ) {}
  }