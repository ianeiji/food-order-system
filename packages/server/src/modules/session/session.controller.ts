import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { SessionService } from './session.service';
import { Request, Response } from 'express';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('init')
  initializeSession(
    @Req() req: Request,
    @Res() res: Response,
    @Query('tenantId') tenantId: number,
    @Query('storeId') storeId: number,
    @Query('tableNumber') tableNumber: number,
  ) {
    const sessionId = req.cookies['sessionId'];

    this.sessionService.createSession(
      sessionId,
      tenantId,
      storeId,
      tableNumber,
    );

    res.send({
      message: 'Session initialized',
      sessionId,
      tenantId,
      storeId,
      tableNumber,
    });
  }
}
