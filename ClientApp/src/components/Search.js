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
        {
            name: "Call of duty",
            image: "https://s2.gaming-cdn.com/images/products/4810/271x377/luigis-mansion-3-switch-cover.jpg",
            price: 69.99
        },
        {
            id: "Death_Stranding",
            name: "Death Stranding",
            image: "http://image.jeuxvideo.com/medias-sm/157245/1572454042-5093-jaquette-avant.jpg",
            price: 70
        },
        {
            name: "Pokemon Shield",
            image: "https://s3.gaming-cdn.com/images/products/4076/orig/pokemon-shield-switch-cover.jpg",
            price: 70
        },
        {
            id: "The_Legend_of_Zelda:_Breath_of_the_Wild",
            name: "The Legend of Zelda: Breath of the Wild",
            image: "https://images-na.ssl-images-amazon.com/images/I/71kZkXN3MAL.jpg",
            price: 70
        },
        {
            id: "Red_Dead_Redemption_2",
            name: "Red Dead Redemption 2",
            image: "https://i.jeuxactus.com/datas/jeux/r/e/red-dead-redemption-2/l/red-dead-redemption-2-jaq-5aea4be9c5b3d.jpg",
            price: 70
        }
    ]);
    let history = useHistory();

    useEffect(() => {
        const waitForResults = async () => {
            setLoading(true);
            await fetchData();
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
        await new Promise(resolve => {
            setTimeout(resolve, 3000);
        })

        setResult(result);
    }

    return(
            <React.Fragment>
                <GameModal ref={modalRef}/>
                <Row>
                    <Col xs="12" md="9">
                        <h1>Result set for {props.location.search.replace('?q=', '')}</h1>
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
                                                <img src={result.image} className="result-image"/>
                                            </div>
                                            <p className="result-caption">{result.name}</p>
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