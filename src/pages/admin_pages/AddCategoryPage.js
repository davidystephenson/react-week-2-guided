import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'

const AddCategoryPage = (props) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  function handleNameChange (event) {
    setName(event.target.value)
  }
  function handleDescriptionChange (event) {
    setDescription(event.target.value)
  }
  function handleSubmit (event) {
    event.preventDefault()
    const localCategories = localStorage.getItem('categories')
    const categories = JSON.parse(localCategories)
    const lastCategory = categories[categories.length - 1]
    const category = {
      id: lastCategory.id + 1,
      name,
      description
    }
    categories.push(category)
    const categoriesString = JSON.stringify(categories)
    localStorage.setItem('categories', categoriesString)
    props.addCategory(category)
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          onChange={handleNameChange}
          value={name}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          onChange={handleDescriptionChange}
          value={description}
        />
      </Form.Group>
      <Button type='submit'>
        Add
      </Button>
    </Form>
  )
};

export default AddCategoryPage;
