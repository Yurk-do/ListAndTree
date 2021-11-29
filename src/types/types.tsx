export type ProjectsDataListItemType = {
  fullName: string;
  projectName: string;
  position: string;
  phone: string;
};

export type NameAndPhoneFolderType = {
  name: string;
  phone: string;
};

export type ProjectsDataTreeItemType = {
  key: string;
  label: string | NameAndPhoneFolderType;
  data?: string;
  children: ProjectsDataTreeItemType[];
};

export type ProjectsDataActionType = {
  type: string;
  payload: ProjectsDataListItemType[];
};

export type ProjectsDataStateType = {
  projectsData: ProjectsDataListItemType[];
};

export type StateType = {
  data: ProjectsDataStateType;
};
