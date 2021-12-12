// Import React
import { Link } from "react-router-dom";

// Import Icon
import NotFound from "../Images/not-found.png";

export default function NotFoundPage() {
    return (
        <div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}>
                <img src={NotFound} alt="Not Found"
                    style={{
                        width: '700px',
                        height: '500px',
                        marginLeft: '400px',
                        marginTop: '70px'
                    }} />
                <Link to="/" type="button"
                    style={{ textDecoration: 'none' }}
                >
                    <div style={{
                        background: 'maroon',
                        color: 'white',
                        width: '225px',
                        textAlign: 'center',
                        borderRadius: '10px',
                        padding: '10px',
                        marginTop: '10px',
                        marginLeft: '650px'
                    }}>Back To Home</div>
                </Link>
            </div>
        </div>
    );
}