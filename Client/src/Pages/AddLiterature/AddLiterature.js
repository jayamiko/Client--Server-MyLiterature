// Import React
import { useState } from "react";
import React, { useContext } from "react";
import { AuthContext } from '../../Context/AuthContextProvider';
import { pdfjs, Document, Page } from "react-pdf";

// Import Style
import './AddLiterature.css';
import { Form, Button } from "react-bootstrap";
import attache from '../../Images/attache.png';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Import Components
import Navbar from '../../Components/Navbar/Navbar';

// import API
import { API } from '../../config/api'

toast.configure()
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function AddLiterature() {

    const { stateAuth } = useContext(AuthContext);
    const [preview, setPreview] = useState(null);

    const [input, setInput] = useState({
        title: "",
        publication_date: "",
        userId: stateAuth.user.id,
        pages: "",
        isbn: "",
        author: "",
        attache: "",
    });

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]:
                e.target.type === "file" ? e.target.files : e.target.value,
        });

        if (e.target.type === "file") {
            const filePDF = e.target.files;

            for (const file of filePDF) {
                setPreview(URL.createObjectURL(file));
            }
        }
    };

    const handleSubmit = async (e) => {
        try {
            const config = {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            };
            const data = new FormData();
            for (let i = 0; i < input.attache.length; i++) {
                data.append("attache", input.attache[i]);
            }
            data.set("title", input.title);
            data.set("publication_date", input.publication_date);
            data.set("userId", stateAuth.user.id);
            data.set("pages", input.pages);
            data.set("isbn", input.isbn);
            data.set("author", input.author);

            const response = await API.post("/literature", data, config);

            if (response?.status === 200) {
                setInput({
                    title: "",
                    userId: stateAuth.user?.id,
                    publication_date: null,
                    pages: "",
                    isbn: "",
                    author: "",
                    attache: "",
                });

                setPreview(null);

                toast.success(`Add Literature Successful`, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000
                })
            }

        } catch (error) {
            console.log(error);
            toast.info(`Please enter the data correctly`, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000
            })
        }
    };

    return (
        <>
            <Navbar />

            <Form style={{ width: "1285px", height: "650px", paddingLeft: "100px", marginTop: "20px" }}>
                <Form.Label>
                    <p className="title-add-literature">Add Literature</p>
                </Form.Label>

                {/* TITLE */}
                <Form.Group className="mb-3">
                    <Form.Control
                        className="inputAdd"
                        type="text"
                        name="title"
                        id="title"
                        placeholder='Title'
                        style={{
                            color: '#FFFFFF',
                            fontFamily: 'Avenir',
                            fontSize: '18px',
                            lineHeight: '25px',
                            paddingLeft: '10px'
                        }}
                        onChange={handleChange}
                        value={input.title}
                    />
                </Form.Group>

                {/* PUBLICATION DATE */}
                <Form.Group className="mb-3">
                    <Form.Control
                        className="inputAdd"
                        type="date"
                        name="publication_date"
                        id="publication_date"
                        placeholder='Publication Date'
                        style={{
                            color: '#FFFFFF',
                            fontFamily: 'Avenir',
                            fontSize: '18px',
                            lineHeight: '25px',
                            paddingLeft: '10px'
                        }}
                        onChange={handleChange}
                    />
                </Form.Group>

                {/* PAGES */}
                <Form.Group className="mb-3">
                    <Form.Control
                        className="inputAdd"
                        type="text"
                        name="pages"
                        id="pages"
                        placeholder='Pages'
                        style={{
                            color: '#FFFFFF',
                            fontFamily: 'Avenir',
                            fontSize: '18px',
                            lineHeight: '25px',
                            paddingLeft: '10px'
                        }}
                        onChange={handleChange}
                        value={input.pages}
                    />
                </Form.Group>

                {/* ISBN */}
                <Form.Group className="mb-3">
                    <Form.Control
                        className="inputAdd"
                        type="text"
                        name="isbn"
                        id="isbn"
                        placeholder='ISBN'
                        style={{
                            color: '#FFFFFF',
                            fontFamily: 'Avenir',
                            fontSize: '18px',
                            lineHeight: '25px',
                            paddingLeft: '10px'
                        }}
                        onChange={handleChange}
                        value={input.isbn}
                    />
                </Form.Group>

                {/* AUTHOR */}
                <Form.Group className="mb-3">
                    <Form.Control
                        className="inputAdd"
                        type="text"
                        name="author"
                        id="author"
                        placeholder='Author,'
                        style={{
                            color: '#FFFFFF',
                            fontFamily: 'Avenir',
                            fontSize: '18px',
                            lineHeight: '25px',
                            paddingLeft: '10px'
                        }}
                        onChange={handleChange}
                        input={""}
                    />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                    <label className="ml-3">

                        {preview && (
                            <div className="mt-3">
                                <Document file={preview}>
                                    <Page
                                        pageNumber={1}
                                        width={200}
                                        height={270}
                                        className="frame-pdf"
                                    />
                                </Document>
                            </div>
                        )}

                        <div className='attache-input'>
                            <img src={"attache"}
                                placeholder="Attache Book File"
                                fluid alt="Attache Book File"
                                className="attache-style"
                            />
                            <img src={attache} alt=""
                                className="attache-icon" />
                        </div>

                        <input
                            type="file"
                            hidden
                            name="attache"
                            placeholder='Attache Book File'
                            onChange={handleChange}
                            accept=".pdf,.PDF"
                            required
                            multiple
                        />
                    </label>
                </Form.Group>
                <Button
                    variant="warning"
                    className="buttonAdd"
                    onClick={handleSubmit}
                >
                    <b>Add Literature</b>
                </Button>
            </Form>
        </>
    )
}