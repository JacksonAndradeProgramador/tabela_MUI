
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import {  Plus  } from 'phosphor-react';

import { _users } from 'src/_mock';
import { TableNoData } from '../components/User/table-no-data';
import { UserTableRow } from '../components/User/user-table-row';
import { UserTableHead } from '../components/User/user-table-head';

import { UserTableToolbar } from '../components/User/user-table-toolbar';
import { applyFilter, getComparator } from '../components/User/utils';



// ----------------------------------------------------------------------

export default function UserPage() {
   const table = useTable();
  
    const [filterName, setFilterName] = useState('');
    const [dataFiltered, setDataFiltered] = useState(_users);
  
    const dataFilteredSorted = applyFilter({
      inputData: dataFiltered,
      comparator: getComparator(table.order, table.orderBy),
      filterName,
    });
  
    const notFound = !dataFilteredSorted.length && !!filterName;
  
    const handleFilterStatus = (status) => {
      console.log(status)
      const filteredData = status
        ? _users.filter((user) => user.status === status)
        : _users; // Limpa o filtro se status for nulo
      setDataFiltered(filteredData); // Atualiza os dados filtrados
      table.onResetPage(); // Reseta a paginação
    };

  return (
     <>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Clientes
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          
        >
        <Plus size={16} weight="bold" />  Novo Cliente
        </Button>
      </Box>

      <Card>
       
        <UserTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
          onFilterStatus={handleFilterStatus}
        />
       
       
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={dataFilteredSorted.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    dataFilteredSorted.map((user) => user.id)
                  )
                }
                headLabel={[
                  { id: 'name', label: 'Nome' },
                  { id: 'company', label: 'Compania' },
                  { id: 'role', label: 'Profissão' },
                  { id: 'isVerified', label: 'Vefificado', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFilteredSorted
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                    />
                  ))
                }

              
                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
       
          <TablePagination
            component="div"
            page={table.page}
            count={dataFilteredSorted.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            labelDisplayedRows={({ from, to, count, page }) => 
              `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`
            }
            labelRowsPerPage="Linhas por página:"
          />
      </Card>
    </>
  );
}
export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState('asc');

  const onSort = useCallback(
    (id) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked, newSelecteds) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
