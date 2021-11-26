import { ProjectsDataTreeItemType } from '../types/types';
import { dataFolderNames } from '../helpers/constants';

const concatNameAndPhone = (name: string, phone: string = 'не указан') =>
  `Имя: ${name}. Телефон: ${phone}`;

export const createTreeForRender = (
  tree: ProjectsDataTreeItemType[]
): ProjectsDataTreeItemType[] => {
  const newTree = tree.map((itemTree: any) => {
    let newItemTree = { ...itemTree };
    if (itemTree.data === dataFolderNames.nameAndPhone) {
      newItemTree.label = concatNameAndPhone(
        itemTree.label.name,
        itemTree.label.phone
      );
    }
    if (itemTree.children.length) {
      newItemTree.children = createTreeForRender(itemTree.children);
    }
    return newItemTree;
  });
  return newTree;
};

export const findNodeForEdit = (
  tree: ProjectsDataTreeItemType[],
  node: ProjectsDataTreeItemType
): ProjectsDataTreeItemType => {
  return tree.reduce((acc: any, itemTree: ProjectsDataTreeItemType) => {
    if (acc) return acc;
    if (itemTree.key === node.key) return itemTree;
    if (itemTree.children) return findNodeForEdit(itemTree.children, node);
  }, null);
};

export const createEditedTree = (
  tree: any,
  node: ProjectsDataTreeItemType
): ProjectsDataTreeItemType[] => {
  const newTree = tree.map((treeItem: ProjectsDataTreeItemType) => {
    if (treeItem.key === node.key) {
      treeItem.label = node.label;
    }
    if (treeItem.children.length) {
      createEditedTree(treeItem.children, node);
      return treeItem;
    }
  });
  return newTree;
};
