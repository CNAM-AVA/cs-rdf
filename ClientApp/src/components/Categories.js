import React, { useState, useEffect } from 'react';
import {
    Card, CardBody,
    CardTitle, Collapse,
    Container, Row, Col
} from 'reactstrap';
import './Categories.css';

const Categories = (props) => {

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
        <div>
            <Card inverse color="primary">
                <CardBody>
                        <Row>
                            <Col xs="10">
                                <CardTitle>Catégories</CardTitle>
                            </Col>
                            <Col xs="2">

                                <div id="icon-wrapper" className="icon-wrapper" onClick={toggle}>
                                    <div id="icon" className="plus icon"></div>
                                </div>
                            </Col>
                        </Row>
                        <Collapse isOpen={collapse}>
                            <Row>
                                <Col xs="12">
                                    {
                                        categories.map(category => <button key={category}>{category}</button>)
                                    }
                                </Col>
                            </Row>
                        </Collapse>
                </CardBody>
            </Card>
        </div>
    )
}
export default Categories;