package routes

import (
	"expense-tracker/app"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
)

func SetUpRouter(app *app.Application) *chi.Mux {
	r := chi.NewRouter()

	r.Use(cors.Handler(
		cors.Options{
			AllowedOrigins: []string{"http://localhost:5173"},
			AllowedMethods: []string{
				"GET",
				"POST",
				"PUT",
				"DELETE",
				"OPTIONS",
			},
			AllowedHeaders: []string{
				"Accept",
				"Authorization",
				"Content-Type",
			},
			MaxAge: 300,
		},
	))
	r.Get("/health", app.HealthCheck)
	r.Get("/get-expenses", app.GetExpenses)
	r.Get("/get-expenses", app.GetFilteredExpenses)
	r.Post("/expenses", app.CreateExpense)
	r.Get("/get-expensebyid/{id}", app.GetExpenseByID)
	r.Delete("/expenses/{id}", app.DeleteExpense)
	r.Put("/update-expense/{id}", app.UpdateExpense)

	r.Post("/categories", app.CreateCategory)
	r.Get("/get-categories", app.GetCategories)

	return r
}
