import React, { useEffect } from 'react';
import Link from 'next/link';
//apiにあるcreateBookメソッドをimport
import{createBook,getBookAll,deleteBook} from'../../lib/api'

//useStateを用いて状態管理
import { useState } from 'react';

//MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


import { TextField, Typography, Button, Box } from '@mui/material';


interface Book{
  id: number;
  title: string;
  body: string;
}

interface flashMessageType{
  errorMessage: string;
  successMessage: string;
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
   const [flashMessage, setFlashMessage]=useState<flashMessageType | null>(null)

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
        setFlashMessage({successMessage:"本の追加に成功しました。",errorMessage:""})
      }else{
        // もしエラーが返ってきていた場合エラーをerror変数に格納
        setFlashMessage({successMessage:"",errorMessage:res.error});
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
        setFlashMessage({successMessage:"本の削除に成功しました。",errorMessage:""})
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
        
        <p style={{ color: "red" }}>{flashMessage?.errorMessage}</p>
        <p style={{ color: "green" }}>{flashMessage?.successMessage}</p>
        
        <h1>New Book</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            id="title"
            label="Title"
            value={title}
            onChange={handleChangeTitle}
            sx={{m:2}}
          /><br/>
          <TextField
            id="body"
            label="Body"
            value={body}
            onChange={handleChangeBody}
            sx={{m:2}}
          /><br/>
          <Button type="submit" variant="contained" sx={{m:2}}>Submit</Button>
        </form>

        <h1>Book Index</h1>
        <TableContainer>
          <Table sx={{ width: 600 }}>
            <TableHead>
              <TableRow>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Body</TableCell>
                <TableCell align="left">Options</TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookAll != null ? (
                bookAll.map((book, index) => (
                  <TableRow
                    key={index}
                  >
                    <TableCell align="left">{book.title}</TableCell>
                    <TableCell align="left">{book.body}</TableCell>
                    <TableCell align="left"><Link href={`/books/${book.id}`}>Show</Link></TableCell>
                    <TableCell align="left"><Link href={`/books/${book.id}/edit`}>Edit</Link></TableCell>
                    <TableCell align="left"><Button variant="outlined" color="error" onClick={() => handleDeleteBook(book)}>Delete</Button></TableCell>
                  </TableRow>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>no book submit</td>
                </tr>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Home;