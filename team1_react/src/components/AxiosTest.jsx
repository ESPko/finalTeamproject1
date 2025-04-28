import axios from "axios";

function AxiosTest() {
    const sendDataTest = () => {
        axios.get("http://localhost:8080/employee")
        .then(res => {
            console.log('axios를 사용한 비동기 통신에 성공')
            console.log(res.data)
        })
        .catch(err => {
            console.log("비동기 통신 중 오류가 발생했습니다.")
            console.log(err)
        })
    }
    return (
        <div>
            <button type={'button'} className={'btn btn-secondary me-2'} onClick={sendDataTest}>Spring RestAPI 서버 접속 테스트</button>
        </div>
    );
}

export default AxiosTest