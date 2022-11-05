import { useEffect, useState } from 'react'
import Box from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import coreService from '../services/core'
import Button from '@mui/material/Button'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'

const Category = () => {
  const { category } = useParams()
  const [items, setItems] = useState(null)

  console.log('category:', category)

  const getItems = async () => {
    const response = await coreService.getProducts()
    console.log(response)
    setItems(response)
  }

  useEffect(() => {
    getItems()
  }, [])

  return (
    <Box
      id="main-box"
      disableGutters
      sx={{ display: 'flex', mt: 1, justifyContent: 'center', flexDirection: 'column' }}
    >
      <BackButton />
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        {category}
      </Typography>
      <Box
        disableGutters
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          justifyContent: 'center',
          flexWrap: 'wrap',
          my: 1,
        }}
      >
        {items &&
          items
            .filter((item) => item.category === category)
            .map((product) => {
              return (
                <Box
                  disableGutters
                  key={product.id}
                  sx={{
                    display: 'flex',
                    width: '100px',
                    flexDirection: 'column',
                    mx: 1,
                  }}
                >
                  <Box
                    disableGutters
                    component="img"
                    sx={{
                      width: '100%',
                    }}
                    alt="Item Picture"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6GGUNbamHf-Kn0vOP67diocqTsx4QXme2SQ&usqp=CAU"
                  />
                  <Typography variant="body2" sx={{ my: 1 }}>
                    {product.title}
                  </Typography>
                </Box>
              )
            })}
      </Box>
    </Box>
  )
}

export default Category