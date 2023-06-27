import axios, { AxiosResponse } from 'axios';

// バックエンドのAPIのURLを設定してください
//環境変数に置き換え予定
const API_URL = 'http://localhost:8000'; 

//Bookの型宣言
interface Book {
  title: string;
  body: string;
}

export const createBook = async (book: Book) => {
  try {
    const response: AxiosResponse<any> = await axios.post(`${API_URL}/books`, book);
    return response.data;
  } catch (e :any) {
    throw new Error(e.response.data.message);
  }
};