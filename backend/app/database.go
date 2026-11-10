package app

import (
	"database/sql"
	"fmt"

	_ "github.com/jackc/pgx/v5/stdlib"
)

func OpenDb(connectionString string)(*sql.DB,error){

	db,err := sql.Open("pgx",connectionString)

	if err !=nil {
		return nil , err 
	}

	
	if err:=db.Ping(); err!=nil{
		db.Close()
		return nil , err 
	}
	fmt.Println("Connected to the datasbase successfully")

	return db,nil

}