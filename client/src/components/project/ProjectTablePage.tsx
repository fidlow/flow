/* eslint-disable */
import { ColumnsType } from "antd/lib/table";
import { Badge, Button } from "antd";
import { useHistory } from "react-router-dom";
import React, { useContext, useState } from "react";
import { DataContext } from "../../common/ProjectData";
import {
  getBadgeFromExecutionStatus,
  getTextFromExecutionStatus
} from "../elements/ExecutionStatusMappers";
import { ExecutionStatus } from "../../common/ExecutionStatus";
import CustomTable from "../elements/CustomTable";
import { ProjectReducer } from "../../reducers";
import { Project } from "../../entities/project.entity";
import { observer } from "mobx-react-lite";
import { useStore } from "../StoreProvider";
import { ProjectsStoreType, ProjectStoreType } from "../../store/ProjectStore";
import { RootStoreModel } from "../../store/RootStore";


 function ProjectTablePage(): JSX.Element {
  const history = useHistory();
  const { projectsStore: { projects } }: RootStoreModel = useStore();
  const { dataProjectState, dispatchProjectData } = useContext(DataContext);
  const loadAddProjectPage = (): void => history.push("/add-project");
  const [removingProjectId, setRemovingProjectId] = useState<string>("-1");
  const deleteProject = (): void => {
    const projectToRemove = projects.find(
      p => p.id === removingProjectId
    )
    if(projectToRemove) projectToRemove.remove();
    setRemovingProjectId("-1");
  };
   const deleteProjectOLD = (): void => {
     const getRemovingProject = dataProjectState.find(
       p => p.id === removingProjectId
     );
     if (getRemovingProject !== undefined) {
       dispatchProjectData({
         type: ProjectReducer.Delete,
         payload: getRemovingProject
       });
       setRemovingProjectId("-1");
     }
   };
  const projectColumns: ColumnsType<Project> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Date",
      dataIndex: "date",
      defaultSortOrder: "descend",
      key: "date",
      sorter: (a, b): number => a.date.getDate() - b.date.getDate(),
      render: (value: Date): string => value.toLocaleDateString("ru")
    },
    {
      title: "Status",
      dataIndex: "status",
      defaultSortOrder: "descend",
      key: "status",
      sorter: (a, b): number => a.status - b.status,
      render: (value: ExecutionStatus): JSX.Element => (
        <span>
          <Badge status={getBadgeFromExecutionStatus(value)} />
          {getTextFromExecutionStatus(value)}
        </span>
      )
    }
  ];
  const projectColumns2: ColumnsType<ProjectStoreType> = [
     {
       title: "Name",
       dataIndex: "name",
       key: "name"
     },
     {
       title: "Date",
       dataIndex: "date",
       defaultSortOrder: "descend",
       key: "date",
       sorter: (a, b): number => a.date.getDate() - b.date.getDate(),
       render: (value: Date): string => value.toLocaleDateString("ru")
     },
     {
       title: "Status",
       dataIndex: "status",
       defaultSortOrder: "descend",
       key: "status",
       sorter: (a, b): number => a.status - b.status,
       render: (value: ExecutionStatus): JSX.Element => (
         <span>
          <Badge status={getBadgeFromExecutionStatus(value)} />
           {getTextFromExecutionStatus(value)}
        </span>
       )
     }
   ];
  const onClickRow = (project: Project): void => {
    if (project.id) setRemovingProjectId(project.id);
  };
   const onDoubleClickRow = (project: Project): void =>
     history.push(`/project/${project.id}`);
   const onClickRow2 = (project: ProjectStoreType): void => {
     if (project.id) setRemovingProjectId(project.id);
   };
   const onDoubleClickRow2 = (project: ProjectStoreType): void =>
     history.push(`/project/${project.id}`);

  return (
    <div className="site-layout-content">
      {projects.map(p =>p.name)}
        <br />
      <Button onClick={loadAddProjectPage} type="primary" className="button">
        Add Project
      </Button>
      {removingProjectId !== "-1" && (
        <Button
          onClick={deleteProject}
          type="primary"
          danger
          className="button"
          style={{ marginLeft: 10 }}
        >
          Delete Project
        </Button>
      )}
      <CustomTable
        dataSource={projects.toJS()}
        columns={projectColumns2}
        onClickRow={onClickRow2}
        onDoubleClickRow={onDoubleClickRow2}
      />
    </div>
  );
}

export default observer(ProjectTablePage)
