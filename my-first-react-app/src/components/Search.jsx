import React from 'react'

const search = ({searchTerm ,setsearchTerm}) => {
  return (
    <div className="search">
      <div>
        <img src="search.svg" alt="Search"/>
        <input
          type="Text"
          placeholder='Search through thousand of movies'    
          value={searchTerm}
          onChange={(event)=> setsearchTerm(event.target.value)}
        />
      </div>
    </div>
  )
}

export default search