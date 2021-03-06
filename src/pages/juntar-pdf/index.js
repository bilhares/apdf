import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import './styles.css';
import api from '../../services/api';
import Loading from '../loading';



export default function Juntar() {

    const [arquivos, setArquivos] = useState([]);
    const [pdf, setPdf] = useState('');
    const [loading, setLoading] = useState(false);

    async function getFiles(files) {
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
        setLoading(true);
        montarJson(async (data) => {
            let resp = await api.post('api/tools/merge-pdf', data);
            // setPdf('data:application/pdf;base64,' + resp.data.file);
            download('merge.pdf', resp.data.file);
            setLoading(false);
        })
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
                    <Col md={{ span: 4, offset: 4 }}>
                        {/* <FormControl  type="file" onChange={(e) => getFiles(e.target.files)} />; */}
                        <Form>
                            <Form.File
                                id="custom-file"
                                label="Custom file input"
                                multiple
                                custom
                                accept=".pdf"
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