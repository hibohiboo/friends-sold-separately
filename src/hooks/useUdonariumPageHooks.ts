import { ChangeEventHandler } from 'react';
import { connectUdonariumByTargetUserId } from '@/store/actions/udonariumLily';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { udonariumSelector } from '@/store/selectors/udonariumSelector';
import {
  changeUdonariumPlayerName,
  changeUdonariumTargetUserId,
} from '@/store/slices/udonariumLily';

export const useUdonariumPageHooks = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(udonariumSelector);
  const nickNameChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(changeUdonariumPlayerName(event.target.value));
  };
  const targetUserIdChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(changeUdonariumTargetUserId(event.target.value));
  };
  const connectPrivateHandler = () => {
    dispatch(connectUdonariumByTargetUserId());
  };
  return { ...state, nickNameChangeHandler, targetUserIdChangeHandler, connectPrivateHandler };
};
