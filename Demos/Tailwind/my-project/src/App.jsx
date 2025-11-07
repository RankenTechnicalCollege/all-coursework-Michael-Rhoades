import './App.css'
import { useState } from 'react'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectValue, setSelectValue] = useState("option 1")

  const updateValue = (value) => {
    setSelectValue(value);
    setIsOpen(false);
  };

  return (
    <>
      <div className='wrap-break-word p-2 bg-amber-200 m-4'>
        <h1 className='text-green-500 line-through decoration-red-700 decoration-wavy'>
          Hello World
        </h1>
        <h1 className='text-yellow-400 overline'>
          Hello World
        </h1>
        <h1 className='bg-gray-900 text-white lowercase mr-5 py-3 pl-2'>
          Hello World
        </h1>
        <h1 className='border-4 border-amber-600 pl-2'>
          Hello World
        </h1>
        <h1 className='text-gold font-serif text-3xl font-bold'>
          Hello World
        </h1>
        <h1 className='text-green-500 bg-blue-300 -mb-2'>
          Hello World
        </h1>
        <h1 className='text-green-500'>
          Hello World
        </h1>
        <h1 className='text-green-500'>
          Hello World
        </h1>
        <p className=''>If you forgot your password, please go to https://support.ranken.edu  to change your password and unlock your account. If you have forgotten your login, please see support.</p>
      </div>
      <div className='flex space-x-1'>
        <div className='w-1/3 min-h-screen bg-green-400'></div>
        <div className='w-1/3 h-16 bg-yellow-400'></div>
        <div className='w-1/3 h-16 bg-red-500'></div>
      </div>
      <div className='flex space-x-1 mt-10 flex-col-reverse'>
        <div className='w-1/6 h-16 bg-green-400'></div>
        <div className='flex w-1/6'>
          <div className='w-1/2 h-16 bg-orange-400'></div>
          <div className='w-1/2 h-16 bg-yellow-400'></div>
        </div>
        <div className='w-1/6 h-16 bg-red-500 grow'></div>
      </div>
      <div className='flex flex-col md:flex-row mt-10'>
        <div className='w-1/6 h-16 bg-green-400'></div>
        <div className='w-5/6 h-16 bg-red-500'></div>
      </div>
      <div className='flex space-x-1 mt-10 flex-nowrap'>
        <div className='w-full grow h-16 bg-red-500'></div>
        <div className='w-full grow h-16 bg-orange-500'></div>
        <div className='w-full grow h-16 bg-yellow-500'></div>
        <div className='w-full grow h-16 bg-green-500'></div>
        <div className='w-full grow h-16 bg-blue-500'></div>
        <div className='w-full grow h-16 bg-purple-500'></div>
      </div>
      <div className='flex space-x-1 mt-10 justify-center'>
        <div className='w-32 h-16 bg-red-500'></div>
        <div className='w-32 h-16 bg-orange-500'></div>
        <div className='w-32 h-16 bg-yellow-500'></div>
      </div>
      <div className='flex space-x-1 mt-10 justify-evenly items-center'>
        <div className='w-32 h-16 bg-red-500'></div>
        <div className='w-32 h-32 bg-orange-500'></div>
        <div className='w-32 h-16 bg-yellow-500'></div>
      </div>
      <div className='flex space-x-1 mt-10 justify-start items-baseline'>
        <div className='w-32 h-16 pt-2 pb-3 bg-red-500'></div>
        <div className='w-32 h-32 pt-4 pb-2 bg-orange-500'></div>
        <div className='w-32 h-16 pt-8 pb-1 bg-yellow-500'></div>
      </div>
      <div className='gap-1.5 mt-10 grid grid-cols-1 lg:grid-cols-3'>
        <div className='w-full grow rounded-lg h-16 bg-red-500'></div>
        <div className='w-full grow rounded-lg h-16 bg-orange-500'></div>
        <div className='w-full grow rounded-lg h-16 bg-yellow-500'></div>
        <div className='w-full grow rounded-lg h-16 bg-green-500'></div>
        <div className='w-full grow rounded-lg h-16 bg-blue-500'></div>
        <div className='w-full grow rounded-lg h-16 bg-purple-500'></div>
      </div>
      <div className='space-x-1 mt-10 grid grid-cols-4'>
        <div className='w-full grow h-64 col-start-3 col-span-2 bg-red-500'></div>
        <div className='w-full grow h-64 bg-red-800'></div>
        <div className='w-full grow h-64 col-span-2 bg-red-500'></div>
        <div className='w-full grow h-64 bg-blue-400'></div>
        <div className='w-full grow h-64 bg-red-800'></div>
        <div className='w-full grow h-64 col-span-3 bg-red-500'></div>
        <div className='w-full grow h-64 col-start-2 bg-red-500'></div>
        <div className='w-full grow h-64 col-start-4 bg-red-500'></div>
      </div>
      <div className='gap-1.5 mt-10 grid grid-flow-col grid-rows-4'>
        <div className='w-full grow rounded-lg h-full row-span-3 bg-red-500'></div>
        <div className='w-full grow rounded-lg h-16 col-span-2 bg-orange-500'></div>
        <div className='w-full grow rounded-lg h-16 bg-yellow-500'></div>
        <div className='w-full grow rounded-lg h-16 bg-green-500'></div>
        <div className='w-full grow rounded-lg h-16 bg-blue-500'></div>
        <div className='w-full grow rounded-lg h-16 bg-purple-500'></div>
        <div className='w-full grow rounded-lg h-16 bg-red-500'></div>
        <div className='w-full grow rounded-lg h-16 bg-orange-500'></div>
        <div className='w-full grow rounded-lg h-16 bg-yellow-500'></div>
        <div className='w-full grow rounded-lg h-16 bg-green-500'></div>
        <div className='w-full grow rounded-lg h-16 bg-blue-500'></div>
        <div className='w-full grow rounded-lg h-16 bg-purple-500'></div>
        <div className='w-full grow rounded-lg h-16 bg-red-500'></div>
        <div className='w-full grow rounded-lg h-16 bg-orange-500'></div>
        <div className='w-full grow rounded-lg h-16 bg-yellow-500'></div>
        <div className='w-full grow rounded-lg h-16 bg-green-500'></div>
        <div className='w-full grow rounded-lg h-16 bg-blue-500'></div>
        <div className='w-full grow rounded-lg h-16 bg-purple-500'></div>
      </div>
      <div className='container mx-auto bg-red-500 mt-96 p-2 columns-3'>
        <h1 className='hidden'>Hello world</h1>
        <h1>Hello world</h1>
        <h1>Hello world</h1>
        <h1>Hello world</h1>
        <h1>Hello world</h1>
      </div>
      <div className='container px-2 mt-10'>
        <div className='relative w-32 h-32 p-8 bg-red-500 rounded-lg overflow-hidden'>
          <div className='absolute w-24 h-24 -right-6 bg-green-500 rounded-lg'></div>
        </div>
      </div>
      <div className='fixed top-0 left-0 right-0 text-center'>
        <h1>text here</h1>
      </div>
      <div className='overflow-auto'>
        <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
      </div>
      <div className='container mt-10'>
        <div className='grid grid-cols-3 gap-4 text-center'>
          <div className='bg-teal-500'><p>hello</p></div>
          <div className='invisible bg-teal-500'><p>hello</p></div>
          <div className='bg-teal-500'><p>hello</p></div>
        </div>
      </div>
      <div className='mt-64'>
        <p className='border-b-8 pb-3 border-l border-t-2'>Hello world</p>
      </div>
      <div className='mt-10 divide-y divide-blue-700'>
        <h1 className='blur-xs hover:blur-none'>Hello world</h1>
        <h1 className='blur-xs hover:blur-none'>Hello world</h1>
        <h1 className='blur-xs hover:blur-none'>Hello world</h1>
        <h1 className='blur-xs hover:blur-none'>Hello world</h1>
        <h1 className='blur-xs hover:blur-none'>Hello world</h1>
      </div>
      <input type="text" className='border-2 border-double border-rose-700 outline-none' />
      <input type="button" value="Button" className='outline-offset-2 outline-4 outline-cyan-400 ring-4' />
      <br></br>
      <div className='inline-block p-4 text-black bg-white border rounded-lg mt-10 shadow-2xl shadow-blue-900'>
        <h1 className='opacity-100'>Hello World</h1>
        <h1 className='opacity-75'>Hello World</h1>
        <h1 className='opacity-50'>Hello World</h1>
        <h1 className='opacity-25'>Hello World</h1>
      </div>
      <div className='m-10'>
        <input type="button" value="Hover" className='bg-blue-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-red-500 skew-6' />
        <input type="button" value="Hover" className='bg-blue-500 hover:animate-spin' />
        <input type="button" value="Hover" className='bg-blue-500 hover:animate-ping origin-top-left rotate-90' />
        <input type="button" value="Hover" className='bg-blue-500 hover:animate-bounce origin-bottom -rotate-12' />
        <input type="button" value="Hover" className='bg-blue-500 hover:animate-pulse rotate-45' />
      </div>
      <div className='mt-72'></div>
      <div className='mt-72'></div>










      <div className='my-72'>
        <h1>This is a title</h1>
        <h2>This is a subtitle</h2>
        <p className='text-base'>This is a paragraph</p>
        <a href="https://insideranken.org/ICS/">This is an anchor</a>
        <div className='my-4'>
          <input type="button" value="This is a primary button" className="btn btn-primary" />
        </div>
        <div className='my-4'>
          <input type="button" value="This is a secondary button" className="btn btn-secondary" />
        </div>
        <div className='my-4'>
          <input disabled type="button" value="This is a primary button" className="btn btn-primary" />
        </div>
        <div>
          <input type="text" name="textbox" id="txtInput" placeholder='E-mail' />
        </div>
        <div>
          <input disabled type="text" name="textbox" id="txtInput" placeholder='E-mail' />
        </div>
        <div>
          <input type="date" name="date" id="date" />
        </div>
        <div className='flex items-start my-4'>
          <input type="checkbox" name="checkbox" id="cbxInput" />
          <label htmlFor="checkbox">Welcome to Inside Ranken! After login, use the tabs above to gain access to not only your seated and online courses, and also additional resources for you to be successful. Welcome to Inside Ranken! After login, use the tabs above to gain access to not only your seated and online courses, and also additional resources for you to be successful. </label>
        </div>
        <div>
          <select name="dropdown" id="rbnInput">
            <option value="option 1">first option</option>
            <option value="option 2">second option</option>
          </select>
        </div>
        <div className='Select'>
          <div className='child flex items-center justify-between' onClick={() => setIsOpen(!isOpen)}>
            <span>{selectValue}</span>
            <div className={isOpen ? "rotate-180" : "rotate-0"}>
              <arrowDown /> {/* For some reason, it didn't work like he did in the video. likely something with an update */}
            </div>
            
          </div>
          {isOpen && (
            <div>
              <ul className='flex flex-col divide-y border-t-2'>
                <li className='child' onClick={() => updateValue("option 1")}>option 1</li>
                <li className='child' onClick={() => updateValue("option 2")}>option 2</li>
                <li className='child' onClick={() => updateValue("option 3")}>option 3</li>
              </ul>
            </div>
          )}
        </div>
        <h1>This is another title</h1>
        <h2>This is another subtitle</h2>
      </div>
    </>
  )
}

export default App
