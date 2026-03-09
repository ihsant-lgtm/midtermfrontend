import { Card, CardContent, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

export function CountryDetailsPage() {
  const { code } = useParams<{ code: string }>()

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Детальная страница страны
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Код страны из URL: <strong>{code ?? '—'}</strong>
        </Typography>
      </CardContent>
    </Card>
  )
}

