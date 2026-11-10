package app

import (
	"database/sql"
	"expense-tracker/models"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

type Application struct {
	Logger *log.Logger 
	Expenses []models.Expense
	Db    *sql.DB

}


func NewApplication()(*Application,error){

	logger  := log.New(os.Stdout,"",log.Ldate|log.Ltime)
	err :=godotenv.Load()
	 if err != nil {
        return nil, err
    }
	connectionString := fmt.Sprintf(
    "host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
    os.Getenv("DB_HOST"),os.Getenv("DB_PORT"),os.Getenv("DB_USER"),os.Getenv("DB_PASSWORD"),os.Getenv("DB_NAME"),
)


	db,err := OpenDb(connectionString)

	if err!=nil{
		return nil , err 
	}
	app := &Application{
		Logger: logger,
		Db: db,
	}
	return app  , nil 
}


func (a*Application) HealthCheck(w http.ResponseWriter , r*http.Request){
	fmt.Fprintln(w,"healt check is running successfull")
} 