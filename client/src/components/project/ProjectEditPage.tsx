import {Redirect, useHistory, useParams} from "react-router-dom";
import React, {useState} from "react";
import {Store} from "antd/lib/form/interface";
import {Badge, Button, Form, Input} from "antd";
import {getBadgeFromExecutionStatus, getTextFromExecutionStatus} from "../elements/ExecutionStatusMappers";
import CustomTable from "../elements/CustomTable";
import {ColumnsType} from "antd/lib/table";
import {ExecutionStatus} from "../../common/ExecutionStatus";
import { useStore } from "../StoreProvider";
import { TaskStoreType } from "../../store/TaskStore";
import { ProjectStoreType } from "../../store/ProjectStore";
import { observer } from "mobx-react-lite";
import { AccountStoreType } from "../../store/AccountStore";

function ProjectEditPage(): JSX.Element {
  const {projectId} = useParams();
  const history = useHistory();
  const { projectsStore, managersStore: {managers} } = useStore();
  const { projects } = projectsStore;
  const project = projects.find((p) => p.id === projectId);
  const [removingTaskId, setRemovingTaskId] = useState<string>("-1")
  if (project === undefined) {
    return <Redirect to="/"/>
  } else {
    const taskColumns: ColumnsType<TaskStoreType> = [
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
        render: (managerId: string): string => (
          (managers.find((m)=> m.id===managerId) as AccountStoreType).name
        )
      }
    ];
    const loadAddTaskPage = (): void => history.push(`/project/${projectId}/add-task`);
    const onClickRow = (task: TaskStoreType): void => {
      if(task.id) setRemovingTaskId(task.id);
    }
    const onDoubleClickRow = (task: TaskStoreType): void => history.push(`/project/${projectId}/task/${task.id}`);
    const deleteTask = (): void => {
      const taskToRemove = project.tasks.find( (t) => t.id === removingTaskId )
      if(taskToRemove) taskToRemove.remove();
      setRemovingTaskId("-1");
    }
    const onFinish = (values: Store): void => {
      projectsStore.updateProject({...project, ...values as ProjectStoreType});
      history.push('/')
    };
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
        <CustomTable dataSource={project.tasks.toJS()} columns={taskColumns} onClickRow={onClickRow}
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
export default observer(ProjectEditPage)
