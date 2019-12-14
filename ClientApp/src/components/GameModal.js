import React, {useState, forwardRef, useImperativeHandle} from 'react'
import {Modal, Spinner, Row, Col, ModalBody, ModalHeader} from 'reactstrap'
import './GameModal.css'

const GameModal = forwardRef((props, ref) => {

    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({});
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    function open(data) {

        console.log(data)

        setData(data);
        setLoading(false)
        setIsOpen(true);

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
    }

    function close() {
        setIsOpen(false);
    }

    function toggle() {
        setIsOpen(!isOpen);
    }

    function cleanup() {
        setVideos([])
        setData([])
    }

    useImperativeHandle(ref, () => {
        return {
            open: open,
            close: close,
            toggle: toggle
        };
    })

    function renderData() {

        let genre = data.details.Genre.uri.split("/");
        genre = genre[genre.length - 1];

        let developper = data.details.Developpeur ? data.details.Developpeur.uri.split("/") : [''];
        developper = developper[developper.length - 1];

        return (
            <React.Fragment>
                <Row>
                    <Col xs="12">
                        <ModalHeader align="center">{data.Nom.value} - <a href={"/categories?q=" + genre}>{genre}</a></ModalHeader>
                    </Col>
                    <Col xs="12">
                        <ModalBody>
                            <h2>Développé par {developper} {data.Wiki ? - <a target="_blank" href={data.Wiki.uri}>Wiki</a> : ""} </h2>
                            <p>{data.Resume.value}</p>
                            
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
        </Modal>
    )
})

export default GameModal;