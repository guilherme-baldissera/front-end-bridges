import React from 'react';
import {Switch, Route, Redirect} from 'react-router'
import AllBridges from "./containers/PageAllBridges";
import AddBridge from "./containers/PageAddBridge";
import {HashRouter} from 'react-router-dom'
import styled from "styled-components";
import background from "./assets/background.jpeg";
import { Link } from 'react-router-dom'

const Container = styled.div`
        background-image: url(${background});
        height: -webkit-fill-available;
        background-size: cover;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        `

const Nav = styled.ul`
        display: inline-flex;
        right: 5%;
        position: absolute;
        margin: 0;
        padding: 0;
    `
const Item = styled.li`
        display: inline-block;
        margin: 0 10%;
        a {
            color: #3e3e3e;
            text-decoration: none;
            font-weight: bold;
            font-size: 24px;
        }        
        a:hover {
          cursor: pointer;
          text-decoration: underline;
        }
        a:active {
          text-decoration: underline;
          box-shadow: none;
          top: 5px;
        }
    `
const Header = styled.div`
        align-items: center;
        margin: 0;
        padding: 0;
        width: 100%;
        position: absolute;
        top: 0;
        height: 20%;
        display: flex;
        flex-flow: row;
    `
const Title = styled.div`
        color: #3e3e3e;
        font-weight: bold;
        font-size: 48px;
        position: absolute;
        left: 5%;
        span {
            font-size: 14px;
        }
    `

export default function App() {
  return (
      <HashRouter>
      <Container>
          <Header>
              <Title>
                  Build Bridges <span> not walls</span>
              </Title>
              <Nav>
                  <Item>
                      <Link to={"/addBridge"}>New</Link>
                  </Item>
                  <Item>
                    <Link to={"/allBridges"}>Bridges</Link>
                  </Item>
              </Nav>
          </Header>
          <Switch>
              <Route path='/allBridges' component={AllBridges}/>
              <Route path='/addBridge' component={AddBridge}/>
              <Redirect from='*' to='/allBridges'/>
          </Switch>
      </Container>
    </HashRouter>
  )
}
