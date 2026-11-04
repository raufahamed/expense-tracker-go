package app

import (
	"expense-tracker/models"
	"fmt"
	"log"
	"net/http"
	"os"
)

type Application struct {
	Logger *log.Logger 
	Expenses []models.Expense

}


func NewApplication()(*Application,error){

	logger  := log.New(os.Stdout,"",log.Ldate|log.Ltime)
	app := &Application{
		Logger: logger,
	}
	return app  , nil 
}


func (a*Application) HealthCheck(w http.ResponseWriter , r*http.Request){
	fmt.Fprintln(w,"healt check is running successfull")
} 