import { FormRow, FormRowSelect, SubmitBtn } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../../../utils/constants';
import { useAllJobsContext } from '../pages/AllJobs';

const SearchContainer = () => {
  const { searchValues } = useAllJobsContext();
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(e.currentTarget);
  };

  return (
    <Wrapper>
      <Form className='form' onSubmit={handleSubmit}>
        <h5 className='form-title'>search form</h5>
        <div className='form-center'>
          <FormRow
            type='search'
            name='search'
            defaultValue={searchValues.search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            labelText='job status'
            name='jobStatus'
            list={['all', ...Object.values(JOB_STATUS)]}
            defaultValue={searchValues.jobStatus}
          />
          <FormRowSelect
            labelText='job type'
            name='jobType'
            list={['all', ...Object.values(JOB_TYPE)]}
            defaultValue={searchValues.jobType}
          />
          <FormRowSelect
            name='sort'
            defaultValue={searchValues.sort}
            list={[...Object.values(JOB_SORT_BY)]}
          />
          <SubmitBtn formBtn />
          <Link
            to='/dashboard/all-jobs'
            className='btn form-btn delete-btn'
            onClick={() => submit({})}
          >
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;