import { SHOW_MODAL, HIDE_MODAL } from './consts';
import { EMPTY_FUNCTION } from '../../../components/Base/defaults';
import { ThunkDispatch } from 'redux-thunk';

interface ShowModal {
  type: SHOW_MODAL;
  payload: string;
}

interface HideModal {
  type: HIDE_MODAL;
}

export type ModalActions = ShowModal | HideModal;

export const showModal = ({ modalType }: { modalType: string }): ShowModal => ({
  type: SHOW_MODAL,
  payload: modalType,
});

const hideModal = (): HideModal => ({
  type: HIDE_MODAL,
});

export const onCloseModal = ({ modalType, onClose = EMPTY_FUNCTION }) => {
  return (dispatch: ThunkDispatch<unknown, undefined, ModalActions>) => {
    dispatch(hideModal());
    onClose();
  };
};
