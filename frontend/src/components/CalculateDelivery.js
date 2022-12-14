import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Box } from '@mui/system'
import { useState } from 'react'
import woltService from '../services/wolt'
import Typography from '@mui/material/Typography'
import { Snackbar, Alert } from '@mui/material'

export default function CalculateDelivery({
  setDeliveryFee,
  deliveryFee,
  setDeliveryEstimate,
  pickup,
  address,
  setAddress,
}) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(null)
  const [snackOpen, setSnackOpen] = useState(false)

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setSnackOpen(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const getFee = async () => {
    let pickupLocation
    if (pickup !== '') {
      pickupLocation = pickup
    } else {
      pickupLocation = 'Helsiki Central Station'
    }
    const response = await woltService.getDeliveryFee({
      pickup: pickupLocation,
      dropoff: address,
    })
    if (response.error_code) {
      setError(response.reason)
      console.error(response)
      setSnackOpen(true)
    } else {
      setError(null)
      const fee = ((response.fee.amount / 100) * Math.random()).toFixed(2)
      const deliveryEstimate = response.time_estimate_minutes
      setDeliveryFee(fee)
      setDeliveryEstimate(deliveryEstimate)
      handleClose()
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {!deliveryFee && (
          <Button variant="outlined" color="primary" onClick={handleClickOpen} fullWidth>
            Calculate delivery fee
          </Button>
        )}
        {deliveryFee && (
          <Button variant="outlined" color="primary" onClick={handleClickOpen} fullWidth>
            Recalculate delivery fee
          </Button>
        )}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Enter delivery address</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              label="Street name and number"
              fullWidth
              variant="standard"
              value={address}
              onChange={({ target }) => setAddress(target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={getFee}>Calculate</Button>
          </DialogActions>
        </Dialog>
        <Snackbar sx={{ p: 2 }} open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
          <Alert onClose={handleSnackClose} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  )
}
