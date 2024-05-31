import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionService {
  private static sessions = new Map<
    string,
    { tenantId: number; storeId: number; tableNumber: number }
  >();

  createSession(
    sessionId: string,
    tenantId: number,
    storeId: number,
    tableNumber: number,
  ) {
    SessionService.sessions.set(sessionId, { tenantId, storeId, tableNumber });
  }

  getSession(sessionId: string) {
    return SessionService.sessions.get(sessionId);
  }
}
