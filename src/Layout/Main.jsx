import { Outlet } from 'react-router-dom';
import Footer from '../pages/Shared/Footer/Footer';
import NavBard from '../pages/Shared/NavBar/NavBard';

const Main = () => {
    return (
        <div>
            <NavBard></NavBard>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;