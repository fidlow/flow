import { useStore } from "../StoreProvider";
import React, { useState } from "react";
import { ValidateStatus } from "antd/lib/form/FormItem";
import { Store } from "antd/lib/form/interface";
import { UpdateAccountDto } from "../../store/UserStore";
import { Button, Form, Input } from "antd";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

function AccountEditPage():JSX.Element {
  const { projectsStore } = useStore();
  const { managers } = projectsStore;
  const { accountId } = useParams<{
    accountId: string;
  }>();
  const account = managers.find((m) => m.id === accountId);
  const [confirmValidateStatus, setConfirmValidateStatus] = useState<
    ValidateStatus
    >("");
  const [passwordValidateStatus, setPasswordValidateStatus] = useState<
    ValidateStatus
    >("");
  const onFinishAccount = (values: Store): void => {
    if (values.new_password === values.confirm_password) {
      setConfirmValidateStatus("");
      setPasswordValidateStatus("");
      projectsStore.updateAccount(values as UpdateAccountDto).catch((error) => {
        if (error.message === "PasswordWrong")
          setPasswordValidateStatus("error");
      });
    } else setConfirmValidateStatus("error");
  };
  return (
    <div className="site-layout-content">
      <Form name="basic" onFinish={onFinishAccount} initialValues={account}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: false, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: false, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="New password"
          name="new_password"
          rules={[{ required: false, message: "Please input your password!" }]}
          validateStatus={passwordValidateStatus}
          help={passwordValidateStatus !== "" ? "Wrong password." : null}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Repeat new password"
          name="confirm_password"
          rules={[{ required: false, message: "Please input your password!" }]}
          validateStatus={confirmValidateStatus}
          help={confirmValidateStatus !== "" ? "Wrong confirm password." : null}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>)
}

export default observer(AccountEditPage);
