package main

import (
	"github.com/gin-gonic/gin"
	//ログを出すため
	"log"
	//HTTPリクエストの受け入れ、レスポンスの送信、HTTPクライアントの作成に用いる
	"net/http"
	"context"
	//ORM、今回はentを使う
	"backend/myapp/ent"
	//postgreSQLデータベースに接続するた目のドライバ
	_ "github.com/lib/pq"

	//文字列と数値の相互変換用
	"strconv"
)

//Bookの方定義
type Book struct {
	Title string `json:"title"`
	Body  string `json:"body"`
}



func main() {
	//postgreSQLに接続
	client, err := ent.Open("postgres", "host=db port=5432 user=postgres dbname=bookers password=password sslmode=disable")
	
	if err != nil {
			log.Fatalf("failed opening connection to postgres: %v", err)
	}
	// Run the auto migration tool.
	if err := client.Schema.Create(context.Background()); err != nil {
			log.Fatalf("failed creating schema resources: %v", err)
	}


	//Ginフレームワークのデフォルトの設定を使用してルータを作成
	router := gin.Default()


	// CORS設定
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		if c.Request.Method == "OPTIONS" {
				c.AbortWithStatus(http.StatusOK)
				return
		}
		c.Next()
	})


	// 本一覧を取得
	router.GET("/books", func(c *gin.Context) { getBooksHandler(c, client) })
	// 本の作成
	router.POST("/books", func(c *gin.Context){createBookHandler(c,client)})
	// 本の詳細を取得
	router.GET("/books/:id", func(c *gin.Context){getBookHandler(c,client)})
	// 本の情報を更新
	router.PATCH("/books/:id", func(c *gin.Context){updateBookHandler(c,client)})
	// 本の情報を削除
	router.DELETE("/books/:id", func(c *gin.Context){deleteBookHandler(c,client)})


	router.GET("/", helloWorld)

	//port8000で起動。起動する際にエラーが出た場合はerrに格納
	err_port := router.Run(":8000")
	//errorがある場合はログに出力
	if err_port != nil {
		log.Fatal(err_port)
	}

	//potgreSQLの接続終了
	defer client.Close()
}

func helloWorld(c *gin.Context) {
	c.String(http.StatusOK, "Hello World!")
}

func getBooksHandler(c *gin.Context,client *ent.Client){

	//Book一覧を取得する
	books,err:=client.Book.Query().All(context.Background())
	if err!=nil{
		c.JSON(http.StatusInternalServerError,gin.H{"error": err.Error(),"messsage":"本一覧が取得できませんでした。"})
		return
	}

	//booksをjson形式で返す
	c.JSON(http.StatusOK, books)
}

func createBookHandler(c *gin.Context,client *ent.Client){
	//bookにBookの方宣言
	var book Book

	// ShouldBindJsonはJsonデータの解析屋形変換を自動で行ってくれる
	//バインドしたデータを&bookつまり先ほど定義した変数に格納
	if err := c.ShouldBindJSON(&book); err != nil {
		c.JSON(http.StatusBadRequest,gin.H{"error": err.Error(),"messsage":"無効な本のIDです。"})
		return
	}
	//Bookエンティティ
	newBook, err := client.Book.
		Create().
		SetTitle(book.Title).
		SetBody(book.Body).
		Save(context.Background())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(),"messsage":"本の保存ができませんでした。"})
		return
	}


	// 保存したBookの情報をレスポンスとして返す
	c.JSON(http.StatusOK, newBook)
}

func getBookHandler(c *gin.Context,client *ent.Client){
	// URLパラメータから本のIDを取得する
	bookIDStr := c.Param("id")
	bookID, err := strconv.Atoi(bookIDStr)
	if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error(),"messsage":"無効な本のIDです。"})
			return
	}

	// 指定されたIDの本をデータベースからクエリする
	// GETは主キーの検索の時だけ使える
	//context.Backgroud()は非同期用みたいな感じ
	book, err := client.Book.Get(context.Background(), bookID)


	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error(),"messsage":"指定された本が見つかりません。"})
		return
	}

	// 本の情報をJSON形式でレスポンスとして返す
	c.JSON(http.StatusOK, book)

}

func updateBookHandler(c *gin.Context,client *ent.Client){

	//bookにBookの方宣言
	var book Book

	// ShouldBindJsonはJsonデータの解析屋形変換を自動で行ってくれる
	//バインドしたデータを&bookつまり先ほど定義した変数に格納
	if err := c.ShouldBindJSON(&book); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error(),"messsage":"無効な本のIDです。"})
		return
	}

	// URLパラメータから本のIDを取得する
	bookIDStr := c.Param("id")
	bookID, err := strconv.Atoi(bookIDStr)
	if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error(),"messsage":"文字列変換ができませんでした。"})
			return
	}

	// 指定されたIDの本をデータベースからクエリする
	// GETは主キーの検索の時だけ使える
	//context.Backgroud()は非同期用みたいな感じ
	update_book, err := client.Book.
		UpdateOneID(bookID).
		SetTitle(book.Title).
		SetBody(book.Body).
		Save(context.Background())


	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error(),"messsage":"本の更新ができませんでした。"})
		return
	}

	// 本の情報をJSON形式でレスポンスとして返す
	c.JSON(http.StatusOK, update_book)
}

func deleteBookHandler(c *gin.Context,client *ent.Client){
	// URLパラメータから本のIDを取得する
	bookIDStr := c.Param("id")
	bookID, err := strconv.Atoi(bookIDStr)
	if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "無効な本のIDです。"})
			return
	}

	// 指定されたIDの本をデータベースからクエリする
	//context.Backgroud()は非同期用みたいな感じ
	err = client.Book.DeleteOneID(bookID).Exec(context.Background())


	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "削除に失敗しました。"})
		return
	}

	// 本の情報をJSON形式でレスポンスとして返す
	c.JSON(http.StatusOK, gin.H{"message": "削除完了しました。"})
}