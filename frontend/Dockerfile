# ベースイメージを指定します
FROM node:16-alpine

# 作業ディレクトリを設定します
WORKDIR /app

# 依存関係をインストールします
COPY package.json package-lock.json ./

# ソースコードをコピーします
COPY . .

RUN npm install


# アプリケーションをビルドします
RUN npm run build

# ポート番号を指定します（必要に応じて変更してください）
EXPOSE 8000

# アプリケーションを起動します
CMD ["npm","run","dev"]
