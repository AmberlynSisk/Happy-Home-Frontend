import { Link as LinkR } from 'react-router-dom';
import Family from '../../images/family.svg';
import TypeWrite from '../../effects/typewriter';

const LOHero = () => {
  return (
    <div id="home">
        <div className="hero-container">
            <div className="bg-img">
                <img src={Family} alt="family" />
            </div>

            <div className="type-subtext">
                <TypeWrite />
            </div>

            <div className="signup-wrap">
                <LinkR to="/signup" className="signup-btn">Sign up for free!</LinkR> 
            </div>
        </div>
    </div>
  )
}

export default LOHero