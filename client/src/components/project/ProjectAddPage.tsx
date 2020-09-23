import {useHistory} from "react-router-dom";
import React from "react";
import {Store} from "antd/lib/form/interface";
import {Button, Form, Input} from "antd";
import {Project} from "../../entities/project.entity";
import { useStore } from "../StoreProvider";
import { ProjectStoreType } from "../../store/ProjectStore";

export default function ProjectAddPage(): JSX.Element {
  const history = useHistory();
  const { projectsStore } = useStore();
  const initProject = new Project('')
  const onFinish = (values: Store): void => {
    projectsStore.addProject(values as ProjectStoreType);
    history.push('/')
  };

  return <div className="site-layout-content">
    <h1>Add Project</h1>
    <Form
      name="basic"
      initialValues={initProject}
      onFinish={onFinish}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{required: true, message: 'Please input name of your project!'}]}
      >
        <Input/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </div>
}
