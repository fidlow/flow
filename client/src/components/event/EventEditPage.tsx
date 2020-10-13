import { useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { ExecutionStatus } from "../../common/ExecutionStatus";
import CustomDatePicker from "../elements/CustomDatePicker";
import {
  executionStatuses,
  getTextFromExecutionStatus,
} from "../elements/ExecutionStatusMappers";
import { Store } from "antd/lib/form/interface";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { useStore } from "../StoreProvider";
import { EventStoreType } from "../../store/EventStore";
import CustomTable from "../elements/CustomTable";
import { ColumnsType } from "antd/es/table";
import { TaskStoreType } from "../../store/TaskStore";
import { TaskId } from "../../commonFromServer/TaskInterface";

function EventEditPage(): JSX.Element {
  const { projectId, eventId } = useParams<{
    projectId: string;
    eventId: string;
  }>();
  const [removingTaskId, setRemovingTaskId] = useState<TaskId>("");
  const history = useHistory();
  const { Option } = Select;
  const { projectsStore } = useStore();
  const { projects, managers } = projectsStore;
  useEffect(() => {
    projectsStore.loadProjectById(projectId);
  }, [projectId, projectsStore]);
  const project = projects.find((p) => p.id === projectId);
  const event = project?.events?.find((t) => t.id === eventId);
  if (project === undefined || event === undefined) {
    return (
      <div className="site-layout-content">
        <h1>Edit Event</h1>
        Loading event
      </div>
    );
  } else {
    const taskColumns: ColumnsType<TaskStoreType> = [
      { title: "Name", dataIndex: "name" },
    ];
    const loadAddTaskPage = (): void => history.push(`/project/${projectId}/event/${eventId}/add-task`);
    const onClickRow = (task: TaskStoreType): void =>
      setRemovingTaskId(task.id);
    const onDoubleCLickRow = (task: TaskStoreType): void =>
      history.push(`/project/${projectId}/event/${eventId}/task/${task.id}`);
    const deleteTask = (): void => {
      const taskTorRemove = event.tasks.find((t) => t.id === removingTaskId);
      if (taskTorRemove) taskTorRemove.remove();
      setRemovingTaskId("");
    };
    const onFinish = (values: Store): void => {
      const indexEvent = project.events?.findIndex(
        (p: EventStoreType) => p.id === eventId
      );
      if (project.events && indexEvent !== undefined && indexEvent !== -1) {
        project.updateEvent({
          ...event,
          ...(values as EventStoreType),
          endDate: values.endDate.toDate(),
        });
        history.push(`/project/${projectId}`);
      }
    };
    return (
      <div className="site-layout-content">
        <h1>Edit Event</h1>
        <Form
          onFinish={onFinish}
          initialValues={{ ...event, endDate: dayjs(event.endDate) }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input name of your event!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="End Date"
            name="endDate"
            rules={[
              { required: true, message: "Please End Date of your event!" },
            ]}
          >
            <CustomDatePicker />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[
              { required: true, message: "Please Status of your event!" },
            ]}
          >
            <Select>
              {executionStatuses.map((s) => (
                <Option key={s} value={s}>
                  {getTextFromExecutionStatus(s as ExecutionStatus)}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Manager"
            name="manager"
            rules={[
              {
                required: true,
                message: "Please input manager of your event!",
              },
            ]}
          >
            <Select>
              {managers.map((m) => (
                <Option key={m.id} value={m.id}>
                  {m.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Button type="primary" onClick={loadAddTaskPage}>
            Add Task
          </Button>
          {removingTaskId !== "" && (
            <Button
              onClick={deleteTask}
              type="primary"
              danger
              style={{ marginLeft: 10 }}
            >
              Delete Event
            </Button>
          )}
          <CustomTable
            dataSource={event.tasks.toJS()}
            columns={taskColumns}
            onClickRow={onClickRow}
            onDoubleClickRow={onDoubleCLickRow}
          />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default observer(EventEditPage);
