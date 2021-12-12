// Import React
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import Components
import CollectionsPDF from '../../Components/Collections/collectionsPDF'

// Import Style
import iconPDF from '../../Images/pdf-file.png'

// Import API
import { API } from "../../config/api";

export default function MyLiteature({ stateAuth }) {
    const [myLiterature, setMyLiterature] = useState([])

    const getMyLiterature = async () => {
        try {
            const response = await API.get(`/profile/${stateAuth}/literatures`);
            setMyLiterature(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMyLiterature();
    }, []);


    return (
        <>
            {myLiterature.length !== 0 ? (
                <section className="my-collections mt-5">
                    <div className="container-literature">
                        <div className="row">
                            {myLiterature.map((item, index) => (
                                <div
                                    key={item.id}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Link to={`/detail-literature/${item.id}`}
                                        style={{
                                            textDecoration: "none",
                                        }}>
                                        <CollectionsPDF
                                            attache={item.attache}
                                            title={item.title}
                                            status={item?.status}
                                            author={item.author}
                                            publication_date={item.publication_date}
                                        />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : (
                <div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            opacity: '70%'
                        }}>
                        <img src={iconPDF} alt=""
                            style={{
                                width: '350px',
                                height: '350px',
                            }} />
                    </div>
                    <h3
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            opacity: '70%',
                        }}
                    >Empty My Literature</h3>
                </div>


            )}
        </>
    )
}