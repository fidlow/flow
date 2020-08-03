import {ProjectInterface, ProjectContext} from "./ProjectInterface";
import React from "react";
import {ExecutionStatus} from "./Enums";
import {Project} from '../entities/project.entity'


const projectDataSourceArray: ProjectInterface[] = [
  {
    id: '1',
    name: 'Сделать доставку по договору №123 от 23.02.2020 (с задачами)',
    date: new Date('2020-02-23'),
    status: ExecutionStatus.Processing,
    tasks: [
      {
        id: '1',
        name: 'Принять товар на склад (с работами)',
        endDate: new Date('2020-02-20'),
        manager: 'Складкин А.О.',
        status: ExecutionStatus.Finished,
        jobs: [
          'Взять товар',
          'Перенести товар',
          'Положить товар',
          'Подисать акт',
        ]
      },
      {
        id: '2',
        name: 'Маркировать товар',
        endDate: new Date('2020-02-21'),
        manager: 'Маркин Д.В.',
        status: ExecutionStatus.Processing
      },
      {
        id: '3',
        name: 'Отправить товар',
        endDate: new Date('2020-02-23'),
        manager: 'Правкин З.Ф.',
        status: ExecutionStatus.NotRunning
      }
    ]
  },
  {
    id: '2',
    name: 'Сделать доставку по договору №323 от 02.02.2020',
    date: new Date('2020-02-02'),
    status: ExecutionStatus.NotRunning
  },
  {
    id: '3',
    name: 'Сделать доставку по договору №16 от 15.08.2019',
    date: new Date('2019-08-15'),
    status: ExecutionStatus.Aborted,
  },
  {
    id: '4',
    name: 'Сделать доставку по договору №12 от 11.08.2019',
    date: new Date('2019-08-11'),
    status: ExecutionStatus.Finished,
  },
];

export const projectDataSource: Project[] = projectDataSourceArray.map(p => {
  const project = new Project(p.name, p.date);
  project.id = p.id;
  project.tasks = p.tasks;
  return project;
});

export const DataContext = React.createContext<ProjectContext>({
  dataProjectState: new Array<Project>(),
  dispatchProjectData: () => new Array<Project>()
});

