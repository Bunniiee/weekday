import React from 'react';
import ReactDOM from 'react-dom/client';
import './JobCard.css'

const PropsCard = (props) => {
    return (
    <div className='job-card'>
        <div className='job-role'>
            <h2>
                <p>Role: {props.props.jobRole}</p>
            </h2>
        </div>
        <div className='job-location'>
            <h2>
                <p>Location: {props.props.location}</p>
            </h2>
        </div>

        <div className='job-salary'>
            <h2>
                <p>Estimated Salary: {props.props.minJdSalary} - {props.props.maxJdSalary} </p>
            </h2>
        </div>

        <div className='job-desc'>
            <h2>
                <p>About Company</p>
            </h2>    
            <h3>
                <p>About Us</p>
            </h3>
            <p>{props.props.jobDetailsFromCompany}</p>
        </div>

        <div className='job-exp'>
            <h3>
                Minimum Experience: {props.props.minExp}
            </h3>
        </div>

        <div>
            <button className='apply-btn'>EasyApply</button>
        </div>
        <div>
            <button className='ref-btn'>Check for Referral</button>
        </div>
    </div>
    )
}

export default PropsCard;