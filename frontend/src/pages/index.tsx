import React from 'react';
//nextでページ遷移を行うため
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Book投稿サイト</h1>
      <p>本の投稿をしてください</p>
      <Link href="/books">
        こちらへ
      </Link>
    </div>
  );
};

export default Home;