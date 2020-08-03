import {ColumnsType} from "antd/lib/table";
import {Table} from "antd";
import React from "react";

export default function CustomTable<T extends object>(props: {
  dataSource?: T[];
  columns: ColumnsType<T>;
  onClickRow?(record: T): void;
  onDoubleClickRow?(record: T): void;
}): JSX.Element {
  return <>
    <Table dataSource={props.dataSource} columns={props.columns} rowKey="id"
           onRow={(record: T): object => {
             return {
               onClick: (): void | undefined => props.onClickRow && props.onClickRow(record),
               onDoubleClick: (): void | undefined => props.onDoubleClickRow && props.onDoubleClickRow(record),
             };
           }}
    />
  </>;
}
