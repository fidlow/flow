import {Button, Form, Input, Select} from "antd";
import {Redirect, useHistory, useParams} from "react-router-dom";
import React from "react";
import {Store} from "antd/lib/form/interface";
import {ExecutionStatus} from "../../common/ExecutionStatus";
import {executionStatuses, getTextFromExecutionStatus} from "../elements/ExecutionStatusMappers";
import CustomDatePicker from "../elements/CustomDatePicker";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { useStore } from "../StoreProvider";
import { EventStoreType } from "../../store/EventStore";

function EventAddPage(): JSX.Element {
  const {projectId} = useParams();
  const history = useHistory();
  const {Option} = Select;
  const { projectsStore, managersStore: {managers} } = useStore();
  const { projects } = projectsStore;
  const project = projects.find((p) => p.id === projectId);
  if (project === undefined) {
    return <Redirect to="/"/>
  } else {
    const onFinish = (values: Store): void => {
      project.addEvent({ ...values as EventStoreType, endDate: values.endDate.toDate()} );
      history.push(`/project/${projectId}`)
    };
    return <div className="site-layout-content">
      <h1>Add Event</h1>
      <Form
        onFinish={onFinish}
        initialValues={{name: '', endDate: dayjs(new Date()), status: ExecutionStatus.NotRunning}}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{required: true, message: 'Please input name of your event!'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="End Date"
          name="endDate"
          rules={[{required: true, message: 'Please End Date of your event!'}]}
        >
          <CustomDatePicker/>
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{required: true, message: 'Please End Date of your event!'}]}
        >
          <Select>
            {executionStatuses.map(s =>
              <Option key={s} value={s}>{getTextFromExecutionStatus(s as ExecutionStatus)}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item
          label="Manager"
          name="manager"
          rules={[{required: true, message: 'Please input manager of your event!'}]}
        >

          <Select>
            {managers.map(m =>
              <Option key={m.id} value={m.id}>{m.name}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>

      </Form></div>
  }

}
export default observer(EventAddPage)
