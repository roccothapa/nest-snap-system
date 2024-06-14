import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigAppModule } from 'src/config/config-app.module';
import { DatabaseModule } from './database/database.module';
import { SnapSystemModule } from '@snapSystem/snap-system.module';
import { CommonModule } from '@common/common.module';
import { AppModulesModule } from '@appModules/app-modules.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import process from 'process';
import { TrimStringsMiddleware } from './middleware/trim-strings.middleware';

@Module({
  imports: [
    SnapSystemModule,
    ConfigAppModule,
    DatabaseModule,
    CommonModule,
    AppModulesModule,
    EventEmitterModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, process.env.SERVE_STATIC_ROOT_PATH, ''),
      renderPath: process.env.SERVE_STATIC_RENDER_PATH,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TrimStringsMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
