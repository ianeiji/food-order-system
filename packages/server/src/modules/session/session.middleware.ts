import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(private readonly config: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    cookieParser()(req, res, () => {
      session({
        secret: this.config.get('SESSION_SECRET'),
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // HTTPSを使用している場合はtrueに設定
      })(req, res, () => {
        if (!req.cookies['sessionId']) {
          res.cookie('sessionId', req.sessionID);
        }
        next();
      });
    });
  }
}
