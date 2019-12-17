import React, { useState, useEffect } from 'react';
import {
    Card, CardBody,
    Row, Col
} from 'reactstrap';
import './SearchModal.css';

const SearchModal = (props) => {

    const [categories, setCategories] = useState([]);
    const [collapse, setCollapse] = useState(false);

    useEffect(() => {
        // Fetch the categories
        setCategories([
            'MMO', 'RTS', 'FPS', 'Action', 'Aventure'
        ])
    }, []);

    function toggle() {
        let icon = document.getElementById('icon');
        setCollapse(!collapse);

        if (collapse) {
            icon.classList.add('plus');
            icon.classList.remove('remove');
        } else {
            icon.classList.add('remove');
            icon.classList.remove('plus');
        }
    }

    return (
        <div className="tool-box">
            <Card inverse color="primary">
                <CardBody>
                        <Row>
                            <Col xs="12">
                                <input className="search-input" placeholder="New search" onKeyPress={props.handleSubmit} onChange={props.handleSearch} />
                            </Col>
                        </Row>
                </CardBody>
            </Card>
        </div>
    )
}
export default SearchModal;