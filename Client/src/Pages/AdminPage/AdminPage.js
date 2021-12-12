// Import Component
import NavbarAdmin from '../../Components/Navbar/NavbarAdmin'
import TableVerification from "../../Components/Tables/Table";

export default function AdminPage() {
    return (
        <>
            <NavbarAdmin />
            <div style={{
                background: '#F9F9F9',
                height: '250vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <TableVerification />
            </div>
        </>
    )
}