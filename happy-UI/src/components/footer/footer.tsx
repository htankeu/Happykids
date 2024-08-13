import Typography from "@mui/material/Typography";

export const Copyright: React.FC = () => {
  return (
    <>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "} {new Date().getFullYear()}
      </Typography>
    </>
  );
};
