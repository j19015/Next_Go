import React from 'react';
import Link from 'next/link';
//apiにあるcreateBookメソッドをimport
import{createBook} from'../../lib/api'

//useStateを用いて状態管理
import { useState } from 'react';

const Home = () => {
  //title,bodyを定義
  const [title,setTitle]=useState('');
  const [body,setBody]=useState('');

  //handleを定義
  const handleChangeTitle=(e :any)=>{
    setTitle(e.target.value)
  }

  const handleChangeBody=(e :any)=>{
    setBody(e.target.value)
  }
  
  return (
    <>
      <div>
        <h1>本一覧</h1>


        <h1>新規投稿</h1>
        <form>
          <div>
            <label htmlFor="title">Title</label>
            <input 
              id="title"
              name="title"
              value={title}
              onChange={handleChangeTitle}
            />
          </div>
          <div>
            <label htmlFor="body">Body</label>
            <input 
              id="body"
              name="body"
              value={body}
              onChange={handleChangeBody}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Home;