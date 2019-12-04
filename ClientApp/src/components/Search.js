import React, {useState, useEffect, useRef} from 'react'
import { useHistory } from "react-router-dom";
import { Row, Col, Spinner } from 'reactstrap';
import Categories from './Categories';
import './Search.css'
import GameModal from './GameModal';

const Search = (props) => {

    const [q, setQ] = useState(props.location.search);
    const [loading, setLoading] = useState(false);
    const modalRef = useRef(null);
    const [result, setResult] = useState([
       
    ]);
    let history = useHistory();

    useEffect(() => {
        const waitForResults = async () => {
            setLoading(true);
            let req = await fetch('/GamesAPI' + q); // Original q = '?q=<query>'
            let data = await req.json();
            console.log(data)
            setResult(data)
            setLoading(false);
        }
        waitForResults()
    }, [])

    function handleInspect(index) {
        modalRef.current.open(result[index]);
    }

    function handleSearch(e) {
        setQ(e.target.value);
    }

    function handleSubmit(e) {
        if (e.key === 'Enter') {
            fetchData();
			history.push(`/search?q=${q}`);
		}
    }

    async function fetchData() {
        setLoading(true);
        let req = await fetch('/GamesAPI?q=' + q);
        let data = await req.json();
        setResult(data);
        setLoading(false)
    }

    return(
            <React.Fragment>
                <GameModal ref={modalRef}/>
                <Row>
                    <Col xs="12" md="9">
                        <h1>Result set for {props.location.search.replace('?q=', '').replace(/%20/g, ' ')}</h1>
                    </Col>
                    <Col xs="12" md="3">
                        <Categories handleSearch={handleSearch} handleSubmit={handleSubmit}/>
                    </Col>
                </Row>
                <Row>
                </Row>
                {
                    loading 
                    ? (
                        <Row>
                            <Spinner className="loader" color="primary"/>
                        </Row>
                    )
                    : (
                        <Row className="results-container">
                            {
                                result.map((result, index) =>
                                        <Col xs="6" md="3" key={index}>
                                            <div className="result-container" onClick={() => handleInspect(index)}>
                                                <img alt="alt" src={result.image} className="result-image"/>
                                            </div>
                                            <p className="result-caption">{result.Nom.value}</p>
                                        </Col>
                                )
                            }
                        </Row>
                    )
                }
                
            </React.Fragment>
    )
}

export default Search;