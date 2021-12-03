import {
  ProjectsDataListItemType,
  ProjectsDataTreeItemType,
  NameAndPhoneFolderType,
} from '../types/types';

import { dataFolderNames } from './constants';

const checkItemLabelIsSame = (
  array: ProjectsDataTreeItemType[],
  labelName: string
) =>
  array.find(
    (newDataItem: ProjectsDataTreeItemType) => newDataItem?.label === labelName
  );

export const createTemplateFolder = (
  key: string,
  labelName: string,
  dataName: string
): ProjectsDataTreeItemType => ({
  key: key,
  label: labelName,
  data: dataName,
  children: [],
});

export const createNameAndPhoneFolder = (
  key: string,
  nameAndPhone: NameAndPhoneFolderType,
  dataName: string
): ProjectsDataTreeItemType => {
  return {
    key: key,
    label: nameAndPhone,
    data: dataName,
    children: [],
  };
};

const createTreeElement: Function = (
  parentElement: ProjectsDataTreeItemType | any,
  item: ProjectsDataListItemType
) => {
  let folder: ProjectsDataTreeItemType | any;
  const key = !parentElement.data
    ? parentElement.length.toString()
    : parentElement.key + '-' + parentElement.children.length;
  switch (parentElement.data) {
    case undefined:
      folder = createTemplateFolder(
        key,
        item.projectName,
        dataFolderNames.projectName
      );
      break;
    case dataFolderNames.projectName:
      if (!item.position) {
        return;
      }
      folder = createTemplateFolder(
        key,
        item.position,
        dataFolderNames.position
      );
      break;
    case dataFolderNames.position:
      if (!item.fullName) {
        return;
      }
      folder = createNameAndPhoneFolder(
        key,
        { name: item.fullName, phone: item.phone },
        dataFolderNames.nameAndPhone
      );
  }

  if (folder?.children && createTreeElement(folder, item)) {
    folder.children.push(createTreeElement(folder, item));
  }
  return folder;
};

export const formatDataToTree = (
  data: ProjectsDataListItemType[]
): ProjectsDataTreeItemType[] => {
  if (!data) {
    return [];
  }

  const newDataArray: ProjectsDataTreeItemType[] = [];

  data.forEach((dataItem: ProjectsDataListItemType) => {
    const itemIsSameProject = checkItemLabelIsSame(
      newDataArray,
      dataItem.projectName
    );
    if (!itemIsSameProject) {
      newDataArray.push(createTreeElement(newDataArray, dataItem));
    } else {
      const itemIsSamePosition = checkItemLabelIsSame(
        itemIsSameProject.children,
        dataItem.position
      );
      if (!itemIsSamePosition) {
        if (!dataItem.position) {
          return;
        }
        itemIsSameProject.children.push(
          createTreeElement(itemIsSameProject, dataItem)
        );
      } else {
        itemIsSamePosition.children.push(
          createTreeElement(itemIsSamePosition, dataItem)
        );
      }
    }
  });

  return newDataArray;
};
