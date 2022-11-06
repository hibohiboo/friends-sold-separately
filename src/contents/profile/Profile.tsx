import React, { ChangeEventHandler } from 'react';
import { updateProfile } from '@/store/actions/connect';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { userProfileSelector } from '@/store/selectors/userProfileSelector';
import { userProfileSlice } from '@/store/slices/userProfile';
import AttributesCreateForm from './AttributesCreateForm';
import AttributesList from './AttributesList';

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
      <h2 style={{ marginTop: '0' }}>僕の説明書</h2>
      <label htmlFor="input-name" style={{ display: 'flex', margin: '0.5rem' }}>
        名前：
        <input
          id="input-name"
          defaultValue={user.name}
          placeholder="名前を入力してください"
          onChange={nameChangeHandler}
        />
      </label>

      <AttributesCreateForm />
      <AttributesList />
      <label htmlFor="input-is-publish" style={{ display: 'flex', margin: '0.5rem' }}>
        売り場に並ぶ
        <input
          id="input-is-publish"
          type="checkbox"
          checked={user.isPublish}
          onChange={changePublishHandler}
        />
      </label>
      <button type="button" onClick={submitHandler} style={{ cursor: 'pointer' }}>
        変更を確定
      </button>
    </section>
  );
};
export default Profile;
