// Code generated by ent, DO NOT EDIT.

package ent

import (
	"backend/myapp/ent/book"
	"backend/myapp/ent/schema"
)

// The init function reads all schema descriptors with runtime code
// (default values, validators, hooks and policies) and stitches it
// to their package variables.
func init() {
	bookFields := schema.Book{}.Fields()
	_ = bookFields
	// bookDescTitle is the schema descriptor for title field.
	bookDescTitle := bookFields[0].Descriptor()
	// book.TitleValidator is a validator for the "title" field. It is called by the builders before save.
	book.TitleValidator = func() func(string) error {
		validators := bookDescTitle.Validators
		fns := [...]func(string) error{
			validators[0].(func(string) error),
			validators[1].(func(string) error),
		}
		return func(title string) error {
			for _, fn := range fns {
				if err := fn(title); err != nil {
					return err
				}
			}
			return nil
		}
	}()
	// bookDescBody is the schema descriptor for body field.
	bookDescBody := bookFields[1].Descriptor()
	// book.BodyValidator is a validator for the "body" field. It is called by the builders before save.
	book.BodyValidator = bookDescBody.Validators[0].(func(string) error)
}
