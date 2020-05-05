import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import './styles.css';
import api from '../../services/api';
import Loading from '../loading';

export default function Paginar() {

    const [arquivos, setArquivos] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getFiles(files) {
        setArquivos(Array.from(files));
    }

    async function paginarPdf() {
        setLoading(true);
        let base64 = await toBase64(arquivos[0]);
        await api.post('api/tools/paginate-pdf', { file: base64.split(',')[1] }).then(response => {
            download('paginate.pdf', response.data.file);
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
                                custom
                                accept=".pdf"
                                onChange={(e) => getFiles(e.target.files)}
                            />
                        </Form>
                    </Col>
                </Row>
                <Button variant="primary" onClick={paginarPdf}>Paginar</Button>
                {
                    arquivos.map((a, i) => (
                        <p key={i}>{a.name}</p>
                    ))
                }
            </Container>
        </div>
    );


}