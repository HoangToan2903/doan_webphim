import '../css/navbar.css';
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import PhoneInTalkSharpIcon from '@mui/icons-material/PhoneInTalkSharp';
function Footer() {
    return (
        <footer className="footer">
            <div className="footer_container">
                <div className="row">
                    <div className="footer-col">
                        <h4>Thể loại phim</h4>
                        <ul>
                            <li><a href="#">about us</a></li>
                            <li><a href="#">our services</a></li>
                            <li><a href="#">privacy policy</a></li>
                            <li><a href="#">affiliate program</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Quốc gia</h4>
                        <ul>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">shipping</a></li>
                            <li><a href="#">returns</a></li>
                            <li><a href="#">order status</a></li>
                            <li><a href="#">payment options</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>online shop</h4>
                        <ul>
                            <li><a href="#">watch</a></li>
                            <li><a href="#">bag</a></li>
                            <li><a href="#">shoes</a></li>
                            <li><a href="#">dress</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>follow us</h4>
                        <div className="social-links">
                        <FacebookSharpIcon sx={{ color: "#fff", width: 50, height: 50 }} />
                        <PhoneInTalkSharpIcon sx={{ color: "#fff", width: 50, height: 50 }}/>
                            
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    )
}
export default Footer;