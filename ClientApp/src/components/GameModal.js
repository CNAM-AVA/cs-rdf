import React, {useState, forwardRef, useImperativeHandle} from 'react'
import {Modal, Spinner, Row, Col, ModalBody, ModalHeader} from 'reactstrap'
import './GameModal.css'

const GameModal = forwardRef((props, ref) => {

    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({});
<<<<<<< HEAD
    const [infos, setInfos] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const dataHeaders = null;
    
=======
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

>>>>>>> master
    function open(data) {
        setData(data);
        setLoading(false)
        setIsOpen(true);
<<<<<<< HEAD
        // fetch('https://jsonplaceholder.typicode.com/todos/1')
        //     .then(response => response.json())
        //     .then(json => console.log(json));

        fetch('https://localhost:5001/GameAPI?game='+data.id)
            .then(res => res.json())
            // .then(data => setInfos(data));
            .then(
                (result) => {
                    setIsLoaded(true);
                    setInfos(result);
                },
                (error) => {
                    setIsLoaded(false);
                    console.log(error);
                });
=======

        fetch('/VideosAPI?q=' + data.Nom.value).then((res) => res.json()).then((data) => {
            let vids = [];

            data.map((v, i) => {
                let id = v.substring(v.lastIndexOf("[|") + 2, v.lastIndexOf("|]"));
                let title = v.replace(`[|${id}|]`);

                vids.push({
                    id: id,
                    title: title
                })
            });

            setVideos(vids)
        })
>>>>>>> master
    }

    function close() {
        setIsOpen(false);
    }

    function toggle() {
        setIsOpen(!isOpen);
    }

<<<<<<< HEAD
    function showInfos(infos) {
        console.log(infos);
        return (
            <div>
                <p>Nom: {infos["Jeu"]["value"]}</p>
                <p>Genre: {infos["Genre"]["uri"]}</p>
                <p>Developpeur: {infos["Developpeur"]["uri"]}</p>
                <p>Plateforme: {infos["Plateforme"]["uri"]}</p>
                <p>Resumé: {infos["Resume"]["value"]}</p>
                <p>Wiki: <a href='{infos["Wiki"]["uri"]}'>{infos["Wiki"]["uri"]}></a></p>
            </div>
        )
=======
    function cleanup() {
        setVideos([])
        setData([])
>>>>>>> master
    }

    useImperativeHandle(ref, () => {
        return {
            open: open,
            close: close,
            toggle: toggle
        };
    })

    function renderData() {
        return (
            <React.Fragment>
                <Row>
                    <Col xs="12">
                        <ModalHeader align="center">{data.Nom.value}</ModalHeader>
                    </Col>
                    <Col xs="12">
                        <ModalBody align="center">
                            <p>{data.Resume.value}</p>
                            <a target="_blank" href={data.Wiki.uri}>Wiki</a>
                        </ModalBody>
                    </Col>
                </Row>
                <Row>
                    {
                        videos.map((video, index) => 
                            <Col xs="12" md="6" key={index}>
                                <iframe 
                                    className="video-iframe"
                                    allowFullScreen="allowFullScreen"
                                    src={`https://www.youtube.com/embed/${video.id}?ecver=1&iv_load_policy=1&autohide=2&color=red`}
                                    allowtransparency="true"
                                ></iframe>
                            </Col>
                        )
                    }
                </Row>
            </React.Fragment>
        )
    }

    return(
<<<<<<< HEAD
        <Modal isOpen={isOpen} toggle={toggle}>
            <div>
                <img src={data.image} className="modal-image"/>
                <p>{data.name}</p>
                <p>{ isLoaded ?
                    showInfos(infos[0]) : ''
                }</p>
            </div>
=======
        <Modal isOpen={isOpen} toggle={toggle} size="lg">
            {
                loading 
                ? (
                    <Spinner className="loader" color="primary"/>
                )
                : (
                    renderData()
                )
            }
>>>>>>> master
        </Modal>
    )
})

export default GameModal;