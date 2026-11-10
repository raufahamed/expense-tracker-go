package models

import "time"

// struct can have the tags and in the tags we are adding the jsontag

type Expense struct {
	ID           string    `json:"id"`
	Title        string    `json:"title"`
	Amount       float64   `json:"amount"`
	CategoryID   string    `json:"category_id"`
	CategoryName string    `json:"category_name"`
	CreatedAt    time.Time `json:"created_at"`
	Description  string    `json:"description"`
}

type Category struct {
	ID           string `json:"id"`
	CategoryName string `json:"category_name"`
}
