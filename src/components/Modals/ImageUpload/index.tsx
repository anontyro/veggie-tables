import React from 'react';
import ModalBase from '../Base';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux';
import * as modalActions from '../../../redux/modules/modal/actions';

export const modalType = 'IMAGE_UPLOAD_MODAL';
const HEADER_TEXT = 'Stock Image Upload';

interface Props {}

const ImageUpload: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const { modal }: RootState = useSelector((state: RootState) => state);
  const onClose = () => {
    dispatch(modalActions.onCloseModal({ modalType }));
  };

  return (
    <ModalBase
      isOpen={modal.modalType === modalType}
      headerText={HEADER_TEXT}
      onRequestClose={onClose}
      onCancel={onClose}
    >
      <div>image modal</div>
    </ModalBase>
  );
};

export default ImageUpload;
