import React from 'react'

const postItem = () => {
  return (
    <div >
       <style dangerouslySetInnerHTML={{__html: "\n// @import url(\"https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap\");\n\n// .break-inside {\n//   -moz-column-break-inside: avoid;\n//   break-inside: avoid;\n// }\n\n// body {\n//   display: flex;\n//   align-items: center;\n//   justify-content: space-between;\n//   flex-direction: column;\n//   min-height: 100vh;\n//   font-family: \"Roboto\", sans-serif;\n// }\n// " }} />
  <div className="wrapper   flex flex-col items-center mb-10">
    <article className="mb-4 break-inside  rounded-xl bg-white dark:bg-slate-800 flex flex-col bg-clip-border sm:w-3/6 w-full">
      <div className="flex pb-6 items-center justify-between">
        <div className="flex">
          <a className="inline-block mr-4" href="#">
            <img className="rounded-full max-w-none w-12 h-12" src="https://randomuser.me/api/portraits/men/35.jpg" />
          </a>
          <div className="flex flex-col">
            <div>
              <a className="inline-block text-lg font-bold dark:text-white" href="#">Wade Warren</a>
            </div>
            <div className="text-slate-500 ">
              July 17, 2018
             
            </div>
            
            
          </div>
        </div>
      </div>
      <div className="text-left text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                            <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                            MEXICO
                          </div>
      <p className="dark:text-slate-200 text-left">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <div className="py-4">
        <div className="flex justify-between gap-1 mb-1">
          <a className="flex" href="#">
            <img className="max-w-full rounded-tl-lg" src="https://images.pexels.com/photos/92866/pexels-photo-92866.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
          </a>
          <a className="flex" href="#">
            <img className="max-w-full" src="https://images.pexels.com/photos/247929/pexels-photo-247929.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
          </a>
          <a className="flex" href="#">
            <img className="max-w-full rounded-tr-lg" src="https://images.pexels.com/photos/631522/pexels-photo-631522.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
          </a>
        </div>
        <div className="flex justify-between gap-1">
          <a className="flex" href="#">
            <img className="max-w-full rounded-bl-lg" src="https://images.pexels.com/photos/1429748/pexels-photo-1429748.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
          </a>
          <a className="flex" href="#">
            <img className="max-w-full rounded-br-lg" src="https://images.pexels.com/photos/69020/pexels-photo-69020.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
          </a>
        </div>
      </div>
     
      <div className="py-4 text-left flex gap-4">
        <a className="inline-flex items-center " href="#">
          <span className="mr-2 ">
          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
          <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/>
          </svg>
            
            
          </span>
          <span className="text-lg font-bold ">90</span>
        </a>
        <a className="inline-flex items-center " href="#">
          <span className="mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
           <path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"/>
           </svg>

            
            
          </span>
          <span className="text-lg font-bold ">34</span>
        </a>
        
      </div>
      <div className="relative">
        <input className="pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 dark:bg-slate-600 rounded-lg placeholder:text-slate-600 dark:placeholder:text-slate-300 font-medium pr-20" type="text" placeholder="Write a comment" />
        <span className="flex absolute right-3 top-2/4 -mt-3 items-center">
          <svg className="mr-2" style={{width: 26, height: 26}} viewBox="0 0 24 24">
            <path fill="currentColor" d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z">
            </path>
          </svg>
          <svg className="fill-blue-500 dark:fill-slate-50" style={{width: 24, height: 24}} viewBox="0 0 24 24">
            <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
          </svg>
        </span>
      </div>
      <div className="pt-6">
        <div className="media flex pb-4">
          <a className="mr-4" href="#">
            <img className="rounded-full max-w-none w-12 h-12" src="https://randomuser.me/api/portraits/men/82.jpg" />
          </a>
          <div className="media-body">
            <div>
              <a className="inline-block text-base font-bold mr-2" href="#">Leslie Alexander</a>
              <span className="text-slate-500 dark:text-slate-300">25 minutes ago</span>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur.</p>
            <div className="mt-2 flex items-center">
              <a className="inline-flex items-center py-2 mr-3" href="#">
                <span className="mr-2">
                  <svg className="fill-rose-600 dark:fill-rose-400" style={{width: 22, height: 22}} viewBox="0 0 24 24">
                    <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
                    </path>
                  </svg>
                </span>
                <span className="text-base font-bold">12</span>
              </a>
              <button className="py-2 px-4 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">
                Repply
              </button>
            </div>
          </div>
        </div>
        <div className="media flex pb-4">
          <a className="inline-block mr-4" href="#">
            <img className="rounded-full max-w-none w-12 h-12" src="https://randomuser.me/api/portraits/women/76.jpg" />
          </a>
          <div className="media-body">
            <div>
              <a className="inline-block text-base font-bold mr-2" href="#">Tina Mills</a>
              <span className="text-slate-500 dark:text-slate-300">3 minutes ago</span>
            </div>
            <p>Dolor sit ameteiusmod consectetur adipiscing elit.</p>
            <div className="mt-2 flex items-center">
              <a className="inline-flex items-center py-2 mr-3" href="#">
                <span className="mr-2">
                  <svg className="fill-rose-600 dark:fill-rose-400" style={{width: 22, height: 22}} viewBox="0 0 24 24">
                    <path d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46 6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z">
                    </path>
                  </svg>
                </span>
                <span className="text-base font-bold">0</span>
              </a>
              <button className="py-2 px-4 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">
                Repply
              </button>
            </div>
          </div>
        </div>
       
        <div className="w-full">
          <a href="#" className="py-3 px-4 w-full block bg-slate-100 dark:bg-slate-700 text-center rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition ease-in-out delay-75">Show
            more comments</a>
        </div>
       
      </div>
  
    </article>
  </div>
  
    </div>
  )
}

export default postItem
