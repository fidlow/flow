import {useHistory} from "react-router-dom";
import React, {useContext} from "react";
import {DataContext} from "../../common/ProjectData";
import {Store} from "antd/lib/form/interface";
import {Button, Form, Input} from "antd";
import {ProjectReducer} from "../../reducers";
import {Project} from "../../entities/project.entity";

export default function ProjectAddPage(): JSX.Element {
  const history = useHistory();
  const {dispatchProjectData} = useContext(DataContext);
  const onFinish = (values: Store): void => {
    const project = new Project(values.name, new Date())
    dispatchProjectData({
      type: ProjectReducer.Add,
      payload: project
    });
    history.push('/')
  };

  return <div className="site-layout-content">
    <h1>Add Project</h1>
    <Form
      name="basic"
      initialValues={new Project("", new Date())}
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
