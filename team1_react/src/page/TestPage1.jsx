import { useAuth } from '../contexts/AuthContext.jsx';

function TestPage1() {
  const { user } = useAuth();
  return (
    <main className=" flex-1 p-6 overflow-y-auto">
    </main>
  );
}

export default TestPage1;