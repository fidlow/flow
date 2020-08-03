import {ColumnsType} from "antd/lib/table";
import {ProjectInterface} from "../../common/ProjectInterface";
import {Badge, Button} from "antd";
import {useHistory} from "react-router-dom";
import React, {useContext, useState} from "react";
import {DataContext} from "../../common/ProjectData";
import {getBadgeFromExecutionStatus, getTextFromExecutionStatus} from "../common/utils";
import {ExecutionStatus} from "../../common/Enums";
import CustomTable from "../common/CustomTable";
import {ProjectReducer} from "../../reducers";

export default function ProjectTablePage(): JSX.Element {
  const history = useHistory();
  const {dataProjectState, dispatchProjectData} = useContext(DataContext);
  const loadAddProjectPage = (): void => history.push('/add-project');
  const [removingProjectId, setRemovingProjectId] = useState<string>("-1");
  const deleteProject = (): void => {
    const getRemovingProject = dataProjectState.find((p) => p.id === removingProjectId);
    if (getRemovingProject !== undefined) {
      dispatchProjectData({
        type: ProjectReducer.Delete,
        payload: getRemovingProject
      })
      setRemovingProjectId("-1")
    }
  }
  const projectColumns: ColumnsType<ProjectInterface> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      defaultSortOrder: 'descend',
      key: 'date',
      sorter: (a, b): number => a.date.getDate() - b.date.getDate(),
      render: (value: Date): string => (
        value.toLocaleDateString('ru')
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      defaultSortOrder: 'descend',
      key: 'status',
      sorter: (a, b): number => a.status - b.status,
      render: (value: ExecutionStatus): JSX.Element => (
        <span>
            <Badge status={getBadgeFromExecutionStatus(value)}/>
          {getTextFromExecutionStatus(value)}
          </span>
      )
    }
  ];
  const onClickRow = (project: ProjectInterface): void => setRemovingProjectId(project.id);
  const onDoubleClickRow = (project: ProjectInterface): void => history.push(`/edit-project/${project.id}`);

  return <div className="site-layout-content">
    <Button onClick={loadAddProjectPage} type="primary" className="button">Add Project</Button>
    {removingProjectId !== "-1" &&
    <Button onClick={deleteProject} type="primary" danger className="button" style={{marginLeft: 10}}>Delete
      Project</Button>}
    <CustomTable dataSource={dataProjectState} columns={projectColumns} onClickRow={onClickRow}
                 onDoubleClickRow={onDoubleClickRow}/>
  </div>;
}

