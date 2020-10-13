import React from "react";
import { Layout as LayoutAntd } from "antd";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MainMenu } from "./MainMenu";
import ProjectTablePage from "./project/ProjectTablePage";
import ProjectAddPage from "./project/ProjectAddPage";
import ProjectEditPage from "./project/ProjectEditPage";
import EventAddPage from "./event/EventAddPage";
import EventEditPage from "./event/EventEditPage";
import AccountEditPage from "./account/AccountEditPage";
import { useStore } from "./StoreProvider";
import { LoginPage } from "./LoginPage";
import { observer } from "mobx-react-lite";
import TaskAddPage from "./task/TaskAddPage";
import TaskEditPage from "./task/TaskEditPage";

function Layout(): JSX.Element {
  const { userStore: {user} } = useStore();
  const { Footer, Sider, Content } = LayoutAntd;
  return <div className="App">
    {user ? <LayoutAntd className="layout">
        <BrowserRouter>
          <Sider>
            <div className="logo">ProjectFlow</div>
            <Content>
              <MainMenu/>
            </Content>
          </Sider>
          <LayoutAntd>
            <Content className="content">
              <Switch>
                <Route exact path="/" component={ProjectTablePage}/>
                <Route exact path="/add-project" component={ProjectAddPage}/>
                <Route
                  exact
                  path="/project/:projectId"
                  component={ProjectEditPage}
                />
                <Route
                  exact
                  path="/project/:projectId/add-event"
                  component={EventAddPage}
                />
                <Route
                  exact
                  path="/project/:projectId/event/:eventId"
                  component={EventEditPage}
                />
                <Route
                  exact
                  path="/project/:projectId/event/:eventId/add-task"
                  component={TaskAddPage}
                />
                <Route
                  exact
                  path="/project/:projectId/event/:eventId/task/:taskId"
                  component={TaskEditPage}
                />
                <Route
                  exact
                  path="/account"
                  component={AccountEditPage}
                />
              </Switch>
            </Content>
            <Footer className="footer">(c) SuperCorp, 2020 </Footer>
          </LayoutAntd>
        </BrowserRouter>
      </LayoutAntd>
      : <LoginPage/>
    }

  </div>;
}

export default observer(Layout)
