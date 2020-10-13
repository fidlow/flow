import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { Store } from "antd/lib/form/interface";
import { useStore } from "../StoreProvider";
import { useHistory, useParams } from "react-router-dom";
import { ProjectStoreType } from "../../store/ProjectStore";
import { TaskStoreType } from "../../store/TaskStore";
import { observer } from "mobx-react-lite";

function TaskAddPage(): JSX.Element {
  const { projectId, eventId } = useParams<{ projectId: string;
    eventId: string;}>();
  const history = useHistory();
  const { projectsStore } = useStore();
  const { projects } = projectsStore;
  useEffect(() => {
    projectsStore.loadProjectById(projectId);
  }, [projectId, projectsStore]);
  const project = projects.find((p: ProjectStoreType) => p.id === projectId);
  const event = project?.events?.find((t) => t.id === eventId);
  if (project === undefined || event === undefined)
    return <div className="site-layout-content">
    <h1>Add Task</h1>
    Loading page
  </div>;
  else {
    const onFinish = (values: Store): void => {
      event.addTask(values as TaskStoreType );
      history.push(`/project/${projectId}/event/${eventId}`)
    };
    return <div className="site-layout-content">
      <h1>Add Task</h1>
      <Form
        onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{required: true, message: 'Please input name of your task!'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  }

}

export default observer(TaskAddPage)
