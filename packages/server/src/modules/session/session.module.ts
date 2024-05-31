import { Module, Scope } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';

@Module({
  providers: [
    {
      provide: SessionService,
      useClass: SessionService,
      scope: Scope.DEFAULT,
    },
  ],
  controllers: [SessionController],
  exports: [SessionService],
})
export class SessionModule {}
