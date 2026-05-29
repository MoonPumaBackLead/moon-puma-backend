import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MatchesField } from './match.decorator';

export class RegisterDto {
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  @Matches(/^[0-9A-Za-z_-]+$/, {
    message: 'username may only contain letters, digits, _ and -',
  })
  username!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(
    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[0-9A-Za-z!"#$%&'()*+,\-./:;<=>?@[\\\]^_{|}~]+$/,
    {
      message:
        'password must contain at least one digit, one uppercase and one lowercase letter',
    },
  )
  password!: string;

  @IsString()
  @MatchesField('password')
  passwordConfirmation!: string;
}
