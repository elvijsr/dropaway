import Box from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useState, useEffect } from 'react'
import coreService from '../services/core'
import { useNavigate } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  Button,
} from '@mui/material'

const Orders = () => {
  const text = 'My orders'
  const navigate = useNavigate()

  const [orders, setOrders] = useState([])

  const getOrders = async () => {
    const response = await coreService.getOrders()
    console.log(response)
    setOrders(response)
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <Box sx={{ display: 'flex', mt: 1, justifyContent: 'center', flexDirection: 'column' }}>
      <Typography variant="h6">{text}</Typography>
      {!orders ||
        (orders.length === 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyItems: 'center', p: 2 }}>
            <Typography textAlign="center" variant="subtitle1">
              You have not made any orders yet
            </Typography>
          </Box>
        ))}
      <List
        disablePadding
        sx={{
          display: 'flex',
          mt: 1,
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        {orders &&
          orders.map((listing) => {
            return (
              <ListItem disablePadding dense key={listing.id} sx={{ mt: 1 }}>
                <ListItemAvatar>
                  <Avatar>
                    <img src={listing.photo_src} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={listing.title} secondary={listing.category} />
              </ListItem>
            )
          })}
      </List>
    </Box>
  )
}

export default Orders
