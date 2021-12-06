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

export type AuthActionType = {
  type: string;
  payload: {
    userEmail: string;
    userId: string;
  };
};

export type AuthStateType = {
  userEmail: null | string;
  userId: null | string;
};

export type StateType = {
  data: ProjectsDataStateType;
  auth: AuthStateType;
};
