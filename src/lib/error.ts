//! Don't change this, NextAuth doesn't export this type so we need to define it here
export const nextAuthErrorTypes = [
  "AccessDenied",
  "AdapterError",
  "CallbackRouteError",
  "ErrorPageLoop",
  "EventError",
  "InvalidCallbackUrl",
  "CredentialsSignin",
  "InvalidEndpoints",
  "InvalidCheck",
  "JWTSessionError",
  "MissingAdapter",
  "MissingAdapterMethods",
  "MissingAuthorize",
  "MissingSecret",
  "OAuthAccountNotLinked",
  "OAuthCallbackError",
  "OAuthProfileParseError",
  "SessionTokenError",
  "OAuthSignInError",
  "EmailSignInError",
  "SignOutError",
  "UnknownAction",
  "UnsupportedStrategy",
  "InvalidProvider",
  "UntrustedHost",
  "Verification",
  "MissingCSRF",
  "AccountNotLinked",
  "DuplicateConditionalUI",
  "MissingWebAuthnAutocomplete",
  "WebAuthnVerificationError",
  "ExperimentalFeatureNotEnabled",
] as const;
export type NextAuthErrorType = (typeof nextAuthErrorTypes)[number];

//! NextAuth doesn't support to extend ErrorTypes so do this workaroung to use CAUSE as ErrorType as well
export type CustomErrorType =
  | "EmailVerificationError"
  | "UserNotFoundError"
  | "UnknownError"
  | "InvalidOrExpiredToken";
type PrismaErrorType = "P2002";

export type ErrorType = NextAuthErrorType | CustomErrorType | PrismaErrorType;
