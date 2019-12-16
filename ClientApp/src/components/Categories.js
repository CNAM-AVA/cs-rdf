import React, {useState, useEffect, useRef} from 'react'
import { useHistory } from "react-router-dom";
import { Row, Col, Spinner } from 'reactstrap';
import './Categories.css'
import GameModal from './GameModal';


const Categories = (props) => {
    const [q, setQ] = useState(props.location.search);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState([]);
    const modalRef = useRef(null);

    const genre = props.location.search.replace('?q=', '').replace(/%20/g, ' ');

    useEffect(() => {
        setLoading(true);
        const fetchGamesFromCategory = async () => {
            const req = await fetch("/GenreAPI?genre=" + genre);
            const data = await req.json();

            for (let i = 0; i  < data.length; i++) {
                let game = data[i].Nom.value;
                let img = await fetch('https://api.rawg.io/api/games?page_size=1&search=' + encodeURI(game));
                let imgData = await img.json();
                let imgurl = imgData.results[0].background_image;
            
                data[i].Photo = {uri: imgurl};
            }

            setResult(data);
            setLoading(false);
        }

        fetchGamesFromCategory();
    }, []);

    function handleInspect(index) {

        let tmpPayload = {
            Nom: {value:  result[index].Nom.value},
            Resume: result[index].Resume.value,
            details: result[index]
        }

        modalRef.current.open(tmpPayload);
    }

    return (
        <React.Fragment>
                <Row>
                    <Col xs="12" md="9">
                        <GameModal ref={modalRef}/>
                        <h1>Résultats de la recherche {genre}</h1>
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

export default Categories;