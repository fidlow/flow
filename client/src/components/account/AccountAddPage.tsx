import { observer } from "mobx-react-lite";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { ValidateStatus } from "antd/lib/form/FormItem";
import { Store } from "antd/lib/form/interface";
import { useStore } from "../StoreProvider";
import { AccountStoreType } from "../../store/AccountStore";
import { useHistory } from "react-router-dom";

function AccountAddPage(): JSX.Element {
  const history = useHistory();
  const { projectsStore } = useStore();
  const [confirmValidateStatus, setConfirmValidateStatus] = useState<
    ValidateStatus
  >("");
  const [passwordValidateStatus, setPasswordValidateStatus] = useState<
    ValidateStatus
  >("");
  const onFinishAccount = (values: Store): void => {
    if (values.password === values.confirm_password) {
      setConfirmValidateStatus("");
      projectsStore
        .addAccount(values as AccountStoreType)
        .then(() => {
          history.push("/accounts");
        })
        .catch((error: Error) => {
          if (error.message === "PasswordWrong" || error.name === "400")
            setPasswordValidateStatus("error");
        });
    } else setConfirmValidateStatus("error");
  };
  return (
    <div className="site-layout-content">
      <Form name="basic" onFinish={onFinishAccount}>
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
          label="Password"
          name="password"
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
    </div>
  );
}

export default observer(AccountAddPage);
