import React, {useState, useEffect, useRef} from 'react'
import { useHistory } from "react-router-dom";
import { Row, Col, Spinner } from 'reactstrap';
import SearchModal from './SearchModal';
import './Search.css'
import GameModal from './GameModal';

const Search = (props) => {

    const [q, setQ] = useState((props.location.search).replace('?q=', ''));
    const [loading, setLoading] = useState(false);
    const modalRef = useRef(null);
    const [result, setResult] = useState([
       
    ]);
    let history = useHistory();

    function merge(data){
        let prevId = [];
        let filteredData = [];
        data.forEach((row) => 
        {
            let id = row["Logiciel"]["uri"];
            if(!prevId.includes(id))
            {
                prevId.push(id);
                filteredData.push(row);
            } 
        });
        return filteredData;
    }

    useEffect(() => {
        const waitForResults = async () => {
            setLoading(true);
            let tmpData = await fetchData();
            setResult(tmpData);
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
        setLoading(true);
        let tmpData = await fetchData();
        setResult(tmpData);
        setLoading(false);

    }

    async function fetchData() {

        setLoading(true);
        let req = await fetch('/GamesAPI?q=' + q);
        let data = await req.json();
        let mergedData = merge(data);


        for (let i = 0; i  < mergedData.length; i++) {
            let game = mergedData[i].Nom.value;
            let img = await fetch('https://api.rawg.io/api/games?page_size=1&search=' + encodeURI(game));
            let imgData = await img.json();
            let imgurl = imgData.results[0].background_image;
        
            mergedData[i].Photo = {uri: imgurl};
        }
        
        setLoading(false);

        return mergedData;
    }

    return(
            <React.Fragment>
                <Row>
                    <Col xs="12" md="9">
                        <GameModal ref={modalRef}/>

                        <h1>Réultats de la recherche {decodeURI(q)}</h1>
                    </Col>
                    <Col xs="12" md="3">
                        <SearchModal handleSearch={handleSearch} handleSubmit={handleSubmit}/>
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
                                                { 
                                                    result["Photo"] ? 
                                                    <img alt="alt" src={result["Photo"]["uri"]} className="result-image"/>
                                                    : 
                                                    <img alt="alt" src="https://carlisletheacarlisletheatre.org/images/video-game-clipart-cool-9.png" className="result-image"/>

                                                }
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