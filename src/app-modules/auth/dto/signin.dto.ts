import { BaseDto } from '@snapSystem/base-entity/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SigninDto extends BaseDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'Jhon.doe@doe.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'abcdefghij',
  })
  @IsString()
  @MinLength(8)
  password: string;
}
