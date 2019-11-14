import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Categories from './Categories';
import './Home.css'

const Home = (props) => {
	return (
		<Container fluid>
			<Row>
				<Col className="search" xs="12" md="6">
					<h1>Rechercher</h1>
					<input />
				</Col>
				{/* <Col xs="12" md="4">
					<Categories />
				</Col> */}
			</Row>
		</Container>
	)
}

export default Home;