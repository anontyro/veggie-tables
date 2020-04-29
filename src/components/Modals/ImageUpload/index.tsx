import React, { useState } from 'react';
import ModalBase from '../Base';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux';
import * as modalActions from '../../../redux/modules/modal/actions';
import * as stockActions from '../../../redux/modules/stock/actions';
import { UploadInput } from '../../Form/Inputs';
import { StockImageForm } from '../../../../types/Stock';

export const modalType = 'IMAGE_UPLOAD_MODAL';
const HEADER_TEXT = 'Stock Image Upload';

interface ImageForm {
  file: File;
  dir: string;
}

interface ImageFormProps {
  imageForm: ImageForm;
  setImageForm: (imageForm: ImageForm) => void;
}

const ImageUploadForm: React.FC<ImageFormProps> = ({ imageForm, setImageForm }) => {
  return (
    <form>
      <UploadInput
        label="Upload Image"
        onChange={(event: React.FormEvent<HTMLInputElement>) => {
          setImageForm({
            ...imageForm,
            file: event.currentTarget.files[0],
          });
        }}
      />
    </form>
  );
};

interface Props {}

const ImageUpload: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const {
    modal,
    stock: { isBusy },
  }: RootState = useSelector((state: RootState) => state);
  const [imageForm, setImageForm] = useState({
    file: undefined,
    dir: '',
  });

  const onClose = () => {
    dispatch(modalActions.onCloseModal({ modalType }));
  };

  const onConfirm = () => {
    if (!imageForm.file) {
      return;
    }
    console.log(imageForm);
    const form: StockImageForm = {
      image: imageForm.file,
      dir: imageForm.dir,
    };
    dispatch(stockActions.addStockImg(form, onClose));
  };

  return (
    <ModalBase
      isOpen={modal.modalType === modalType}
      headerText={HEADER_TEXT}
      onRequestClose={onClose}
      onCancel={onClose}
      onConfirm={onConfirm}
      isLoading={isBusy}
    >
      <div>
        <img
          src="/static/icons/undraw_photograph_rde1.svg"
          alt="select file for upload"
          className="object-fill w-48 h-32 flex rounded m-auto"
        />
        <ImageUploadForm imageForm={imageForm} setImageForm={setImageForm} />
      </div>
    </ModalBase>
  );
};

export default ImageUpload;
