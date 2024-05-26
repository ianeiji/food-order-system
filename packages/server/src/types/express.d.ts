import 'express';

// expressのRequesオブジェクトを拡張し、sessionIdを追加する
declare module 'express' {
  export interface Request {
    sessionId?: string;
  }
}
