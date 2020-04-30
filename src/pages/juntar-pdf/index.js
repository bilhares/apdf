import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import './styles.css';
import api from '../../services/api';
import Menu from '../menu';

export default function Juntar() {

    const [arquivos, setArquivos] = useState([]);
    const [pdf, setPdf] = useState('');

    async function getFiles(files) {
        console.log(files);
        setArquivos(arquivos.concat(Array.from(files)));
    }

    function limparLista() {
        setArquivos([]);
        setPdf('');
    }
    async function montarJson(callback) {
        let data = [];
        for (var i = 0; i < arquivos.length; i++) {
            let base64 = await toBase64(arquivos[i]);
            data.push({ file: base64.split(',')[1] });
        }
        return callback(data);
    }

    async function juntarPdfs() {
        montarJson(async (data) => {
            let resp = await api.post('api/tools/merge-pdf', data);
            setPdf('data:application/pdf;base64,' + resp.data.file);
        })
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    return (
        <div>
            <Menu />
            <Container >
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        {/* <FormControl  type="file" onChange={(e) => getFiles(e.target.files)} />; */}
                        <Form>
                            <Form.File
                                id="custom-file"
                                label="Custom file input"
                                multiple
                                custom
                                onChange={(e) => getFiles(e.target.files)}
                            />
                        </Form>
                    </Col>
                </Row>

                <Button onClick={limparLista} variant="secondary">Limpar</Button>
                <Button variant="primary" onClick={juntarPdfs}>Juntar</Button>
                {
                    arquivos.map((a, i) => (
                        <p key={i}>{a.name}</p>
                    ))
                }
                <div style={{ display: pdf ? "block" : "none" }}>
                    <iframe className="framePdf" src={pdf} />
                </div>

            </Container>
        </div>
    );

}