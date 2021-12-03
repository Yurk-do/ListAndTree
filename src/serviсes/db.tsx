import { db } from './firebase';

import { ref, onValue, push, set } from 'firebase/database';

export const sendDataToDatabase = (userId: any, data: any) => {
  set(ref(db, 'users/' + userId), data);
};

export const addFolderToDataBase = (userId: any, data: any) => {
  const postListRef = ref(db, 'users/' + userId);
  const newPostRef = push(postListRef);
  set(newPostRef, data);
};

export const getDataFromDataBase = (
  userId: any,
  dispatch: any,
  action: any
) => {
  const snapshot = ref(db, 'users/' + userId);
  onValue(snapshot, (projectsData) => {
    const data = projectsData.val();
    dispatch({ ...action, payload: data });
  });
};
