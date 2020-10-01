import { ColumnsType } from "antd/lib/table";
import { Badge, Button } from "antd";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  getBadgeFromExecutionStatus,
  getTextFromExecutionStatus
} from "../elements/ExecutionStatusMappers";
import { ExecutionStatus } from "../../common/ExecutionStatus";
import CustomTable from "../elements/CustomTable";
import { observer } from "mobx-react-lite";
import { useStore } from "../StoreProvider";
import { ProjectStoreType } from "../../store/ProjectStore";

 function ProjectTablePage(): JSX.Element {
  const history = useHistory();
  const { projectsStore } = useStore();
   const { projects } = projectsStore;
  useEffect(() => {
    projectsStore.loadProjects()
  },[projectsStore])
  const loadAddProjectPage = (): void => history.push("/add-project");
  const [removingProjectId, setRemovingProjectId] = useState<string>("-1");
  const deleteProject = (): void => {
    const projectToRemove = projects.find(
      p => p.id === removingProjectId
    )
    if(projectToRemove) projectToRemove.remove();
    setRemovingProjectId("-1");
  };
  const projectColumns: ColumnsType<ProjectStoreType> = [
     {
       title: "Name",
       dataIndex: "name",
       key: "name"
     },
     {
       title: "End Date",
       dataIndex: "date",
       defaultSortOrder: "descend",
       key: "date",
       sorter: (a, b): number => {
         if(a.date === null || b.date === null) return 0;
         return a.date.getTime() - b.date.getTime();
       },
       render: (value: Date): string => value ? value.toLocaleDateString("ru") : "No Events"
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
   const onClickRow = (project: ProjectStoreType): void => {
     if (project.id) setRemovingProjectId(project.id);
   };
   const onDoubleClickRow = (project: ProjectStoreType): void =>
     history.push(`/project/${project.id}`);

  return (
    <div className="site-layout-content">
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
        columns={projectColumns}
        onClickRow={onClickRow}
        onDoubleClickRow={onDoubleClickRow}
      />
    </div>
  );
}

export default observer(ProjectTablePage)
