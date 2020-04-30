import React from 'react';
import Modal from 'react-modal';
import { defaultButton, defaultButtonLayout, cancelButton } from '../Buttons/btnStyles';
import DefaultLoader from '../Loaders/DefaultLoader';
import { EMPTY_FUNCTION } from '../Base/defaults';

const onClickEvent = (...funcArgs: Function[]) => (event: React.MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();
  for (const func of funcArgs) {
    func(event);
  }
};

interface Props {
  isOpen: boolean;
  children: React.ReactChild;
  headerText?: string;
  onRequestClose: () => any;
  onConfirm?: (e: any) => any;
  onCancel?: (e: any) => any;
  isLoading?: boolean;
}

const ModalBase: React.FC<Props> = ({
  isOpen,
  onRequestClose,
  children,
  headerText = 'Veggie Tables',
  onCancel = EMPTY_FUNCTION,
  isLoading = false,
  onConfirm,
}) => {
  const modalOnRequestClose = isLoading ? EMPTY_FUNCTION : onRequestClose;
  const onClickConfirm = onClickEvent(onConfirm);
  const onClickCancel = onClickEvent(onCancel, onRequestClose);

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={modalOnRequestClose}
      style={{
        content: {
          zIndex: 5001,
          padding: '0',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          width: '70%',
          maxWidth: '44rem',
          transform: 'translate(-50%, -50%)',
          borderRadius: '5px',
          borderColor: 'black',
          backgroundColor: 'whitesmoke',
          boxShadow: `rgba(0, 0, 0, 0.58) 0px 0px 10px 0px`,
          display: 'flex',
          flexDirection: 'column',
        },
        overlay: {
          zIndex: 5000,
          backgroundColor: 'rgba(0, 0, 0, 0.64)',
        },
      }}
    >
      <div className="modal-header p-2 text-center border-b bg-indigo-100">{headerText}</div>
      <div className="modal-body m-4">
        <div className="modal-text my-4">{children}</div>
        {isLoading ? (
          <DefaultLoader />
        ) : (
          <div className={`${defaultButtonLayout}`}>
            {onConfirm && (
              <button className={defaultButton} onClick={onClickConfirm}>
                Confirm
              </button>
            )}
            <button className={cancelButton} onClick={onClickCancel}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalBase;
