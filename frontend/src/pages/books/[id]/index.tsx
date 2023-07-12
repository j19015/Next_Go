import { useRouter } from "next/router";
import { getBook } from "@/lib/api";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { Link as MuiLink } from '@mui/material';
import { Typography} from '@mui/material';

const ShowBookPage = () => {
  const router = useRouter();
  const { id } = router.query;

  interface Book{
    id: number;
    title: string;
    body: string;
  }

  const [book,setBookAll]=useState<Book>()

  // 本の情報を取得
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
      console.log("本の情報を取得できませんでした。",e);
    }
  };

  useEffect(() => {
    if (typeof id === "string" && !isNaN(Number(id))) {
      // idが文字列で、有効な数値の場合の処理
      const parsedId = Number(id);
      handleGetBook(parsedId);
    } else {
      // idが無効な場合のエラーハンドリング
      console.log("無効なidです。");
    }
  }, [id]); // idを依存配列に含める

  return (
    <>
      <h1>Show Book</h1>
      <Typography variant="body1">title: {book?.title}</Typography>
      <Typography variant="body1">body: {book?.body}</Typography>
      <MuiLink href="/books" underline="hover" sx={{ marginRight: '0.5rem' }}>
        back
      </MuiLink>
      |
      <MuiLink href={`/books/${book?.id}/edit`} underline="hover" sx={{ marginLeft: '0.5rem' }}>
        edit
      </MuiLink>
    </>
  );
};

export default ShowBookPage;
