import { useRouter } from "next/router";

const ShowBookPage=()=>{
  const router=useRouter();
  const {id} = router.query;

  //本の情報を取得する処理を記述

  return (
    <>
      <h1>Show Book</h1>
    </>
  )


}

export default ShowBookPage;