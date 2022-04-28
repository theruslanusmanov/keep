package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	cors "github.com/rs/cors/wrapper/gin"
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

	router.Use(cors.Default())
	router.Use(CORSMiddleware())

	router.GET("/v1/notes", getNotes)
	router.GET("/v1/notes/:id", getNoteByID)
	router.POST("/v1/notes/create", createNote)
	router.DELETE("/v1/notes", deleteNoteByID)

	err := router.Run("0.0.0.0:8080")
	if err != nil {
		return
	}
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func getNotes(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, notes)
}

func createNote(c *gin.Context) {
	//var text string
	var newNote = note{
		ID:   "3",
		Text: "new note",
	}

	//if err := c.BindJSON(&newNote); err != nil {
	//	return
	//}

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

func deleteNoteByID(c *gin.Context) {
	id := c.Param("id")

	for i, a := range notes {
		if a.ID == id {
			notes = append(notes[:i], notes[i+1:]...)
			c.IndentedJSON(http.StatusOK, a)
			return
		}
	}

	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "note not found"})
}
