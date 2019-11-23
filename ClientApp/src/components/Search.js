import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import { Row, Col } from 'reactstrap';
import Categories from './Categories';
import './Search.css'

const Search = (props) => {

    const [q, setQ] = useState(props.location.search);
    let history = useHistory();

    useEffect(() => {
        fetchQuery();
    }, [])

    function handleSearch(e) {
        setQ(e.target.value);
    }

    function handleSubmit(e) {
        if (e.key === 'Enter') {
            fetchQuery();
			history.push(`/search?q=${q}`);
		}
    }

    async function fetchQuery() {
        console.log("fetching")
    }

    return(
            <Row>
                <Col xs="6" md="8">
                    <h1>Result set for {props.location.search.replace('?q=', '')}</h1>
                </Col>
                <Col xs="12" md="4">
					<Categories handleSearch={handleSearch} handleSubmit={handleSubmit}/>
				</Col>
            </Row>
    )
}

export default Search;