import { sendHttpResponse } from './responseUtil';
import { BAD_REQUEST } from 'http-status-codes';
const createMockResponse = () => {
  const mockResponse = {
    output: {
      status: 200,
      data: {},
    },
    status: function(code = 400) {
      this.output.status = code;
      return this;
    },
    json: function(data = {}) {
      this.output.data = data;
      return this;
    },
  };

  return mockResponse;
};
describe('responseUtil', () => {
  test('sendHttpResponse will always have an error and response object', () => {
    const res: any = createMockResponse();
    sendHttpResponse({ res });

    expect(res.output.status).toBe(200);
    expect(res.output.data).toStrictEqual({ error: {}, response: {} });
  });

  test('sendHttpResponse will serilize a bad request correctly', () => {
    const res: any = createMockResponse();
    const error = {
      errorCode: BAD_REQUEST,
      message: 'An error occured',
    };
    sendHttpResponse({
      res,
      statusCode: BAD_REQUEST,
      error,
    });

    expect(res.output.status).toBe(BAD_REQUEST);
    expect(res.output.data.error).toStrictEqual(error);
  });
});
