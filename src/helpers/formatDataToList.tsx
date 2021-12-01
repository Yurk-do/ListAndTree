import { Tree } from 'primereact/tree';
import {
  ProjectsDataListItemType,
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
        break;
      case dataFolderNames.position:
        newListItem.position = treeItem.label;
        break;
      case dataFolderNames.nameAndPhone:
        newListItem.fullName = (treeItem.label as NameAndPhoneFolderType).name;
        newListItem.phone = (treeItem.label as NameAndPhoneFolderType).phone;
        newList.push({ ...newListItem });
    }

    if (treeItem.children.length) {
      return (newList = [
        ...formatDataToList(treeItem.children, newListItem, newList),
      ]);
    }
  });

  return newList;
};
