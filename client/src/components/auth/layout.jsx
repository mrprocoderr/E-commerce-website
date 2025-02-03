// import { Outlet } from "react-router-dom"

// function AuthLayout() {
//   return (
//     <div className="flex min-h-screen w-full">
//       <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 w-1/2 px-12">
//         <div className="max-w-md space-y-8 text-center text-primary-foreground">
//           <h1 className="text-4xl font-extrabold tracking-tight text-white mb-8">Welcome to ECommerce Shopping</h1>
//           <div className="relative">
//             <div className="absolute -inset-2 rounded-xl blur-2xl bg-blue-500/20"></div>
//             <img
//               src="https://www.udyogmart.com/wp-content/uploads/2020/01/ezgif.com-video-to-gif.gif"
//               alt="E-commerce shopping animation"
//               className="relative w-full max-w-[400px] h-auto mx-auto rounded-xl shadow-2xl"
//             />
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
//         <Outlet />
//       </div>
//     </div>
//   )
// }

// export default AuthLayout



import { Outlet } from "react-router-dom"

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 w-1/2 px-12">
        <div className="max-w-md space-y-8 text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-8 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient">
              Welcome to
            </span>
            <br />
            <span className="relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-green-500 to-yellow-500 animate-gradient">
                E-Commerce
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-green-500 to-yellow-500 animate-gradient"></span>
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient">
              {" "}
              Shopping
            </span>
          </h1>
          <div className="relative">
            <div className="absolute -inset-2 rounded-xl blur-2xl bg-blue-500/20"></div>
            <img
              src="https://www.udyogmart.com/wp-content/uploads/2020/01/ezgif.com-video-to-gif.gif"
              alt="E-commerce shopping animation"
              className="relative w-full max-w-[400px] h-auto mx-auto rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout