import React, {useReducer} from 'react';
import {Layout} from 'antd';
import {MainMenu} from "./MainMenu";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ProjectTablePage from "./project/ProjectTablePage";
import {DataContext, projectDataSource} from "../common/ProjectData";
import ProjectEditPage from "./project/ProjectEditPage";
import ProjectAddPage from "./project/ProjectAddPage";
import TaskAddPage from "./task/TaskAddPage";
import {TaskEditPage} from "./task/TaskEditPage";
import {dataReducer} from "../reducers";

function App(): JSX.Element {
    const [dataProjectState, dispatchProjectData] = useReducer(dataReducer, projectDataSource);

    const {Footer, Sider, Content} = Layout;
    return (
        <div className="App">
            <Layout className="layout">
                <BrowserRouter>
                    <Sider>
                        <div className="logo">ProjectFlow</div>
                        <MainMenu/>
                    </Sider>
                    <Layout>
                        <Content className="content">
                            <DataContext.Provider value={{dataProjectState, dispatchProjectData}}>
                                <Switch>
                                    <Route exact path="/" component={ProjectTablePage}/>
                                    <Route exact path="/add-project" component={ProjectAddPage}/>
                                    <Route exact path="/edit-project/:idProject" component={ProjectEditPage}/>
                                    <Route exact path="/edit-project/:idProject/add-task" component={TaskAddPage}/>
                                    <Route exact path="/edit-project/:idProject/edit-task/:idTask" component={TaskEditPage}/>
                                </Switch>
                            </DataContext.Provider>
                        </Content>
                        <Footer className="footer">(c) SuperCorp, 2020 </Footer>
                    </Layout>
                </BrowserRouter>
            </Layout>
        </div>
    );
}

export default App;
