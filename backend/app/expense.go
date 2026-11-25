package app

import (
	"encoding/json"
	"expense-tracker/models"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func (a *Application) CreateExpense(w http.ResponseWriter, r *http.Request) {
	var expense models.Expense

	userID, ok := r.Context().Value(userIDKey).(string)

	if userID == "" || !ok {

		a.Logger.Println("unauthorized api call")
		http.Error(w, "unauthorized cookies has been set", http.StatusUnauthorized)
		return
	}

	// Decode the JSON request body into our Expense struct.
	err := json.NewDecoder(r.Body).Decode(&expense)

	if err != nil {
		a.Logger.Println("There is a problem here:", err)
		http.Error(w, "Invalid expense data", http.StatusBadRequest)
		return
	}

	// Store the expense in our in-memory slice.
	// append() returns the updated slice, so we assign it back.
	a.Logger.Printf("Here is the returned data: %v", expense)
	query := `
	INSERT INTO expense(title,amount,category_id,description,user_id)
	VALUES($1,$2,$3,$4,$5)
	`
	_, err = a.Db.Exec(
		query,
		expense.Title,
		expense.Amount,
		expense.CategoryID,
		expense.Description,
		userID,
	)

	if err != nil {
		a.Logger.Println("Error creating expense:", err)
		http.Error(w, "Failed to create expense", http.StatusInternalServerError)
		return
	}

	fmt.Fprintln(w, "Expenses created successfully")
}

// GetExpenses returns all expenses stored in our slice.
func (a *Application) GetExpenses(w http.ResponseWriter, r *http.Request) {

	userID, ok := r.Context().Value(userIDKey).(string)

	a.Logger.Println("GetExpenses called for user:", userID)

	if !ok || userID == "" {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	var expenses []models.Expense

	query := `
		SELECT expense.expense_id ,expense.title , expense.description, expense.amount , category.category_id , category.category_name , expense.created_at
		FROM expense 
		INNER JOIN category 
		ON expense.category_id = category.category_id
		WHERE expense.user_id = $1	
	`

	rows, err := a.Db.Query(query, userID)

	if err != nil {
		a.Logger.Println("Error fetching expenses", err)
		http.Error(w, "failed to fetch the expenses", http.StatusInternalServerError)
		return
	}

	defer rows.Close()

	for rows.Next() {

		var expense models.Expense

		err := rows.Scan(&expense.ID, &expense.Title, &expense.Description, &expense.Amount, &expense.CategoryID, &expense.CategoryName, &expense.CreatedAt)

		if err != nil {
			a.Logger.Println("Error fetching expenses", err)
			http.Error(w, "Failed to fetch expenses", http.StatusInternalServerError)
			return
		}

		expenses = append(expenses, expense)
	}

	if err = rows.Err(); err != nil {
		a.Logger.Println("error iterating expenses", err)
		http.Error(w, "Failed to fetch expenses", http.StatusInternalServerError)
		return
	}

	err = json.NewEncoder(w).Encode(expenses)
	if err != nil {
		a.Logger.Println("Error encoding the expenses", err)
		http.Error(w, "Failed to fetch expenses", http.StatusInternalServerError)
		return
	}
	a.Logger.Println("fetched the expenses successfully")

}

func (a *Application) GetExpenseByID(w http.ResponseWriter, r *http.Request) {

	userID, ok := r.Context().Value(userIDKey).(string)

	a.Logger.Println("GetExpenses called for user:", userID)

	if !ok || userID == "" {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	expenseID := chi.URLParam(r, "id")

	if expenseID == "" {
		http.NotFound(w, r)
		return
	}

	query := `
		SELECT expense.expense_id ,expense.title , expense.description, expense.amount , category.category_id , category.category_name , expense.created_at
		FROM expense 
		INNER JOIN category 
		ON expense.category_id = category.category_id
		WHERE expense.expense_id = $1
		AND expense.user_id = $2
	`

	row := a.Db.QueryRow(query, expenseID, userID)

	var expense models.Expense

	err := row.Scan(
		&expense.ID,
		&expense.Title,
		&expense.Description,
		&expense.Amount,
		&expense.CategoryID,
		&expense.CategoryName,
		&expense.CreatedAt,
	)

	if err != nil {
		a.Logger.Println("Error getting  expense by ID:", err)
		http.Error(w, "Failed to get the  expense by ID", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	err = json.NewEncoder(w).Encode(expense)
	if err != nil {
		a.Logger.Println("Error encoding expense:", err)
		return
	}

	a.Logger.Println(w, "got the expense by id")

}

// DeleteExpense removes an expense using its ID.
func (a *Application) DeleteExpense(w http.ResponseWriter, r *http.Request) {

	userID, ok := r.Context().Value(userIDKey).(string)

	a.Logger.Println("GetExpenses called for user:", userID)

	if !ok || userID == "" {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	expenseID := chi.URLParam(r, "id")

	if expenseID == "" {
		http.NotFound(w, r)
		return
	}

	query := `
		DELETE FROM expense
		WHERE expense.expense_id = $1
		AND expense.user_id = $2
	`

	result, err := a.Db.Exec(query, expenseID, userID)

	if err != nil {
		a.Logger.Println("Error deleting expense:", err)
		http.Error(w, "Failed to delete the  expense", http.StatusInternalServerError)
		return
	}
	rowsAffected, err := result.RowsAffected()

	if err != nil {
		a.Logger.Println("Error checking affected rows:", err)
		http.Error(w, "Failed to delete expense", http.StatusInternalServerError)
		return
	}

	if rowsAffected == 0 {
		http.NotFound(w, r)
		return
	} else {
		w.WriteHeader(http.StatusNoContent)
		fmt.Fprintln(w, "Deleted the expense successfully")
	}

}

// UpdateExpense updates an existing expense using its ID.
func (a *Application) UpdateExpense(w http.ResponseWriter, r *http.Request) {

	userID, ok := r.Context().Value(userIDKey).(string)

	if !ok || userID == "" {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	expenseID := chi.URLParam(r, "id")

	if expenseID == "" {
		http.NotFound(w, r)
		return
	}

	var expense models.Expense

	err := json.NewDecoder(r.Body).Decode(&expense)

	if err != nil {
		a.Logger.Println("Error decoding expense:", err)
		return
	}

	query := `
		UPDATE expense
		SET 
			title = $1,
			amount = $2,
			description = $3,
			category_id = $4
		WHERE expense_id = $5
		AND user_id = $6;
	`
	result, err := a.Db.Exec(query, expense.Title, expense.Amount, expense.Description, expense.CategoryID, expenseID, userID)

	if err != nil {
		a.Logger.Println("Error updating expense:", err)
		http.Error(w, "Failed to update the  expense", http.StatusInternalServerError)
		return
	}

	rowsAffected, err := result.RowsAffected()

	if err != nil {
		a.Logger.Println("Error checking affected rows:", err)
		http.Error(w, "Failed to update the  expense", http.StatusInternalServerError)
		return
	}

	if rowsAffected == 0 {
		http.NotFound(w, r)
		return
	} else {
		w.WriteHeader(http.StatusNoContent)
		fmt.Fprintln(w, "updated  the expense successfully")
	}
}

func (app *Application) GetFilteredExpenses(w http.ResponseWriter, r *http.Request) {
	queryParams := r.URL.Query()

	search := queryParams.Get("search")
	categoryID := queryParams.Get("category_id")
	from := queryParams.Get("from")
	to := queryParams.Get("to")
	sortBy := queryParams.Get("sort_by")

	userID, ok := r.Context().Value(userIDKey).(string)

	if !ok || userID == "" {
		app.Logger.Println("error on the authentication")
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return

	}

	query := `
     SELECT
   		e.expense_id,
   		e.title,
   		e.amount,
    	e.category_id,
    	c.category_name,
    	e.created_at,
    	e.description
	FROM expense e
	INNER JOIN category c
    ON e.category_id = c.category_id
	WHERE ($1 = '' OR e.title ILIKE '%' || $1 || '%')
  		AND (NULLIF($2, '') IS NULL OR e.category_id = NULLIF($2, '')::uuid)
  		AND ($3 = '' OR e.created_at >= $3::date)
  		AND ($4 = '' OR e.created_at < $4::date + INTERVAL '1 day')
		AND e.user_id = $6
	ORDER BY
    	CASE WHEN $5 = 'highest' THEN e.amount END DESC,
    	CASE WHEN $5 = 'lowest' THEN e.amount END ASC,
    	CASE WHEN $5 = 'newest' THEN e.created_at END DESC,
    	CASE WHEN $5 = 'oldest' THEN e.created_at END ASC,
    	e.created_at DESC;
    `

	rows, err := app.Db.Query(query, search, categoryID, from, to, sortBy, userID)
	if err != nil {
		app.Logger.Println("Failed to fetch filtered expenses:", err)
		http.Error(w, "Failed to fetch expenses", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	expenses := []models.Expense{}

	for rows.Next() {
		var expense models.Expense

		err := rows.Scan(
			&expense.ID,
			&expense.Title,
			&expense.Amount,
			&expense.CategoryID,
			&expense.CategoryName,
			&expense.CreatedAt,
			&expense.Description,
		)
		if err != nil {
			http.Error(w, "Failed to read expenses", http.StatusInternalServerError)
			return
		}

		expenses = append(expenses, expense)
	}

	if err := rows.Err(); err != nil {
		http.Error(w, "Failed to read expenses", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(expenses)
}
