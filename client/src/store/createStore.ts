import { ExecutionStatus } from "../common/ExecutionStatus";
import RootStore, { RootStoreModel } from "./RootStore";

const projectDataSourceArray = [
  {
    id: "1",
    name: "Сделать доставку по договору №123 от 23.05.2020 (с задачами) !!",
    date: new Date("2020-09-23"),
    owner: '1111',
    tasks: [
      {
        id: "1",
        name: "Принять товар на склад (с работами)",
        endDate: new Date("2020-09-20"),
        manager: '3333',
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
        endDate: new Date("2020-09-21"),
        manager: '4444',
        status: ExecutionStatus.Processing
      },
      {
        id: "3",
        name: "Отправить товар",
        endDate: new Date("2020-09-23"),
        manager: '5555',
        status: ExecutionStatus.NotRunning
      }
    ]
  },
  {
    id: "2",
    name: "Сделать доставку по договору №323 от 02.05.2020",
    date: new Date("2020-09-02"),
    owner: '1111'
  },
  {
    id: "3",
    name: "Сделать доставку по договору №16 от 15.05.2019",
    date: new Date("2019-09-15"),
    owner: '1111'
  },
  {
    id: "4",
    name: "Сделать доставку по договору №12 от 11.05.2019",
    date: new Date("2019-09-11"),
    owner: '1111'
  }
];

const accountDataSourceArray = {
  id: '1111',
  email: 'test@test.ru',
  name: 'Евгений Ганинцев',
  roles:  [
    {
      "id": 1,
      "name": "admin"
    }
  ]
}

const managersDataSourceArray = [{
  id: '1111',
  email: 'test@test.ru',
  name: 'Евгений Ганинцев',
  roles:  [
    {
      "id": 1,
      "name": "admin"
    }
  ]
},
  {id:'3333', email:'test@test.ru', name: 'Складкин А.О.'},
  {id:'4444', email:'test@test.ru', name:  "Маркин Д.В."},
  {id:'5555', email:'test@test.ru', name:  "Правкин З.Ф."},
]

export const createStore = (): RootStoreModel => {
  return RootStore.create({
    projectsStore: {
      projects: projectDataSourceArray
    },
    userStore: accountDataSourceArray,
    managersStore: {
      managers: managersDataSourceArray
    },
  });
};

