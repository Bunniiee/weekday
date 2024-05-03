import React from 'react';
import ReactDOM from 'react-dom/client';
import './JobCard.css'

const PropsCard = (props) => {
    return (
    <div className='job-card'>
        <div className='company-name'>
            <p>{props.props.companyName}</p>
        </div>
        <div className='job-role'>
            <p>Role: {props.props.jobRole}</p>
        </div>
        <div className='job-location'>
                <p>{props.props.location}</p>
        </div>

        <div className='job-salary'>
            <p>Estimated Salary: {props.props.minJdSalary} - {props.props.maxJdSalary} </p>
        </div>

        <div className='job-desc'>
            <p>About Company</p>
            <p>{props.props.jobDetailsFromCompany}</p>
        </div>

        <div className='job-exp'>
            Minimum Experience: {props.props.minExp}
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