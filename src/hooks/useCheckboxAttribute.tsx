import { createSelector } from '@reduxjs/toolkit';
import { AttributeType } from '@/domain/user/constants';
import { updateAttributes } from '@/store/actions/dynamo';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { attributesEntitySelector } from '@/store/selectors/attributesSelector';
import { userProfileSelector } from '@/store/selectors/userProfileSelector';
import { attributesSlice } from '@/store/slices/attributes';

const checkboxSelecter = (name: string) =>
  createSelector(attributesEntitySelector, (attributes) => {
    if (!attributes) return null;
    const item = attributes.find((attr) => attr.name === name);
    if (!item) return null;
    return item.id;
  });

export const useCheckboxAttribute = (label: string, type: AttributeType) => {
  const plLikeSelector = checkboxSelecter(label);
  const user = useAppSelector(userProfileSelector);
  const dispatch = useAppDispatch();
  const checkboxChageHandler = (id: string | null, name: string, tp: AttributeType) => () => {
    if (id) {
      dispatch(attributesSlice.actions.attibuteRemove(id));
    } else {
      dispatch(
        attributesSlice.actions.attributeAdded({
          userIdentifier: user.identifier,
          type: tp,
          name,
        })
      );
      dispatch(updateAttributes());
    }
  };
  const plLikeId = useAppSelector(plLikeSelector);
  const changeForPLLike = checkboxChageHandler(plLikeId, label, type);
  return {
    id: label,
    labelText: label,
    type,
    checked: !!plLikeId,
    change: changeForPLLike,
  };
};
