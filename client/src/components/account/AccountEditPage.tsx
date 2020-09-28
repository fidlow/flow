import React from "react"
import { useStore } from "../StoreProvider";

function AccountEditPage(): JSX.Element  {
  const { userStore } = useStore();
  return <div className="site-layout-content">
    {userStore.name}
  </div>
}

export default AccountEditPage
