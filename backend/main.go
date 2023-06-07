package main

import (
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", helloWorld)
	log.Fatal(http.ListenAndServe(":8000", nil))
}

func helloWorld(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello, World!"))
}
