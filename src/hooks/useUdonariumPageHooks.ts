import { useAppSelector } from '@/store/hooks';
import { udonariumSelector } from '@/store/selectors/udonariumSelector';

export const useUdonariumPageHooks = () => {
  const { userId } = useAppSelector(udonariumSelector);

  return { userId };
};
