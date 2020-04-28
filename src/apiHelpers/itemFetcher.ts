import HTTP_VERB from '../enum/http';

export const defaultHeaders = {
  'Content-Type': 'application/json',
};

export const COMMON_HEADERS = {
  FORM_DATA: { 'Content-Type': 'multipart/form-data' },
};

export interface ItemFetcher {
  url: string;
  method?: HTTP_VERB;
  body?: {};
  extraHeaders?: {};
  onFetched?: () => void;
}

const itemFetcher = async ({
  url,
  method = HTTP_VERB.GET,
  body = {},
  extraHeaders = {},
  onFetched = () => {},
}: ItemFetcher) => {
  try {
    const options = {
      method,
      headers: {
        ...defaultHeaders,
        ...extraHeaders,
      },
      body: JSON.stringify(body),
    };

    if (method === HTTP_VERB.GET) {
      delete options.body;
    }

    const response = await fetch(url, options);

    const json = await response.json();
    onFetched();
    return json;
  } catch (err) {
    console.error(err);
  }
};

export default itemFetcher;
