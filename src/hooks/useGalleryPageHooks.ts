import { useAppSelector } from '@/store/hooks';
import { spreadsheetApi } from '@/store/query/spreadsheetApi';
import { gallerySelector } from '@/store/selectors/gallerySelector';

export const useGalleryPageHooks = () => {
  const gallery = useAppSelector(gallerySelector);
  const result = spreadsheetApi.useGetGalleryQuery(gallery.sheetName);
  return { items: result.data || [] };
};
