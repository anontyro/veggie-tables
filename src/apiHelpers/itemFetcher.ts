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
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...extraHeaders,
      },
      body: JSON.stringify(body),
    });

    const json = await response.json();
    onFetched();
    return json;
  } catch (err) {
    console.error(err);
  }
};

export default itemFetcher;
