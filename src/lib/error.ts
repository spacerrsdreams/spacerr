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

const ERRORS: Record<string, string> = {
  EmailVerificationError: "Email verification error",
  CredentialsSignin: "Invalid credentials",
  OAuthSignInError: "OAuth sign in error",
  P2002: "Email already exists",
  UserNotFoundError: "User not found",
  UnknownError: "Unknown error occurred",
  InvalidOrExpiredToken: "Invalid or expired token",
};

export const createZodError = (message: string) => {
  return ("ZodError: " + message) as unknown as ErrorType;
};

export const mapErrorToMessage = (type: ErrorType) => {
  if (type.includes("ZodError:")) {
    return type.replace("ZodError: ", "");
  }

  console.error("Error occured: ", type);
  return ERRORS[type] || "Unknown error occurred";
};
