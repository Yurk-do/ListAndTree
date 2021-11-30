import { ProjectsDataTreeItemType } from '../types/types';
import { dataFolderNames } from '../helpers/constants';
import {
  createTemplateFolder,
  createNameAndPhoneFolder,
} from '../helpers/formatDataToTree';

export const createNewFolder = (
  node: ProjectsDataTreeItemType
): ProjectsDataTreeItemType => {
  let newFolder = {};
  const folderKey = node.key + '-' + node.children.length;
  switch (node.data) {
    case dataFolderNames.projectName:
      newFolder = createTemplateFolder(folderKey, '', dataFolderNames.position);
      break;
    case dataFolderNames.position:
      newFolder = createNameAndPhoneFolder(
        folderKey,
        { name: '', phone: '' },
        dataFolderNames.nameAndPhone
      );
      break;
  }
  return newFolder as ProjectsDataTreeItemType;
};

export const addFolder = (
  tree: ProjectsDataTreeItemType[],
  parentFolder: ProjectsDataTreeItemType,
  newFolder: ProjectsDataTreeItemType
) => {
  const newTree = tree.map((itemTree: ProjectsDataTreeItemType) => {
    const newItemTree = { ...itemTree };
    if (itemTree.key === parentFolder.key) {
      newItemTree.children.push(newFolder);
    }
    if (itemTree.children.length) {
      addFolder(itemTree.children, parentFolder, newFolder);
    }
    return newItemTree;
  });
  return newTree;
};
