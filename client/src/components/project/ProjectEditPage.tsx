import {Redirect, useHistory, useParams} from "react-router-dom";
import React, {useContext, useState} from "react";
import {DataContext} from "../../common/ProjectData";
import {Store} from "antd/lib/form/interface";
import {Badge, Button, Form, Input} from "antd";
import {getBadgeFromExecutionStatus, getTextFromExecutionStatus} from "../elements/ExecutionStatusMappers";
import CustomTable from "../elements/CustomTable";
import {ColumnsType} from "antd/lib/table";
import {TaskInterface} from "../../commonFromServer/TaskInterface";
import {ExecutionStatus} from "../../common/ExecutionStatus";
import {ProjectReducer} from "../../reducers";

export default function ProjectEditPage(): JSX.Element {
  const {idProject} = useParams();
  const history = useHistory();
  const {dataProjectState, dispatchProjectData} = useContext(DataContext);
  const project = dataProjectState.find((p) => p.id === idProject);
  const [removingTaskId, setRemovingTaskId] = useState<string>("-1")
  if (project === undefined) {
    return <Redirect to="/"/>
  } else {
    const onFinish = (values: Store): void => {
      project.name = values.name;
      dispatchProjectData({
        type: ProjectReducer.Update,
        payload: project
      });
      history.push('/')
    };
    const taskColumns: ColumnsType<TaskInterface> = [
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'End Date',
        dataIndex: 'endDate',
        defaultSortOrder: "ascend",
        sorter: (a, b): number => a.endDate.getDate() - b.endDate.getDate(),
        render: (value: Date): string => (
          value.toLocaleDateString('ru')
        )
      },
      {
        title: 'Status',
        dataIndex: 'status',
        sorter: (a, b): number => a.status - b.status,
        render: (value: ExecutionStatus): JSX.Element => (
          <span>
            <Badge status={getBadgeFromExecutionStatus(value)}/>
            {getTextFromExecutionStatus(value)}
          </span>
        )
      },
      {
        title: 'Manager',
        dataIndex: 'manager',
      }
    ];
    const loadAddTaskPage = (): void => history.push(`/project/${idProject}/add-task`);
    const onClickRow = (task: TaskInterface): void => {
      if(task.id) setRemovingTaskId(task.id);
    }
    const deleteTask = (): void => {
      project.deleteTaskById(removingTaskId);
      dispatchProjectData({
        type: ProjectReducer.Update,
        payload: project
      })
      setRemovingTaskId("-1");
    }
    const onDoubleClickRow = (task: TaskInterface): void => history.push(`/project/${idProject}/task/${task.id}`);
    return <div className="site-layout-content">
      <h1>Edit Project</h1>
      <Form
        name="basic"
        initialValues={project}
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{required: true, message: 'Please input name of your project!'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Date"
        >
          <span>
            {project.date.toLocaleDateString('ru')}
          </span>
        </Form.Item>

        <Form.Item
          label="Status"
        >
          <span>
            <Badge status={getBadgeFromExecutionStatus(project.status)}/>
            {getTextFromExecutionStatus(project.status)}
          </span>
        </Form.Item>
        <Button type="primary" onClick={loadAddTaskPage}>
          Add Task
        </Button>
        {removingTaskId !== "-1" &&
        <Button onClick={deleteTask} type="primary" danger style={{marginLeft: 10}}>
          Delete Task</Button>}
        <CustomTable dataSource={project.tasks} columns={taskColumns} onClickRow={onClickRow}
                     onDoubleClickRow={onDoubleClickRow}/>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>

    </div>
  }

}
