import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { Link, Outlet, useLocation } from 'react-router-dom'

export function Layout() {
  const location = useLocation()

  const isHomeActive = location.pathname === '/'
  const isAddActive = location.pathname.startsWith('/add')

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      <AppBar position="sticky" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Планировщик путешествий
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              component={Link}
              to="/"
              color="inherit"
              sx={{
                textDecoration: 'none',
                opacity: isHomeActive ? 1 : 0.85,
                fontWeight: isHomeActive ? 700 : 500,
              }}
            >
              Главная
            </Button>
            <Button
              component={Link}
              to="/add"
              color="inherit"
              sx={{
                textDecoration: 'none',
                opacity: isAddActive ? 1 : 0.85,
                fontWeight: isAddActive ? 700 : 500,
              }}
            >
              Добавить
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 3 }}>
        <Outlet />
      </Container>
    </Box>
  )
}

