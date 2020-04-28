import { UserState } from '../redux/modules/user/reducer';

const TOKEN_EXPIRY_SECONDS = process.env.TOKEN_EXPIRY || `86400`;
const STATE_STORAGE_KEY = 'stateStore';

interface StateStorage {
  state: UserState;
  expiryDate: number;
}

export const saveUserState = (state: UserState) => {
  try {
    if (!state.token) {
      return;
    }
    const serializedState = loadUserState();
    if (serializedState) {
      return;
    }

    const expiryDate = new Date(Date.now()).setSeconds(parseInt(TOKEN_EXPIRY_SECONDS));
    const stateStorage: StateStorage = {
      state,
      expiryDate,
    };
    localStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(stateStorage));
  } catch (err) {
    console.error('error saving to local storage', err);
  }
};

export const loadUserState = (): UserState => {
  try {
    const now = new Date(Date.now());

    const serializedSate = localStorage.getItem(STATE_STORAGE_KEY);
    if (!serializedSate) {
      return undefined;
    }

    const stateStorage: StateStorage = JSON.parse(serializedSate);

    if (now >= new Date(stateStorage.expiryDate)) {
      return undefined;
    }

    return stateStorage.state;
  } catch (err) {
    return undefined;
  }
};
