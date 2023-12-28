const currentYear = new Date().getFullYear();

function Footer() {
    return (
        <footer>
            <div className="row">
                <h4>
                    © 2019 - {currentYear} Copyright - <a href="/">mr.reband.io</a>
                </h4>
            </div>
        </footer>
    );
}

export default Footer;
