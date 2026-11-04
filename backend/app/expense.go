
package app

import (
	"encoding/json"
	"expense-tracker/models"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
)

/*
Things I learned while building these APIs:

1. HTTP handlers receive two important things:
   - http.ResponseWriter: used to send a response to the client.
   - *http.Request: contains information about the incoming request.

2. JSON Decoder:
   - Converts incoming JSON into a Go struct.
   - Example: json.NewDecoder(r.Body).Decode(&expense)

3. JSON Encoder:
   - Converts a Go struct into JSON and writes it to the response.
   - Example: json.NewEncoder(w).Encode(expense)

4. chi.URLParam():
   - Extracts dynamic parameters from the URL.
   - Example: /expenses/{id}

5. Slices:
   - append() adds elements to a slice.
   - We can replace an element using its index.
   - We can remove an element using append() and slice expressions.

6. Error handling:
   - Always check errors using if err != nil.
   - return stops the current handler from continuing.
*/

// CreateExpense handles incoming POST requests and stores a new expense.
func (a *Application) CreateExpense(w http.ResponseWriter, r *http.Request) {
	var expense models.Expense

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
	a.Expenses = append(a.Expenses, expense)

	fmt.Fprintln(w, "Expenses created successfully")
}

// GetExpenses returns all expenses stored in our slice.
func (a *Application) GetExpenses(w http.ResponseWriter, r *http.Request) {
	if len(a.Expenses) == 0 {
		fmt.Fprintln(w, "There are no expenses found")
		return
	}

	// Tell the client that we are returning JSON.
	w.Header().Set("Content-Type", "application/json")

	// Encode the entire slice and write it to the HTTP response.
	err := json.NewEncoder(w).Encode(a.Expenses)
	if err != nil {
		a.Logger.Println("Error encoding expenses:", err)
		return
	}
}

// GetExpenseByID returns a single expense based on its ID.
func (a *Application) GetExpenseByID(w http.ResponseWriter, r *http.Request) {
	// Extract the ID from the URL using Chi.
	// Example: /expenses/123 gives us "123".
	expenseID := chi.URLParam(r, "id")

	if expenseID == "" {
		http.NotFound(w, r)
		return
	}

	// Loop through the expenses and find the matching ID.
	for _, expense := range a.Expenses {
		if expense.ID == expenseID {
			w.Header().Set("Content-Type", "application/json")

			// Convert the matching Go struct into JSON.
			err := json.NewEncoder(w).Encode(expense)
			if err != nil {
				a.Logger.Println("Error encoding expense:", err)
			}
			return
		}
	}

	// If the loop finishes without finding a match, return 404.
	http.NotFound(w, r)
}

// DeleteExpense removes an expense using its ID.
func (a *Application) DeleteExpense(w http.ResponseWriter, r *http.Request) {
	expenseID := chi.URLParam(r, "id")

	if expenseID == "" {
		http.NotFound(w, r)
		return
	}

	// We use the index because we need the position to remove an element.
	for i, expense := range a.Expenses {
		if expense.ID == expenseID {

			// Remove the element at index i.
			// [:i] contains elements before i.
			// [i+1:] contains elements after i.
			// ... expands the second slice for append().
			a.Expenses = append(a.Expenses[:i], a.Expenses[i+1:]...)

			fmt.Fprintln(w, "Expense deleted successfully")
			return
		}
	}

	// No expense with the given ID was found.
	http.NotFound(w, r)
}

// UpdateExpense updates an existing expense using its ID.
func (a *Application) UpdateExpense(w http.ResponseWriter, r *http.Request) {
	expenseID := chi.URLParam(r, "id")

	if expenseID == "" {
		http.NotFound(w, r)
		return
	}

	// We need the index because we will replace the original slice element.
	for i, expense := range a.Expenses {
		if expenseID == expense.ID {

			// Decode the updated JSON body into the expense variable.
			err := json.NewDecoder(r.Body).Decode(&expense)

			if err != nil {
				http.Error(w, "Invalid expense data", http.StatusBadRequest)
				return
			}

			// Replace the original element with the updated expense.
			a.Expenses[i] = expense

			fmt.Fprintln(w, "Expense updated successfully")
			return
		}
	}

	// Return 404 if the expense ID doesn't exist.
	http.NotFound(w, r)
}
