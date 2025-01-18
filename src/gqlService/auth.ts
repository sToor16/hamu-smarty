import { generateGraphQlRequestBody, RequestBodyParams } from "./util";

type LoginInput = {
  username: string;
  password: string;
};

export function getLoginUserGql(input: LoginInput): RequestBodyParams {
  const query = `
    mutation($input: LoginInput!) {
      login(input: $input) {
        token
      }
    }
  `;

  return generateGraphQlRequestBody({ query, input });
}

export function getVerifyTokenGql(token: string): RequestBodyParams {
  const query = `
    query Query {
      verifyToken
    }
  `;

  return generateGraphQlRequestBody({
    query,
    headers: { authorization: token },
  });
}
