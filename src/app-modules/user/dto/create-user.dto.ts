import { BaseDto } from '@snapSystem/base-entity/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateUserDto extends BaseDto {
  @ApiProperty({
    description: 'The First Name of the User',
    example: 'Jhon',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  firstName: string;

  @ApiProperty({
    description: 'The last name of the User',
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  lastName: string;

  @ApiProperty({
    description: 'The First Name of the User',
    example: 'Jhon',
  })
  @IsString()
  @MaxLength(50)
  @IsOptional()
  middleName: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'Jhon.doe@doe.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'asd34gxc@#4cgvf7',
  })
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    description: 'The avatar of the user',
    example: 'http://locahost:3000/images/avatar.jpg',
  })
  @IsUrl({
    protocols: ['http', 'https'],
    allow_underscores: true,
  })
  @MaxLength(250)
  @IsNotEmpty()
  avatar: string;

  @ApiProperty({
    description: 'status',
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
