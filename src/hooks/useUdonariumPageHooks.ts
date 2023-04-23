import { ChangeEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { udonariumSelector } from '@/store/selectors/udonariumSelector';
import { changeUdonariumPlayerName } from '@/store/slices/udonariumLily';

export const useUdonariumPageHooks = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(udonariumSelector);
  const nickNameChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(changeUdonariumPlayerName(event.target.value));
  };
  return { ...state, nickNameChangeHandler };
};
