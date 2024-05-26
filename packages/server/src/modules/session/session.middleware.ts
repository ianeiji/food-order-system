import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import * as session from 'express-session';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(private readonly config: ConfigService) {}
  use(req: Request, res: Response, next: NextFunction) {
    session({
      secret: this.config.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }, // HTTPSを使用している場合はtrueに設定
    })(req, res, next);
  }
}
