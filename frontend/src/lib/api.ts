import axios, { AxiosResponse } from 'axios';

// バックエンドのAPIのURLを設定してください
//環境変数に置き換え予定
const API_URL = 'http://localhost:8000'; 

//Bookの型宣言
interface new_Book {
  title: string;
  body: string;
}


interface update_Book {
  id : number;
  title: string;
  body: string;
}

export const createBook = async (book: new_Book) => {
  try {
    // const response: AxiosResponse<any> = await axios.post(`${API_URL}/books`, book);
    const res: Response = await fetch(`${API_URL}/books`,{
      method: 'POST',
      // bookオブジェクトをJSON文字列に変換
      body: JSON.stringify(book),
      credentials: 'include'
    });
    return res.json();
  } catch (e :any) {
    throw new Error(e.response);
  }
};

export const getBook=async (id :number)=>{
  try{
    const res: Response = await fetch(`${API_URL}/books/${id}`,{
      method: 'GET',
      credentials: 'include'
    });
    return res.json();
  } catch(e :any){
    throw new Error(e.response);
  }
}

export const getBookAll=async()=>{
  try{
    const res: Response = await fetch(`${API_URL}/books`,{
      method: 'GET',
      credentials: 'include'
    });
    return res.json();
  } catch(e :any){
    throw new Error(e.response);
  }
}

export const deleteBook=async(id :number)=>{
  try{
    const res: Response = await fetch(`${API_URL}/books/${id}`,{
      method: 'DELETE',
      credentials: 'include'
    });
  } catch(e :any){
    throw new Error(e.response)
  }
}

export const updateBook=async(book: update_Book)=>{
  try{
    const res: Response = await fetch(`${API_URL}/books/${book.id}`,{
      method: 'PATCH',
      body: JSON.stringify(book),
      credentials: 'include'
    });
    return res.json();
  } catch(e :any){
    throw new Error(e.response)
  }
}