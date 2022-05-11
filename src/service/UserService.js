import axios from "axios";
const USERS_REST_API_URL = 'http://localhost:8080/members';
class UserService {
    
    getUsers(){
        // 사용자의 객체 목록을 반환
       return axios.get(USERS_REST_API_URL);
    }
}

export default new UserService(); 