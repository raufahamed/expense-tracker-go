package main

import (
	"expense-tracker/app"
	"expense-tracker/routes"
	"net/http"
	"time"
)

func main() {

	app, err := app.NewApplication()

	if err != nil {
		panic(err)
	}

	r := routes.SetUpRouter(app)

	server := &http.Server{
		Addr:         ":8080",
		Handler:      r,
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}
	app.Logger.Println("our app is started to run at port 8080")
	defer app.Db.Close()
	err = server.ListenAndServe()

	if err != nil {
		app.Logger.Fatal(err)
	}
}
