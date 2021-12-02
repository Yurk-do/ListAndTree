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
        break;
      case dataFolderNames.position:
        newListItem.position = treeItem.label;
        break;
      case dataFolderNames.nameAndPhone:
        newListItem.fullName = (treeItem.label as NameAndPhoneFolderType).name;
        newListItem.phone = (treeItem.label as NameAndPhoneFolderType).phone;
    }

    if (treeItem.children.length) {
      return (newList = [
        ...formatDataToList(treeItem.children, newListItem, newList),
      ]);
    }
    console.log(newList)
    console.log(newListItem)
    newList.push({ ...newListItem });
    console.log(newList)
  });

  return newList;
};
