export interface IUser {
  id: string;
  identifier: string;
  groups: string[];
  disabled: string;
  createdAt: Date;
  lastSessionCreatedAt: Date;
  lastTokenRenewedAt: Date;
}
