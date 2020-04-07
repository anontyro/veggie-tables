import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import * as userActions from '../../redux/modules/user/actions';
import { RootState } from '../../redux';
import MainLayout from '../_layout/MainLayout';

interface Props {
  username: string | null;
}

const User: React.FC<Props> = ({ username }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      userActions.addUser({
        username: null,
        token: null,
      })
    );
  }, [dispatch]);

  return (
    <MainLayout>
      <React.Fragment>
        <h1 className="font-sans text-center text-2xl">{`User Page ${username}`}</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Button
        </button>
      </React.Fragment>
    </MainLayout>
  );
};

const mapStateToProps = ({ user }: RootState) => ({
  username: user.username,
});

const enhance = connect(mapStateToProps);

export default enhance(User);
