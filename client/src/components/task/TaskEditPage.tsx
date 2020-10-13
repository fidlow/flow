import { useHistory, useParams } from "react-router-dom";
import { useStore } from "../StoreProvider";
import React, { useEffect } from "react";
import { ProjectStoreType } from "../../store/ProjectStore";
import { Store } from "antd/lib/form/interface";
import { TaskStoreType } from "../../store/TaskStore";
import { Button, Form, Input } from "antd";
import { observer } from "mobx-react-lite";

function TaskEditPage(): JSX.Element {
  const { projectId, eventId, taskId } = useParams<{
    projectId: string;
    eventId: string;
    taskId: string;
  }>();
  const history = useHistory();
  const { projectsStore } = useStore();
  const { projects } = projectsStore;
  useEffect(() => {
    projectsStore.loadProjectById(projectId);
    console.log('project')
  }, [projectId, projectsStore]);
  const project = projects.find((p: ProjectStoreType) => p.id === projectId);
  const event = project?.events?.find((e) => e.id === eventId);
  const task = event?.tasks?.find((t) => t.id === taskId);
  if (project === undefined || event === undefined || task === undefined)
    return <div className="site-layout-content">
      <h1>Edit Task</h1>
      Loading page
    </div>;
  else {
    const onFinish = (values: Store): void => {
      console.log(values)
      event.updateTask({...values, id: task.id} as TaskStoreType);
      history.push(`/project/${projectId}/event/${eventId}`)
    };
    return <div className="site-layout-content">
      <h1>Edit Task</h1>
      <Form
        onFinish={onFinish}
      initialValues={task}>
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

export default observer(TaskEditPage)
