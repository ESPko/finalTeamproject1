import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance.jsx';
import { useNavigate } from 'react-router-dom';

function MainPageInputRequestList() {
  const [recentRequests, setRecentRequests] = useState([])

  const waitingCount = recentRequests.filter(r => r.approve === 0).length;

  // 페이지 이동을 위한 부분
  const navigate = useNavigate();

  // 목록 불러오기
  useEffect(() => {
    axiosInstance.get('/inputRequestList')
      .then(res => {
        const mappedData = res.data.map((rr) => ({
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
      <div className=" p-4 flex flex-col ">
        <div className="flex justify-between items-center mb-4 ">
          {/*입고 신청 내역 글자 클릭 시 승인 목록 페이지로 이동*/}
          <div className="text-lg font-bold text-gray-800 "> 승인 신청 내역</div>
          <div className="text-sm text-gray-400">{recentRequests.length > 0
            ? new Date(recentRequests[0].time).toLocaleDateString('ko-KR')
            : '---'}</div>
        </div>

        <div className="space-y-2 mb-4 text-sm">
          <div className="flex justify-between">
            <span>승인 대기</span>
            <span className="text-gray-500 font-bold">{waitingCount}</span>
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
              {recentRequests.slice(0,5).map((rr) => (
                <tr key={rr.idx} className="border-b hover:bg-gray-50">
                  <td className="py-1">{rr.name}</td>
                  <td className="py-1">{rr.time ? new Date(rr.time).toLocaleDateString('ko-KR') : ''}</td>
                  <td className="py-1">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  rr.approve === 1
                    ? "bg-green-100 text-green-600"
                    : rr.approve === 0
                      ? "bg-gray-100 text-gray-600"
                      : rr.approve === 2
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                }`}
              >
                {rr.approve === 1 ? "승인 완료"
                  : rr.approve === 0 ? "승인 대기"
                    :rr.approve === 2 ?  "승인 거절"
                      :"승인 완료"}
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
