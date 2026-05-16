
import { FaGithub } from "react-icons/fa6";
const Footer = () =>
{

    function handleClic(){
        window.scrollTo(0, 0)
    }
    return <section className="footer" role="contentinfo">
       
         <button onClick={handleClic} className="login-button">Top &#8593;</button>
         <a className="footer-link" href="https://northcoders.com"
         title="Northcoders website"><img className="logo"  loading="lazy" alt="Northcoders logo" src="/src/assets/NC-Logo.png"/></a>
       
        <a className="footer-link" href="https://github.com/CarmenChapi/nc-news.git"
        title="GitHub Repository"><div className="github"><FaGithub fontSize="2em"/></div></a>
        </section>
}

export default Footer