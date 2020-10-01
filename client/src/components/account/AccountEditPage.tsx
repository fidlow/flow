import React from "react"
import { useStore } from "../StoreProvider";

function AccountEditPage(): JSX.Element  {
  const { userStore: {user} } = useStore();
  return <div className="site-layout-content">
    My name: {user?.name}
  </div>
}

export default AccountEditPage
