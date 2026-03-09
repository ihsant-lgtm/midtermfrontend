import { useEffect, useState } from 'react'
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { REST_COUNTRIES_BASE_URL } from '../../constants/api'
import type { Country } from '../../types/country'

type CountryOption = Pick<Country, 'alpha3Code' | 'name'>

const TRIPS_STORAGE_KEY = 'my_trips'

interface StoredTrip {
  code: string
  note: string
}

export function AddCountryPage() {
  const navigate = useNavigate()
  const [countries, setCountries] = useState<CountryOption[]>([])
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null)
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Загрузка списка стран из API Rest Countries
  useEffect(() => {
    let cancelled = false

    const loadCountries = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `${REST_COUNTRIES_BASE_URL}/all?fields=alpha3Code,name`,
        )

        if (!response.ok) {
          throw new Error('Не удалось загрузить список стран')
        }

        const data: CountryOption[] = await response.json()
        if (!cancelled) {
          const sorted = data
            .slice()
            .sort((a: CountryOption, b: CountryOption) =>
              a.name.localeCompare(b.name, 'ru'),
            )
          setCountries(sorted)
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : 'Произошла неизвестная ошибка при загрузке стран',
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void loadCountries()

    return () => {
      cancelled = true
    }
  }, [])

  // Сохранение выбранной поездки в localStorage
  const handleAddTrip = async () => {
    if (!selectedCountry) {
      setError('Пожалуйста, выберите страну')
      return
    }

    setSaving(true)
    setError(null)

    try {
      const raw = window.localStorage.getItem(TRIPS_STORAGE_KEY)
      const trips: StoredTrip[] = raw ? JSON.parse(raw) : []

      const newTrip: StoredTrip = {
        code: selectedCountry.alpha3Code,
        note: note.trim(),
      }

      const updatedTrips = [...trips, newTrip]
      window.localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(updatedTrips))

      navigate('/')
    } catch {
      setError('Не удалось сохранить поездку. Попробуйте ещё раз.')
    } finally {
      setSaving(false)
    }
  }

  const isSubmitDisabled = !selectedCountry || loading || saving

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <div>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                Добавление поездки
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Выберите страну и при желании добавьте короткую заметку.
              </Typography>
            </div>

            <Autocomplete
              options={countries}
              loading={loading}
              value={selectedCountry}
              onChange={(_, value) => setSelectedCountry(value)}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) =>
                option.alpha3Code === value.alpha3Code
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Страна"
                  placeholder="Начните вводить название страны"
                />
              )}
            />

            <TextField
              label="Заметка"
              multiline
              minRows={2}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Например: хочу посетить летом"
            />

            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={() => {
                void handleAddTrip()
              }}
              disabled={isSubmitDisabled}
            >
              {saving ? 'Сохранение...' : 'Добавить поездку'}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  )
}

