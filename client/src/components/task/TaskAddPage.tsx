import {Button, Form, Input, Select} from "antd";
import {Redirect, useHistory, useParams} from "react-router-dom";
import React from "react";
import {Store} from "antd/lib/form/interface";
import {ExecutionStatus} from "../../common/ExecutionStatus";
import {executionStatuses, generateId, getTextFromExecutionStatus} from "../elements/ExecutionStatusMappers";
import CustomDatePicker from "../elements/CustomDatePicker";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { useStore } from "../StoreProvider";

function TaskAddPage(): JSX.Element {
  const {projectId} = useParams();
  const history = useHistory();
  const {Option} = Select;
  const { projectsStore } = useStore();
  const { projects } = projectsStore;
  const project = projects.find((p) => p.id === projectId);
  if (project === undefined) {
    return <Redirect to="/"/>
  } else {
    const onFinish = (values: Store): void => {
      project.addTask({
        id: generateId(),
        manager: values.manager,
        name: values.name,
        status: values.status,
        endDate: values.endDate.toDate()
      });
      history.push(`/project/${projectId}`)
    };
    return <div className="site-layout-content">
      <h1>Add Task</h1>
      <Form
        onFinish={onFinish}
        initialValues={{name: '', endDate: dayjs(new Date()), status: ExecutionStatus.NotRunning}}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{required: true, message: 'Please input name of your task!'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="End Date"
          name="endDate"
          rules={[{required: true, message: 'Please End Date of your task!'}]}
        >
          <CustomDatePicker/>
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{required: true, message: 'Please End Date of your task!'}]}
        >
          <Select>
            {executionStatuses.map(s =>
              <Option key={s} value={s}>{getTextFromExecutionStatus(s as ExecutionStatus)}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item
          label="Manager"
          name="manager"
          rules={[{required: true, message: 'Please input manager of your task!'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>

      </Form></div>
  }

}
export default observer(TaskAddPage)
