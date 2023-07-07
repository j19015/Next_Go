import React, { useEffect } from 'react';
import Link from 'next/link';
//apiにあるcreateBookメソッドをimport
import{createBook,getBookAll,deleteBook} from'../../lib/api'

//useStateを用いて状態管理
import { useState } from 'react';


interface Book{
  id: number;
  title: string;
  body: string;
}

const Home = () => {

  useEffect(()=>{
    handleGetBookAll();
  },[]);


  //title,bodyを定義
  const [title,setTitle]=useState('');
  const [body,setBody]=useState('');

  // 本の一覧を入れる変数を定義
  const [bookAll, setBookAll] = useState<Book[]>([]);

  //バリデーションのエラーメッセージを出力する変数を定義
  const [flashMessage, setFlashMessage]=useState('')

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
      //errorがどうかで条件分岐
      if (!res.error){
        // 取得した本情報を追加
        setBookAll(bookAll => [...bookAll, res]); 
        //サクセスメッセージを追加
        setFlashMessage("本の追加に成功しました。")
      }else{
        // もしエラーが返ってきていた場合エラーをerror変数に格納
        setFlashMessage(res.error);
      }
    }catch(e){
      console.log("上手く本の保存ができませんでした",e)
    }
  }

  //本一覧を取得
  const handleGetBookAll=async()=>{
    try {
      // 本一覧を取得するAPIを呼び出し
      const res = await getBookAll();
      // 取得した本一覧を表示
      setBookAll(res);
      console.log(res);
  
    } catch (e) {
      console.log("本一覧の取得に失敗しました", e);
    }
  }

  // 本を削除
  const handleDeleteBook=async(e :any)=>{
    try{
      // 確認ダイアログを表示し、ユーザーが「OK」を選択した場合にのみ削除を実行する
      if (window.confirm('本当に削除しますか？')) {
        // 本を削除するAPIを呼び出し
        await deleteBook(e.id);
        // サクセスメッセージを表示
        console.log("本の削除に成功しました。");
        //サクセスメッセージを格納
        setFlashMessage("本の削除に成功しました")
        // 本一覧を再取得する
        handleGetBookAll();
      }
    }catch(e :any){
      console.log("本の削除に失敗しました。",e)
    }
  }
  
  return (
    <>
      <div>
      <h1>本一覧</h1>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>body</th>
            <th colSpan={3}></th>
          </tr>
          {bookAll != null ? (
            bookAll.map((book, index) => (
              <tr key={index}>
                <td>{book.title}</td>
                <td>{book.body}</td>
                <td><Link href={`/books/${book.id}`}>Show</Link></td>
                <td><Link href={`/books/${book.id}/edit`}>Edit</Link></td>
                <td><button onClick={() => handleDeleteBook(book)}>Delete</button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>本がありません</td>
            </tr>
          )}
        </tbody>
      </table>


        <h1>新規投稿</h1>
        <p>{flashMessage}</p>
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