package models

import "time"

// struct can have the tags and in the tags we are adding the jsontag 

type Expense struct {
	ID        string `json:"id"`
	Title     string `json:"title"`
	Amount    float64 `json:"amount"` 
	Category  string  `json:"category"`
	CreatedAt time.Time	`json:"created_at"`
}