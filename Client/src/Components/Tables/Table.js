import React from "react";
import { useEffect, useState } from "react";
import { Container, Button, Table, Card } from "react-bootstrap";

// Import Style
import "./Table.css";
import Check from '../../Images/check.png'
import Cancel from '../../Images/cancel.png'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Import API
import { API } from "../../config/api";
import { Children } from "react";

toast.configure()

export default function TableVerification() {

    const [literatures, setLiteratures] = useState([]);

    const getLiteratures = async () => {
        try {
            const response = await API.get("/literatures");

            setLiteratures(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAction = async (literatureId, status) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const body = JSON.stringify({ status });
            const response = await API.put(
                `/literature/${literatureId}`,
                body,
                config
            );

            if (response?.status === 200) {
                toast.success(`${status} Success`, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000
                })
            }

            getLiteratures();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getLiteratures();
    }, []);

    return (
        <>
            <Container className='container-table'>
                <h1 className="title-verification mt-5 mb-4">
                    Book verification
                </h1>
                <Card className='card-table'>
                    <Card.Body >
                        <Table hover className="table-body"
                        >
                            <thead>
                                <tr className="tb-header">
                                    <th style={{ paddingLeft: '10px', width: '90px' }}>No</th>
                                    <th style={{ paddingLeft: '10px', width: '250px' }}>Users or Author</th>
                                    <th style={{ paddingLeft: '10px', width: '130px' }}>ISBN</th>
                                    <th style={{ paddingLeft: '10px', width: '375px' }}>Literature</th>
                                    <th style={{ paddingLeft: '10px', width: '200px' }}>Status</th>
                                    <th style={{ paddingLeft: '10px', width: '250px' }}>Action</th>
                                </tr>
                            </thead>
                            {literatures.map((item, index) => (
                                <tbody>
                                    <tr key={`data-${index}`}>
                                        <td className="text-center"
                                        >{index + 1}</td>
                                        <td>{item?.author}</td>
                                        <td>{item?.isbn}</td>
                                        <td>
                                            <a
                                                href={item?.attache.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-info text-decoration-none"
                                                style={{
                                                    textDecoration: 'none',
                                                    color: '#0058DD'
                                                }}
                                            >
                                                {item?.title}.pdf
                                            </a>
                                        </td>
                                        <td className="text-primary">
                                            <div
                                                className={`fw-bold ${(item?.status === "Waiting Approve" &&
                                                    "status-warning") ||
                                                    (item?.status === "Approve" && "status-success") ||
                                                    (item?.status === "Cancel" && "status-cancel")
                                                    }`}
                                            >
                                                {item?.status === "Waiting Approve"
                                                    ? "Waiting to be verified"
                                                    : item?.status}
                                            </div>
                                        </td>
                                        <td className="row-action"
                                            style={{ width: '250px' }}
                                        >
                                            {item?.status === "Waiting Approve" && (
                                                <>
                                                    <Button className="btn-dangers"
                                                        onClick={() => {
                                                            handleAction(item.id, "Cancel");
                                                        }}>
                                                        Cancel
                                                    </Button>
                                                    <Button className="btn-succes"
                                                        onClick={() => {
                                                            handleAction(item.id, "Approve");
                                                        }}>
                                                        Approve
                                                    </Button>
                                                </>
                                            )}
                                            {item?.status === "Approve" && (
                                                <div className="text-center">
                                                    <img src={Check} alt="status-check" />
                                                </div>
                                            )}
                                            {item?.status === "Cancel" && (
                                                <div className="text-center">
                                                    <img src={Cancel} alt="status-cancel"
                                                        style={{
                                                            width: '40px',
                                                            height: '40px'
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}