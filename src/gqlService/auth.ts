import Cookies from "js-cookie";
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

export async function isTokenValid(): Promise<boolean> {
  const token = Cookies.get("auth_token");
  if (!token) {
    return false;
  }

  const query = `
    query Query {
      verifyToken
    }
  `;

  const requestOptions = generateGraphQlRequestBody({
    query,
    headers: { authorization: token },
  });
  const response = await fetch(requestOptions.url, requestOptions.params);
  const { data, errors } = (await response.json()) as {
    data: {
      verifyToken: boolean;
    };
    errors: any;
  };

  if (errors) {
    console.error("Error verifying token:", errors);
    return false;
  }

  return data.verifyToken;
}
