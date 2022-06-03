import Calendar from '../../images/calendar.svg';
import Computer from '../../images/computer.svg';
import Family2 from '../../images/family2.svg';
import Family3 from '../../images/family3.svg';

const How = () => {
  return (
    <div className="how-container" id="how">
        <div className="how-title">
            <h1>How it works</h1>
        </div>
        <div className="grid-wrapper">
            <div className="col" style={{borderRight: "1px solid #4B4C4C"}}>
                <div className="number-wrap">
                    <p className="number">1</p>
                </div>
                <img src={Computer} alt="step-pic" />
                <p className="step">Sign up or login to your free Happy Home account.</p>
            </div>
            <div className="col" style={{borderRight: "1px solid #4B4C4C"}}>
                <div className="number-wrap">
                    <p className="number">2</p>
                </div>
                <img src={Family2} alt="step-pic" />
                <p className="step">Choose which family member you would like to access.</p>
            </div>
            <div className="col" style={{borderRight: "1px solid #4B4C4C"}}>
                <div className="number-wrap">
                    <p className="number">3</p>
                </div>
                <img src={Calendar} alt="step-pic" />
                <p className="step">Organize your family's schedules and assign chores to children.</p>
            </div>
            <div className="col">
                <div className="number-wrap">
                    <p className="number">4</p>
                </div>
                <img src={Family3} alt="step-pic" />
                <p className="step">Enjoy more time with your family!</p>
            </div>
        </div>
    </div>
  )
}

export default How