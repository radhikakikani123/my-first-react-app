const Card=({title}
)=>{
   return(
    <div>
      <h2>{title}</h2>
    </div>
    
   )           
}
 const CaRd=()=>{
  return(
    <div>
      <h1>HELLO</h1>
    </div>
  )
 }
 
const App = ()=>{
  return(
    <div>
      <h1>Functional Arrow Component </h1>
       <Card title="Avatar" rating={5} actor="YZZ"/>
       <Card title="The Lion King"/>
       <Card title="Jasus"/>
    </div>
   
  )
}
export default App
