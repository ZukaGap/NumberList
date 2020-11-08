import React from 'react'
import './Search.css'

function Search(props) {
  return (
    <form className='filter-form container' style={{ marginTop: '70px' }}>
      <div className='input-group input-group'>
        <div className='input-group-prepend'>
          <button
            className='btn btn-outline-secondary'
            type='button'
            id='add-button'
            onClick={props.showAddForm}
          >
            დამატება
          </button>
        </div>
        <input
          placeholder='ძებნა'
          type='text'
          className='form-control'
          id='search'
          value={props.searchValue}
          onChange={props.handleSearch}
        />
      </div>
    </form>
  )
}

export default Search
