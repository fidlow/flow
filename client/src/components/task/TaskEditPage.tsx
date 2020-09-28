import {Redirect, useHistory, useParams} from "react-router-dom";
import React from "react";
import {Button, Form, Input, Select} from "antd";
import {ExecutionStatus} from "../../common/ExecutionStatus";
import CustomDatePicker from "../elements/CustomDatePicker";
import {executionStatuses, getTextFromExecutionStatus} from "../elements/ExecutionStatusMappers";
import {Store} from "antd/lib/form/interface";
import dayjs from "dayjs";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons/lib";
import { observer } from "mobx-react-lite";
import { useStore } from "../StoreProvider";
import { TaskStoreType } from "../../store/TaskStore";

function TaskEditPage(): JSX.Element {
  const { projectId, taskId } = useParams();
  const history = useHistory();
  const {Option} = Select;
  const { projectsStore: { projects }, managersStore: {managers} } = useStore();
  const project = projects.find((p) => p.id === projectId);
  const task = project?.tasks?.find((t) => t.id === taskId);
  if (project === undefined || task === undefined || taskId === undefined) {
    return <Redirect to="/"/>
  } else {
    const onFinish = (values: Store): void => {
      const indexTask = project.tasks?.findIndex((p) => p.id === taskId);
      if(project.tasks && indexTask !== undefined && indexTask !== -1 ) {
        project.updateTask({...task, ...values as TaskStoreType,endDate: values.endDate.toDate()})
        history.push(`/project/${projectId}`)
      }
    };
    return <div className="site-layout-content">
      <h1>Edit Task</h1>
      <Form
        onFinish={onFinish}
        initialValues={{name: task.name, endDate: dayjs(task.endDate), status: task.status, manager: task.manager, jobs: task.jobs}}
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
          rules={[{required: true, message: 'Please Status of your task!'}]}
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
          <Select>
            {managers.map(m =>
              <Option key={m.id} value={m.id}>{m.name}</Option>)}
          </Select>
        </Form.Item>
        <Form.List name="jobs">
          {(fields, { add, remove }): JSX.Element => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Form.Item
                    style={index === 0 ? {} : {marginLeft:'40px'}}
                    label={index === 0 ? 'Jobs' : ''}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Please input job or delete this field.",
                        },
                      ]}
                      noStyle
                    >
                      <Input placeholder="job name" style={{ width: '60%'}} />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        style={{ margin: '0 8px' }}
                        onClick={(): void => {
                          remove(field.name);
                        }}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={(): void => {
                      add();
                    }}
                    style={{ width: '60%', marginLeft:'40px' }}
                  >
                    <PlusOutlined /> Add jobs
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>

      </Form></div>
  }
}
export default observer(TaskEditPage)
