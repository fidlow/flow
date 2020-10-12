import RootStore, { RootStoreModel } from "./RootStore";

export const createStore = (): RootStoreModel => {
  const userDataStr = localStorage.getItem('user');
  let userData;
  if (userDataStr !== null) userData = JSON.parse(userDataStr);
  return RootStore.create({
    projectsStore: {
      projects: [],
      managers: []
    },
    userStore: {
      user: userData
    },
  });
};

