const SSTOOR_GRAPHQL_SERVICE_URL =
  "https://eb1yr4ltf4.execute-api.us-west-2.amazonaws.com/graphql";
const SSTOOR_GRAPHQL_SERVICE_HTTP_REQUEST_METHOD = "POST";
const SSTOOR_GRAPHQL_SERVICE_HTTP_REQUEST_HEADERS = {
  "Content-Type": "application/json",
};

export type RequestBodyParams = {
  url: string;
  params: {
    method: "POST";
    headers: any;
    body?: string;
  };
};

export function generateGraphQlRequestBody({
  query,
  headers,
  input,
}: {
  query: string;
  headers?: Record<string, string>;
  input?: any;
}): RequestBodyParams {
  return {
    url: SSTOOR_GRAPHQL_SERVICE_URL,
    params: {
      method: SSTOOR_GRAPHQL_SERVICE_HTTP_REQUEST_METHOD,
      headers: {
        ...SSTOOR_GRAPHQL_SERVICE_HTTP_REQUEST_HEADERS,
        ...headers,
      },
      body: JSON.stringify({
        query,
        ...(input !== undefined ? { variables: { input } } : {}),
      }),
    },
  };
}
