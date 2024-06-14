import { Module } from '@nestjs/common';
import { ModelExistsConstraint } from '@snapSystem/validators/model-exits.validator';
import { UniqueConstraint } from '@snapSystem/validators/unique.validator';

@Module({
  providers: [
    ModelExistsConstraint,
    UniqueConstraint,
  ],
})
export class ValidatorModule {
}
