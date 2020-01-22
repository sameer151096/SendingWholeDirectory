package main

import (
	"fmt"
	"net/http"
	"time"
)

func main() {
	client := http.Client{}
	client.Timeout = 10 * time.Second
	res, err := client.Get("http://localhost:8080/static/microapp")
	if err != nil {
		fmt.Print("\n error while sending request. Error is ", err)
		return
	}

	fmt.Print("\n response status code is ", res.StatusCode)
}
