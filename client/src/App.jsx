import { useState , useEffect } from 'react'
import axios from 'axios';

function App() {
  const [contentList, setContentList] = useState([]);
  const [Name, setName] = useState("");
  const [Date, setDate] = useState("");
  const [Description, setDescription] = useState("");
  const [bright, setBright] = useState(true);

  const submitdata = async (e) => {
    e.preventDefault();
    const url = import.meta.env.VITE_API_URL;
    const price = Number(Name.split(' ')[0]);
    const content = {
      Price: price,
      Name: Name.substring(Name.indexOf(' ') + 1),
      Date,
      Description
    }
    const dataSend = await axios.post(url + '/transcation', content);
    setContentList([...contentList, dataSend.data]);
  }

  const getData = async () => {
    const url = import.meta.env.VITE_API_URL;
    const data = await axios.get(url + '/transcations');
    const jsonData = await data.json();
    setContentList(jsonData);
  }
  
  const deleteData = async () => {
    const url = import.meta.env.VITE_API_URL;
    const data = await axios.delete(url + '/deletetranscations');
    setContentList([]);
  }

  useEffect(() => {
    getData();  
  },[])

  return (
    <body className={`${bright ? 'bg-black text-white':'bg-white text-black'} font-mono w-full h-screen`}>
      <main className={' w-2/5 px-5 mx-auto flex flex-col gap-4 pt-10'}>
      <div className={`flex justify-between`}>
        <h1 className={`text-center text-3xl`}>${ contentList.length > 0 && contentList.map(val=>val.price).reduce((tillSum , number)=>(tillSum+= number))}<span className={`text-sm`}>.00</span></h1>
        <div className={`flex justify-between gap-2`}>
          <button 
          onClick={()=>setBright(!bright)}
          className={`rounded-xl px-3 ${!bright ? 'bg-black text-white':'bg-white text-black'}`}>{bright ? <>bright</> : <>night</>}</button>
          <button 
          onClick={deleteData}
          className={`rounded-xl px-3 bg-red-500`}>Delete ALl</button>
        </div>
      </div>
        <form onSubmit={submitdata} className='flex flex-col gap-3 justify-evenly'>
          <div className='flex justify-between gap-5' >
            <InputComponent bright={bright} placeholder='+200 Samsung' typeInput='text' settingFn={setName} />
            <InputComponent bright={bright} placeholder='2021-09-01' typeInput='datetime-local' settingFn={setDate} />
          </div>
          <div className='w-full'>
            <InputComponent bright={bright} placeholder='Description' typeInput='text' settingFn={setDescription}/>
          </div>
          <button type='sumbit' className='rounded-xl bg-gray-300 text-black p-2'>Add new Transction</button>
        </form>
        <div className='w-full flex flex-col items-center justify-center'>
          {
            (contentList.length > 0) ? contentList.map((content, index) => (
              <div key={index}
                className={`w-full bg-gray-800 text-gray-300 p-3 rounded-xl flex justify-between border-b-0 mb-2 gap-1`}>
                  <div>
                    <h2 className={`text-4xl`}>{content.name}</h2>
                    <p className={`text-gray-500 text-md`}>{content.description}</p>
                  </div>
                  <div className='flex flex-col justify-center items-end'>
                    <p className={`text-2xl ${content.price > 0 ? 'text-green-400':'text-red-400' }`}>{content.price} $</p>
                    <p className={`text-gray-500 text-sm`}>{content.date}</p>
                  </div>
              </div>
            )):<>It is empty</>
          }
        </div>
      </main>     
    </body>
  )
}

const InputComponent = ({placeholder , typeInput , settingFn ,bright}) => {
  return (
    <input className={`border-2 w-full py-2 bg-transparent border-gray-600 text-center rounded-xl ${bright ?'text-gray-300' :' text-gray-700'}`} type={typeInput} placeholder={placeholder} onChange={(e)=>settingFn(e.target.value)}/>
  )
}

export default App
