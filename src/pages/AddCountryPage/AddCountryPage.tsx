import { Card, CardContent, Typography } from '@mui/material'

export function AddCountryPage() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Добавление страны
        </Typography>
        <Typography variant="body2" color="text.secondary">
          На этом шаге появится выбор страны и сохранение в localStorage.
        </Typography>
      </CardContent>
    </Card>
  )
}

