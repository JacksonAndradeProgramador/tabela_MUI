import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import {  MagnifyingGlass, Trash, FunnelSimple } from 'phosphor-react';

// ----------------------------------------------------------------------

export function UserTableToolbar({
  numSelected,
  filterName,
  onFilterName,
  onFilterStatus,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');

  const isMenuOpen = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
};

  const handleCloseMenu = () => {
    setAnchorEl(null);
    
  };
 
  const handleSelectStatus = (status) => {
    setSelectedStatus(status);
    onFilterStatus(status); // Aplica o filtro ao status selecionado
    handleCloseMenu();
  };

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selecionados
        </Typography>
      ) : (
        <OutlinedInput
          fullWidth
          value={filterName}
          onChange={onFilterName}
          placeholder="Buscar Cliente"
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlass size={20} weight="bold" />
            </InputAdornment>
          }
          sx={{ maxWidth: 320 }}
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Deletar">
          <IconButton>
          <Trash size={25} color="#c4214a" weight="bold" />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Button
            variant="outlined"
            onClick={handleOpenMenu}
            startIcon={
              <FunnelSimple size={22} weight="bold" />}
          >
            {selectedStatus || 'Filtrar por status'}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <MenuItem onClick={() => handleSelectStatus('Ativo')}>Ativo</MenuItem>
            <MenuItem onClick={() => handleSelectStatus('Inativo')}>Inativo</MenuItem>
            <MenuItem onClick={() => handleSelectStatus('')}>Limpar filtro</MenuItem>
          </Menu>
        </>
      )}
    </Toolbar>
  );
}
