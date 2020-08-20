/* eslint-disable */

import {ColumnsType} from "antd/lib/table";
import {Table} from "antd";
import { Project } from "../../entities/project.entity";
import { Task } from "../../entities/task.enitity";
import { RootStoreModel } from "../../store/RootStore";
import React from "react";
import { ProjectStoreType } from "../../store/ProjectStore";

// eslint-disable-next-line @typescript-eslint/ban-types
export default function CustomTable<T extends object>(props: {
  dataSource?: T[] ;
  columns: ColumnsType<T>;
  onClickRow?(record: T): void;
  onDoubleClickRow?(record: T): void;
}): JSX.Element {
  return <>
    <Table dataSource={props.dataSource} columns={props.columns} rowKey="id"
           onRow={(record: T): Record<string, unknown> => {
             return {
               onClick: (): void | undefined => props.onClickRow && props.onClickRow(record),
               onDoubleClick: (): void | undefined => props.onDoubleClickRow && props.onDoubleClickRow(record),
             };
           }}
    />
  </>;
}
