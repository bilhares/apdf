import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FiEdit, FiArrowDown, FiFileMinus, FiFilePlus, FiLink } from 'react-icons/fi';

export default function Home() {
    return (
        <div>
            
            <Container >
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <h1>Advanced PDF</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 4, offset: 5 }}>
                        <p>TOOLS</p>
                    </Col>
                </Row>
                <Row >
                    <Link className="link" to="assinar-pdf">
                        <Card border="primary">
                            <Card.Header><FiEdit className="card-icon" size={25} /></Card.Header>
                            <Card.Body>
                                <Card.Title>Assinar PDF</Card.Title>
                                <Card.Text>
                                    Insira uma assiantura eletronica em um arquivo selecionado.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                    <Link className="link" to="https://google.com.br">
                        <Card border="primary" >
                            <Card.Header><FiArrowDown className="card-icon" size={25} /></Card.Header>
                            <Card.Body>
                                <Card.Title>Comprimir PDF</Card.Title>
                                <Card.Text>
                                    Diminua o tamanho do seu arquivo PDF sem perder a qualidade.
                                 </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                    <Link className="link" to="dividir-pdf">
                        <Card border="primary">
                            <Card.Header><FiFileMinus className="card-icon" size={25} /></Card.Header>
                            <Card.Body>
                                <Card.Title>Dividir PDF</Card.Title>
                                <Card.Text>
                                    Divida as folhas de seu arquivo PDF.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                    <Link className="link" to="juntar-pdf">
                        <Card border="primary">
                            <Card.Header><FiFilePlus className="card-icon" size={25} /></Card.Header>
                            <Card.Body>
                                <Card.Title>Juntar PDF</Card.Title>
                                <Card.Text>
                                    Concatenar vários arquivos PDF formando um só.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                    <Link className="link" to="paginar-pdf">
                        <Card border="primary">
                            <Card.Header><FiLink className="card-icon" size={25} /></Card.Header>
                            <Card.Body>
                                <Card.Title>Paginar PDF</Card.Title>
                                <Card.Text>
                                    Inserir números de pagina em um pdf existente.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Row>
            </Container>
        </div>
    );
}