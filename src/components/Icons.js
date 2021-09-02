import React,{useState} from 'react';
import IdGenerator from '../helpers/IdGenerator'
import {BlockPicker} from 'react-color'
import {Button} from 'react-bootstrap'
import file from '../svg/3Dfile.svg'
import design from '../svg/design.svg'
import gif from '../svg/gif.svg'
import idea from '../svg/idea.svg'
import polish from '../svg/polish.svg'
import rend from '../svg/rend.svg'
import plus from '../svg/plus.svg'

const InitialIcons = [
    {src:idea, alt:'Идея Скетч',color:'#F5961B',id:IdGenerator()},
    {src:design,alt:'Дизайн',color:'#F5421B',id:IdGenerator()},
    {src:file,alt:'3D файл',color:'#5181DF',id:IdGenerator()},
    {src:rend,alt:'Ренд',color:'#67AA82',id:IdGenerator()},
    {src:gif,alt:'Анимация',color:'#E2E47A',id:IdGenerator()},
    {src:polish,alt:'Прлировка',color:'#BA68FB',id:IdGenerator()},
]
export default function Icons(){
    const [icons,setIcons] = useState(InitialIcons)
    const [openModal,setopenModal] = useState('none')
    const [selectId,setSelectId] = useState('')
    const [selectColor,setSelectColor] = useState('')
    function fooOpenModal (id){       
            setopenModal('flex')
            setSelectId(id)     
            let color =  icons.filter(i=>i.id===id)[0].color
            setSelectColor(color)
    }
    function dellIcon(id){
        let newIcons = icons.filter(i=>i.id!==id)
        setIcons(newIcons)
        setopenModal('none')
    }
    function editIcon(color){
        let newIcons = icons.map(i=>{
            if(i.id===selectId){
                i.color = color
            }
            return i
        })
        setIcons(newIcons)
        setopenModal('none')
    }
        return (
        <div className='conIcons'>
            <div className='conIconsImg'>
                {icons.map(i=>{
                    return( 
                        <div onClick={()=>fooOpenModal(i.id)} className='iconCard' key={i.id}>
                            <img src={i.src} alt={i.alt} style={{color:i.color}} />
                            <div className='circle' style={{backgroundColor:i.color}}></div>
                            <p className='iconName'>{i.alt}</p>
                        </div>                       
                    )
                })}
                <div className='addIcon'>
                    <img src={plus} alt='plus'></img>
                </div>
            </div>
            <div className='rec'></div>
            <div style={{display:openModal}} className='editModal'>
                <BlockPicker
                    color={selectColor}
                    onChange={(color)=>setSelectColor(color.hex)}
                />
                <div>
                    <Button onClick={()=>dellIcon(selectId)}  variant="danger">Dell</Button>
                    <Button onClick={()=>editIcon(selectColor)} variant="success" >Edit</Button>
                </div>
            </div>
        </div>
    )
}