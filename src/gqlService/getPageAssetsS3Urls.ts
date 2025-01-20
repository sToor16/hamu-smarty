import {
  GetHamuSmartyS3AssetsUrlsInput,
  HamuSmartyS3Assets,
} from "@sstoor/ts-commons";
import Cookies from "js-cookie";
import { generateGraphQlRequestBody } from "./util";

export async function getPageAssetsS3Urls({
  input,
}: {
  input: GetHamuSmartyS3AssetsUrlsInput;
}): Promise<HamuSmartyS3Assets> {
  const token = Cookies.get("auth_token");
  if (!token) {
    throw new Error("Token not present");
  }

  const query = `
    query($input: GetHamuSmartyS3AssetsUrls!) {
      getHamuSmartyS3AssetsUrls(input: $input) {
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
      getHamuSmartyS3AssetsUrls: {
        images: string[];
        videos: string[];
      };
    };
    errors: any;
  };

  if (errors) {
    throw new Error("Error fetching s3 assets urls");
  }

  return data.getHamuSmartyS3AssetsUrls;
}
