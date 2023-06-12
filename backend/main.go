package main

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func main() {
	router := gin.Default()

	router.GET("/", helloWorld)

	err := router.Run(":8000")
	if err != nil {
		log.Fatal(err)
	}
}

func helloWorld(c *gin.Context) {
	c.String(http.StatusOK, "Hello, World!")
}
