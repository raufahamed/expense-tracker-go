package utils

import "golang.org/x/crypto/bcrypt"

func HashPassword(password string) (string, error) {
	// generate password is responsible for creating the hashpassword and the defaultCost hashing fast and techniques
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	if err != nil {
		return "", nil
	}

	return string(hashPassword), nil
}

func ComparePassword(password string, hashPassword string) error {
	// comparehashandpassword is reponsible for checking the hashpassword and the password we entered during the login / signin
	return bcrypt.CompareHashAndPassword(
		[]byte(hashPassword),
		[]byte(password),
	)
}
