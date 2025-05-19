import { useState } from 'react';
import Type from './type';
import Style from './style';
import Movie from './movie';
import Nation from './nation';
import ThongKe from './thongke';
import '../css/home.css'
// import '../css/home.css';

function Header() {
    const [currentComponent, setCurrentComponent] = useState('ThongKe'); // State to track which component to show

    // Function to handle menu item click
    const handleMenuClick = (component) => {
        setCurrentComponent(component);
    };

    return (
        <div>
            <header className="page-header">
                <nav>
                    <div className="admin">Hello</div>
                    <ul className="admin-menu">
                        <li className="menu-heading">
                            <h3>Admin</h3>
                        </li>
                        <li>
                            <a href="#0" onClick={() => handleMenuClick('ThongKe')}>
                                <span>ThongKe</span>
                            </a>
                        </li>
                        <li>
                            <a href="#0" onClick={() => handleMenuClick('Type')}>
                                <span>Type</span>
                            </a>
                        </li>
                        <li>
                            <a href="#0" onClick={() => handleMenuClick('Nation')}>
                                <span>Nation</span>
                            </a>
                        </li>
                        <li>
                        <a href="#0" onClick={() => handleMenuClick('Style')}>
                                <span>Style</span>
                            </a>
                        </li>
                        <li>
                        <a href="#0" onClick={() => handleMenuClick('Movie')}>
                                <span>Movie</span>
                            </a>
                        </li>
                        <li>
                            <div className="switch">
                                <input type="checkbox" id="mode" defaultChecked />
                                <label htmlFor="mode">
                                    <span></span>
                                    <span>Dark</span>
                                </label>
                            </div>

                        </li>
                    </ul>
                </nav>
            </header>
           
            {/* Render the selected component */}
            {currentComponent === 'Type' && <Type />}
            {currentComponent === 'Nation' && <Nation />}
            {currentComponent === 'Style' && <Style />}
            {currentComponent === 'Movie' && <Movie />}
            {currentComponent === 'ThongKe' && <ThongKe />}

        </div>
    );
}

export default Header;
