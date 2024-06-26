export const TOKEN_NAME = "biz_token";

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface updateUserData {
  firstName: string;
  lastName: string;
  password: string;
}

export interface LogInData {
  email: string;
  password?: string;
}

export interface ResetPasswordData {
  password: string;
  confirmPassword: string;
}

export interface SignUpResponse extends BaseResponseMessage {
  data: {
    token: string;
  };
}

export interface UserDetailsResponse extends BaseResponseMessage {
  data: {
    userDetails: {
      uuid: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
      verified: boolean;
    };
  };
}

export interface UserDetails {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  verified: boolean;
}

export interface LogInResponse extends BaseResponseMessage {
  data: {
    token: string;
  };
}

export interface BaseResponseMessage {
  success: boolean | null;
  message: BaseMessage;
  data: object | null;
}

export interface BaseMessage {
  code: number | null;
  desc: string | null;
}

export interface JwtPayload {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "CUSTOMER" | "BUSINESS";
  verified: Boolean;
  iat?: number;
  exp?: number;
}
