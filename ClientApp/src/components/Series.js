import React, {useState, useEffect, useRef} from 'react'
import { Row, Col, Spinner } from 'reactstrap';
import './Categories.css'
import GameModal from './GameModal';


const Series = (props) => {
    const [q, setQ] = useState(props.location.search);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState([]);
    const modalRef = useRef(null);

    const serie = decodeURI(props.location.search.replace('?q=', ''));

    useEffect(() => {
        setLoading(true);
        const fetchGamesFromCategory = async () => {
            const data = await fetchData();
            setResult(data);
            setLoading(false);
        }

        fetchGamesFromCategory();
    }, []);

    function handleInspect(index) {
        modalRef.current.open(result[index]);
    }

    async function fetchData() {
        let req = await fetch('/SerieAPI?serie=' + serie); // Original q = '?q=<query>'
        let data = await req.json();
        
        let mergedData = merge(data);

        for (let i = 0; i  < mergedData.length; i++) {
            let game = mergedData[i].Nom.value;
            let img = await fetch('https://api.rawg.io/api/games?page_size=1&search=' + encodeURI(game));
            let imgData = await img.json();
            let imgurl = imgData.results[0].background_image;
        
            mergedData[i].Photo = {uri: imgurl};
        }
        

        return mergedData;
    }

    function merge(data){
        let prevId = [];
        let filteredData = [];
        data.forEach((row) => 
        {
            let id = row["Jeu"]["uri"];
            if(!prevId.includes(id))
            {
                prevId.push(id);
                filteredData.push(row);
            }
        });
        return filteredData;
    }

    return (
        <React.Fragment>
                <Row>
                    <Col xs="12" md="9">
                        <GameModal ref={modalRef}/>
                        <h1>Résultats de la recherche {decodeURI(serie)}</h1>
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
                                                    result.Photo !== undefined ? 
                                                    <img alt="alt" src={result.Photo.uri} className="result-image"/>
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

export default Series;