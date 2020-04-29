import { ModalActions } from './actions';
import { SHOW_MODAL, HIDE_MODAL } from './consts';

export interface ModalState {
  modalType: string | null;
  show: boolean;
}

export const INITAL_STATE: ModalState = {
  modalType: null,
  show: false,
};

const modal = (state: ModalState = INITAL_STATE, action: ModalActions): ModalState => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        modalType: action.payload,
        show: true,
      };
    case HIDE_MODAL:
      return {
        ...INITAL_STATE,
      };
    default:
      return state;
  }
};

export default modal;
