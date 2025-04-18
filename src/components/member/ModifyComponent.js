import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { modifyMember } from "../../api/memberApi";
import ResultModal from "../common/ResultModal";
import useCustomLogin from "../../hooks/useCustomLogin" 

const initState = {
    email : '',
    pw : '',
    nickname:''
}

const ModifyComponent = () =>{

    const [member, setMember] = useState(initState);
    const loginInfo = useSelector(state => state.loginSlice);
    const [result, setResult] = useState()
    const { moveToLogin } = useCustomLogin();


    useEffect(()=>{
        setMember({...loginInfo, pw:'ABCD'})
    },[loginInfo])

    const handleChange = (e) =>{
        // name, value 속성에 설정된 값 추출
        const {name, value} = e.target;
        setMember(prev => ({...prev, [name] : value}));
    }

    const handleClickModify = () => {
        modifyMember(member)    // API 서버에 PUT 요청
        setResult('Modified')   // 상태 변경
    }

    const closeModal = () => {
        setResult(null);
        moveToLogin()
    }

    return (
        <div className="mt-6">
            {
                result &&
                <ResultModal title={'회원정보'} content={'정보수정완료'}
                callbackFn={closeModal}
                ></ResultModal>
            }
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Email</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                    name="email" type={'text'} value={member.email} readOnly></input>

                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Password</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                    name="password" type={'password'} value={member.pw} onChange={handleChange}></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Nickname</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                    name="nickname" type={'text'} value={member.nickname} onChange={handleChange}></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap justify-end">
                    <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                    onClick={handleClickModify}>
                        Modify
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModifyComponent;