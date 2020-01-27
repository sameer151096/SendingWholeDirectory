package main

import (
	"net/http"
	"net/url"
	"strings"
)

func main() {
	fs := http.FileServer(http.Dir("assets/"))
	f := func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Access-Control-Allow-Origin", "*")
		w.Header().Add("Access-Control-Allow-Methods", "POST,OPTIONS")
		w.Header().Add("Access-Control-Allow-Headers", "access-control-allow-origin,content-type,Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Access-Control-Max-Age")
		w.Header().Add("Access-Control-Max-Age", "600")
		//add token validation
		prefix := "/testms/static/"
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		// if r.Method == "POST" || r.Method == "post" {

		if p := strings.TrimPrefix(r.URL.Path, prefix); len(p) < len(r.URL.Path) {
			r2 := new(http.Request)
			*r2 = *r
			r2.URL = new(url.URL)
			*r2.URL = *r.URL
			r2.URL.Path = p
			fs.ServeHTTP(w, r2)
			return
		} else {
			NotFound(w, r)
			return
		}
		// } else {
		// 	http.Error(w, "badrequest", http.StatusBadRequest)
		// 	return
		// }

	}
	http.HandleFunc("/test/static/", f)

	http.ListenAndServe(":8080", nil)

}

func NotFound(w http.ResponseWriter, r *http.Request) {
	http.Error(w, "404 page not found", http.StatusNotFound)
}
