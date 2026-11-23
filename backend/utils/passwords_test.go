package utils

import "testing"

func TestHashWithPassword(t *testing.T) {
	password := "myPassword"
	haspassword, err := HashPassword(password)

	if err != nil {

		t.Fatalf("expected no err %v", err)
	}

	if haspassword == "" {
		t.Fatal("password should not be empty")
	}

	if haspassword == password {
		t.Fatal("password and hashpassword should not be same")
	}
}

func TestComparePassword(t *testing.T) {

	password := "myPassword"

	hashpassword, err := HashPassword(password)

	if err != nil {
		t.Fatalf("failed to hash password: %v", err)
	}
	// correct password should match
	err = ComparePassword(password, hashpassword)

	if err != nil {
		t.Errorf("expected the password to be match but got %v", err)
	}

	// incorrect password should not match
	err = ComparePassword("wrongpasscode", hashpassword)
	if err == nil {
		t.Error("expected an error for wrong password")
	}

}
