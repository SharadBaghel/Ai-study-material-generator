"use client"
import { useUser } from '@clerk/nextjs'
import React, {useEffect} from 'react'
import {db} from '@configs/db';
import {USER_TABLE} from '@configs/schema';
import {eq} from 'drizzle-orm';
import axios from 'axios';

function Provider({children}) {

    const{user}=useUser();

    useEffect(()=>{
        user&&CheckIsNewUser();

    }, [user])

    const CheckIsNewUser=async()=>{
        //check is user already exist if not add
    //   const result = await db.select().from(USER_TABLE)
//  .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress))

//if (!result?.length) {
  //const userResp = await db.insert(USER_TABLE).values({
    //name: user?.fullName,
    //email: user?.primaryEmailAddress?.emailAddress
  //}).returning({ id: USER_TABLE.id })

  //console.log(userResp)

  const resp=await axios.post('/api/create-user', {user:user});
  console.log(resp.data);
}
  return (
  <div>
        {children}
    </div>
  )
}

export default Provider