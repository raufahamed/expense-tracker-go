package routes

import (
	"expense-tracker/app"

	"github.com/go-chi/chi/v5"
)

func SetUpRouter(app *app.Application) *chi.Mux{
	r := chi.NewRouter()
	r.Get("/health",app.HealthCheck)
	r.Get("/get-expenses",app.GetExpenses)
	r.Post("/expenses",app.CreateExpense)
	r.Get("/get-expensebyid/{id}",app.GetExpenseByID)
	r.Delete("/expenses/{id}",app.DeleteExpense)
	r.Put("/update-expense/{id}",app.UpdateExpense)

	return r 
}