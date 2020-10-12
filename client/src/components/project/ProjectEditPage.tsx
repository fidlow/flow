import {useHistory, useParams} from "react-router-dom";
import React, { useEffect, useState } from "react";
import {Store} from "antd/lib/form/interface";
import {Badge, Button, Form, Input} from "antd";
import {getBadgeFromExecutionStatus, getTextFromExecutionStatus} from "../elements/ExecutionStatusMappers";
import CustomTable from "../elements/CustomTable";
import {ColumnsType} from "antd/lib/table";
import {ExecutionStatus} from "../../common/ExecutionStatus";
import { useStore } from "../StoreProvider";
import { EventStoreType } from "../../store/EventStore";
import { ProjectStoreType } from "../../store/ProjectStore";
import { observer } from "mobx-react-lite";
import { AccountStoreType } from "../../store/AccountStore";

function ProjectEditPage(): JSX.Element {
  const {projectId} = useParams<{projectId: string}>();
  const history = useHistory();
  const { projectsStore } = useStore();
  const { projects,managers } = projectsStore;
  const project = projects.find((p: ProjectStoreType) => p.id === projectId);
  useEffect(() => {
    projectsStore.loadProjectById(projectId);
  },[projectId, projectsStore])
  const [removingEventId, setRemovingEventId] = useState<string>("-1")
  if (project === undefined) {
    return <div className="site-layout-content">
      <h1>Edit Project</h1>
      Loading project
    </div>
  } else {
    const eventColumns: ColumnsType<EventStoreType> = [
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
          (managers.find((m: AccountStoreType)=> m.id===managerId) as AccountStoreType).name
        )
      }
    ];
    const loadAddEventPage = (): void => history.push(`/project/${projectId}/add-event`);
    const onClickRow = (event: EventStoreType): void => {
      if(event.id) setRemovingEventId(event.id);
    }
    const onDoubleClickRow = (event: EventStoreType): void => history.push(`/project/${projectId}/event/${event.id}`);
    const deleteEvent = (): void => {
      const eventToRemove = project.events.find((e:EventStoreType) => e.id === removingEventId )
      if(eventToRemove) eventToRemove.remove();
      setRemovingEventId("-1");
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
            {project.endDate?.toLocaleDateString('ru')}
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
        <Button type="primary" onClick={loadAddEventPage}>
          Add Event
        </Button>
        {removingEventId !== "-1" &&
        <Button onClick={deleteEvent} type="primary" danger style={{marginLeft: 10}}>
          Delete Event</Button>}
        <CustomTable dataSource={project.events.toJS()} columns={eventColumns} onClickRow={onClickRow}
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
