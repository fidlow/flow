import { observer } from "mobx-react-lite";
import CustomTable from "../elements/CustomTable";
import React, { useEffect } from "react";
import { ColumnsType } from "antd/lib/table";
import { EventStoreType } from "../../store/EventStore";
import { ExecutionStatus } from "../../common/ExecutionStatus";
import { Badge } from "antd";
import { getBadgeFromExecutionStatus, getTextFromExecutionStatus } from "../elements/ExecutionStatusMappers";
import { AccountStoreType } from "../../store/AccountStore";
import { useHistory } from "react-router-dom";
import { useStore } from "../StoreProvider";

function EventTablePage(): JSX.Element  {
  const history = useHistory();
  const { projectsStore } = useStore();
  const { projects, managers } = projectsStore;
  useEffect(() => {
    //projectsStore.loadEventsWithProject();
  },[projectsStore])
  const eventColumns: ColumnsType<EventStoreType> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      defaultSortOrder: "ascend",
      sorter: (a, b): number => a.endDate.getDate() - b.endDate.getDate(),
      render: (value: Date): string => (
        value.toLocaleDateString('ru')
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b): number => a.status - b.status,
      render: (value: ExecutionStatus): JSX.Element => (
        <span>
            <Badge status={getBadgeFromExecutionStatus(value)}/>
          {getTextFromExecutionStatus(value)}
          </span>
      )
    },
    {
      title: 'Manager',
      dataIndex: 'manager',
      render: (managerId: string): string => (
        (managers.find((m: AccountStoreType)=> m.id===managerId) as AccountStoreType).name
      )
    }
  ];

  return (
    <div className="site-layout-content">
      <br />
      <CustomTable
        dataSource={projects[0].events.toJS()}
        columns={eventColumns}
      />
    </div>
  );
}

export default observer(EventTablePage);
