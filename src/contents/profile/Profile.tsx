import React, { ChangeEventHandler } from 'react';
import { FaRegAddressCard } from 'react-icons/fa';
import { updateProfile } from '@/store/actions/dynamo';
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
  const twitterChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(userProfileSlice.actions.setTwitterId(e.target.value));
  };
  const submitHandler = () => {
    dispatch(updateProfile());
  };
  const changePublishHandler = () => {
    dispatch(userProfileSlice.actions.toggleIsPublish());
  };

  return (
    <section className="section">
      <h2 className="title is-flex">
        <FaRegAddressCard /> <div style={{ marginLeft: '1rem' }}>僕の私の説明書</div>
      </h2>
      <label htmlFor="input-name" style={{ display: 'flex', margin: '0.5rem' }}>
        名前：
        <input
          id="input-name"
          defaultValue={user.name}
          placeholder="名前を入力してください"
          onChange={nameChangeHandler}
        />
      </label>
      <label htmlFor="input-twitter" style={{ display: 'flex', margin: '0.5rem' }}>
        twitter：
        <input
          id="input-twitter"
          defaultValue={user.twitterId}
          placeholder="ツイッターのIDを入力してください"
          onChange={twitterChangeHandler}
        />
      </label>
      <AttributesCreateForm />
      <AttributesList />
      <label htmlFor="input-is-publish" style={{ display: 'flex', margin: '0.5rem' }}>
        ミエルようにする
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
