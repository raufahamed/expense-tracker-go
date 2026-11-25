package app

import (
	"database/sql"
	"encoding/json"
	"errors"
	"expense-tracker/models"
	"expense-tracker/utils"
	"net/http"
	"time"

	"github.com/jackc/pgx/v5/pgconn"
)

func (a *Application) RegisterUser(w http.ResponseWriter, r *http.Request) {

	var user models.RegisterRequest

	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		a.Logger.Println("not able to create a user", err)
		http.Error(w, "unable to register user", http.StatusInternalServerError)
		return
	}
	if user.Name == "" || user.Email == "" || user.Password == "" {
		http.Error(w, "name, email and password are required", http.StatusBadRequest)
		return
	}

	hashPassword, err := utils.HashPassword(user.Password)

	if err != nil {
		a.Logger.Println("there is a issue with signingup", err)
		http.Error(w, "something went wrong", http.StatusBadRequest)
		return
	}

	query := `
	
	INSERT INTO Users(name,email,password_hash)
	VALUES($1,$2,$3)
	`
	_, err = a.Db.Exec(query, user.Name, user.Email, hashPassword)

	if err != nil {
		var pgErr *pgconn.PgError

		if errors.As(err, &pgErr) && pgErr.Code == "23505" {
			http.Error(w, "email already exists", http.StatusConflict)
			return
		}

		a.Logger.Println("not able to create a user", err)
		http.Error(w, "not able to sign-up at this movement try again later!!",
			http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
	a.Logger.Println("Created the user successffuly")

}

func (a *Application) LoginUser(w http.ResponseWriter, r *http.Request) {
	var loginRequest models.LoginRequest
	err := json.NewDecoder(r.Body).Decode(&loginRequest)

	if err != nil {
		a.Logger.Println("something went wrong during decoding", err)
		http.Error(w, "unable to login", http.StatusInternalServerError)
		return
	}

	query := `
	
	SELECT user_id , email, name , password_hash
	FROM Users 
	WHERE email = $1;
	`

	row := a.Db.QueryRow(query, loginRequest.Email)
	var user models.User

	err = row.Scan(
		&user.UserId,
		&user.Email,
		&user.Name,
		&user.PasswordHash,
	)

	if errors.Is(err, sql.ErrNoRows) {
		http.Error(w, "invalid email or password", http.StatusUnauthorized)
		return
	}

	if err != nil {
		a.Logger.Println("something went wrong during the row scan", err)
		http.Error(w, "unable to login", http.StatusInternalServerError)
		return
	}

	err = utils.ComparePassword(loginRequest.Password, user.PasswordHash)

	if err != nil {
		a.Logger.Println("password and hashpassword is not same", err)
		http.Error(w, "invalid password or email", http.StatusUnauthorized)
		return
	}

	token, err := utils.GenerateJwt(user.UserId)

	if err != nil {
		a.Logger.Println("something went wrong", err)
		http.Error(w, "unable to login", http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    token,
		Path:     "/",
		HttpOnly: false,
		Secure:   false,
		SameSite: http.SameSiteLaxMode,
		Expires:  time.Now().Add(24 * time.Hour),
	})

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	err = json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "login successfull",
		"user": map[string]interface{}{
			"user_id": user.UserId,
			"name":    user.Name,
			"email":   user.Email,
		},
	})

}

func (a *Application) GetCurrentUser(w http.ResponseWriter, r *http.Request) {

	userID, ok := r.Context().Value(userIDKey).(string)

	if !ok || userID == "" {
		a.Logger.Println("error getting the user")
		http.Error(w, "error fetching the user details", http.StatusUnauthorized)
		return
	}

	query := `

		SELECT user_id,name,email
		FROM Users
		WHERE user_id = $1;
	`
	row := a.Db.QueryRow(query, userID)

	var user models.User

	err := row.Scan(
		&user.UserId,
		&user.Name,
		&user.Email,
	)

	if err != nil {
		a.Logger.Println("error getting the user details")
		http.Error(w, "Error getting the user details", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")

	err = json.NewEncoder(w).Encode(user)
	if err != nil {
		a.Logger.Println("error encoding the user details", err)
		http.Error(w, "error encoding the user details", http.StatusInternalServerError)
		return
	}

}

func (a *Application) LogoutUser(w http.ResponseWriter, r *http.Request) {
	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    "",
		Path:     "/",
		HttpOnly: true,
		Secure:   false,
		SameSite: http.SameSiteLaxMode,
		MaxAge:   -1,
	})

	w.WriteHeader(http.StatusNoContent)
}
