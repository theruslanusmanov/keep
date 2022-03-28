package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type note struct {
	ID   string `json:"id"`
	Text string `json:"text"`
}

var notes = []note{
	{ID: "1", Text: "Note"},
	{ID: "2", Text: "Another Note"},
}

func main() {
	router := gin.Default()
	router.GET("/notes", getNotes)
	router.GET("/notes/:id", getNoteByID)
	router.POST("/notes", postNotes)

	router.Run("localhost:8080")
}

func getNotes(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, notes)
}

func postNotes(c *gin.Context) {
	var newNote note

	if err := c.BindJSON(&newNote); err != nil {
		return
	}

	notes = append(notes, newNote)
	c.IndentedJSON(http.StatusCreated, newNote)
}

func getNoteByID(c *gin.Context) {
	id := c.Param("id")

	for _, a := range notes {
		if a.ID == id {
			c.IndentedJSON(http.StatusOK, a)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "note not found"})
}
