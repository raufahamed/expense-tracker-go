package app

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/golang-jwt/jwt/v5"
)

type contextKey string

const userIDKey contextKey = "user_id"

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

		claims, ok := parsedToken.Claims.(jwt.MapClaims)

		if !ok {
			http.Error(w, "unauthorized", http.StatusUnauthorized)
			return
		}

		userID, ok := claims["user_id"].(string)

		a.Logger.Println("Authenticated User ID:", userID)

		if !ok || userID == "" {
			http.Error(w, "unauthorized", http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), userIDKey, userID)

		next.ServeHTTP(w, r.WithContext(ctx))
	})

}
