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
        let prevId = "";
        let filteredData = [];
        // let cols = [];
        let previous = {};
        let current = {};
        let prevPlat;
        let currPlat;
        data.forEach((row) => 
        {
            let id = row["Logiciel"]["uri"];
            if(prevId !== id)
            {
                prevId = id;
                current = row;
                filteredData.push(row);
                console.log('prevId : ', prevId);
            } 
            // else 
            // {
            //     previous = current;
            //     current = row;
            //     if(previous["Plateforme"]["uri"] !== current["Plateforme"]["uri"]){
            //         prevPlat = previous["Plateforme"]["uri"].substring(previous["Plateforme"]["uri"].lastIndexOf('/') + 1).replace(/\-/g, " ");
            //         currPlat = current["Plateforme"]["uri"].substring(current["Plateforme"]["uri"].lastIndexOf('/') + 1).replace(/\_/g, " ");
            //         console.log(filteredData[filteredData.length - 1]["Plateforme"]);
            //         if(filteredData[filteredData.length - 1]["Plateforme"]["uri"]){

            //             filteredData[filteredData.length - 1]["Plateforme"] = [prevPlat, currPlat];
            //         }
            //         else
            //         {
            //             filteredData[filteredData.length - 1]["Plateforme"].push(currPlat);
            //         }
            //     }
            // }
        });
        return filteredData;
    }

    useEffect(() => {
        const waitForResults = async () => {
            setLoading(true);
            console.log(q)
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
        // setLoading(true);
        // let req = await fetch('/GamesAPI?q=' + q);
        // let data = await req.json();

        // return data;

        let req = await fetch('/GamesAPI?q=' + q); // Original q = '?q=<query>'
        let data = await req.json();

        for(let i = 0; i < data.length; i++) {
            let args = data[i].Logiciel.uri.split("/");
            let term = args[args.length -1 ].replace("_(video_game)", "").replace("'", "\s");
            let details = await fetch("/GameAPI?game=" + term);
            let detailsJson = await details.json();

            data[i].details = detailsJson[0];

        }
        
        let mergedData = merge(data);
        console.log(mergedData);

        return mergedData;
    }

    return(
            <React.Fragment>
                <Row>
                    <Col xs="12" md="9">
                        <GameModal ref={modalRef}/>

                        <h1>Result set for {props.location.search.replace('?q=', '').replace(/%20/g, ' ')}</h1>
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
                                                    result.details.Photo ? 
                                                    <img alt="alt" src={result.details.Photo.uri} className="result-image"/>
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