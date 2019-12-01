import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useHistory } from "react-router-dom";
import './Home.css'

const Home = (props) => {

	const [search, setSearch] = useState("");
	let history = useHistory();

	useEffect(() => {

	}, [])

	function submit(e) {
		if (e.key === 'Enter') {
			history.push(`/search?q=${search}`);
		}
	}

	function handleSearch(e) {
		setSearch(e.target.value);
	}

	return (
		<Container fluid>
			<Row>
				<Col className="search" xs="12" md="6">
					<h1>Rechercher</h1>
					<input onKeyPress={submit} onChange={handleSearch} />
				</Col>
			</Row>
		</Container>
	)
}

export default Home;