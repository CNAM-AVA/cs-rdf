import React, {useState, useEffect, forwardRef, useImperativeHandle} from 'react'
import {Modal} from 'reactstrap'
import './GameModal.css'

const GameModal = forwardRef((props, ref) => {

    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({});

    function open(data) {
        setData(data);
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
    }

    function toggle() {
        setIsOpen(!isOpen);
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
            <img src={data.image} className="modal-image"/>
            <p>{data.name}</p>
        </Modal>
    )
})

export default GameModal;