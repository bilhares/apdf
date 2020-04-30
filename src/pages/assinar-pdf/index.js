import React, { useState } from 'react';

import { Container, Row, Col, FormControl } from 'react-bootstrap';
import './styles.css';

export default function Assinar() {

    const [pdf, setPdf] = useState('');

    async function mostrarPdf(files) {
        let base64 = await toBase64(files[0]);
        setPdf(base64);
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    return (
        <div>
            <Container>
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <FormControl type="file" onChange={(e) => mostrarPdf(e.target.files)} />
                    </Col>
                </Row>

                <iframe className="framePdf" src={pdf} />
            </Container>
        </div>
    )
} 