import React, { ChangeEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selfUserSelector } from '@/store/selectors/peerSelector';
import { peerSlice } from '@/store/slices/peer';

const Profile: React.FC = () => {
  const user = useAppSelector(selfUserSelector);
  const dispatch = useAppDispatch();
  const nameChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(peerSlice.actions.setUserName(e.target.value));
  };

  return (
    <div>
      <input
        defaultValue={user?.syncData.name}
        placeholder="名前を入力してください"
        onChange={nameChangeHandler}
      />
    </div>
  );
};
export default Profile;
