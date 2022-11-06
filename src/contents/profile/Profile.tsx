import React, { ChangeEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { userProfileSelector } from '@/store/selectors/userProfileSelector';
import { userProfileSlice } from '@/store/slices/userProfile';
import { updateProfile } from '@/store/actions/connect';

const Profile: React.FC = () => {
  const user = useAppSelector(userProfileSelector);
  const dispatch = useAppDispatch();
  const nameChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(userProfileSlice.actions.setUserName(e.target.value));
  };
  const submitHandler = () => {
    dispatch(updateProfile());
  };

  return (
    <div>
      <input
        defaultValue={user.name}
        placeholder="名前を入力してください"
        onChange={nameChangeHandler}
      />
      <button type="button" onClick={submitHandler}>
        変更を確定
      </button>
    </div>
  );
};
export default Profile;
