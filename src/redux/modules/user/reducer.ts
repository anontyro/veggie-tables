import { UserActions } from './actions';
import { SET_USER, RESET_USER } from './consts';

export interface UserState {
  username: string | null;
  token: string | null;
}

export const INITIAl_STATE: UserState = {
  username: null,
  token: null,
};

const user = (state: UserState = INITIAl_STATE, action: UserActions) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_USER:
      return {
        ...INITIAl_STATE,
      };
    default:
      return state;
  }
};

export default user;

export const getBearerHeader = (state: UserState) => ({
  Authorization: `Bearer ${state?.token}`,
});
