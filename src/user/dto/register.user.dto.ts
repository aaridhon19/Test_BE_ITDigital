import { IsString, IsEmail, IsEnum } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(['customer', 'seller'])
  role: 'customer' | 'seller';
}
