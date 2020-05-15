import { IUser } from './authUtil';
import { createNewToken, validateToken, isValidJWTFormat } from './authUtil';

const mockUser: IUser = {
  id: 1234,
  email: 'alex@gmail.com',
  firstName: 'alex',
  lastName: 'wilkinson',
  isActive: true,
  password: 'test123',
};

describe('authUtil JWT', () => {
  test('can create a valid token', () => {
    const token = createNewToken(mockUser);
    expect(token).toBeTruthy();

    const validToken = validateToken(token);
    expect(validToken).toBeTruthy();

    const invalidToken = validateToken('');
    expect(invalidToken).toBeFalsy();
  });

  test('token is a valid JWT type', () => {
    const token = createNewToken(mockUser);
    const isValid = isValidJWTFormat(token);

    expect(isValid).toBeTruthy();
  });

  test('token will contain correct values', () => {
    const token = validateToken(createNewToken(mockUser));

    if (!token) {
      expect(token).toBeFalsy();
      expect(token).toThrowError(new TypeError());
      return;
    }

    expect(token.email).toBe(mockUser.email);
    expect(token.id).toBe(mockUser.id);
  });
});
