import "./style.css";

const skills = [
  {
    skill: "HTML+CSS",
    level: "advanced",
    color: "#2662EA"
  },
  {
    skill: "JavaScript",
    level: "advanced",
    color: "#EFD81D"
  },
  {
    skill: "Web Design",
    level: "advanced",
    color: "#C3DCAF"
  },
  {
    skill: "Git and GitHub",
    level: "intermediate",
    color: "#E84F33"
  },
  {
    skill: "React",
    level: "advanced",
    color: "#60DAFB"
  },
  {
    skill: "Svelte",
    level: "beginner",
    color: "#FF3B00"
  }
];
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
    {skills.map((sk, i) => <Skill key={i} skill={sk} ></Skill>)}
  </div>
}

function Skill(data) {
  let prop = data.skill;
  return <div className='skill' style={{ backgroundColor: prop.color }}>
    <span>{prop.skill}</span>
    <span>{prop.level}</span>
  </div>
}

export default App;
