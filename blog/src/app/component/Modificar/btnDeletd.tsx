"use client"
import { jwtDecode } from "jwt-decode";

import React, { useEffect } from 'react'

type Props = {}

const BtnDeletd = (props: Props) => {
    useEffect(()=>{
        const token = localStorage.getItem("token")
        if (token) {
            const result = jwtDecode(token)
            console.log(result);
        }
        
        
        
    },[])
  return (
    <div>btnDeletd</div>
  )
}

export default BtnDeletd