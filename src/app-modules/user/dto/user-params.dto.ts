import { QueryParamsDto } from '@snapSystem/base-entity/dto/query-params.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserParamsDto extends QueryParamsDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly email: string;
}
