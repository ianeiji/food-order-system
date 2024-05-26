import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionService {
  // セッションIDとテナントIDおよび店舗IDを関連付けるためのマップを定義
  private sessions = new Map<string, { tenantId: number; storeId: number }>();

  // 新しいセッションを作成し、セッションIDとテナントIDおよび店舗IDを関連付ける
  createSession(sessionId: string, tenantId: number, storeId: number) {
    this.sessions.set(sessionId, { tenantId, storeId });
  }

  // セッションIDに対応するテナントIDと店舗IDを取得
  getSession(sessionId: string) {
    return this.sessions.get(sessionId);
  }
}
