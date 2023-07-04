import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getBook } from "@/lib/api";
import Link from 'next/link';

const EditBookPage=()=>{
  const router=useRouter();
  const {id} = router.query;

  interface Book{
    id: number;
    title: string;
    body: string;
  }

  const [book,setBookAll]=useState<Book>()
  
  /// 本の情報を取得
  const handleGetBook = async (id: number) => {
    try {
      console.log(id);
      // 一つの本の情報を取得するAPIを呼び出し
      const res = await getBook(id);
      // 取得した本の情報を表示
      console.log(res);
      //取得した情報をbookにセット
      setBookAll(res)
    } catch (e) {
      console.log("本の情報を取得できませんでした。");
    }
  };

  return (
    <>
      <h1>Edit Book</h1>

      <Link href="/books">
        back
      </Link>
      |
      <Link href={`/books/${book?.id}/edit`}>
        edit
      </Link>
    </>
  )


}

export default EditBookPage;