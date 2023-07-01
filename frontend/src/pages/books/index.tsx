import React, { useEffect } from 'react';
import Link from 'next/link';
//apiにあるcreateBookメソッドをimport
import{createBook,getBookAll} from'../../lib/api'

//useStateを用いて状態管理
import { useState } from 'react';


interface Book{
  title: string;
  body: string;
}

const Home = () => {

  useEffect(()=>{
    getBookAllhandle();
  },[]);


  //title,bodyを定義
  const [title,setTitle]=useState('');
  const [body,setBody]=useState('');

  // 本の一覧を入れる変数を定義
  const [bookAll, setBookAll] = useState<Book[]>([]);

  //handleを定義
  const handleChangeTitle=(e :any)=>{
    setTitle(e.target.value)
  }

  const handleChangeBody=(e :any)=>{
    setBody(e.target.value)
  }

  //本を作成
  const handleSubmit=async(e :any)=>{
    // デフォルトのページ遷移を防止
    e.preventDefault();

    //保存する本を出力
    console.log({title,body})

    //createBookを実行
    try{
      const res= await createBook({title,body})
      //保存した本の情報を出力
      console.log(res)
    }catch(e){
      console.log("上手く本の保存ができませんでした",e)
    }
  }

  //本一覧を取得
  const getBookAllhandle=async()=>{
    try {
      // 本一覧を取得するAPIを呼び出し
      const res = await getBookAll();
      // 取得した本一覧を表示
      setBookAll(res);
      console.log(res);
  
    } catch (error) {
      console.log("本一覧の取得に失敗しました", error);
    }
  }
  
  return (
    <>
      <div>
        <h1>本一覧</h1>
        <table>

        </table>



        <h1>新規投稿</h1>
        <form onSubmit={handleSubmit}>
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
          <div>
            <button type="submit">登録</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Home;