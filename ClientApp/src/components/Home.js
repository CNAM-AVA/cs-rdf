import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Categories from './Categories';

const Home = (props) => {
	return(
		<Container fluid>
			<Row>
				<Col xs="12" md="8">
					<h1>Rechercher</h1>
					<input />
				</Col>
				<Col xs="12" md="4">
					<Categories/>
				</Col>
			</Row>
		</Container>
	)
}

export default Home;