
const AdminNav = () =>{
    return (
        <>
        <div>
            <nav className="flex items-center justify-between bg-white shadow-md px-6 py-4 rounded-md">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Admin Dashboard
                    </h2>
                </div>
                <div>
                    <a 
                      href="/admin/get-users" 
                      className="text-gray-700 hover:text-blue-600 font-medium transition"
                    >
                      Manage Users
                    </a>
                    <a
                        href="/admin" 
                      className="ml-6 text-gray-700 hover:text-blue-600 font-medium transition"
                    >
                      Post Resorts    
                    </a>
                    <a href = "/admin/manage-resorts" className="ml-6 text-gray-700 hover:text-blue-600 font-medium transition">Manage Resorts</a>
                </div>
                <div>
                    <a 
                      href="/api/auth/signout" 
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      Logout
                    </a>
                </div>
            </nav>
        </div>
        </>

    )
}
export default AdminNav