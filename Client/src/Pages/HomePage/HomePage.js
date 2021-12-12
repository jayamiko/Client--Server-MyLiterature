// Import React
import { useState } from "react";

// Import Style
import './Search.css'
import { Button } from "react-bootstrap";
import iconLiterature from '../../Images/icon-lg.png'
import iconSearch from '../../Images/icon-search.png'
import { toast } from 'react-toastify'
import iconPDF from '../../Images/pdf-file.png'
import 'react-toastify/dist/ReactToastify.css'

// Import Components
import Navbar from '../../Components/Navbar/Navbar'
import CollectionsPDF from "../../Components/Collections/collectionsPDF";

// Import API
import { API } from "../../config/api";

toast.configure()

export default function SearchResult() {
    const [search, setSearch] = useState("");
    const [resultSearch, setResultSearch] = useState([]);
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);

    const handleChangeYears = (e) => {
        setSelectedYear(e.target.value);
    };

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const publication_year = (data) => {
        const pub_years = data.map((item) => {
            return item.publication_date.split("-")[0];
        });

        const uniqueYears = pub_years
            .filter((value, index) => {
                return pub_years.indexOf(value) === index;
            })
            .sort((x, y) => {
                return y - x;
            });

        setYears(uniqueYears);
        setSelectedYear(uniqueYears[uniqueYears.length - 1]);
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const response = await API.get(`literature?title=${search}`);

            setResultSearch(response.data.data);

            publication_year(response.data.data);

            if (search === "" && resultSearch.length !== 0) {
                toast.info('your search is not in our library', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000
                })
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container-search-page">
                {resultSearch.length !== 0 && search !== "" ? (
                    <main className="py-4">
                        <div className="container">
                            <div className="formModal" style={{
                                width: 600,
                                marginLeft: '120px',
                                position: 'absolute',
                                bottom: '540px',
                            }}>
                                <form className="formGroup" onSubmit={handleSearch}
                                    style={{ marginRight: '15px' }}
                                >
                                    <input
                                        className="inputSearch"
                                        type="search"
                                        placeholder="Search for literature"
                                        aria-label="Search"
                                        onChange={handleChange}
                                        value={search}
                                    />
                                    <Button
                                        className="searchButton"
                                        variant="warning"
                                        type="submit"
                                        required>
                                        <img src={iconSearch} alt='icon-search' />
                                    </Button>
                                </form>
                            </div>
                            <div className="result-search">
                                <div className="row-result">
                                    <div className="anytime">
                                        <p
                                            style={{
                                                textAlign: 'start',
                                                paddingLeft: '80px',
                                                paddingBottom: '10px',
                                            }}
                                        >Anytime</p>
                                        <select
                                            className="formSelect"
                                            name="year"
                                            id="year"
                                            value={selectedYear}
                                            onChange={handleChangeYears}
                                        >
                                            {years.map((item, index) => (
                                                <option value={item} key={`year-${index}`}
                                                    style={{ background: 'grey' }}
                                                >
                                                    Since {item}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="box-literature-result">
                                        <div className="row">
                                            {resultSearch
                                                .filter((item) => {
                                                    if (
                                                        item?.publication_date.split("-")[0] >= selectedYear
                                                    ) {
                                                        return item;
                                                    }
                                                })
                                                .map((item, index) => (
                                                    <div className="col-3" key={`result-search-${index}`}
                                                        style={{
                                                            marginLeft: '20px',
                                                        }}
                                                    >
                                                        {item?.status === "Approve" ? (
                                                            <CollectionsPDF
                                                                attache={item?.attache}
                                                                literatureId={item?.id}
                                                                status={item?.status}
                                                                title={item?.title}
                                                                author={item?.author}
                                                                publication_date={item?.publication_date}
                                                            />
                                                        ) : (
                                                            <>
                                                            </>
                                                        )}
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                ) : (
                    <div
                        className="boxSearch"
                        style={{ height: "100vh" }}
                    >
                        <img src={iconLiterature} alt="Literature Logo"
                            style={{
                                position: 'absolute',
                                top: '220px',
                                right: '520px'
                            }}
                        />
                        <div className="formModal" style={{
                            width: 600,
                            marginLeft: '450px',
                            marginTop: '50px'
                        }}>
                            <form className="formGroup" onSubmit={handleSearch}>
                                <input
                                    className="inputSearch"
                                    type="search"
                                    placeholder="Search for literature"
                                    aria-label="Search"
                                    onChange={handleChange}
                                    value={search}
                                />
                                <Button
                                    className="searchButton"
                                    variant="warning"
                                    type="submit"
                                    required>
                                    <img src={iconSearch} alt='icon-search' />
                                </Button>
                            </form>
                        </div>
                    </div>
                )
                }
            </div >
        </>
    );
}