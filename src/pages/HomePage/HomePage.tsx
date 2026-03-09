import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Link, useNavigate } from 'react-router-dom'
import { REST_COUNTRIES_BASE_URL } from '../../constants/api'
import type { CountryFlags, Trip } from '../../types/country'

interface CountrySummary {
  alpha3Code: string
  name: string
  flags: CountryFlags
}

const TRIPS_STORAGE_KEY = 'my_trips'

export function HomePage() {
  const navigate = useNavigate()
  const [trips, setTrips] = useState<Trip[]>([])
  const [countries, setCountries] = useState<Record<string, CountrySummary>>({})
  const [loading, setLoading] = useState(false)

  // Чтение списка поездок из localStorage
  useEffect(() => {
    const raw = window.localStorage.getItem(TRIPS_STORAGE_KEY)
    const parsed: Trip[] = raw ? JSON.parse(raw) : []
    setTrips(parsed)
  }, [])

  // Загрузка краткой информации о странах по сохранённым кодам
  useEffect(() => {
    const loadCountries = async () => {
      if (trips.length === 0) return

      setLoading(true)

      try {
        const uniqueCodes = Array.from(new Set(trips.map((trip) => trip.code)))
        const response = await fetch(
          `${REST_COUNTRIES_BASE_URL}/alpha?codes=${uniqueCodes.join(
            ',',
          )}&fields=alpha3Code,name,flags`,
        )

        if (!response.ok) {
          return
        }

        const data = (await response.json()) as CountrySummary | CountrySummary[]
        const list = Array.isArray(data) ? data : [data]

        const map: Record<string, CountrySummary> = {}
        for (const country of list) {
          map[country.alpha3Code] = country
        }

        setCountries(map)
      } finally {
        setLoading(false)
      }
    }

    void loadCountries()
  }, [trips])

  const handleDeleteTrip = (indexToRemove: number) => {
    const updated = trips.filter((_, index) => index !== indexToRemove)
    setTrips(updated)
    window.localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(updated))
  }

  return (
    <Container maxWidth="md">
      <Stack spacing={3}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/add')}
        >
          Добавить новую поездку
        </Button>

        {trips.length === 0 && !loading && (
          <Typography variant="body2" color="text.secondary">
            Пока нет запланированных поездок. Начните с добавления первой страны.
          </Typography>
        )}

        <Stack spacing={2}>
          {trips.map((trip, index) => {
            const country = countries[trip.code]

            return (
              <Card key={`${trip.code}-${index}`} variant="outlined">
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                    <Box
                      component={Link}
                      to={`/country/${trip.code}`}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        textDecoration: 'none',
                        color: 'inherit',
                        flexGrow: 1,
                      }}
                    >
                      {country && (
                        <Box
                          component="img"
                          src={country.flags.png}
                          alt={country.name}
                          sx={{ height: 40, borderRadius: 0.5 }}
                        />
                      )}

                      <Box>
                        <Typography variant="subtitle1" fontWeight={700}>
                          {country ? country.name : trip.code}
                        </Typography>
                        {trip.note && (
                          <Typography variant="body2" color="text.secondary">
                            {trip.note}
                          </Typography>
                        )}
                        {trip.attractions && (
                          <Typography variant="body2" color="text.secondary">
                            {trip.attractions}
                          </Typography>
                        )}
                      </Box>
                    </Box>

                    <IconButton
                      aria-label="Удалить поездку"
                      onClick={() => handleDeleteTrip(index)}
                      edge="end"
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            )
          })}
        </Stack>
      </Stack>
    </Container>
  )
}

