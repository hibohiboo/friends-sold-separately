import { ChangeEventHandler } from 'react';
import { connectUdonariumByTargetUserId } from '@/store/actions/udonariumLily';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { udonariumSelector } from '@/store/selectors/udonariumSelector';
import {
  changeUdonariumPlayerName,
  changeUdonariumTargetUserId,
  udonariumLilySlice,
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
  const toggleMapHandler = () => {
    dispatch(udonariumLilySlice.actions.setVisibleMap(!state.visibleMap));
  };
  const toggleMapMessage = state.visibleMap ? '隠す' : '表示する';
  return {
    ...state,
    nickNameChangeHandler,
    targetUserIdChangeHandler,
    connectPrivateHandler,
    toggleMapHandler,
    toggleMapMessage,
  };
};
