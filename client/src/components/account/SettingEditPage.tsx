import { useStore } from "../StoreProvider";
import React from "react";
import { observer } from "mobx-react-lite";
import { Button, Form, Input } from "antd";
import { UpdateAccountDto } from "../../store/UserStore";
import { Store } from "antd/lib/form/interface";

function SettingEditPage(): JSX.Element {
  const { userStore } = useStore();
  const {user} = userStore;
    const onFinishAccount = (values: Store): void => {
    if(values.new_password === values.confirm_password)
      userStore.update(values as UpdateAccountDto);
  }
  return <div className="site-layout-content">
    <Form
      name="basic"
      onFinish={onFinishAccount}
      initialValues={user}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{required: true, message: 'Please input your name!'}]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{required: true, message: 'Please input your email!'}]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="Old password"
        name="old_password"
        rules={[{required: false, message: 'Please input your old password!'}]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="New password"
        name="new_password"
        rules={[{required: false, message: 'Please input your password!'}]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Repeat new password"
        name="confirm_password"
        rules={[{required: false, message: 'Please input your password!'}]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </div>
}

export default observer(SettingEditPage);
