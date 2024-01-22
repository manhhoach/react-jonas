function App() {
  return (
    <div className="card">
      <Avatar avatar="img.jpg" />
      <div className="data">
        <Introduce name="Decade" introduce="Hello" />
        <SkillList />
      </div>

    </div>
  );
}

function Avatar(prop) {
  return <img className="avatar" src={prop.avatar} alt={prop.avatar}></img>
}


function Introduce(prop) {
  return <div>
    <h1>{prop.name}</h1>
    <p>{prop.introduce}</p>
  </div>
}

function SkillList(prop) {
  return <div className='skill-list'>
    <Skill skill="React" color='blue'/>
    <Skill skill="HTML CSS" color='red'/>
    <Skill skill="Node.js" color='green'/>
    <Skill skill="HTML CSS" color='violet'/>
    <Skill skill="Node.js" color='yellow'/>
  </div>
}

function Skill(prop) {
  return <div className='skill' style={{backgroundColor: prop.color}}>
    <span>{prop.skill}</span>
  </div>
}

export default App;
