import { ProjectsDataTreeItemType } from '../types/types';

export const deleteFolder = (
  tree: ProjectsDataTreeItemType[],
  node: ProjectsDataTreeItemType,
  parentFolderKey: string
) => {
  const newTree = tree.map((itemTree: ProjectsDataTreeItemType) => {
    const newItemTree = { ...itemTree };
    if (itemTree.key === parentFolderKey) {
      newItemTree.children = itemTree.children.filter(
        (folder: ProjectsDataTreeItemType) => folder.key !== node.key
      );
      return newItemTree;
    }
    if (newItemTree.children.length) {
      newItemTree.children = deleteFolder(
        itemTree.children,
        node,
        parentFolderKey
      );
    }
    return newItemTree;
  });
  return newTree;
};
