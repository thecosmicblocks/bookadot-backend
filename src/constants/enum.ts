export enum Environment {
  local = 'local',
  production = 'production',
  dev = 'dev',
  test = 'test',
}

export enum CHAIN_TYPE {
  EVM = 'EVM',
  SOLANA = 'SOLANA',
}

export enum MOVIE_FORMAT {
  IMAX = 'IMAX',
  THREE_D = '3D',
  TWO_D = '2D',
  LASER = 'LASER',
}

export const TICKET_PRICE = {
  ADULT: [3200, 3500, 3900, 3400],
  CHILD: [500, 700, 900, 990],
  STUDENT: [1200, 1500, 1600, 1800],
  VIP: [4000, 4300, 4700, 4900],
};

export enum TICKET_STATUS {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  SOLD = 'SOLD',
}

export enum AGE_GROUP {
  ADULT = 'Adult',
  CHILD = 'Child',
  STUDENT = 'Student',
  VIP = 'VIP',
}

export enum PAYMENT_STATUS {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}
