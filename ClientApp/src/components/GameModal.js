import React, {useState, useEffect, forwardRef, useImperativeHandle} from 'react'
import {Modal} from 'reactstrap'
import './GameModal.css'

const GameModal = forwardRef((props, ref) => {

    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({});
    const [infos, setInfos] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const dataHeaders = null;
    
    function open(data) {
        setData(data);
        setIsOpen(true);
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
    }

    function close() {
        setIsOpen(false);
    }

    function toggle() {
        setIsOpen(!isOpen);
    }

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
    }

    useImperativeHandle(ref, () => {
        return {
            open: open,
            close: close,
            toggle: toggle
        };
    })

    return(
        <Modal isOpen={isOpen} toggle={toggle}>
            <div>
                <img src={data.image} className="modal-image"/>
                <p>{data.name}</p>
                <p>{ isLoaded ?
                    showInfos(infos[0]) : ''
                }</p>
            </div>
        </Modal>
    )
})

export default GameModal;