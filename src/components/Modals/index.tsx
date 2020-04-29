import React from 'react';
import ImageUpload, { modalType as imageUploadModalType } from './ImageUpload/index';

export const modalTypes = {
  IMAGE_UPLOAD: imageUploadModalType,
};

const modalMap = {
  [modalTypes.IMAGE_UPLOAD]: ImageUpload,
};

interface Props {
  activeModal?: string;
}

const MainModal: React.FC<Props> = ({ activeModal = null }) => {
  const DisplayModal: any = modalMap[activeModal] || null;

  return DisplayModal && <DisplayModal isOpen />;
};

export default MainModal;
