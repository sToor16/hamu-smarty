import {
  GetHamuSmartyAssetsUrlsInput,
  HamuSmartyAssetsUrls,
} from "@sstoor/ts-commons";
import Cookies from "js-cookie";
import { generateGraphQlRequestBody } from "./util";

export async function getPageAssetsS3Urls({
  input,
}: {
  input: GetHamuSmartyAssetsUrlsInput;
}): Promise<HamuSmartyAssetsUrls> {
  const token = Cookies.get("auth_token");
  if (!token) {
    throw new Error("Token not present");
  }

  const query = `
    query GetHamuSmartyAssetsUrls($input: GetHamuSmartyAssetsUrlsInput!) {
      getHamuSmartyAssetsUrls(input: $input) {
        images
        videos
      }
    }
  `;

  const requestOptions = generateGraphQlRequestBody({
    query,
    input,
    headers: { authorization: token },
  });

  const response = await fetch(requestOptions.url, requestOptions.params);
  const { data, errors } = (await response.json()) as {
    data: {
      getHamuSmartyAssetsUrls: {
        images: string[];
        videos: string[];
      };
    };
    errors: any;
  };

  if (errors) {
    throw new Error("Error fetching s3 assets urls");
  }

  return data.getHamuSmartyAssetsUrls;
}
