package main

import (
	"github.com/gin-gonic/gin"
	//ログを出すため
	"log"
	//HTTPリクエストの受け入れ、レスポンスの送信、HTTPクライアントの作成に用いる
	"net/http"
	//Goのデータベース操作のためのインターフェースを提供。データベースへの接続、クエリの実行、結果の取得に用いる
	//"database/sql"
	//jsonデータのエンコード、デコードに用いる。
	//"encoding/json"
	//ORM、今回はentを使う
	"context"
	"backend/myapp/ent"
	//postgreSQLデータベースに接続するた目のドライバ
	_ "github.com/lib/pq"
)

func main() {

	//postgreSQLに接続
	client, err := ent.Open("postgres", "host=db port=5432 user=postgres dbname=bookers password=password sslmode=disable")
	
	if err != nil {
			log.Fatalf("failed opening connection to postgres: %v", err)
	}
	defer client.Close()
	// Run the auto migration tool.
	if err := client.Schema.Create(context.Background()); err != nil {
			log.Fatalf("failed creating schema resources: %v", err)
	}


	//Ginフレームワークのデフォルトの設定を使用してルータを作成
	router := gin.Default()
	// 本一覧を取得
	router.GET("/books", getBooks)
	// 本の作成
	router.POST("/books", createBook)
	// 本の詳細を取得
	router.GET("/books/:id", getBook)
	// 本の情報を更新
	router.PUT("/books/:id", updateBook)
	// 本の情報を削除
	router.DELETE("/books/:id", deleteBook)


	router.GET("/", helloWorld)

	//port8000で起動。起動する際にエラーが出た場合はerrに格納
	err_port := router.Run(":8000")
	//errorがある場合はログに出力
	if err_port != nil {
		log.Fatal(err_port)
	}
}

func helloWorld(c *gin.Context) {
	c.String(http.StatusOK, "Hello, World!")
}

func getBooks(c *gin.Context){
	c.String(http.StatusOK, "Hello getBooks")
}

func createBook(c *gin.Context){
	c.String(http.StatusOK, "Hello getBooks")
}

func getBook(c *gin.Context){

}

func updateBook(c *gin.Context){

}

func deleteBook(c *gin.Context){

}