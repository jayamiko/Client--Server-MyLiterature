// Import Components
import Login from '../../Components/Modal/Login'
import Register from '../../Components/Modal/Register'

// Import Style
import './Landing.css'

// Import Image
import Icon from '../../Images/icon-sm.png'
import Books from '../../Images/books.png'

export default function Landing() {

    return (
        <>
            <div className='backgroundPrimary'>
                <img src={Icon} className='iconSmall' alt='' />
                <div className='containerBox'>
                    <div>
                        <h1 className='textHeader'>
                            source of
                            intelligence
                        </h1>
                        <p className='paragraf'>
                            Sign-up and receive unlimited accesss to all of your literatur - share your literature.
                        </p>
                        <ul>
                            <Register />
                            <Login />
                        </ul>
                    </div>
                    <div>
                        <img src={Books} className='iconBooks' alt='' />
                    </div>
                </div>
            </div >
            )
        </>
    )
}