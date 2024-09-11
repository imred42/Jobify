import PropTypes from 'prop-types';
import Wrapper from '../assets/wrappers/JobInfo';

const JobInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className='job-icon'>{icon}</span>
      <span className='job-text'>{text}</span>
    </Wrapper>
  );
};

JobInfo.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
};

export default JobInfo;