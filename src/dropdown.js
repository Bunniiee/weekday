import React from 'react'
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'
import './dropdown.css'

const SearchBar = (props) => (
    <div  className='search-query'>
        <SelectSearch options={props.options} value="sv" name={props.name} placeholder={props.name} />
    </div>
)

export default SearchBar