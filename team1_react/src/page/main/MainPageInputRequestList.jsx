import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance.jsx';

function MainPageInputRequestList() {
  const [recentRequests, setRecentRequests] = useState([])

  const approvedCount = recentRequests.filter(r => r.approve === 1).length;
  const waitingCount = recentRequests.filter(r => r.approve === 0).length;
  const rejectedCount = recentRequests.filter(r => r.approve !== 0 && r.approve !== 1).length;

  // 목록 불러오기
  useEffect(() => {
    axiosInstance.get('/inputRequestList')
      .then(res => {
        const mappedData = res.data.map((rr, index) => ({
          idx: rr.idx,
          name:rr.name,
          time: rr.time,
          approve: rr.approve
        }))
        setRecentRequests(mappedData)
      })
      .catch(err => {
        console.error(err)
      })
  }, []);

  return (
    <div>
      <div className="bg-white rounded-2xl shadow p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          {/*입고 신청 내역 글자 클릭 시 승인 목록 페이지로 이동*/}
          <a href="/test3">
            <div className="text-lg font-bold text-gray-800 hover:scale-110">입고 신청 내역</div></a>
          <div className="text-sm text-gray-400">{recentRequests.length > 0
              ? new Date(recentRequests[0].time).toLocaleDateString('ko-KR')
              : '---'}</div>
        </div>

        <div className="space-y-2 mb-4 text-sm">
          <div className="flex justify-between">
            <span>신청 완료</span>
            <span className="text-green-500 font-bold">{approvedCount}</span>
          </div>
          <div className="flex justify-between">
            <span>신청 대기</span>
            <span className="text-yellow-500 font-bold">{waitingCount}</span>
          </div>
          <div className="flex justify-between">
            <span>신청 거절</span>
            <span className="text-red-500 font-bold">{rejectedCount}</span>
          </div>
        </div>
        <div className="mt-2">
          <div className="text-sm font-semibold text-gray-700 mb-2">최근 신청 내역</div>
          <div className="overflow-auto text-sm">
            <table className="w-full text-left text-gray-600">
              <thead>
              <tr className="border-b">
                <th className="py-1">품목명</th>
                <th className="py-1">신청일자</th>
                <th className="py-1">상태</th>
              </tr>
              </thead>
              <tbody>
              {recentRequests.slice(0,10).map((rr) => (
                <tr key={rr.idx} className="border-b hover:bg-gray-50">
                  <td className="py-1">{rr.name}</td>
                  <td className="py-1">{rr.time ? new Date(rr.time).toLocaleDateString('ko-KR') : ''}</td>
                  <td className="py-1">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  rr.approve === 1
                    ? "bg-green-100 text-green-600"
                    : rr.approve === 0
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                }`}
              >
                {rr.approve === 1 ? "승인" : rr.approve === 0 ? "대기" : "거절"}
              </span>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPageInputRequestList;
