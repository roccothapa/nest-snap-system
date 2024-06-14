import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ClassSerializerInterceptor,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseEntitySerializer } from '@snapSystem/base-entity/serializer/base-entity.serializer';
import { generateHash } from '@snapSystem/helpers/helpers';
import { ApiTags } from '@nestjs/swagger';
import { PageResultDto } from '@snapSystem/base-entity/dto/page-result.dto';
import { UserParamsDto } from '@appModules/user/dto/user-params.dto';

@Controller('/api/users')
@ApiTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<BaseEntitySerializer> {
    createUserDto.password = await generateHash(createUserDto.password);

    return this.userService.create(createUserDto);
  }

  @Get()
  public async findAll(
    @Query() query: UserParamsDto,
  ): Promise<
    void | BaseEntitySerializer[] | PageResultDto<BaseEntitySerializer>
  > {
    return this.userService.findAll(query);
  }

  @Get(':user_id')
  public async findOne(
    @Param('user_id') id: string,
  ): Promise<BaseEntitySerializer> {
    return this.userService.findOrFail(+id);
  }

  @Put(':user_id')
  public async update(
    @Param('user_id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':user_id')
  public async remove(@Param('user_id') id: string) {
    return this.userService.remove(+id);
  }
}
