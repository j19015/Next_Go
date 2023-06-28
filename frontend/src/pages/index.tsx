import React from 'react';
//nextでページ遷移を行うため
import Link from 'next/link';
//apiにあるcreateBookメソッドをimport
import {createBook} from '../lib/api'
//useStateを用いて状態管理
import { useState } from 'react';

const Home = () => {
  //title,bodyを定義
  const [title,setTitle]=useState('');
  const [body,setBody]=useState('');
  
  return (
    <div>
      <h1>Book投稿サイト</h1>
      <p>本の投稿をしてください</p>
      <Link href="/books">
        こちらへ
      </Link>
    </div>
  );
};

export default Home;