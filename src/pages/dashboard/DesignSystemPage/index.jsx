import {
  Typography,
  Button,
  Switch,
  Card,
  Table,
  TableHead,
  TableBody,
  Chip,
} from "@/components/ui";
import {
  AddFilled,
  CircleSmallFilled,
  MailFilled,
  PersonFilled,
  ShieldFilled,
  VideoFilled,
} from "@fluentui/react-icons";
import {
  Stack,
  FilledInput,
  OutlinedInput,
  Box,
  CardContent,
  Select,
  MenuItem,
  TableRow,
  TableCell,
} from "@mui/material";

export default function DesignSystemPage() {
  const rows = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Developer" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Designer" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Manager" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Developer" },
    { id: 5, name: "Charlie Davis", email: "charlie@example.com", role: "Analyst" },
  ];

  const columns = [
    { label: "ID", icon: PersonFilled },
    { label: "Name", icon: PersonFilled },
    { label: "Email", icon: MailFilled },
    { label: "Role", icon: ShieldFilled },
  ];

  return (
    <>
      <Typography variant="h1">Welcome, Ahemen Jeho</Typography>
      <Typography color="secondary" variant="h2">
        Welcome, Ahemen Jeho
      </Typography>
      <Typography color="tertiary" variant="h3">
        Welcome, Ahemen Jeho
      </Typography>
      <Typography variant="body1">Welcome, Ahemen Jeho</Typography>
      <Typography variant="caption">Welcome, Ahemen Jeho</Typography>
      <Box py="20px" width="70%" mx="auto">
        <Card>
          <CardContent>
            <Stack direction="row" gap="12px" alignItems="center" justifyContent="center">
              <Button loading={false}>Submit</Button>
              <Button
                loading={false}
                color="secondary"
                round={5}
                startContent={<CircleSmallFilled />}
                endContent={<AddFilled />}
              >
                Cancel
              </Button>
              <Switch />
            </Stack>
          </CardContent>
        </Card>
      </Box>

      <Box>
        <Stack width="70%" mx="auto" gap="12px" py="50px">
          <FilledInput fullWidth placeholder="Enter your name" />
          <Select variant="filled" fullWidth displayEmpty>
            <MenuItem value="" disabled>
              Select your country
            </MenuItem>
            <MenuItem value="usa">United States</MenuItem>
            <MenuItem value="canada">Canada</MenuItem>
            <MenuItem value="uk">United Kingdom</MenuItem>
          </Select>
          <Card variant="outlined">
            <CardContent>
              <Stack gap="12px">
                <Typography variant="h1">Personal Information</Typography>
                <OutlinedInput fullWidth placeholder="Enter your email" />
                <Select variant="outlined" fullWidth displayEmpty>
                  <MenuItem value="" disabled>
                    Select your country
                  </MenuItem>
                  <MenuItem value="usa">United States</MenuItem>
                  <MenuItem value="canada">Canada</MenuItem>
                  <MenuItem value="uk">United Kingdom</MenuItem>
                </Select>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>

      <Table>
        <TableHead columns={columns}></TableHead>
        <TableBody loading={false} count={rows?.length} span={columns.length}>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box py="20px" width="70%" mx="auto">
        <Stack gap="12px">
          <Typography variant="h2">Chips - Filled</Typography>
          <Stack direction="row" gap="8px" flexWrap="wrap">
            <Chip label="Primary" icon={<CircleSmallFilled />} />
            <Chip label="Secondary" icon={<CircleSmallFilled />} color="secondary" />
            <Chip label="Error" color="error" />
            <Chip label="Warning" color="warning" />
            <Chip label="Info" color="info" />
            <Chip label="Success" color="success" />
          </Stack>

          <Typography variant="h2">Chips - Outlined</Typography>
          <Stack direction="row" gap="8px" flexWrap="wrap">
            <Chip label="Primary" variant="outlined" />
            <Chip icon={<VideoFilled />} label="Secondary" variant="outlined" color="secondary" />
            <Chip label="Error" variant="outlined" color="error" />
            <Chip label="Warning" variant="outlined" color="warning" />
            <Chip label="Info" variant="outlined" color="info" />
            <Chip label="Success" variant="outlined" color="success" />
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
