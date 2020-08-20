import { types } from "mobx-state-tree";
import { ExecutionStatus } from "../common/ExecutionStatus";
import RootStore, { RootStoreModel } from "./RootStore";
import ProjectsStore from "./ProjectStore";

const projectDataSourceArray = [
  {
    id: "1",
    name: "Сделать доставку по договору №123 от 23.02.2020 (с задачами)!!!!",
    date: new Date("2020-02-23"),
    owner: "",
    tasks: [
      {
        id: "1",
        name: "Принять товар на склад (с работами)",
        endDate: new Date("2020-02-20"),
        manager: "Складкин А.О.",
        status: ExecutionStatus.Finished,
        jobs: [
          "Взять товар",
          "Перенести товар",
          "Положить товар",
          "Подисать акт"
        ]
      },
      {
        id: "2",
        name: "Маркировать товар",
        endDate: new Date("2020-02-21"),
        manager: "Маркин Д.В.",
        status: ExecutionStatus.Processing
      },
      {
        id: "3",
        name: "Отправить товар",
        endDate: new Date("2020-02-23"),
        manager: "Правкин З.Ф.",
        status: ExecutionStatus.NotRunning
      }
    ]
  },
  {
    id: "2",
    name: "Сделать доставку по договору №323 от 02.02.2020",
    date: new Date("2020-02-02"),
    owner: ""
  },
  {
    id: "3",
    name: "Сделать доставку по договору №16 от 15.08.2019",
    date: new Date("2019-08-15"),
    owner: ""
  },
  {
    id: "4",
    name: "Сделать доставку по договору №12 от 11.08.2019",
    date: new Date("2019-08-11"),
    owner: ""
  }
];

const CreateStore = types.model({
  projects: types.optional(types.array(ProjectsStore), [])
});

export const createStore = (): RootStoreModel => {
  const rootStore = RootStore.create({
    projectsStore: {
      projects: projectDataSourceArray
    }
  });

  return rootStore;
};

export default CreateStore;
