import React, { useState } from 'react';
import {Button,InputGroup,FormControl} from 'react-bootstrap'
export default function Changer () {
    const [amd,setAmd] = useState('')
    const [result,setResult] = useState('')
    const convert = (many) => {
        const arr = [100000,50000,20000,10000,5000,2000,1000,500,200,100,50,20,10]
        const arrN = [0,0,0,0,0,0,0,0,0,0,0,0,0]
        let res = ''
        if(many){
            arr.forEach((item,index)=>{
                while(many>=item){
                    many-=item
                    arrN[index]++
                }
            })
        }
        arrN.forEach((item,index)=>{
            if(item){
                res += ` + ${item} հատ ${arr[index]}դրամ`
            }
        })
        setResult(res.slice(2))
    }
    return(
        <div className='container'>         
            <InputGroup className="mb-3">
                <FormControl
                    className='m-2'
                    value={amd} 
                    onChange={e=>setAmd(e.target.value)} 
                    type='number'
                    placeholder='Enter your many'
                    />
                <Button  
                    className='m-2'
                    variant="outline-secondary" 
                    id="button-addon2"
                    onClick={()=>convert(amd)}
                    >
                    Button
                </Button>
            </InputGroup>
            <p style={{fontSize:'20px',margin:'20px'}}>{result}</p>
        </div>
    )
}