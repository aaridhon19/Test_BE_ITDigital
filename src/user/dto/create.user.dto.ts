import { IsString, IsEmail, IsEnum, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(['admin', 'customer', 'seller'])
  role: 'admin' | 'customer' | 'seller';

  @IsBoolean()
  is_enabled?: boolean;
}
