import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as cookieParser from 'cookie-parser';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // クッキーパーサーを使用してクッキーを解析
    cookieParser()(req, res, () => {
      // クッキーからセッションIDを取得
      let sessionId = req.cookies['sessionId'];
      // セッションIDが存在しない場合、新しいセッションIDを生成
      if (!sessionId) {
        sessionId = uuidv4();
        // セッションIDをクッキーに保存
        res.cookie('sessionId', sessionId, { httpOnly: true });
      }
      // リクエストオブジェクトにセッションIDを追加
      req.sessionId = sessionId;
      // 次のミドルウェアまたはルートハンドラへ
      next();
    });
  }
}
