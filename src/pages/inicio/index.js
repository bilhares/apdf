import React, { useState } from 'react';
import './styles.css';
import { Container, Row, Col, Card, Button, Form, Alert, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import api from '../../services/api';
import Loading from '../loading';

export default function Inicio() {
    const [loading, setLoading] = useState(false);
    const [arquivos, setArquivos] = useState([]);

    function saveFiles(files) {
        setArquivos(arquivos.concat(Array.from(files)));
    }

    function saveFile(files) {
        setArquivos(Array.from(files));
    }

    function cleanList() {
        setArquivos([]);
    }

    async function setJson(callback) {
        let data = [];
        for (var i = 0; i < arquivos.length; i++) {
            let base64 = await toBase64(arquivos[i]);
            data.push({ file: base64.split(',')[1] });
        }
        return callback(data);
    }

    async function mergePdfs() {
        if (arquivos.length > 0) {
            setLoading(true);
            setJson(async (data) => {
                let resp = await api.post('api/tools/merge-pdf', data);
                download('merge.pdf', resp.data.file);
                setLoading(false);
                cleanList();
            })
        } else {
            alert('Select a .pdf file to complete the action!')
        }
    }

    async function splitPdfs() {
        if (arquivos.length > 0) {
            setLoading(true);
            let base64 = await toBase64(arquivos[0]);
            await api.post('api/tools/split-pdf', { file: base64.split(',')[1] }).then(response => {
                download('splited.zip', response.data.file);
                setLoading(false);
                cleanList();
            })
        } else {
            alert('Select a .pdf file to complete the action!')
        }
    }

    async function paginatePdfs() {
        if (arquivos.length > 0) {
            setLoading(true);
            let base64 = await toBase64(arquivos[0]);
            await api.post('api/tools/paginate-pdf', { file: base64.split(',')[1] }).then(response => {
                download('paginate.pdf', response.data.file);
                setLoading(false);
                cleanList();
            })
        } else {
            alert('Select a .pdf file to complete the action!')
        }
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    function download(filename, data) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;base64,' + data);
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    return (
        <div>
            <div style={{ display: loading ? "block" : "none" }}>
                <Loading />
            </div>

            <Container >
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>

                        <h3 className="description"> Boss pdf tolls, is a simple site for handling .pdf documents, select the .pdf files, choose the desired tool and get the result.</h3>

                    </Col>
                </Row>
                <Row>
                    <Col className="itens" md={{ span: 4 }}>
                        <Form>
                            <Form.File
                                id="custom-file"
                                label="select your pdf file"
                                multiple
                                custom
                                accept=".pdf"
                                onChange={(e) => saveFiles(e.target.files)}
                            />
                        </Form>
                        {
                            arquivos.map((a, i) => (
                                <span key={i}> {a.name} </span>
                            ))
                        }
                    </Col>
                    <Col className="itens">
                        <Button onClick={cleanList} variant="link">Clean list</Button>
                    </Col>
                </Row>
                <Row >
                    <Col className="itens" md={{ span: 4 }} xs={12}>
                        <h4>Merge PDF's</h4>
                        <Alert variant='primary'>
                            Service designed to join several .PDF documents in one file only
                        </Alert>
                        {/* <Form>
                            <Form.File
                                id="custom-file"
                                label="select your pdf file"
                                multiple
                                custom
                                accept=".pdf"
                                onChange={(e) => saveFiles(e.target.files)}
                            />
                        </Form>
                        {
                            arquivos.map((a, i) => (
                                <p key={i}>{a.name}</p>
                            ))
                        } */}

                        <ButtonToolbar aria-label="Toolbar with button groups" className="group-actions">
                            <ButtonGroup className="mr-2" aria-label="Second group">
                                <Button variant="primary" onClick={mergePdfs}>Merge</Button>
                            </ButtonGroup>
                        </ButtonToolbar>

                    </Col>
                    <Col className="itens" md={{ span: 4, offset: 0 }} xs={12}>
                        <h4>Split PDF's</h4>
                        <Alert variant='success'>
                            Split one .PDF file per page and retrieve into a .ZIP file
                        </Alert>
                        {/* <Form>
                            <Form.File
                                id="custom-file"
                                label="select your pdf file"
                                custom
                                accept=".pdf"
                                onChange={(e) => saveFile(e.target.files)}
                            />
                        </Form> */}

                        <ButtonToolbar aria-label="Toolbar with button groups" className="group-actions">
                            <ButtonGroup className="mr-2" aria-label="Second group">
                                <Button variant="success" onClick={splitPdfs}>Split</Button>
                            </ButtonGroup>
                        </ButtonToolbar>

                    </Col>
                    <Col className="itens" md={{ span: 4, offset: 0 }} xs={12}>
                        <h4>Paginate PDF's</h4>
                        <Alert variant='warning'>
                            Paging a .PDF file by inserting number of pages at the bottom of the file
                        </Alert>
                        {/* <Form>
                            <Form.File
                                id="custom-file"
                                label="select your pdf file"
                                custom
                                accept=".pdf"
                                onChange={(e) => saveFiles(e.target.files)}
                            />
                        </Form> */}
                        <ButtonToolbar aria-label="Toolbar with button groups" className="group-actions">
                            <ButtonGroup className="mr-2" aria-label="Second group">
                                <Button variant="warning" onClick={paginatePdfs}>Paginate</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </Col>
                </Row>

            </Container>
        </div>
    )

}