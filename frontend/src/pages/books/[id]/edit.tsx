import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getBook,updateBook } from "@/lib/api";
import Link from 'next/link';

const EditBookPage=()=>{
  const router=useRouter();
  const {id} = router.query;

  //title,bodyを定義
  const [title,setTitle]=useState('');
  const [body,setBody]=useState('');

  interface Book{
    id: number;
    title: string;
    body: string;
  }

  const [book,setBook]=useState<Book | null>(null)

  //handleを定義
  const handleChangeTitle=(e :any)=>{
    setTitle(e.target.value)
  }

  const handleChangeBody=(e :any)=>{
    setBody(e.target.value)
  }

  //本の情報を更新
  const handleUpdate=async(e :any)=>{
    // デフォルトのページ遷移を防止
    e.preventDefault();

    //保存する本を出力
    console.log({title,body})

    //createBookを実行
    try{
      if(book!=null){
        const res = await updateBook({
          id: book.id,
          title: title,
          body: body,
        });
        //保存した本の情報を出力
        console.log("本の更新ができました",res)
        // 更新した本の情報を反映

      }
    }catch(e){
      console.log("上手く本の更新ができませんでした",e)
    }
  }

  /// 本の情報を取得
  const handleGetBook = async (id: number) => {
    try {
      console.log(id);
      // 一つの本の情報を取得するAPIを呼び出し
      const res = await getBook(id);
      // 取得した本の情報を表示
      console.log(res);
      //取得した情報をbookにセット
      setBook(res)

      setTitle(res.title)

      setBody(res.body)
      
    } catch (e) {
      console.log("本の情報を取得できませんでした。");
    }
  };

  useEffect(() => {
    if (typeof id === "string" && !isNaN(Number(id))) {
      // idが文字列で、有効な数値の場合の処理
      const parsedId = Number(id);
      // 本の情報を取得
      handleGetBook(parsedId);
    } else {
      // idが無効な場合のエラーハンドリング
      console.log("無効なidです。");
    }
  }, [id]); // idを依存配列に含める

  return (
    <>
      <h1>Edit Book</h1>
      <form onSubmit={handleUpdate}>
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
            <button type="submit">更新</button>
          </div>
        </form>

      <Link href="/books">
        back
      </Link>
      |
      <Link href={`/books/${book?.id}`}>
        show
      </Link>
    </>
  )


}

export default EditBookPage;