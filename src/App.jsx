import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [ingredients, setIngredients] = useState([])
  const [currentIngredient, setCurrentIngredient] = useState('')
  const [recipe, setRecipe] = useState('')
  const [loading, setLoading] = useState(false)

  const addIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()])
      setCurrentIngredient('')
    }
  }

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addIngredient()
    }
  }

  const getRecipe = async () => {
    if (ingredients.length === 0) {
      alert('Please add at least one ingredient')
      return
    }

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    if (!apiKey) {
      alert('Please set your Gemini API key in the .env file')
      return
    }

    setLoading(true)
    setRecipe('')

    try {
      const fullPrompt = `Create a detailed recipe using these ingredients: ${ingredients.join(', ')}. 
      Please provide:
      1. Recipe name
      2. List of ingredients with quantities (use the ingredients I provided and suggest additional common ingredients if needed)
      3. Step-by-step cooking instructions
      4. Estimated cooking time
      5. Number of servings
      
      Format the response in a clear, easy-to-read manner.`

      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
        {
          contents: [{ parts: [{ text: fullPrompt }] }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey,
          },
          timeout: 30000
        }
      );

      const text = response.data.candidates[0].content.parts[0].text;
      setRecipe(text)
    } catch (error) {
      console.error('Error fetching recipe:', error)
      if (error.response?.status === 503) {
        alert('The Gemini service is currently overloaded. Please try again in a few minutes.')
      } else if (error.response?.status === 404) {
        alert('The AI model is not available. Please try again later.')
      } else if (error.response?.status === 401 || error.response?.status === 403) {
        alert('Invalid API key. Please check your .env file and ensure your API key is correct.')
      } else if (error.code === 'ECONNABORTED') {
        alert('Request timed out. Please try again.')
      } else {
        alert('Error fetching recipe. Please check your internet connection and try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🍳 Chef Gemini</h1>
        <p>Enter your ingredients and get a delicious recipe!</p>
      </header>

      <main className="app-main">
        <div className="ingredients-section">
          <h2>Your Ingredients</h2>
          <div className="ingredient-input">
            <input
              type="text"
              placeholder="Add an ingredient..."
              value={currentIngredient}
              onChange={(e) => setCurrentIngredient(e.target.value)}
              onKeyPress={handleKeyPress}
              className="ingredient-field"
            />
            <button onClick={addIngredient} className="add-btn">
              Add
            </button>
          </div>

          <div className="ingredients-list">
            {ingredients.map((ingredient, index) => (
              <span key={index} className="ingredient-tag">
                {ingredient}
                <button
                  onClick={() => removeIngredient(index)}
                  className="remove-btn"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <button
            onClick={getRecipe}
            disabled={loading || ingredients.length === 0}
            className="get-recipe-btn"
          >
            {loading ? 'Getting Recipe...' : 'Get Recipe'}
          </button>
        </div>

        {recipe && (
          <div className="recipe-section">
            <h2>Your Recipe</h2>
            <div className="recipe-content">
              {recipe.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
