import React from 'react'
import { WrapperLabelText, WarpperTextValue, WarpperContent, WrapperTextPrice} from './style'
import { Checkbox, Rate } from 'antd'

const NavBarComponent = () => {
    const onChange = () => { }
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option) => {
                    return (
                        <div>
                            return (
                                <WarpperTextValue>{option}</WarpperTextValue> 
                            )
                        </div>
                    )
                    })
                case'checkbox':
                    return (<Checkbox.Group style={{ width: '100%',display: 'flex', flexDirection: 'column', gap: '12px'}} onChange={onChange}>
                        {options.map((option)=>{
                            return (
                                <Checkbox style={{ marginLeft: 0 }}value={option.value}>{option.label}</Checkbox>
                            )
                        })}
                        <Checkbox value="B">B</Checkbox>
                  </Checkbox.Group>
                    )
                case'star':

                        return options.map((option)=>{
                            console.log('check', option)
                        return (
                            <div style={{display:'flex', gap:'4px'}}>
                            <Rate style={{fontSize: '12px'}} disabled defaultValue={option} />
                            <span> {`tu ${option} sao`}</span>
                            </div> 
                       )
                    })
                    case 'price':
                        return options.map((option) => {
                            return (
                                <WrapperTextPrice>{option}</WrapperTextPrice>
                            )
                        })
            default:
                return {}
        }
        
    }
    return (
        <div>
            <WrapperLabelText>Label</WrapperLabelText>
            <WarpperContent>
                {renderContent('text', ['Tu lanh','TV','MAY GIAT'])}
            </WarpperContent>
        </div>
    )
}

export default NavBarComponent