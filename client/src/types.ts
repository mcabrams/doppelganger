export interface Vote {
}
export interface User {
  name: string;
}

export type Link = {
  id: string;
  url: string;
  description: string;
  createdAt: Date;
  postedBy: User;
  votes: Vote[];
};

export interface SignupVariables {
  email: string;
  password: string;
  name: string;
}

export interface SignupResponse {
  signup: {
    token: string;
  }
}

export interface LoginVariables {
  email: string;
  password: string;
}

export interface LoginResponse {
  login: {
    token: string;
  }
}
