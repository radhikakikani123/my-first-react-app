import React from 'react'

const search = ({searchTerm ,setSearchTerm}) => {
  return (
    <div className="search">
      <div>
        <img src="search.svg" alt="Search"/>
        <input
          type="Text"
          placeholder='Search through thousand of movies'    
          value={searchTerm}
          onChange={(event)=> setSearchTerm(event.target.value)}
        />
      </div>
    </div>
  )
}

export default search