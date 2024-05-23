import { User as CustomUser } from '@prisma/client';

// Express の Request インターフェースを拡張して、リクエストオブジェクトに user プロパティを追加
declare global {
  namespace Express {
    export interface Request {
      user: CustomUser;
    }
  }
}
