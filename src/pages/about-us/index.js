import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';

export default function About() {

    return (
        <div>
            <Container >
                <Row>
                    <Col className="itens" md={{ span: 6, offset: 3 }}>
                        <p className="about-label">Developed by:</p>
                        <ul>
                            <li className="about-text">Felipe Bilhares</li>
                        </ul>
                        <p className="about-label">Contact:</p>
                        <ul>
                            <li className="about-text"><b>Email:</b> <a href="#"> felipe.bilhares@hotmail.com</a></li>
                            <li className="about-text"><b>Github:</b> <a target="_blank" href="https://github.com/bilhares"> https://github.com/bilhares</a> </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}