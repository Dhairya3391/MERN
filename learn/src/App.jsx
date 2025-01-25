import './App.css'

const fetchData = async () => {
  const url = 'https://api.freeapi.app/api/v1/public/randomusers/user/random';
  const options = {method: 'GET', headers: {accept: 'application/json'}};
  const response = await fetch(url, options);
  const {data} = await response.json();
  return data;
}

const data = await fetchData();

function App() {
  return (
    <>
      <DemoComp 
        gender={data.gender} 
        title="Demo Comp" 
        text="This is a demo component" 
      />
    </>
  );
}

const DemoComp = ({title, text, gender}) => {
  return (
    <div>
      <p>{gender}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  )
}

export default App

