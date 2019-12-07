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

            for(let i = 0; i < data.length; i++) {
                let args = data[i].Logiciel.uri.split("/");
                let term = args[args.length -1 ].replace("_(video_game)", "").replace("'", "\s");
                let details = await fetch("/GameAPI?game=" + term);
                let detailsJson = await details.json();

                data[i].details = detailsJson[0];

            }

            setResult(data);
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

    async function handleSubmit(e) {
        if (e.key === 'Enter') {
            await fetchDetails();
			history.push(`/search?q=${q}`);
		}
    }

    async function fetchDetails() {

        let tmpData = await fetchData();

        console.log(tmpData)

        for(let i = 0; i < tmpData.length; i++) {
            let args = tmpData[i].Logiciel.uri.split("/");
            let term = args[args.length -1 ].replace("_(video_game)", "").replace("'", "\s");
            let details = await fetch("/GameAPI?game=" + term);
            let detailsJson = await details.json();

            tmpData[i].details = detailsJson[0];

        }

        setResult(tmpData);
        setLoading(false);
    }

    async function fetchData() {
        setLoading(true);
        let req = await fetch('/GamesAPI?q=' + q);
        let data = await req.json();

        return data;
    }

    return(
            <React.Fragment>
                <Row>
                    <Col xs="12" md="9">
                        <GameModal ref={modalRef}/>

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