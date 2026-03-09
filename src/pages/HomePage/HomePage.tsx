import { Card, CardContent, Typography } from '@mui/material'

export function HomePage() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Главная
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Здесь будет список запланированных поездок.
        </Typography>
      </CardContent>
    </Card>
  )
}

