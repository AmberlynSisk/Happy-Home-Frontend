import Dad from '../../images/dad.svg';

const About = () => {
  return (
    <div className="about-container" id="about">
        <div className="left-side">
            <p className="title-one">Struggling to keep your family's schedule on track? </p>
            <p className="title-two">Can't seem to find a good system to keep the kids chores organized?</p>
            <p className="about-p">Finally, an organization app your whole family can use! From chores to life events, have your hectic schedule in one, consolidated location! </p>
        </div>
        <div className="right-side">
            <img src={Dad} alt="about-svg" />
        </div>
    </div>
  )
}

export default About