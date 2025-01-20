import { GetHamuSmartyS3AssetsUrlsInput } from "@sstoor/ts-commons";
import { generateGraphQlRequestBody, RequestBodyParams } from "./util";

export function getPageAssetsS3Urls(
  input: GetHamuSmartyS3AssetsUrlsInput,
  token: string,
): RequestBodyParams {
  const query = `
    query($input: GetHamuSmartyS3AssetsUrls!) {
      getHamuSmartyS3AssetsUrls(input: $input)
    }
  `;

  return generateGraphQlRequestBody({
    query,
    input,
    headers: { authorization: token },
  });
}
