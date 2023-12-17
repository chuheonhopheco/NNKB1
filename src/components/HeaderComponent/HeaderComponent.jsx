import { Badge, Button, Col, Popover } from 'antd'
import React, { useState } from 'react'
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccount, WrapperHeaderCart, WrapperHeaderText, WrapperTextHeader } from './style'
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService'
import { resetUser, updateUser } from '../../redux/slides/userSlide'
//import Loading from '../LoadingComponent/Loading';
import { useEffect } from 'react';
import { searchProduct } from '../../redux/slides/productSlide';

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [search,setSearch] = useState('')
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const order = useSelector((state) => state.order)
  //const [loading, setLoading] = useState(false);
  const handleNavigateLogin = () => {
    navigate('/sign-in')
  } 

  const onSearch = (e) => {
    setSearch(e.target.value)
    dispatch(searchProduct(e.target.value))
  }


  const handleLogout = async () => {
    //setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    //setLoading(false)
  }

  useEffect(() => {
    //setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    //setLoading(false)
  }, [user?.name, user?.avatar])

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>Thông tin người dùng</WrapperContentPopup>
      {user?.isAdmin && (
      <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>Đơn hàng của tôi</WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContentPopup>
    </div>
  );

  const handleClickNavigate = (type) => {
    if(type === 'profile') {
      navigate('/profile-user')
    }else if(type === 'admin') {
      navigate('/system/admin')
    }else if(type === 'my-order') {
      navigate('/my-order',{ state : {
        id: user?.id,
        token : user?.access_token
      }
    })
    }else {
      handleLogout()
    }
    setIsOpenPopup(false)
  }

  return (
    <div>
      <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>
        <Col span={6}>
          <WrapperTextHeader>VINYLHANOI</WrapperTextHeader>
        </Col>
        {!isHiddenSearch && (
          <Col span={13}>
            <ButtonInputSearch
              size="large"
              bordered={false}
              textButton="Tìm kiếm"
              placeholder="input search text"
              onChange={onSearch}
            />
          </Col>
        )}
        <Col span={6} style={{ display: 'flex', gap: '20px'}}>
        {/* <Loading isLoading={loading}> */}
            <WrapperHeaderAccount>
            {userAvatar ? (
                <img src={userAvatar} alt="avatar" style={{
                  height: '30px',
                  width: '30px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }} /> //hiển thị avatar
              ) : (
                <UserOutlined style={{ fontSize: '30px' }} />
              )} 
              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click">
                    <div style={{ cursor: 'pointer' }}>{userName?.length ? userName : user?.email}</div>
                  </Popover>
                </>
              ) : (
                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                  <WrapperHeaderText>Đăng nhập/Đăng ký</WrapperHeaderText>
                  <div>
                    <WrapperHeaderText>Tài khoản</WrapperHeaderText>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WrapperHeaderAccount>
          {/* </Loading> */}
          {!isHiddenCart && (
            <div onClick={() => navigate('/order')} style={{cursor: 'pointer'}}>
            <Badge count={order?.orderItems?.length} size="small">
              <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
              </Badge>
              <WrapperHeaderText>Giỏ hàng</WrapperHeaderText>
            </div>
          )}
        </Col>
      </WrapperHeader>
    </div>
  )
}

export default HeaderComponent