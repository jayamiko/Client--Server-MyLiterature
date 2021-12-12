// Import React
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { AuthContext } from '../../Context/AuthContextProvider';

// import Style
import './MyCollections.css';
import iconPDF from '../../Images/pdf-file.png'

// Import Components
import Navbar from '../../Components/Navbar/Navbar';
import CollectionsPDF from '../../Components/Collections/collectionsPDF';

// Import API
import { API } from '../../config/api'

export default function MyCollections() {

    const { stateAuth } = useContext(AuthContext);

    const [myCollections, setMyCollections] = useState([]);

    const getMyCollections = async () => {
        try {
            const response = await API.get(`/collection/${stateAuth.user?.id}`);

            setMyCollections(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMyCollections();
    }, []);


    return (
        <>
            <Navbar />
            <div className='container-mycollections'>
                <p className="title-mycollections">My Collections</p>
                <div>
                    {myCollections.length < 1 ? (
                        <div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginTop: '50px',
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
                            >Empty Collections</h3>
                        </div>
                    ) : (
                        <>
                            <div className='mycollections'>
                                {
                                    myCollections.map((item, index) => (
                                        <CollectionsPDF
                                            attache={item?.literature.attache}
                                            literatureId={item?.literature.id}
                                            title={item?.literature.title}
                                            status={item?.literature.status}
                                            author={item?.literature.author}
                                            publication_date={item?.literature.publication_date}
                                        />
                                    ))
                                }
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}