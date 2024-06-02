import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const CollectionsTable = () => {
  function createData(title, products) {
    return { title, products };
  }

  const initialRows = [
    createData('Trending Now', 1),
    createData('New Arrivals', 1),
    createData('Summer', 1),
    createData('Winter', 1),
  ];

  const [rows, setRows] = useState(initialRows);

  const handleDelete = (title) => {
    setRows(rows.filter((row) => row.title !== title));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ tableLayout: 'fixed', width: '100%'}} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell align= "center" style={{ fontWeight: 'bold' }}>Title</TableCell>
            <TableCell align= "center" style={{ fontWeight: 'bold' }}>Products</TableCell>
            <TableCell align= "center" style={{ fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align= "center" component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align= "center">{row.products}</TableCell>
              <TableCell align= "center">
                <Button 
                  variant="contained" 
                  sx={{ 
                    backgroundColor: 'red', 
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'darkred', // Change to desired hover color
                    }
                  }} 
                  onClick={() => handleDelete(row.title)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CollectionsTable;
