import React, { useReducer } from "react";
import { dataReducer } from "../reducers";
import { DataContext, projectDataSource } from "../common/ProjectData";
import { Layout as LayoutAntd } from "antd";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MainMenu } from "./MainMenu";
import ProjectTablePage from "./project/ProjectTablePage";
import ProjectAddPage from "./project/ProjectAddPage";
import ProjectEditPage from "./project/ProjectEditPage";
import TaskAddPage from "./task/TaskAddPage";
import { TaskEditPage } from "./task/TaskEditPage";

export function Layout(): JSX.Element {
  const [dataProjectState, dispatchProjectData] = useReducer(
    dataReducer,
    projectDataSource
  );
  const { Footer, Sider, Content } = LayoutAntd;
  return <div className="App">
    <LayoutAntd className="layout">
      <BrowserRouter>
        <Sider>
          <div className="logo">ProjectFlow</div>
          <MainMenu/>
        </Sider>
        <LayoutAntd>
          <Content className="content">
            <DataContext.Provider
              value={{
                dataProjectState,
                dispatchProjectData
              }}
            >
              <Switch>
                <Route exact path="/" component={ProjectTablePage}/>
                <Route exact path="/add-project" component={ProjectAddPage}/>
                <Route
                  exact
                  path="/project/:idProject"
                  component={ProjectEditPage}
                />
                <Route
                  exact
                  path="/project/:idProject/add-task"
                  component={TaskAddPage}
                />
                <Route
                  exact
                  path="/project/:idProject/task/:idTask"
                  component={TaskEditPage}
                />
              </Switch>
            </DataContext.Provider>
          </Content>
          <Footer className="footer">(c) SuperCorp, 2020 </Footer>
        </LayoutAntd>
      </BrowserRouter>
    </LayoutAntd>
  </div>;
}
