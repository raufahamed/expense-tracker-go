package app

import (
	"encoding/json"
	"expense-tracker/models"
	"fmt"
	"net/http"
)

func (a *Application) CreateCategory(w http.ResponseWriter, r *http.Request) {
	var category models.Category

	// Decode the JSON request body into our Expense struct.
	err := json.NewDecoder(r.Body).Decode(&category)

	if err != nil {
		a.Logger.Println("There is a problem here:", err)
		http.Error(w, "Invalid expense data", http.StatusBadRequest)
		return
	}

	query := `
	INSERT INTO category(category_name)
	VALUES($1)
	`
	_, err = a.Db.Exec(query, category.CategoryName)

	if err != nil {
		a.Logger.Println("Error creating categories:", err)
		http.Error(w, "Failed to create categories", http.StatusInternalServerError)
		return
	}

	fmt.Println(w, "created the category successfully")

}

func (a *Application) GetCategories(w http.ResponseWriter, r *http.Request) {

	var categories []models.Category

	query := `
	SELECT category_id , category_name
	FROM category
	`
	rows, err := a.Db.Query(query)

	if err != nil {
		a.Logger.Println("Error fetching categories", err)
		http.Error(w, "Failed to fetch the categories", http.StatusInternalServerError)
		return
	}

	defer rows.Close()

	for rows.Next() {

		var category models.Category

		err := rows.Scan(&category.ID, &category.CategoryName)

		if err != nil {
			a.Logger.Println("Error fetching categories done", err)
			return
		}

		categories = append(categories, category)

	}

	if err = rows.Err(); err != nil {
		a.Logger.Println("Error iterating categories:", err)
		http.Error(w, "Failed to fetch categories", http.StatusInternalServerError)
		return
	}

	err = json.NewEncoder(w).Encode(categories)
	if err != nil {
		a.Logger.Println("Error encoding the categories", err)
		return
	}

	a.Logger.Println("fecthed categories successfully")

}
