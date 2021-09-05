import React,{useState} from 'react';
import IdGenerator from '../helpers/IdGenerator'
import {ChromePicker } from 'react-color'
import {Button} from 'react-bootstrap'
import file from '../svg/3Dfile.svg'
import design from '../svg/design.svg'
import gif from '../svg/gif.svg'
import idea from '../svg/idea.svg'
import polish from '../svg/polish.svg'
import rend from '../svg/rend.svg'
import plus from '../svg/plus.svg'
import image from '../svg/image-gallery.svg'

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
    const [selectName,setSelectName] = useState('')
    const [addOrEdd,setAddOrEdd] = useState('')
    
    let fileInput = React.createRef()
    
    function fooOpenModal (id){   
        let cloneIcons = [...icons]    
        setopenModal('flex')
        setAddOrEdd('edd')
        setSelectId(id)     
        let color =  cloneIcons.filter(i=>i.id===id)[0].color
        let name =  cloneIcons.filter(i=>i.id===id)[0].alt
        setSelectColor(color)
        setSelectName(name)
    }
        
    function dellIcon(id){
        let cloneIcons = [...icons]
        cloneIcons = icons.filter(i=>i.id!==id)
        setIcons(cloneIcons)
        setopenModal('none')
    }
    
    function editIcon(color,name){     
        let cloneIcons = [...icons]
        cloneIcons = cloneIcons.map(i=>{
            if(i.id===selectId){
                i.color = color
                i.alt = name
            }
            return i
        })
        setIcons(cloneIcons)
        setopenModal('none')
        setSelectName('')
    }


    function addImage () {      
        let file = fileInput.current.files[0]
        if(file && selectName){
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {   
                const cloneIcons = [...icons]
                const newIcon =  {src:reader.result ,alt:selectName,color:selectColor,id:IdGenerator()}
                cloneIcons.push(newIcon)
                setIcons(cloneIcons)
                setopenModal('none')
            }
        }        
    }
    function isdisabled () {
        return (addOrEdd==='add')?true:false
    }
    function fooAdd () {
        setSelectName('')
        setAddOrEdd('add')
        setopenModal('flex')
    }
    return (
        <div className='conIcons'>
            <div className='conIconsImg'>
                {icons.map(i=>{
                    return( 
                        <div onClick={()=>fooOpenModal(i.id)} className='iconCard' key={i.id}>
                            <img src={i.src} alt={i.alt} />
                            <div className='circle' style={{backgroundColor:i.color}}></div>
                            <p className='iconName'>{i.alt}</p>
                        </div>                       
                    )
                })}
                <div className='addIcon' onClick={fooAdd}>
                    <img  src={plus} alt='plus' />
                </div>
            </div>
            <div className='rec'></div>
            <div style={{display:openModal}} className='editModal'>
                <ChromePicker  
                    className='w-50'
                    color={selectColor}
                    onChange={(color)=>setSelectColor(color.hex)}
                    />
                    <div className='conInput'>.                        
                        <label  className='inputFile'>
                            <input type="file" id="file" ref={fileInput} disabled={!isdisabled()} style={{display:'none'}}/>
                            <img src={image} alt='add'/>
                        </label>
                        <input type="text" value={selectName} onChange={e=>setSelectName(e.target.value)} className='inputText'/>
                    </div>
                <div className='conBtn'>
                    <Button onClick={()=>dellIcon(selectId)}  variant="danger" disabled={isdisabled()}>Dell</Button>
                    <Button onClick={()=>editIcon(selectColor,selectName)} variant="success" disabled={isdisabled()} >Edit</Button>
                    <Button onClick={addImage} disabled={!isdisabled()}>Add</Button>
                </div>
            </div>
        </div>
    )
}