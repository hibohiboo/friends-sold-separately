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
  const changePublishHandler = () => {
    dispatch(userProfileSlice.actions.toggleIsPublish());
  };

  return (
    <section style={{ backgroundColor: '#333', padding: '10px' }}>
      <h3 style={{ marginTop: '0' }}>僕の説明書</h3>
      <label htmlFor="input-name" style={{ display: 'flex', margin: '0.5rem' }}>
        名前：
        <input
          id="input-name"
          defaultValue={user.name}
          placeholder="名前を入力してください"
          onChange={nameChangeHandler}
        />
      </label>
      <label htmlFor="input-is-publish" style={{ display: 'flex', margin: '0.5rem' }}>
        他人に見せてOK
        <input
          id="input-is-publish"
          type="checkbox"
          defaultChecked={user.isPublish}
          onClick={changePublishHandler}
        />
      </label>
      <button type="button" onClick={submitHandler} style={{ cursor: 'pointer' }}>
        変更を確定
      </button>
    </section>
  );
};
export default Profile;
