import React, { useState, useEffect } from 'react';
import { MainHeader } from '../../components/Headers/MainHeader';
import { defaultButton } from '../../components/Buttons/btnStyles';
import { AUTH_ROUTES, FRONTEND_ROUTES } from '../../enum/routes';
import * as userActions from '../../redux/modules/user/actions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

interface LoginForm {
  email: string;
  password: string;
}

const defaultUser: LoginForm = {
  email: '',
  password: '',
};

interface Props {}
const AdminLogin: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userLogin, setUserLogin] = useState(defaultUser);
  const [failedLogin, setFailedLogin] = useState(false);

  useEffect(() => {
    const loginUser = async () => {
      try {
        const response = await fetch(AUTH_ROUTES.LOGIN, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // query: `{ Login(password: "${userLogin.password}", email:"${userLogin.email}")}`,
            email: userLogin.email,
            password: userLogin.password,
          }),
        });
        const json = await response.json();

        if (response.status !== 200) {
          setFailedLogin(true);
          setIsSubmitted(false);
        } else {
          const login: string = json.token;
          dispatch(
            userActions.addUser({
              username: userLogin.email,
              token: login,
            })
          );
          history.push(FRONTEND_ROUTES.ADMIN.ITEM_LIST);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (userLogin.email.length > 0 && userLogin.password.length > 0 && isSubmitted) {
      loginUser();
    } else {
      setIsSubmitted(false);
    }
  }, [isSubmitted]);

  return (
    <React.Fragment>
      <MainHeader text="Veggie Tables Admin Login" />
      <div className="w-full my-4">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 sm:max-w-xs m-auto">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              email
            </label>
            <input
              disabled={isSubmitted}
              value={userLogin.email}
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                setUserLogin({
                  ...userLogin,
                  email: event.currentTarget.value,
                });
              }}
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              disabled={isSubmitted}
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                setUserLogin({
                  ...userLogin,
                  password: event.currentTarget.value,
                });
              }}
            />
            {failedLogin && (
              <p className="text-red-500 text-xs italic">Wrong login detail provided</p>
            )}
          </div>
          {isSubmitted ? (
            <div>Loading...</div>
          ) : (
            <button
              onClick={(event: React.MouseEvent) => {
                event.preventDefault();
                if (userLogin.email.length > 0 && userLogin.password.length > 0) {
                  setIsSubmitted(true);
                }
              }}
              className={defaultButton}
              type="submit"
            >
              Sign In
            </button>
          )}
        </form>
      </div>
    </React.Fragment>
  );
};

export default AdminLogin;
