import HTTP_VERB from '../enum/http';

interface ItemFetcher {
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
        'Content-Type': 'application/json',
        ...extraHeaders,
      },
      body: JSON.stringify(body),
    };

    if (HTTP_VERB.GET) {
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
