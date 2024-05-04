import { Button, Table } from 'react-bootstrap'
import AddCategoryPage from './AddCategoryPage';
import { useState } from 'react'
const CategoriesListPage = () => {
  const [categories, setCategories] = useState(() => {
    const localCategories = localStorage.getItem('categories')
    const categories = JSON.parse(localCategories)
    return categories
  })
  const [addPageShown, setAddPageShown] = useState(false)
  function handleToggleAdd () {
    const toggled = !addPageShown
    setAddPageShown(toggled)
  }
  const rows = categories.map((category) => {
    function handleDelete () {
      const newCategories = categories.filter(oldCategory => {
        return oldCategory.id !== category.id
      })
      setCategories(newCategories)
      const newCategoriesString = JSON.stringify(newCategories)
      localStorage.setItem('categories', newCategoriesString)
    }
    return (
      <tr key={category.id}>
        <td>{category.id}</td>
        <td>{category.name}</td>
        <td>{category.description}</td>
        <td>
          <Button onClick={handleDelete}>
            Delete
          </Button>
        </td>
      </tr>
    )
  })
  function addCategory (category) {
    const newCategories = [...categories, category]
    setCategories(newCategories)
  }
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
      <Button onClick={handleToggleAdd}>Show Add Page</Button>
      {addPageShown && <AddCategoryPage addCategory={addCategory} />}
    </>
  )
};

export default CategoriesListPage;
