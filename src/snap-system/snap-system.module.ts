import { Module } from '@nestjs/common';
import { ValidatorModule } from '@snapSystem/validators/validator.module';

@Module({
  providers: [],
  imports: [
    ValidatorModule,
  ],
})
export class SnapSystemModule {
}
