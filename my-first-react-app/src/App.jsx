import { useState, useEffect } from "react"

const Card=({title}
     )=>{
  const [count, setcount] = useState(0)    
  const [hasLiked, sethasLiked ] = useState(false);

  useEffect( ()=>{
     console.log(`${title} has been liked: ${hasLiked}`)
  }) 

   return(
    <div className="card" onClick={()=> setcount((prevState)=>prevState+1)}>
      <h2>{title}-{count}</h2>
      <button onClick={() => sethasLiked((prevState)=>!prevState)}>
       {hasLiked? '❤️': '🤍'}   
      </button>
    </div>
    
   )           
}

 
const App = ()=>{
  
  return(
    <div className="card-container">
      <h1>Functional Arrow Component </h1>  
       <Card title="Avatar" rating={5} actor="YZZ"/>
       <Card title="The Lion King"/>
       <Card title="Jasus"/>
    </div>
   
  )
}
export default App
