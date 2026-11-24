package utils

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func GenerateJwt(userId string) (string, error) {

	// 1. Create the JWT claims

	claims := jwt.MapClaims{
		"user_id": userId,
		"iss":     "expense-tracker",
		"iat":     time.Now().Unix(),
		"exp":     time.Now().Add(24 * time.Hour).Unix(),
	}

	// 2. Create a new JWT using HS256 and our claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// 3. Get the secret key from environment variables
	secret := os.Getenv("JWT_SECRET")

	// 4. Sign the token using our secret key
	signedToken, err := token.SignedString([]byte(secret))

	if err != nil {
		return "", err
	}

	// 5. Return the signed JWT
	return signedToken, nil

}
