import React from 'react'

export const Reg = () => {
  return (
    <div className="py-16">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div className="hidden lg:block lg:w-1/2 bg-cover"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')" }}>
        </div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">Brand</h2>
          <p className="text-xl text-gray-600 text-center">Create your account</p>

          <form className="mt-4">
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
              <input type="text" placeholder="John Doe"
                className="bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:shadow-outline" />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
              <input type="email" placeholder="john@example.com"
                className="bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:shadow-outline" />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input type="password"
                className="bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:shadow-outline" />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
              <input type="password"
                className="bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:shadow-outline" />
            </div>

            <div className="mt-8">
              <button type="submit"
                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                Register
              </button>
            </div>

            <div className="mt-4 text-center">
              <a href="#" className="text-xs text-gray-500 uppercase">Already have an account? Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
