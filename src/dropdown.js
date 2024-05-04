import React from 'react'
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'

const SearchBar = (props) => (
    <SelectSearch options={props.options} search value={props.selectedValue} placeholder={props.name} onChange={props.handler}/>

)

export default SearchBar