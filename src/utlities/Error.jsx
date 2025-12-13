import React from "react";

const Error = ({error}) => {
  return (
    <div>
      {error && (
        <Stack sx={{ width: "100%", mb: 4 }} spacing={2}>
          <Alert severity="error" variant="filled" sx={{ borderRadius: 2 }}>
            <strong>Error:</strong> {error}
          </Alert>
        </Stack>
      )}
    </div>
  );
};

export default Error;
