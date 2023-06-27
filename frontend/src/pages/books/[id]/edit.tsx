import { useRouter } from "next/router";

const EditBookPage=()=>{
  const router=useRouter();
  const {id} = router.query;

  //本の情報を取得する処理を記述

  return (
    <>
      <h1>Edit Book</h1>
    </>
  )


}

export default EditBookPage;