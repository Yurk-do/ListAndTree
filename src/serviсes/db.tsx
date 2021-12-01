import { getDatabase, ref, onValue, push, set } from 'firebase/database';

const db = getDatabase();

export const setDataToDatabase = (userId: any, data: any) => {
  push(ref(db, 'users/' + userId), data);
};

export const getDataFromDataBase = (userId: any) => {
  const snapshot = ref(db, 'users/' + userId);
  onValue(snapshot, (projectsData) => {
    const data = projectsData.val();
  });
};
