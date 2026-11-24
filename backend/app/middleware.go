package app

import (
	"fmt"
	"net/http"
	"os"

	"github.com/golang-jwt/jwt/v5"
)

func (a *Application) AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		token, err := r.Cookie("token")

		if err != nil {
			a.Logger.Println("cookie is not returning the values", err)
			http.Error(w, "cookie does n't have the correct cookie", http.StatusUnauthorized)
			return
		}
		tokenString := token.Value
		secret := os.Getenv("JWT_SECRET")

		parsedToken, err := jwt.Parse(tokenString, func(t *jwt.Token) (any, error) {

			if t.Method != jwt.SigningMethodHS256 {
				return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
			}

			return []byte(secret), nil
		},
			jwt.WithValidMethods([]string{"HS256"}),
			jwt.WithIssuer("expense-tracker"),
		)

		if !parsedToken.Valid {
			http.Error(w, "unauthorized", http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r)
	})

}
