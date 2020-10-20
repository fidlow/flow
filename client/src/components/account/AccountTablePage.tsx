import React, { useEffect, useState } from "react";
import { useStore } from "../StoreProvider";
import CustomTable from "../elements/CustomTable";
import { ColumnsType } from "antd/lib/table";
import { AccountStoreType } from "../../store/AccountStore";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { RoleStoreType } from "../../store/RoleStore";
import { Button } from "antd";

function AccountTablePage(): JSX.Element  {
  const history = useHistory();
  const { projectsStore } = useStore();
  const {managers} = projectsStore;
  useEffect(() => {
    projectsStore.loadAccounts().catch(() =>
    history.push('/'));
  },[projectsStore, history])
  const [removingManagerId, setRemovingManagerId] = useState<string>("-1");
  const managerColumns: ColumnsType<AccountStoreType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      defaultSortOrder: "ascend",
      sorter: (a, b): number => {
        return new Intl.Collator().compare(a.toString(), b.toString());
      }
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Roles",
      dataIndex: "roles",
      render: (value: RoleStoreType[]): JSX.Element => (
        <span>
          {value.map(v => v.name)}
        </span>
      )
    },
  ];
  const onClickRow = (account: AccountStoreType): void => {
    if (account.id) setRemovingManagerId(account.id);
  };
  const onDoubleClickRow = (account: AccountStoreType): void =>
    history.push(`/account/${account.id}`);
  const onDeleteAccountClick =  (): void => {
    const accountToRemove = managers.find(
      (a:AccountStoreType) => a.id === removingManagerId
    )
    if(accountToRemove) projectsStore.deleteAccount(accountToRemove);
    setRemovingManagerId("-1");
  };
  const loadAddAccountPage = (): void => history.push("/add-account");
  return <div className="site-layout-content">
    <Button onClick={loadAddAccountPage} type="primary" className="button">
      Add Account
    </Button>
    {removingManagerId !== "-1" && (
      <Button
        onClick={onDeleteAccountClick}
        type="primary"
        danger
        className="button"
        style={{ marginLeft: 10 }}
      >
        Delete Account
      </Button>
    )}
    <CustomTable
      dataSource={managers.toJS()}
      columns={managerColumns}
      onClickRow={onClickRow}
      onDoubleClickRow={onDoubleClickRow}
    />
  </div>
}

export default observer(AccountTablePage)
