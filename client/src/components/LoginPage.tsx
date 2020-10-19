import { Button, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import { Store } from "antd/lib/form/interface";
import { useStore } from "./StoreProvider";
import { AccountStoreType } from "../store/AccountStore";
import { ValidateStatus } from "antd/lib/form/FormItem";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 24 },
};

export function LoginPage(): JSX.Element {
  const { userStore } = useStore();
  const [validateStatus, setValidateStatus] = useState<ValidateStatus>("");
  const onFinish = (values: Store): void => {
    userStore.login(values as AccountStoreType).catch((error) => {
      setValidateStatus("error");
      console.log("error", error);
    });
  };
  const onFinishFailed = (errorInfo: Store) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          requiredMark={false}
          size="large"
          style={{ width: "500px" }}
        >
          <Form.Item
            label="Email"
            name="email"
            validateStatus={validateStatus}
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            validateStatus={validateStatus}
            help={
              validateStatus !== ""
                ? "Wrong email or password."
                : null
            }
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
