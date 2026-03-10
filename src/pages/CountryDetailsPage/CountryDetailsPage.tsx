import { useEffect, useState } from 'react'
import { Card, CardContent, Divider, Stack, Button, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { REST_COUNTRIES_BASE_URL } from '../../constants/api'
import type { Country } from '../../types/country'

export function CountryDetailsPage() {
  const { code } = useParams<{ code: string }>()
  const navigate = useNavigate()
  const [country, setCountry] = useState<Country | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    if (!code) return

    const loadCountry = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `${REST_COUNTRIES_BASE_URL}/alpha/${encodeURIComponent(code)}`,
        )

        if (!response.ok) {
          throw new Error('Страна не найдена')
        }

        const data: Country = await response.json()
        setCountry(data)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Произошла ошибка при загрузке информации о стране',
        )
      } finally {
        setLoading(false)
      }
    }

    void loadCountry()
  }, [code])

  const handleBack = () => {
    navigate(-1)
  }

  if (!code) {
    return (
      <Card>
        <CardContent>
          <Typography color="error">Код страны не указан.</Typography>
          <Button sx={{ mt: 2 }} variant="outlined" onClick={handleBack}>
            Назад
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight={700}>
              Детальная информация о стране
            </Typography>
            <Button variant="outlined" onClick={handleBack}>
              Назад
            </Button>
          </Stack>

          {loading && (
            <Typography variant="body2" color="text.secondary">
              Загрузка информации о стране...
            </Typography>
          )}

          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}

          {country && (
            <Stack spacing={1.5}>
              <Typography variant="h6">{country.name}</Typography>

              <Divider />

              <Typography variant="body2">
                <strong>Нативное название:</strong> {country.nativeName}
              </Typography>
              <Typography variant="body2">
                <strong>Столица:</strong> {country.capital || '—'}
              </Typography>
              <Typography variant="body2">
                <strong>Регион:</strong> {country.region || '—'}
              </Typography>
              <Typography variant="body2">
                <strong>Субрегион:</strong> {country.subregion || '—'}
              </Typography>
              <Typography variant="body2">
                <strong>Население:</strong> {country.population.toLocaleString('ru-RU')}
              </Typography>
              <Typography variant="body2">
                <strong>Площадь:</strong>{' '}
                {country.area ? `${country.area.toLocaleString('ru-RU')} км²` : '—'}
              </Typography>
              <Typography variant="body2">
                <strong>Валюты:</strong>{' '}
                {country.currencies.length > 0
                  ? country.currencies
                      .map((c) => `${c.name} (${c.code}, ${c.symbol})`)
                      .join(', ')
                  : '—'}
              </Typography>
              <Typography variant="body2">
                <strong>Языки:</strong>{' '}
                {country.languages.length > 0
                  ? country.languages.map((l) => l.name).join(', ')
                  : '—'}
              </Typography>
              <Typography variant="body2">
                <strong>Часовые пояса:</strong>{' '}
                {country.timezones.length > 0 ? country.timezones.join(', ') : '—'}
              </Typography>
              <Typography variant="body2">
                <strong>Границы:</strong>{' '}
                {country.borders && country.borders.length > 0
                  ? country.borders.join(', ')
                  : '—'}
              </Typography>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}

