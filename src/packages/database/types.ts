export type CreateUserT = {
  email: string;
  password: string;
  name: string;
};

export type UpdatePasswordT = {
  email: string;
  password: string;
  token: string;
  identifier: string;
};

export type VerifyEmailVerificationTokenT = {
  identifier: string;
  token: string;
};

export type GoogleAccountDataT = {
  userId: string;
  provider: string;
  providerAccountId: string;
  type: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
};

export type NewUserDataT = {
  email: string;
  name?: string;
  image?: string | null;
};
