import Header from '../theme/Header.jsx';
import { AlertTriangle } from 'lucide-react'; // 아이콘 사용 (lucide-react 설치 필요)

function ErrorPage() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <AlertTriangle size={64} className="text-yellow-500 mb-6" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">페이지를 찾을 수 없습니다</h1>
        <p className="text-gray-500 text-lg mb-6">
          요청하신 페이지가 존재하지 않거나, 삭제되었을 수 있어요.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-blue-400 text-white rounded-md text-sm font-semibold hover:bg-blue-500 transition"
        >
          홈으로 돌아가기
        </a>
      </div>
    </>
  );
}

export default ErrorPage;
