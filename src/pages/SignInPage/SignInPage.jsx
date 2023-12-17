import React, { useEffect, useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { Image } from 'antd'
import ImageLogo from '../../assets/images/Logo.png' 
import {EyeFilled, EyeInvisibleFilled} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
//import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'
import { jwtDecode } from "jwt-decode";
import {useDispatch} from 'react-redux'
import { updateUser } from '../../redux/slides/userSlide'

const SignInPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate =useNavigate()
  const dispatch = useDispatch()

  const mutation = useMutationHooks(
    data => UserService.loginUser(data)
  )

  const {data, isLoading, isSuccess, isError} = mutation

  useEffect(() => {
    if(isSuccess){
      message.success() 
      navigate('/')
      console.log('data', data)
      localStorage.setItem('access_token', JSON.stringify(data?.access_token))
      if(data?.access_token){
        const decoded = jwtDecode(data?.access_token)
        if(decoded?.id){
          handleGetOneUser(decoded?.id, data?.access_token)
        }
      }
    }
  }, [isSuccess])

  const handleGetOneUser = async (id, token) => {
    const res = await UserService.getOneUser(id, token)
    dispatch(updateUser({...res?.data, access_token: token}))
  }

  console.log('mutation', mutation)
  const handleNavigateSignUp = () => {
    navigate('/sign-up')
  }
  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }
  const handleOnchangePassword = (value) => {
    setPassword(value)
  }
  const handleSignIn = () => {
    mutation.mutate({
      email,
      password
    })
  }
  const [isShowPassword, setIsShowPassword] = useState(false)
  return (
    <div style={{display: 'flex', alignItems:'center', justifyContent:'center', background:'rgba(0, 0, 0, 0.53)', height:'100vh'}}>
      <div style={{width: '800px', height:'445px', borderRadius: '6px', background: '#fff', display: 'flex'}}>
        <WrapperContainerLeft>
          <h1>Xin chào,</h1>
          <p>Đăng nhập hoặc tạo tài khoản</p>
          <InputForm style={{marginBottom: '10px'}} placeholder="abc@gmail.com" value={email} onChange = {handleOnchangeEmail}/>
          <div style={{position: 'relative'}}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px',
                cursor: 'pointer'
              }}
            >{
              isShowPassword ? (
                <EyeFilled style={{fontSize:'17px'}}/>
              ) : (
                <EyeInvisibleFilled style={{fontSize:'17px'}}/>
              )
            }
            </span>
          </div>
          <InputForm placeholder="Password" type={isShowPassword ? "text" : "Password"} value={password} onChange = {handleOnchangePassword}/>
          {data?.status === 'ERR' && <span style={{color: 'red'}}>{data?.message}</span>}
          {/* <Loading isLoading={isLoading}> */}
            <ButtonComponent
              disabled={!email.length || !password.length }
              onClick={handleSignIn}
              size={40} 
              styleButton={{
                  backgroundColor: 'rgba(140,40,48,255)', borderRadius: '6px',
                  height: '48px',
                  width: '100%',
                  margin: '26px 0 10px'
              }}
              styleTextButton = {{color: '#fff', fontSize:'15px', fontWeight: '500'}}
              textButton = {'Đăng nhập'}          
            ></ButtonComponent>
           {/* </Loading> */}
          <WrapperTextLight>Quên mật khẩu</WrapperTextLight>
          <p>Chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperTextLight></p>
        </WrapperContainerLeft>
        <WrapperContainerRight style={{background: 'rgb(216, 116, 124)'}}>
          <Image src={ImageLogo} preview={false} alt='ImageLogo' height="203px" width="203px" />
          <h2>Mua sắm tại đây</h2>
        </WrapperContainerRight>
      </div>
    </div> 
  )
}

export default SignInPage