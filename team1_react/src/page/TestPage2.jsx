import { useAuth } from '../contexts/AuthContext.jsx';

function TestPage1() {
  const { user } = useAuth();

  return (
    <main className=" flex-1 p-6 overflow-y-auto">
      <div className="bg-white rounded shadow p-4 w-100 h-full">
        <div className="text-gray-700 font-semibold mb-2">Test2</div>
        <h1>id : {user.id}</h1>
        <h1>pass : {user.pass}</h1>
        <h1>nickName : {user.nickName}</h1>
        <h1>department : {user.department}</h1>
        <h1>position : {user.position}</h1>
      </div>
    </main>
  );
}

export default TestPage1;