import { ProjectsDataTreeItemType } from '../types/types';

export const deletePositionFolder = (
  tree: ProjectsDataTreeItemType[],
  node: ProjectsDataTreeItemType
) => {
  const projectFolderKey = node.key[0];
  const newTree = tree.map((itemTree: ProjectsDataTreeItemType) => {
    let newItemTree = { ...itemTree };
    if (itemTree.key === projectFolderKey) {
      newItemTree.children = itemTree.children.filter(
        (positionFolder: ProjectsDataTreeItemType) =>
          positionFolder.key !== node.key
      );
    }
    return newItemTree;
  });
  return newTree;
};

export const deleteNameFolder = (
  tree: ProjectsDataTreeItemType[],
  node: ProjectsDataTreeItemType
) => {
  const positionFolderKey = node.key.slice(0, 3);
  const newTree = tree.map((itemTree: ProjectsDataTreeItemType) => {
    let newItemTree = { ...itemTree };
    if (itemTree.key === positionFolderKey) {
      newItemTree.children = itemTree.children.filter(
        (nameFolder: ProjectsDataTreeItemType) => nameFolder.key !== node.key
      );
      return newItemTree;
    }
    if (newItemTree.children.length) {
      newItemTree.children = deleteNameFolder(itemTree.children, node);
    }

    return newItemTree;
  });

  return newTree;
};
