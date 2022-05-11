import React from "react";
import UserService from "../service/UserService";

class UserComponent extends React.Component{
    constructor(props){
        // props 구성요소를 부모 객체인 React.Compnent에 전달
        super(props);
        this.state = {
            Member : [],
        }
    }

    componentDidMount(){
        UserService.getUsers().then((response) => {
            this.setState({ Member: response.data})
        });
    }

    render(){
        return(
            
            <div className="userTable">
                <h1 className="text-center">Users List</h1>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <td>User name</td>
                        <td>User email</td>
                        <td>User password</td>
                        <td>User student_number</td>
                        <td>User grade</td>
                        <td>User major</td>
                    </tr>
                    </thead>
                    <tbody>
                            {
                            this.state.Member.map(
                                Members =>
                                <tr key = {Members.name}>
                                    <td>{Members.name}</td>
                                    <td>{Members.email}</td>
                                    <td>{Members.password}</td>
                                    <td>{Members.studentNumber}</td>
                                    <td>{Members.grade}</td>
                                    <td>{Members.major}</td>
                                    </tr>
                                )
                            
                            }
                    </tbody>
                </table>
            </div>
            
        );
    }
}

export default UserComponent;