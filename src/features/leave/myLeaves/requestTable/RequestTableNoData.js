import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";

export default function RequestTableNoData({ query }) {
  return (
    <TableRow>
      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
        <Typography variant="h7">No result</Typography>
      </TableCell>
    </TableRow>
  );
}
