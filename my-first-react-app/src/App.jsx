const Card=({title}
)=>{
   return(
    <div>
      <h2>{title}</h2>
    </div>
    
   )           
}

 
const App = ()=>{
  return(
    <div>
      <h1>Functional Arrow Component </h1>
     <h2>helllo</h2>
       <Card title="Avatar" rating={5} actor="YZZ"/>
       <Card title="The Lion King"/>
       <Card title="Jasus"/>
    </div>
   
  )
}
export default App
