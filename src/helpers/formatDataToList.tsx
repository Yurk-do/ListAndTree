import { ProjectsDataListItemType, ProjectsDataTreeItemType } from '../types/types';


const dataFolderNames = {
  projectName: 'Projects Folder',
  position: 'Position Folder',
  nameAndPhone: 'Names and phones data',
};


export const formatDataToList = (data: ProjectsDataTreeItemType[], newListItem: any = null): ProjectsDataListItemType[] => {
  if (!data.length) {
    // @ts-ignore
    return data;
  }
  console.log('hello')
  const listArray: any = [];

  const listItem = newListItem ? newListItem : {
    fullName: '',
    projectName: '',
    position: '',
    phone: '',
    id: '',
  }
  data.forEach((treeItem: ProjectsDataTreeItemType) => {
    if (treeItem.data === dataFolderNames.projectName) {
      listItem.projectName = treeItem.label;
      formatDataToList(treeItem.children, listItem)

      if (treeItem.data === dataFolderNames.position) {
        listItem.position = treeItem.label;
        formatDataToList(treeItem.children, listItem)
      }
      if (treeItem.data === dataFolderNames.nameAndPhone) {
        listItem.projectName = treeItem.label;
        listArray.push(listItem);
      }
    }
  })
  return listArray;
}





