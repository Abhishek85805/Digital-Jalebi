import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import UserTable from './component/UserTable';

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(()=>{
    ;(async()=>{
      try {
        const response = await axios.get('https://dummyjson.com/users');
        setData(response.data.users);
      } catch (error) {
        console.log(error);
      }
    })()
  }, []);

  
  useEffect(()=>{
    const controller = new AbortController();
    ;(async()=>{
      try {
        const response = await axios.get('https://dummyjson.com/users/search?q='+search, {
          signal: controller.signal
        })
        setData(response.data.users);
      } catch (error) {
        if(axios.isCancel(error)){
          console.log("Request Canceled")
          return
        }
      }
    })()

    return ()=>{
      controller.abort();
    }
  }, [search])

  return (
    <div className='m-5'>
      <input 
        type="text"
        placeholder='Search by name'
        value = {search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-gray-500 mb-3"
      />
      <UserTable data={data}/>
    </div>
  )
}

export default App
