import {
  ProjectsDataTreeItemType,
  NameAndPhoneFolderType,
} from '../types/types';

import { dataFolderNames } from './constants';

export const formatDataToList = (
  tree: ProjectsDataTreeItemType[],
  newListItem: any = null,
  newList: any = null
): any => {
  if (!tree.length) {
    return [];
  }

  newList = newList ? newList : [];

  newListItem = newListItem
    ? newListItem
    : {
        fullName: '',
        projectName: '',
        position: '',
        phone: '',
      };

  tree.forEach((treeItem: ProjectsDataTreeItemType) => {
    switch (treeItem.data) {
      case dataFolderNames.projectName:
        newListItem.projectName = treeItem.label;
        if (!treeItem.data.length) {
          newList.push({ ...newListItem });
        }
        break;
      case dataFolderNames.position:
        newListItem.position = treeItem.label;
        if (!treeItem.data.length) {
          newList.push({ ...newListItem });
        }
        break;
      case dataFolderNames.nameAndPhone:
        newListItem.fullName = (treeItem.label as NameAndPhoneFolderType).name;
        newListItem.phone = (treeItem.label as NameAndPhoneFolderType).phone;
    }
    if (treeItem.children.length) {
      return formatDataToList(treeItem.children, { ...newListItem }, newList);
    } else {
      newList.push({ ...newListItem });
    }
  });

  return newList;
};
