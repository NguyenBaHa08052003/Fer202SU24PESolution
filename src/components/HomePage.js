import React from 'react'
import Header from './Header'
import {Col, Container, Row} from 'react-bootstrap'
import Sider from './Sider'
import Table from './Table'
function HomePage() {
  return (
    <Container>
      <Header/>
      <Row>
        <Col md={2}>
          <Sider/>
        </Col>
        <Col md={10}>
        <Table/>
        </Col>
      </Row>
    </Container>
  )
}

export default HomePage
