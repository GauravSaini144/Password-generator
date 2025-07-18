import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [length, setLength]=useState(12);
  const [password, setPassword]=useState('');
  const [addNumber, setAddNumber]=useState(false);
  const [addChar, setAddChar]=useState(false);
  const passwordRef=useRef(null);
  const generatePassword=useCallback(()=>{
    let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let pass=''
    if(addNumber){
      str+='0123456789'
    }
    if(addChar){
      str+='@!`~$#{}()[]'
    }

    for (let i = 0; i < length; i++) {
      let character=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(character);
      
    }

    setPassword(pass);
  },[length, addChar, addNumber]);

  useEffect(()=>
  {

    generatePassword();

  },[length, addChar, addNumber]);
  

  const handleCopyPassword=()=>{

    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);


  }

  return (
    <>
     <div className='bg-gray-800 w-full max-w-lg p-5 flex flex-col gap-5   rounded-xl text-center mx-auto my-12'>
<h1 className='text-2xl md:text-4xl'>Password Generator</h1>

<div className='flex '>
 
 <input type="text" value={password} placeholder='Password' className=' rounded-tl-lg rounded-bl-lg py-2 px-4 w-full outline-none text-black text-xl'
 ref={passwordRef}
 readOnly />
 <button className='bg-blue-600 px-4 py-2 rounded-tr-lg rounded-br-lg text-xl' onClick={handleCopyPassword} >Copy</button>
</div>
<div className='flex gap-4 flex-wrap '>
<span className='flex gap-2 '>
<input type="range" min={8} max={30} value={length} onChange={(e)=>setLength(e.target.value)}/>
<label className='text-lg' >Length: <span className={length==8?"text-orange-400":(length==9?'text-orange-300':(length==10?'text-orange-200':(length==11?'text-green-300':'text-green-500')))} >{length}</span> </label>
</span>

<span className='flex gap-1'>
<input type="checkbox" id='addchar' checked={addChar} onChange={()=>setAddChar((prev)=>!prev)} />
<label htmlFor="addchar" className='text-lg '>Characters</label>
</span>

<span className='flex gap-1'>
<input type="checkbox" id='addNum' checked={addNumber} onChange={()=>setAddNumber((prev)=>!prev)} />
<label htmlFor="addNum" className='text-lg '>Numbers</label>
</span>
</div>

<p className={`text-lg font-semibold ${
  length < 11 ? 'text-red-400' : (!addChar || !addNumber) ? 'text-yellow-400' : 'text-green-400'
}`}>
  {length < 11 ? 'Weak: 😬' : (!addChar || !addNumber) ? 'Moderate: 🙂' : 'Strong: 😎'}
</p>

     </div>
     
    </>
  )
}

export default App
